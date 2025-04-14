'use client';

import { useEffect, useState } from 'react';
// import { ChevronDown, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getName, getVersion } from '@tauri-apps/api/app';
import { open } from '@tauri-apps/plugin-dialog';
import { appDataDir } from '@tauri-apps/api/path';
import { Store } from '@tauri-apps/plugin-store';
import { useRouter } from 'next/navigation';

export default function RekanSetupPage() {
  // const [language, setLanguage] = useState('English');
  // const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [appNameState, setAppNameState] = useState('...');
  const [appVersionState, setAppVersionState] = useState('x.x.x');
  // const [isLoaded, setIsLoaded] = useState(false);
  const route = useRouter();

  // Fetch as early as possible in component lifecycle
  useEffect(() => {
    const fetchAppInfo = async () => {
      try {
        // Use the already-started promises
        const [name, version] = await Promise.all([getName(), getVersion()]);
        setAppNameState(name.charAt(0).toUpperCase() + name.slice(1)); // Capitalize first letter
        setAppVersionState(version);
        // setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching app info:', error);
        // Fallback values if there's an error
        setAppNameState('Rekan');
        setAppVersionState('1.0.0');
        // setIsLoaded(true);
      }
    };

    fetchAppInfo();
  }, []);

  const handleCreateVault = async () => {
    try {
      const selectedDir = await open({
        directory: true,
        multiple: false,
        title: 'Select a folder to create a new vault',
        defaultPath: await appDataDir(),
        canCreateDirectories: true,
      });
      
      if (!selectedDir) return; // User cancelled selection
      
      console.log('Selected directory for new vault:', selectedDir);
      
      // Create or open the settings store
      let store;
      try {
        // Try to load existing store
        store = await Store.load('rekan.settings.json');
      } catch {
        // If loading fails, create a new store with createNew option
        console.log('Creating new settings file');
        store = await Store.load('rekan.settings.json', { createNew: true });
      }
      
      // Get existing vaults or default to empty array
      let vaults: string[] = (await store.get<string[]>('vaults')) || [];
      vaults = Array.isArray(vaults) ? vaults : [];
      
      // If the path already exists, remove it from its current position
      const existingIndex = vaults.indexOf(selectedDir);
      if (existingIndex !== -1) {
        vaults.splice(existingIndex, 1); // Remove the existing one
      }
      vaults.push(selectedDir);
      
      // Save the updated vaults list
      await store.set('vaults', vaults);
      await store.save();
      
      console.log('Vault settings saved successfully:', vaults);

      route.back();;
      
    } catch (err) {
      console.error('Error in vault creation process:', err);
    }
  }


  const handleSelectVault = async () => {
    const selectedDir = await open({
      directory: true,
      multiple: false,
      title: 'Select a folder to open as a vault',
      defaultPath: await appDataDir(),
      canCreateDirectories: true,
    });
    if (selectedDir) {
      console.log('Selected directory for existing vault:', selectedDir);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-sm flex flex-col items-center px-4 pb-4 pt-0">
        {/* Logo and Version */}
        <div className="flex flex-col items-center mb-6">
          <div className="mb-2">
            <RekanLogo />
          </div>
          <h1 className="text-xl font-semibold mb-0.5">{appNameState}</h1>
          <p className="text-xs text-gray-400">Version {appVersionState}</p>
        </div>

        {/* Vault Options */}
        <div className="w-full space-y-2.5">
          {/* Create new vault */}
          <div className="flex justify-between items-start bg-[#262626] rounded p-3">
            <div>
              <h2 className="font-medium text-sm">Create new vault</h2>
              <p className="text-xs text-gray-400 mt-0.5">Create a new Rekan vault under a folder.</p>
            </div>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white rounded text-xs transition-colors" 
              size={"sm"} 
              onClick={handleCreateVault}>
              Create
            </Button>
          </div>

          {/* Open folder as vault */}
          <div className="flex justify-between items-start bg-[#262626] rounded p-3">
            <div>
              <h2 className="font-medium text-sm">Open folder as vault</h2>
              <p className="text-xs text-gray-400 mt-0.5">Choose an existing folder of Markdown files.</p>
            </div>
            <Button 
              className="bg-[#3a3a3a] hover:bg-[#444444] text-white rounded text-xs transition-colors" 
              size={"sm"}
              onClick={handleSelectVault}>
              Open
            </Button>
          </div>

          {/* Open vault from Rekan Sync */}
          {/* <div className="flex justify-between items-start bg-[#262626] rounded p-3">
            <div>
              <h2 className="font-medium text-sm">Open vault from Rekan Sync</h2>
              <p className="text-xs text-gray-400 mt-0.5">Set up a synced vault with existing remote vault.</p>
            </div>
            <button className="bg-[#3a3a3a] hover:bg-[#444444] text-white py-1 px-3 rounded text-sm transition-colors">
              Sign in
            </button>
          </div> */}
        </div>

        {/* Language Selector */}
        {/* <div className="mt-4 self-start relative">
          <div 
            className="flex items-center bg-[#262626] hover:bg-[#2d2d2d] px-2 py-1.5 rounded cursor-pointer"
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            <HelpCircle size={14} className="text-gray-500 mr-1.5" />
            <span className="text-xs text-gray-300 mr-1.5">{language}</span>
            <ChevronDown size={12} className="text-gray-500" />
          </div>

          {showLanguageDropdown && (
            <div className="absolute mt-1 w-32 bg-[#2d2d2d] rounded shadow-lg z-10">
              {["English", "Español", "Français", "Deutsch", "中文", "日本語", "한국어"].map((lang) => (
                <div 
                  key={lang} 
                  className="px-2 py-1.5 text-xs hover:bg-[#3a3a3a] cursor-pointer"
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguageDropdown(false);
                  }}
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}

// Rekan Logo Component
function RekanLogo() {
  return (
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M47.9999 85C47.9999 85 15 70 15 50V20L47.9999 15L80.9998 20V50C80.9998 70 47.9999 85 47.9999 85Z" fill="#e05d15" />
      <path d="M48.0002 75C48.0002 75 25.0001 65 25.0001 50V25L48.0002 20L71.0002 25V50C71.0002 65 48.0002 75 48.0002 75Z" fill="#f27a1a" />
      <path d="M48.0003 65C48.0003 65 35.0002 55 35.0002 45V30L48.0003 25L61.0004 30V45C61.0004 55 48.0003 65 48.0003 65Z" fill="#f4a94b" />
    </svg>
  );
}