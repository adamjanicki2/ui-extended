import { Link } from "@adamjanicki/ui";
import { importCss } from "src/codeSnippets";
import Header from "src/components/Heading";
import Para from "src/components/Para";
import Snippet from "src/components/Snippet";
import Components from "src/sections/Components";
import Logo from "src/images/logo.svg?react";

const Main = () => (
  <div className="main-container">
    <h1 className="f1 tc">
      Welcome to my UI library.
      <br />
      <em>Redux</em>
    </h1>
    <p className="f3 fw5 tc subtitle">
      This is a collection of complex building block components that I use in my
      apps.
      <br />
      Checkout the docs and examples below to see what's available.
    </p>
    <Snippet lang="bash">npm install --save @adamjanicki/ui-extended</Snippet>
    <Header level={1}>Setup</Header>
    <Para>
      There's a little bit of setup required before you can start using the
      library. I hate it when libraries force their styles on you; oftentimes
      it's nearly impossible to override them. Because of this, you need to
      explicitly import my stylesheet into your app. This way you can order it
      so your own stylesheets take precedence over mine.{" "}
      <em>
        Since this package depends on my{" "}
        <Link to="/ui" external>
          base UI package
        </Link>
        , you'll have to import 2 stylesheets.
      </em>{" "}
      See below for an example.
    </Para>
    <Snippet>{importCss}</Snippet>
    <Components />

    <Para>
      And that's it! I hope you find this little tiny library useful. If you
      want to play around with any of these components, you can head over to my{" "}
      <Link to="/react-playground" external>
        React Playground
      </Link>{" "}
      to see them in action and play around.
      <br />
      <br />
      Thanks,
      <br />
      Adam
    </Para>
    <Logo style={{ color: "#0070ff", height: 48 }} />
  </div>
);

export default Main;
