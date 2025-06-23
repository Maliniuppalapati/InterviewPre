import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LuCode, LuCheck, LuCopy } from "react-icons/lu";

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <LuCode size={16} className="text-gray-500" />
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {language || "Code"}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="text-gray-500 hover:text-gray-700 focus:outline-none relative group"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <LuCheck size={16} className="text-green-600" />
              <span className="absolute top-8 right-0 bg-black text-white text-xs rounded-md px-2 py-1 opacity-80 group-hover:opacity-100 transition">
                Copied!
              </span>
            </>
          ) : (
            <LuCopy size={16} />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          fontSize: "12.5px",
          margin: 0,
          padding: "1rem",
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const AIResponsePreview = ({ content }) => {
  if (typeof content === "object" && content.code && content.language) {
    return <CodeBlock code={content.code} language={content.language} />;
  }

  return (
    <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
      {content}
    </div>
  );
};

export default AIResponsePreview;
