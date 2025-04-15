'use client'

import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from 'codemirror';
import * as HyperMD from "hypermd";

// Core CodeMirror & HyperMD CSS
import "codemirror/lib/codemirror.css";
import "hypermd/mode/hypermd.css";
import "./hypermd-dark.scss";

// Load required modes
import "codemirror/mode/htmlmixed/htmlmixed" // for embedded HTML
import "codemirror/mode/stex/stex" // for Math TeX Formulas
import "codemirror/mode/yaml/yaml" // for Front Matters
import "codemirror/mode/gfm/gfm" // for Github Flavored Markdown
import "codemirror/mode/javascript/javascript" // for code blocks
import "codemirror/mode/python/python" // for code blocks
import "codemirror/mode/css/css" // for code blocks

// Load HyperMD addons
import "hypermd/addon/hide-token"
import "hypermd/addon/cursor-debounce"
import "hypermd/addon/fold"
import "hypermd/addon/fold-math"
import "hypermd/addon/fold-code"
import "hypermd/addon/fold-emoji"
import "hypermd/addon/read-link"
import "hypermd/addon/click"
import "hypermd/addon/hover"
import "hypermd/addon/paste"
import "hypermd/addon/insert-file"
import "hypermd/addon/mode-loader"
import "hypermd/addon/table-align"

export function Editor() {
	const el = useRef<HTMLTextAreaElement>(null);
  	const [editor, setEditor] = useState<CodeMirror.Editor | null>(null);

	useEffect(() => {
		if (!el.current) return;

		const options = {
			mode: {
				name: "hypermd",
				hashtag: false,
			},
			lineNumbers: false,
			lineWrapping: true,
			theme: "hypermd-dark",
			gutters: [],
			extraKeys: {
				"Enter": "newlineAndIndentContinueMarkdownList",
				"Tab": "indentMore",
				"Shift-Tab": "indentLess",
				"Ctrl-B": function(cm: CodeMirror.Editor) { 
				  const selection = cm.getSelection();
				  cm.replaceSelection(`**${selection}**`);
				},
				"Ctrl-I": function(cm: CodeMirror.Editor) {
				  const selection = cm.getSelection();
				  cm.replaceSelection(`*${selection}*`);
				},
			},
			hmdFold: {
				header: true,
				quote: true,
				hr: true,
				image: true,
				link: true,
				math: true,
				html: true,
				code: true,
				emoji: true
			}
		};

		const newEditor = HyperMD.fromTextArea(el.current, options);
		newEditor.setSize("100%", "100%");

		// // Enable HyperMD addons
		// HyperMD.HideToken(newEditor);
		// HyperMD.CursorDebounce(newEditor);
		// HyperMD.Fold(newEditor);
		// HyperMD.FoldMath(newEditor);
		// HyperMD.FoldCode(newEditor);
		// HyperMD.FoldEmoji(newEditor);
		// HyperMD.ReadLink(newEditor);
		// HyperMD.Click(newEditor);
		// HyperMD.Hover(newEditor);
		// HyperMD.Paste(newEditor);
		// HyperMD.InsertFile(newEditor);
		// HyperMD.ModeLoader(newEditor);
		// HyperMD.TableAlign(newEditor);
	
		// // Set initial content
		// newEditor.setValue(sampleText);


		setEditor(newEditor);

		return () => {
			if (newEditor) {
				newEditor.toTextArea();
			}
		};
	}, []);


	return (
		<div className='flex flex-col w-full h-full p-2'>
			<div>Editor</div>
			<div className='flex flex-col w-full h-full'>
				<div className='border-gray-500 rounded-lg w-full h-full overflow-hidden p-4 bg-[#1a1a1a]'>
					<textarea name="" id="" ref={el}></textarea>
				</div>
			</div>
		</div>
	)
}
