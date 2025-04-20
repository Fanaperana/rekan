'use client'

import { Button } from "@/components/ui/button";
import { Workspace } from "@/components/Workspace";
import { Plus } from "lucide-react";
import Link from "next/link";
import * as React from "react";
// import { Editor } from "@/components/Editor";
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/Editor').then((mod) => mod.Editor), { 
  loading: () => <p>Loading...</p>,
  ssr: false
});


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full flex flex-row">
        <Workspace></Workspace>
        <Button variant={"outline"} size={"icon"} className="ml-2">
          <Plus size={12} />
        </Button>
        <Link href={"/home"} prefetch={true}>
          <Button variant={"outline"} size={"icon"} className="ml-2">
            <Plus size={12} />
          </Button>
        </Link>
      </div>
      <main className="w-full h-full">
        <Editor />
      </main>
    </div>
  );
}
