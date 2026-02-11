import React from 'react';

export type CanvasMode = 'auto' | 'mobile' | 'tablet' | 'desktop' | 'custom';

export interface ThemePreset {
  id: string;
  name: string;
  css: string;
}

export interface ThemeConfig {
  customCss: string;
}

export interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export interface PreviewProps {
  segments: string[];
  className?: string;
  segmentRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  canvasMode: CanvasMode;
  setCanvasMode: (mode: CanvasMode) => void;
  customWidth: number;
  setCustomWidth: (width: number) => void;
  themeConfig: ThemeConfig;
}

export interface ToolbarProps {
  onExport: () => void;
  isExporting: boolean;
  segmentCount: number;
  onOpenSettings: () => void;
}

export interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeConfig: ThemeConfig;
  setThemeConfig: (config: ThemeConfig) => void;
}
