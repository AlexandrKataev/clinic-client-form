import { Input } from "antd";
import { InputProps } from "antd/lib";
import React from "react";

const formatPhone = (str: string) => {
  let res = str.replace(/\D/g, "");
	if (str[0] === "8") {
    res = "+7" + res;
  }
  if (str[0] === "+") {
    res = "+" + res;
  }
  return res;
};

export const PhoneInput = (props: InputProps) => {
  const { onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEvent = e;
    newEvent.target.value = formatPhone(newEvent.target.value);

    if (onChange) {
      onChange(newEvent);
    }
  };
  return (
    <Input
      placeholder="Введите телефон клиента"
      onChange={handleChange}
      value={props.value}
      prefix="+7"
    />
  );
};
