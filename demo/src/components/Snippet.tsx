import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight as light,
  oneDark as dark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import "src/components/snippet.css";
import { Badge, Button, Box } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClipboard } from "@fortawesome/free-solid-svg-icons";
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
      className={classNames("snippet-container ba br2 m-auto", className)}
      style={{ maxWidth: "100%", width: "min-content" }}
    >
      <Box
        layout={{ axis: "x", align: "center", justify: "between" }}
        className="w-100 bb ph2 pv1"
      >
        <p className="f6 fw5 ma0">{lang}</p>
        {copied ? (
          <Badge className="flex items-center" type="success">
            <FontAwesomeIcon icon={faCheck} className="mr1" /> Copied
          </Badge>
        ) : (
          <Button
            onClick={copyCode}
            style={{ padding: "3px 6px" }}
            className="f6 fw6"
            variant="secondary"
          >
            <FontAwesomeIcon icon={faClipboard} className="mr1" />
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
