import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import App from "./App";
import "./styles.css";

const theme = createTheme({
  primaryColor: "cyan",
  fontFamily: "'IBM Plex Sans', sans-serif",
  headings: {
    fontFamily: "'Space Grotesk', sans-serif",
  },
  colors: {
    night: [
      "#eef7ff",
      "#d5e3ef",
      "#adbdcb",
      "#8699a8",
      "#647784",
      "#51636f",
      "#41505b",
      "#253039",
      "#141f28",
      "#09121a",
    ],
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
