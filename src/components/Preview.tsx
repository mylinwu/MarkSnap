'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Smartphone, Tablet, Monitor, Layout, Sliders } from 'lucide-react';
import { PreviewProps, CanvasMode } from '@/lib/types';
import { GITHUB_LIGHT_CSS } from '@/lib/constants';

const Preview: React.FC<PreviewProps> = ({ 
  segments, 
  className, 
  segmentRefs, 
  canvasMode, 
  setCanvasMode,
  customWidth,
  setCustomWidth,
  themeConfig
}) => {
  
  const getContainerStyle = () => {
    switch (canvasMode) {
      case 'mobile': return { width: '375px' };
      case 'tablet': return { width: '768px' };
      case 'desktop': return { width: '1024px' };
      case 'custom': return { width: `${Math.max(300, Math.min(customWidth, 2000))}px` }; // Clamp between 300 and 2000
      default: return { width: '100%', maxWidth: '56rem' }; // max-w-4xl
    }
  };

  // Construct the final CSS string to inject
  const activeThemeCss = useMemo(() => {
    // If customCss is present, use it. Otherwise fall back to GitHub Light default.
    const css = themeConfig.customCss.trim() ? themeConfig.customCss : GITHUB_LIGHT_CSS;
    return css;
  }, [themeConfig.customCss]);

  const ModeButton = ({ mode, icon: Icon, label }: { mode: CanvasMode, icon: React.ComponentType<{ className?: string }>, label: string }) => (
    <button
      onClick={() => setCanvasMode(mode)}
      className={`p-1.5 rounded-md transition-colors flex items-center gap-2 text-xs font-medium ${
        canvasMode === mode 
          ? 'bg-slate-200 text-slate-900 ring-1 ring-slate-300' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
      }`}
      title={label}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className={`flex flex-col h-full bg-slate-100 ${className}`}>
      {/* Inject Dynamic CSS */}
      <style dangerouslySetInnerHTML={{ __html: activeThemeCss }} />

      {/* Preview Toolbar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex flex-wrap gap-2 justify-between items-center z-10 min-h-[48px]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
            <ModeButton mode="auto" icon={Layout} label="Auto" />
            <ModeButton mode="mobile" icon={Smartphone} label="Mobile" />
            <ModeButton mode="tablet" icon={Tablet} label="Tablet" />
            <ModeButton mode="desktop" icon={Monitor} label="Desktop" />
            <ModeButton mode="custom" icon={Sliders} label="Custom" />
          </div>

          {canvasMode === 'custom' && (
            <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2 duration-200">
               <span className="text-xs text-slate-400 font-medium">Width:</span>
               <div className="relative">
                 <input
                   type="number"
                   value={customWidth}
                   onChange={(e) => setCustomWidth(parseInt(e.target.value) || 0)}
                   className="w-20 pl-2 pr-6 py-1 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
                   min="300"
                   max="2000"
                 />
                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">px</span>
               </div>
            </div>
          )}
        </div>
        
        <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase whitespace-nowrap">
          {segments.length} Slide{segments.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-100 space-y-8" id="preview-scroll-container">
        {segments.map((segment, index) => (
          <div key={index} className="flex flex-col gap-2 items-center">
             <div 
               className="w-full flex justify-between items-end px-1 transition-all duration-300"
               style={canvasMode === 'auto' ? { maxWidth: '56rem' } : { width: getContainerStyle().width }}
             >
                <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Segment {index + 1}
                </div>
             </div>

            {/* The capture target wrapper */}
            {/* removed hardcoded bg-white so theme can control it via .markdown-body */}
            <div 
                className="shadow-xl rounded-lg overflow-hidden ring-1 ring-slate-900/5 transition-all duration-300 ease-in-out"
                style={getContainerStyle()}
            >
                <div 
                  ref={(el) => { segmentRefs.current[index] = el; }}
                  className="markdown-body p-8 md:p-12 min-h-[300px]"
                  style={{ boxSizing: 'border-box' }}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {segment}
                  </ReactMarkdown>
                </div>
            </div>
          </div>
        ))}
        
        {segments.length === 0 && (
           <div className="text-center text-slate-400 mt-20">
             Start typing to see the preview...
           </div>
        )}

        <div className="h-20"></div> {/* Spacer for bottom scroll */}
      </div>
    </div>
  );
};

export default Preview;
