import { Link, Select } from "@adamjanicki/ui";
import { useTheme, type Theme } from "src/hooks/useTheme";

const labels = {
  light: "☀️",
  dark: "🌙",
};

const Footer = () => {
  const { theme, setTheme } = useTheme();
  return (
    <footer className="pv5 flex flex-column bt b--moon-gray bw1 items-center justify-center w-100">
      <Select
        options={["light", "dark"]}
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        getOptionLabel={(option) => labels[option as Theme]}
      />
      <p className="fw5 f5">
        Est. 2024 Built from scratch by{" "}
        <Link
          target="_blank"
          rel="noreferrer"
          className="link"
          to="https://adamjanicki.xyz"
        >
          Adam
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
