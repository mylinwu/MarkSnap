import React from 'react';
import { X, Palette, Copy, ChevronRight } from 'lucide-react';
import { ThemeModalProps } from '../types';
import { THEME_PRESETS } from '../constants';

const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose, themeConfig, setThemeConfig }) => {
  if (!isOpen) return null;

  const handlePresetClick = (css: string) => {
    // Overwrite the custom CSS with the preset's CSS
    setThemeConfig({ ...themeConfig, customCss: css });
  };

  const handleCssChange = (customCss: string) => {
    setThemeConfig({ ...themeConfig, customCss });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-slate-900">
            <Palette className="w-5 h-5" />
            <h2 className="text-lg font-bold">Theme Settings</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          
          {/* Sidebar - Presets */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 overflow-y-auto">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Templates</h3>
            <div className="space-y-2">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetClick(preset.css)}
                  className="w-full text-left px-4 py-3 rounded-lg border bg-white border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex items-center justify-between group active:scale-[0.98]"
                >
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700">
                    {preset.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                </button>
              ))}
            </div>
            
            <div className="mt-6 text-xs text-slate-400 leading-relaxed px-1">
              Click a template to load its CSS into the editor. If the editor is empty, the default GitHub styling will be applied.
            </div>
          </div>

          {/* Main - CSS Editor */}
          <div className="flex-1 flex flex-col min-h-[300px]">
            <div className="px-6 py-3 border-b border-slate-100 bg-white flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom CSS</h3>
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <span>.markdown-body</span>
                <span className="text-slate-300">|</span>
                <span>Active</span>
              </div>
            </div>
            <textarea
              value={themeConfig.customCss}
              onChange={(e) => handleCssChange(e.target.value)}
              placeholder="/* No custom style loaded. Default GitHub Light style is active. */&#10;&#10;/* Click a template on the left to load styles, or write your own here. */"
              className="flex-1 w-full p-6 font-mono text-sm bg-slate-900 text-slate-200 focus:outline-none resize-none"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
