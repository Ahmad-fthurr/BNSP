import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>,
);

