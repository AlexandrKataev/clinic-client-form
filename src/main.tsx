import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ru_RU from "antd/lib/locale/ru_RU";

import "./index.css";
import { App } from "@app/app";
import { store } from "@app/store";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider locale={ru_RU}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
