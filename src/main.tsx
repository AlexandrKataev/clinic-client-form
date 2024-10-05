import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ru_RU from "antd/lib/locale/ru_RU";

import "./index.css";
import { App } from "@app/app";
import { store } from "@app/store";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

const redColor = "#EF233C";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      locale={ru_RU}
      theme={{
        components: {
          Input: {
            colorPrimary: "yellow",
            colorError: redColor,
            colorBorder: "yellow",
            borderRadius: 10,
            fontSize: 12,
          },
          DatePicker: {
            borderRadius: 10,
            fontSize: 14,
          },
          Dropdown: {
            colorBgBase: "red",
            colorBgContainer: "red",
          },
          Select: {
            borderRadius: 10,
            fontSize: 14,
          },
          Form: { colorError: redColor, labelFontSize: 12 },
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
