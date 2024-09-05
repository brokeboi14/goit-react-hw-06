import 'modern-normalize';
import App from './App';
import "./index.css";
import { StrictMode } from "react";
import { Provider } from 'react-redux';
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </StrictMode>
);