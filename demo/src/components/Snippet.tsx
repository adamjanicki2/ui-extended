import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight as light,
  oneDark as dark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import "src/components/snippet.css";
import { Badge, Button, Box, Icon } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
import { useTheme } from "src/hooks";

export type Props = {
  className?: string;
  children: string;
  lang?: string;
};

const Snippet = ({ className, children, lang = "tsx" }: Props) => {
  const { theme } = useTheme();
  children = children.trim();
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Box
      layout={{ marginX: "auto", maxWidth: "full", width: "min" }}
      className={classNames("snippet-container ba br2", className)}
    >
      <Box
        layout={{
          axis: "x",
          align: "center",
          justify: "between",
          width: "full",
          paddingX: "s",
          paddingY: "xs",
        }}
        className="bb"
      >
        <p className="f6 fw5 ma0">{lang}</p>
        {copied ? (
          <Badge
            layout={{ axis: "x", align: "center", gap: "xs" }}
            className="flex items-center"
            type="success"
          >
            <Icon icon="check" /> Copied
          </Badge>
        ) : (
          <Button
            layout={{ axis: "x", align: "center", gap: "xs" }}
            onClick={copyCode}
            size="small"
            variant="secondary"
            style={{ paddingTop: 3, paddingBottom: 3 }}
          >
            <Icon icon="clipboard" />
            Copy
          </Button>
        )}
      </Box>
      <pre
        className="flex w-100 pa2 ma0"
        style={{
          overflow: "scroll",
          maxHeight: "70vh",
        }}
      >
        <SyntaxHighlighter
          style={theme === "dark" ? dark : light}
          language={lang}
          customStyle={{
            background: "none",
            backgroundColor: "transparent",
            padding: 0,
            margin: 0,
          }}
          className="no-bg"
        >
          {children}
        </SyntaxHighlighter>
      </pre>
    </Box>
  );
};

export default Snippet;
