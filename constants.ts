import { ThemePreset } from './types';

export const DEFAULT_MARKDOWN = `# Part 1: Introduction

A powerful **Markdown to Image** converter with GitHub styling.

## Features

- 📝 **Live Preview**: Real-time rendering.
- ✂️ **Segmentation**: Use "===" to split content into multiple images.

====

# Part 2: Code & Lists

## Code Example

\`\`\`javascript
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greet('World'));
\`\`\`

> "Simplicity is the ultimate sophistication."

=======

# Part 3: Todo List

## Tasks

- [x] Build the editor
- [x] Implement export
- [ ] Take a coffee break

| Command | Description |
| :--- | :--- |
| \`Ctrl + S\` | Save (Coming soon) |
| \`Ctrl + E\` | Export Image |
`;

// Extract default GitHub CSS for fallback use
export const GITHUB_LIGHT_CSS = `/* GitHub Light (Default) */
.markdown-body {
  background-color: #ffffff;
  color: #24292f;
}`;

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'github-light',
    name: 'GitHub Light',
    css: GITHUB_LIGHT_CSS
  },
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    css: `/* GitHub Dark */
.markdown-body {
  background-color: #0d1117;
  color: #c9d1d9;
  border-color: #30363d;
}
.markdown-body h1, .markdown-body h2 {
  border-bottom-color: #21262d;
  color: #e6edf3;
}
.markdown-body a { color: #58a6ff; }
.markdown-body pre { background-color: #161b22; }
.markdown-body code { 
  background-color: rgba(110,118,129,0.4); 
  color: #c9d1d9;
}
.markdown-body blockquote {
  color: #8b949e;
  border-left-color: #30363d;
}
.markdown-body table tr {
  background-color: #0d1117;
  border-top-color: #21262d;
}
.markdown-body table tr:nth-child(2n) {
  background-color: #161b22;
}
.markdown-body table th, .markdown-body table td {
  border-color: #30363d;
}
.markdown-body .highlight pre, .markdown-body pre {
  background-color: #161b22;
}`
  },
  {
    id: 'dracula',
    name: 'Dracula',
    css: `/* Dracula Theme */
.markdown-body {
  background-color: #282a36;
  color: #f8f8f2;
  font-family: 'Fira Code', 'Inter', monospace;
}
.markdown-body h1, .markdown-body h2, .markdown-body h3 {
  color: #bd93f9;
  border-bottom-color: #44475a;
}
.markdown-body a { color: #8be9fd; }
.markdown-body strong { color: #ffb86c; }
.markdown-body em { color: #f1fa8c; }
.markdown-body blockquote {
  border-left-color: #bd93f9;
  color: #6272a4;
}
.markdown-body code {
  background-color: #44475a;
  color: #ff79c6;
}
.markdown-body pre {
  background-color: #44475a;
  border: 1px solid #6272a4;
}
.markdown-body table th, .markdown-body table td {
  border-color: #6272a4;
}
.markdown-body table tr {
  background-color: #282a36;
  border-top-color: #44475a;
}
.markdown-body table tr:nth-child(2n) {
  background-color: #44475a;
}`
  },
  {
    id: 'notion-light',
    name: 'Notion Style',
    css: `/* Notion-like Light Theme */
.markdown-body {
  background-color: #ffffff;
  color: #37352f;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
}
.markdown-body h1, .markdown-body h2, .markdown-body h3 {
  font-weight: 600;
  border-bottom: none;
  margin-top: 1.4em;
}
.markdown-body blockquote {
  border-left: 3px solid #37352f;
  padding-left: 14px;
  color: inherit;
  opacity: 0.8;
}
.markdown-body code {
  color: #eb5757;
  background-color: rgba(135,131,120,0.15);
  border-radius: 3px;
  padding: 0.2em 0.4em;
}
.markdown-body pre {
  background-color: #f7f6f3;
  border-radius: 3px;
  color: #37352f;
}
.markdown-body a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: rgba(55, 53, 47, 0.4);
}`
  },
  {
    id: 'solarized-light',
    name: 'Solarized Light',
    css: `/* Solarized Light */
.markdown-body {
  background-color: #fdf6e3;
  color: #657b83;
}
.markdown-body h1, .markdown-body h2, .markdown-body h3 {
  color: #b58900;
  border-bottom-color: #93a1a1;
}
.markdown-body a { color: #268bd2; }
.markdown-body pre {
  background-color: #eee8d5;
  border: 1px solid #93a1a1;
}
.markdown-body code {
  background-color: #eee8d5;
  color: #d33682;
}
.markdown-body blockquote {
  border-left-color: #b58900;
  color: #93a1a1;
}`
  },
  {
    id: 'elegant',
    name: 'Elegant Serif',
    css: `/* Elegant Serif */
.markdown-body {
  font-family: "Georgia", "Times New Roman", serif;
  background-color: #fbfbfb;
  color: #111;
  line-height: 1.8;
}
.markdown-body h1, .markdown-body h2, .markdown-body h3 {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  border-bottom: 2px solid #333;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.markdown-body pre {
  background-color: #f0f0f0;
  border-left: 4px solid #333;
}
.markdown-body code {
  background-color: #f0f0f0;
  font-family: "Courier New", Courier, monospace;
}
.markdown-body blockquote {
  border-left-color: #333;
  color: #555;
  font-style: italic;
}`
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    css: `/* Cyberpunk Neon */
.markdown-body {
  background-color: #0b0b19;
  color: #00ff9f;
  font-family: 'JetBrains Mono', monospace;
  text-shadow: 0 0 2px rgba(0,255,159,0.3);
}
.markdown-body h1, .markdown-body h2 {
  color: #ff00ff;
  border-bottom: 2px solid #00ff9f;
  text-transform: uppercase;
  text-shadow: 0 0 5px #ff00ff;
}
.markdown-body a { color: #ffee00; text-decoration: none; border-bottom: 1px dashed #ffee00; }
.markdown-body blockquote {
  border-left: 4px solid #ff00ff;
  background: rgba(255,0,255,0.1);
  color: #fff;
}
.markdown-body code {
  background-color: #1a1a2e;
  color: #ffee00;
  border: 1px solid #ffee00;
}
.markdown-body pre {
  background-color: #050510;
  border: 1px solid #00ff9f;
  box-shadow: 0 0 10px rgba(0,255,159,0.2);
}`
  }
];
