import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import "./i18n/index";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element with id "root" not found');
}
ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
