import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppointmentContextProvider from "./context/AppointmentContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "115565520222-2lpbe4gcms9a3l6jodhanarffafb722j.apps.googleusercontent.com"; // تأكد من تسجيله في Google Console

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <AppointmentContextProvider>
          <App />
        </AppointmentContextProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
