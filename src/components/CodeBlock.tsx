import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        borderRadius: "16px",
        padding: "2rem",
        fontSize: "0.9rem",
        background: "#0f172a",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}