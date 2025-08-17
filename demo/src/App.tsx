import Main from "src/pages/Main";
import Nav from "src/components/Nav";
import Footer from "src/components/Footer";
import { useScrollToHash } from "@adamjanicki/ui";
import { useSetDocumentTheme } from "src/hooks";

export default function App() {
  useScrollToHash();
  useSetDocumentTheme();

  return (
    <>
      <div id="welcome" aria-hidden />
      <Nav />
      <Main />
      <Footer />
    </>
  );
}
