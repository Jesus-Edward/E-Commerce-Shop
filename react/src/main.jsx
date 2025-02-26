import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-image-gallery/styles/css/image-gallery.css";
import App from "./App.jsx";
import { persistor, store } from "./redux/store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <div className="shadow-sm my-4">
                <ToastContainer position="top-right" />
                <App />
            </div>
        </PersistGate>
    </Provider>
);
