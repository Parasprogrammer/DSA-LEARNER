import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeViewer({ code, activeLine, language = "javascript" }) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Source Code</h2>
      <div className="flex-1 overflow-auto -mx-4 px-4 text-sm">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={true}
          wrapLines={true}
          lineProps={(lineNumber) => {
            const style = { display: "block", padding: "0 0.5em" };
            if (lineNumber === activeLine) {
              style.backgroundColor = "rgba(6, 182, 212, 0.15)";
              style.borderLeft = "3px solid #06b6d4";
            }
            return { style };
          }}
          customStyle={{
            background: 'transparent',
            margin: 0,
            padding: 0,
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
