import { Rule } from "antd/es/form";

export const requiredRule: Rule = {
  required: true,
  message: "Обязательное поле",
};

export const nameRule: Rule = {
  min: 2,
  max: 20,
  message: "Имя должно содержать от 2 до 100 символов",
};
