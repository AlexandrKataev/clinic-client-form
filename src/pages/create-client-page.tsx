import { useGetNameSuggestionsQuery } from "@shared/api/autocomplete.api";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
} from "antd";
import { MaskedInput } from "antd-mask-input";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

import { debounce } from "lodash";
import { useGetClientGroupsQuery } from "@shared/api/client.api";

export const CreateClientPage = () => {
  const [createClientForm] = useForm();
  const [name, setName] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const { data: nameSuggestions } = useGetNameSuggestionsQuery(name);

  const { data: clientGroups } = useGetClientGroupsQuery();
  console.log(clientGroups);

  const handleNameChange = debounce((value: string) => {
    setName(value);
  }, 200);

  return (
    <Form form={createClientForm}>
      <Form.Item name="name">
        <AutoComplete options={nameSuggestions}>
          <Input
            placeholder="Введите полное имя"
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </AutoComplete>
      </Form.Item>
      <Form.Item name="birthday">
        {/* <MaskedInput mask={"00.00.0000"} placeholder="26.05.1993" /> */}
        <DatePicker format="DD.MM.YYYY" placeholder="26.05.1993" />
      </Form.Item>
      <Form.Item name="phone">
        <MaskedInput
          mask={"+7 000 000-00-00"}
          placeholder="+7 965 621-12-32"
          maskOptions={{ padFractionalZeros: true }}
        />
      </Form.Item>

      <Form.Item name="sex">
        <Radio.Group>
          <Radio>Муж</Radio>
          <Radio>Жен</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="group">
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
      <Button htmlType="submit">Сохранить клиента</Button>
    </Form>
  );
};
