import { Rule } from "antd/es/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const requiredRule: Rule = {
  required: true,
  message: "Заполните поле",
};

export const nameRule: Rule = {
  required: true,
  min: 6,
  max: 50,
  message: "Имя должно содержать от 6 до 50 символов",
};

export const clientAgeRule: Rule = {
  required: true,
  min: 14,
  max: 60,
  transform: (value) => {
    return dayjs().diff(dayjs(value, "DD.MM.YYYY"), "year");
  },
  message: "Возраст от 14 до 65 лет",
};

export const phoneRule: Rule = {
  required: true,
  transform: (value) => {
    return value ? value.replace(/\s+/g, "") : value;
  },
  pattern: /^\+79\d{9}$/,
  message: "Введите корректный номер",
};
