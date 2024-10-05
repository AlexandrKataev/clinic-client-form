import { Rule } from "antd/es/form";

export const requiredRule: Rule = {
  required: true,
  message: "Обязательное поле",
};

export const nameRule: Rule = {
  min: 6,
  max: 50,
  message: "Имя должно содержать от 6 до 50 символов",
};
