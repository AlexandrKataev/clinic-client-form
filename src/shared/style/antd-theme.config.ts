import { ThemeConfig } from "antd";

const colorBlack = "#27293b";
const colorBlue = "#00c9d1";
const colorRed = "#ff85b2";

export const antdThemeConfig: ThemeConfig = {
  token: {
    colorText: "#27293b",
    colorPrimary: colorBlue,
    colorPrimaryActive: colorBlue,
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
};
