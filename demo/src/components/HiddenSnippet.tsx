import { Animated, Button } from "@adamjanicki/ui";
import { useState } from "react";
import Snippet, { type Props } from "src/components/Snippet";

export default function HiddenSnippet(props: Props) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex w-100 justify-end">
        <Button
          className="mv2"
          onClick={() => setShow(!show)}
          variant="secondary"
          size="small"
        >
          {show ? "Hide" : "Show"} Code
        </Button>
      </div>
      <Animated
        animated={show}
        animateTo={{ style: { opacity: 1 } }}
        animateFrom={{ style: { opacity: 0 } }}
      >
        <Snippet {...props} />
      </Animated>
    </>
  );
}
