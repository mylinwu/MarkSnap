import React from 'react';
import { Code2, Loader2, Image as ImageIcon, Layers, Settings } from 'lucide-react';
import { ToolbarProps } from '../types';

const Toolbar: React.FC<ToolbarProps> = ({ onExport, isExporting, segmentCount, onOpenSettings }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between z-20 sticky top-0">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">MarkSnap</h1>
          <p className="text-xs text-slate-500 font-medium">Editor & Image Generator</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {segmentCount > 1 && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200">
            <Layers className="w-3 h-3" />
            <span>{segmentCount} segments detected</span>
          </div>
        )}

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors"
          title="Theme Settings"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-medium">Theme</span>
        </button>

        <button
          onClick={onExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-md shadow-sm transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ImageIcon className="w-4 h-4" />
          )}
          <span>Export {segmentCount > 1 ? 'All' : 'Image'}</span>
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
