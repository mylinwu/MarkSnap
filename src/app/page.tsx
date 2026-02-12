'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { toPng } from 'html-to-image';
import Toolbar from '@/components/Toolbar';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import ThemeModal from '@/components/ThemeModal';
import { DEFAULT_MARKDOWN } from '@/lib/constants';
import { CanvasMode, ThemeConfig } from '@/lib/types';

const STORAGE_KEYS = {
  MARKDOWN: 'marksnap_content',
  CANVAS_MODE: 'marksnap_canvas_mode',
  CUSTOM_WIDTH: 'marksnap_custom_width',
  THEME_CONFIG: 'marksnap_theme_config'
};

const DEFAULT_THEME_CONFIG: ThemeConfig = {
  customCss: ''
};

export default function Home() {
  // Initialize state from local storage or defaults
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);
  const [canvasMode, setCanvasMode] = useState<CanvasMode>('auto');
  const [customWidth, setCustomWidth] = useState<number>(800);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [isExporting, setIsExporting] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate state from localStorage on mount
  useEffect(() => {
    const savedMarkdown = localStorage.getItem(STORAGE_KEYS.MARKDOWN);
    if (savedMarkdown !== null) setMarkdown(savedMarkdown);

    const savedMode = localStorage.getItem(STORAGE_KEYS.CANVAS_MODE) as CanvasMode;
    if (savedMode) setCanvasMode(savedMode);

    const savedWidth = localStorage.getItem(STORAGE_KEYS.CUSTOM_WIDTH);
    if (savedWidth) setCustomWidth(parseInt(savedWidth, 10));

    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME_CONFIG);
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        setThemeConfig({ customCss: parsed.customCss || '' });
      } catch {
        // ignore parse errors
      }
    }

    setIsHydrated(true);
  }, []);

  // Persist state changes to local storage
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEYS.MARKDOWN, markdown);
  }, [markdown, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEYS.CANVAS_MODE, canvasMode);
  }, [canvasMode, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEYS.CUSTOM_WIDTH, customWidth.toString());
  }, [customWidth, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEYS.THEME_CONFIG, JSON.stringify(themeConfig));
  }, [themeConfig, isHydrated]);

  // Store refs for each segment
  const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Split logic: Match lines with 3 to 20 "=" signs
  const segments = useMemo(() => {
    if (!markdown) return [];
    const splitRegex = /(?:^|\r?\n)={3,20}\s*(?:\r?\n|$)/g;
    return markdown
      .split(splitRegex)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }, [markdown]);

  const handleExport = useCallback(async () => {
    if (segmentRefs.current.length === 0) return;

    try {
      setIsExporting(true);
      const timestamp = Date.now();
      
      // Determine base filename from the FIRST segment only
      let baseFilename = `marksnap-${timestamp}`;
      if (segments.length > 0) {
        const firstSegment = segments[0];
        const h1Match = firstSegment.match(/^#\s+(.+)$/m);
        if (h1Match && h1Match[1]) {
           // Sanitize filename
           baseFilename = h1Match[1].replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 50);
        }
      }

      // Process each segment sequentially
      for (let i = 0; i < segments.length; i++) {
        const node = segmentRefs.current[i];
        if (!node) continue;

        const suffix = segments.length > 1 ? `-${i + 1}` : '';
        const filename = `${baseFilename}${suffix}.png`;

        // Generate Image
        // backgroundColor is null to let CSS control transparency/color (important for dark themes)
        const dataUrl = await toPng(node, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: null as unknown as string,
          style: { margin: '0' }
        });

        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();

        await new Promise(resolve => setTimeout(resolve, 300));
      }

    } catch (err) {
      console.error('Failed to export image', err);
      alert('Failed to generate one or more images. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [segments]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <Toolbar 
        onExport={handleExport} 
        isExporting={isExporting}
        segmentCount={segments.length}
        onOpenSettings={() => setIsThemeModalOpen(true)}
      />
      
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Editor Pane */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full border-r border-slate-200 z-10">
          <Editor 
            value={markdown} 
            onChange={setMarkdown} 
            className="h-full"
          />
        </div>

        {/* Preview Pane */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-slate-100 relative">
          <Preview 
            segments={segments}
            segmentRefs={segmentRefs}
            className="h-full"
            canvasMode={canvasMode}
            setCanvasMode={setCanvasMode}
            customWidth={customWidth}
            setCustomWidth={setCustomWidth}
            themeConfig={themeConfig}
          />
        </div>
      </main>

      <ThemeModal 
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        themeConfig={themeConfig}
        setThemeConfig={setThemeConfig}
      />
    </div>
  );
}
