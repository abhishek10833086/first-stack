import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MUIThemeContextProvider } from "@abhishekzambare/mui";
import MainContextProvider from "./MainContextProvider.tsx";
import MainServicesProvider from "./MainServices.tsx";

createRoot(document.getElementById("root")!).render(
  <MUIThemeContextProvider>
    <MainContextProvider>
      <MainServicesProvider>
        <App />
      </MainServicesProvider>
    </MainContextProvider>
  </MUIThemeContextProvider>,
);
