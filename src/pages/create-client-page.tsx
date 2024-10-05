import { useGetNameSuggestionsQuery } from "@shared/api/autocomplete.api";
import classes from "./create-client-page.module.css";
import {
  AutoComplete,
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  notification,
  Radio,
  Select,
} from "antd";
import { MaskedInput } from "antd-mask-input";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

import { debounce } from "lodash";
import { useGetClientGroupsQuery } from "@shared/api/client.api";
import { nameRule, requiredRule } from "@shared/lib/rules";
import { useGetAllDoctorsQuery } from "@shared/api/doctor.api";

export const CreateClientPage = () => {
  const [createClientForm] = useForm();
  const [name, setName] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: nameSuggestions } = useGetNameSuggestionsQuery(name);
  const { data: clientGroups } = useGetClientGroupsQuery();
  const { data: doctors } = useGetAllDoctorsQuery();

  const handleNameChange = debounce((value: string) => {
    setName(value);
  }, 100);

  const createClient = async () => {
    setIsLoading(true);
    console.log(createClientForm.getFieldsValue());
  };

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        notification.success({
          duration: 3,
          placement: "bottom",
          message: `Клиент ${createClientForm.getFieldValue(
            "name"
          )} успешно создан`,
        });
        createClientForm.resetFields();
      }
    }, 1000);
  }, [isLoading]);

  return (
    <Form
      form={createClientForm}
      onFinish={createClient}
      className={classes.container}
      layout="vertical"
      scrollToFirstError={{ behavior: "smooth", block: "end" }}
    >
      <h1 className={classes.title}>Создание клиента</h1>
      <Form.Item
        name="name"
        rules={[requiredRule, nameRule]}
        label="ФИО клиента"
        layout="vertical"
      >
        <AutoComplete options={nameSuggestions}>
          <Input
            placeholder="Введите полное имя"
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name="birthday"
        rules={[requiredRule]}
        layout="vertical"
        label="Дата рождения"
      >
        <DatePicker format="DD.MM.YYYY" placeholder="26.05.1993" />
      </Form.Item>
      <Form.Item name="phone" rules={[requiredRule]} label="Номер телефона">
        <MaskedInput
          mask={"+7 000 000-00-00"}
          placeholder="+7 965 621-12-32"
          maskOptions={{ padFractionalZeros: true }}
          onPaste={() => "123"}
        />
      </Form.Item>

      <Form.Item name="sex" rules={[requiredRule]} label="Пол">
        <Radio.Group
          options={[
            { value: "female", label: "жен" },
            { value: "male", label: "муж" },
          ]}
        >
          <Radio>Муж</Radio>
          <Radio>Жен</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="groups" label="Группы">
        <Select
          mode="multiple"
          placeholder="Выберите группы клиента"
          value={selectedGroups}
          onChange={setSelectedGroups}
          style={{ width: "100%" }}
          options={clientGroups?.map((group) => ({
            value: group.type,
            label: group.title,
          }))}
        />
      </Form.Item>
      <Form.Item name="doctor" label="Лечащий врач">
        <Select
          placeholder="Лечащий врач"
          options={doctors?.map((doctor) => {
            return { value: doctor.name };
          })}
        />
      </Form.Item>
      <Flex justify="center">
        <Button htmlType="submit" type="primary" loading={isLoading}>
          Сохранить клиента
        </Button>
      </Flex>
    </Form>
  );
};
