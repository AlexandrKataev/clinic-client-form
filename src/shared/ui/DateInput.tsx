import React from "react";
import { Input, InputProps } from "antd";

export const DateInput = (props: InputProps) => {
  const { onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /^\d*$/;
    if (onChange && reg.test(e.target.value)) {
      onChange(e);
    }
  };

  return <Input {...props} onChange={handleChange} />;
};
