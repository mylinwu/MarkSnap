'use client';

import React from 'react';
import { EditorProps } from '@/lib/types';

const Editor: React.FC<EditorProps> = ({ value, onChange, className }) => {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="bg-slate-800 text-slate-400 px-4 py-2 text-xs font-semibold tracking-wider uppercase border-b border-slate-700 flex justify-between items-center">
        <span>Markdown Input</span>
        <span className="text-slate-500">{value.length} chars</span>
      </div>
      <textarea
        className="flex-1 w-full bg-slate-900 text-slate-100 p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your markdown here..."
        spellCheck={false}
      />
    </div>
  );
};

export default Editor;
