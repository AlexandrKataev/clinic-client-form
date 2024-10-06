import { useGetNameSuggestionsQuery } from "@shared/api/autocomplete.api";
import classes from "./create-client-page.module.css";
import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Image,
  Input,
  InputRef,
  Popover,
  Radio,
  Row,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useRef, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";

import { debounce } from "lodash";
import {
  useCreateClientMutation,
  useGetClientGroupsQuery,
} from "@shared/api/client.api";
import { clientAgeRule, nameRule, requiredRule } from "@shared/lib/rules";
import { useGetAllDoctorsQuery } from "@shared/api/doctor.api";

import { formatName } from "@shared/lib/format-name";

export const CreateClientPage = () => {
  const firstFieldRef = useRef<InputRef>(null);
  const [createClientForm] = useForm();
  const [name, setName] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const { data: nameSuggestions } = useGetNameSuggestionsQuery(name);
  const { data: clientGroups } = useGetClientGroupsQuery();
  const { data: doctors } = useGetAllDoctorsQuery();

  const [createClient, { isLoading }] = useCreateClientMutation();

  const handleNameChange = debounce((value: string) => {
    setName(value);
  }, 100);

  const normalizeName = (value: string) => {
    return formatName(value);
  };

  const normalizeDate = (value: string, prevValue: string) => {
    if (prevValue?.length > value?.length) {
      return value;
    }
    const number = value.replace(/[^0-9]/g, "");

    let result = "";
    for (let i = 0; i < number.length; i++) {
      if (i > 7) break;
      result += number[i];
      if (i === 1 || i === 3) {
        result += ".";
      }
    }
    return result;
  };

  const normalizePhone = (value: string, prevValue: string) => {
    if (prevValue?.length > value?.length) {
      return value;
    }
    const number = value
      .replace(/^\+7/, "")
      .replace(/^8/, "")
      .replace(/[^0-9]/g, "");

    let result = "";
    for (let i = 0; i < number.length; i++) {
      if (i > 9) break;
      result += number[i];
      if (i === 2 || i === 5 || i === 7) {
        result += " ";
      }
    }
    return result;
  };

  const handleFinish = async () => {
    createClient({
      birthday: createClientForm.getFieldValue("birthday"),
      doctorId: createClientForm.getFieldValue("doctor"),
      groups: createClientForm.getFieldValue("groups"),
      name: createClientForm.getFieldValue("name").trim(),
      phone:
        "+7" + createClientForm.getFieldValue("phone").trim().replace(/ /g, ""),
      sex: createClientForm.getFieldValue("sex"),
      disableSms: Boolean(createClientForm.getFieldValue("disableSms")),
    });
  };

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  return (
    <Form
      form={createClientForm}
      onFinish={handleFinish}
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
        normalize={normalizeName}
      >
        <AutoComplete options={nameSuggestions}>
          <Input
            ref={firstFieldRef}
            placeholder="Введите полное имя"
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </AutoComplete>
      </Form.Item>
      <Row gutter={40} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={7}>
          <Form.Item
            name="birthday"
            rules={[requiredRule, clientAgeRule]}
            layout="vertical"
            label="Дата рождения"
            normalize={normalizeDate}
          >
            <Input placeholder="26.05.1993" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6}>
          <Form.Item
            name="sex"
            rules={[requiredRule]}
            label="Пол"
            style={{ width: "150px" }}
          >
            <Radio.Group
              options={[
                { value: "male", label: "муж" },
                { value: "female", label: "жен" },
              ]}
            >
              <Radio>Муж</Radio>
              <Radio>Жен</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={11}>
          <Form.Item
            name="phone"
            rules={[requiredRule]}
            label="Номер телефона"
            normalize={normalizePhone}
            // style={{ width: "200px" }}
          >
            <Input placeholder="965 621 12 32" prefix={"+7"} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={15}>
        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
          <Form.Item name="doctor" label="Лечащий врач" rules={[requiredRule]}>
            <Select placeholder="Выберите врача" style={{ height: "50px" }}>
              {doctors?.map((doctor) => {
                return (
                  <Select.Option
                    key={doctor.id}
                    style={{ padding: "10px" }}
                    value={doctor.id}
                  >
                    <Flex gap={10}>
                      <Image
                        src={doctor.avatar}
                        alt={"Фотография врача"}
                        placeholder={true}
                        preview={false}
                        width={30}
                        style={{
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      />
                      <span>{doctor.name}</span>
                    </Flex>
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
          <Form.Item name="groups" label="Группы" rules={[requiredRule]}>
            <Select
              allowClear={true}
              showSearch={false}
              mode="multiple"
              placeholder="Выберите группы клиентов"
              value={selectedGroups}
              onChange={setSelectedGroups}
            >
              {clientGroups?.map((group) => {
                return (
                  <Select.Option key={group.type}>
                    <Flex gap={10}>
                      <Popover
                        content={group.description}
                        title={group.title}
                        zIndex={1050}
                      >
                        <InfoCircleOutlined style={{ color: "#52CEE8" }} />
                      </Popover>
                      <div>{group.title}</div>
                    </Flex>
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Flex justify="center" style={{ marginTop: "10px" }}>
        <Form.Item name="disableSms" valuePropName="checked">
          <Checkbox>Не отправлять СМС</Checkbox>
        </Form.Item>
      </Flex>

      <Flex justify="center">
        <Button
          htmlType="submit"
          type="primary"
          loading={isLoading}
          size="large"
          shape="round"
        >
          Сохранить клиента
        </Button>
      </Flex>
    </Form>
  );
};
