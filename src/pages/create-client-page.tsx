import { useGetNameSuggestionsQuery } from "@shared/api/autocomplete.api";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  message,
  notification,
  Radio,
  Select,
} from "antd";
import { MaskedInput } from "antd-mask-input";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

import { debounce, throttle } from "lodash";
import { useGetClientGroupsQuery } from "@shared/api/client.api";
import { nameRule, requiredRule } from "@shared/lib/rules";

export const CreateClientPage = () => {
  const [createClientForm] = useForm();
  const [name, setName] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: nameSuggestions } = useGetNameSuggestionsQuery(name);
  const { data: clientGroups } = useGetClientGroupsQuery();

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
          message: `Клиент ${createClientForm.getFieldValue(
            "name"
          )} успешно создан`,
        });
        createClientForm.resetFields();
      }
    }, 1000);
  }, [isLoading]);

  return (
    <Form form={createClientForm} onFinish={createClient}>
      <Form.Item name="name" rules={[requiredRule, nameRule]}>
        <AutoComplete options={nameSuggestions}>
          <Input
            placeholder="Введите полное имя"
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </AutoComplete>
      </Form.Item>
      <Form.Item name="birthday" rules={[requiredRule]}>
        <DatePicker format="DD.MM.YYYY" placeholder="26.05.1993" />
      </Form.Item>
      <Form.Item name="phone" rules={[requiredRule]}>
        <MaskedInput
          mask={"+7 000 000-00-00"}
          placeholder="+7 965 621-12-32"
          maskOptions={{ padFractionalZeros: true }}
          onPaste={() => "123"}
        />
      </Form.Item>

      <Form.Item name="sex" rules={[requiredRule]}>
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

      <Form.Item name="groups">
        <Select
          mode="multiple"
          placeholder="Выберите группы клиентов"
          value={selectedGroups}
          onChange={setSelectedGroups}
          style={{ width: "100%" }}
          options={clientGroups?.map((group) => ({
            value: group.type,
            label: group.title,
          }))}
        />
      </Form.Item>
      <Button htmlType="submit" type="primary" loading={isLoading}>
        Сохранить клиента
      </Button>
    </Form>
  );
};
