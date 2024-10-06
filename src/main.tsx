import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ru_RU from "antd/lib/locale/ru_RU";

import "./index.css";
import { App } from "@app/app";
import { store } from "@app/store";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

const colorBlack = "#27293b";
const colorBlue = "#00c9d1";
const colorRed = "#ff85b2";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      locale={ru_RU}
      theme={{
        token: {
          colorText: "#27293b",
        },
        components: {
          Button: {
            colorPrimary: "#0cacde",
            colorPrimaryActive: "#19b4e3",
            fontSizeLG: 15,
            colorPrimaryHover: "#19b4e3",
          },
          Input: {
            colorError: colorRed,
            colorErrorHover: colorRed,
            colorText: colorBlack,
            colorInfoText: "red",
            borderRadius: 10,
            activeBorderColor: colorBlue,
            hoverBorderColor: colorBlue,
            fontSize: 14,
          },
          Select: {
            activeBorderColor: colorBlue,
            hoverBorderColor: colorBlue,
            colorError: colorRed,
            borderRadius: 10,
            fontSize: 14,
          },
          Form: {
            colorError: colorRed,
            colorErrorHover: colorRed,
            labelFontSize: 13,
          },
          Radio: {
            colorError: colorRed,
            colorPrimary: colorBlue,
          },
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
