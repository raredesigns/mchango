import { SearchOutlined } from "@ant-design/icons";
import {
  EditButton,
  DeleteButton,
  useEditableTable,
  SaveButton,
  TextField,
  FilterDropdown,
  Create,
  useForm,
} from "@refinedev/antd";
import {
  List,
  Table,
  Space,
  Form,
  Button,
  Input,
  InputNumber,
  Card,
  Dropdown,
  MenuProps,
  Flex,
  Modal,
  Row,
  Col,
  Select,
  Divider,
  DatePicker,
} from "antd";
import { DeleteIcon, DotsIcon, EditIcon } from "./icons";
import { currencyNumber } from "../utility/currency-numbers";
import { Text } from "./text";
import { formatMobile } from "../utility/format-mobile";
import { useState } from "react";
import { countryCodes } from "../constants";
import { useCreate, useSelect } from "@refinedev/core";
import { toProperCase } from "../utility/propercase";

interface PlotsEditableTableProps {
  initialFilterValue: string;
}

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a rel="noopener noreferrer" href="/sms">
        Ongeza Mkeka
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a rel="noopener noreferrer" href="/profile">
        Share Mkeka
      </a>
    ),
  },
];

const PlotsEditableTable = ({
  children,
}: React.PropsWithChildren<PlotsEditableTableProps>) => {
  const [openAhadi, setOpenAhadi] = useState(false);
  const [openMchango, setOpenMchango] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showAhadiModal = () => {
    setOpenAhadi(true);
  };

  const showMchangoModal = () => {
    setOpenMchango(true);
  };

  const { form: ahadiForm, formProps: ahadiFormProps } = useForm({
    action: "create",
  });

  const { form: mchangoForm, formProps: mchangoFormProps } = useForm({
    action: "create",
  });

  const { mutate: addAhadi, isLoading: addAhadiLoading } = useCreate();
  const { mutate: addMchango, isLoading: addMchangoLoading } = useCreate();

  const { options: pledgers } = useSelect<{
    firstName?: string;
    lastName: string;
    mobile: string;
  }>({
    resource: "pledgers",
    optionLabel: (item) => `${item.firstName} ${item.lastName}`,
    optionValue: "mobile",
  });

  const handleAhadiSubmit = async (values: any) => {
    addAhadi({
      resource: "pledgers",
      values: {
        firstName: toProperCase(values.firstName),
        lastName: toProperCase(values.lastName),
        countryCode: values.countryCode,
        mobile: values.mobile,
        pledge: values.pledge,
      },
      successNotification: (data, values, resource) => {
        return {
          message: "Pledger Added",
          description: "Successful",
          type: "success",
        };
      },
    });

    setConfirmLoading(true);
    setTimeout(() => {
      setOpenAhadi(false);
      ahadiForm.resetFields();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleMchangoSubmit = async (values: any) => {
    addMchango({
      resource: "collections",
      values: {
        date: values.date,
        mobile: values.mobile,
        amount: values.amount,
      },
      successNotification: (data, values, resource) => {
         console.log(data);
        return {
          message: "Mchango Added",
          description: "Successful",
          type: "success",
        };
      },
    });

   

    setConfirmLoading(true);
    setTimeout(() => {
      setOpenMchango(false);
      mchangoForm.resetFields();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleAhadiCancel = () => {
    setOpenAhadi(false);
    ahadiForm.resetFields();
  };

  const handleMchangoCancel = () => {
    setOpenMchango(false);
    mchangoForm.resetFields();
  };

  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
    filters,
  } = useEditableTable({
    resource: "pledgers",
    syncWithLocation: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSearch: (value: any) => {
      return [
        {
          field: "firstName",
          operator: "contains",
          value: value,
        },
      ];
    },
    sorters: {
      initial: [
        {
          field: "firstName",
          order: "asc",
        },
      ],
    },
    pagination: {
      pageSize: 10,
    },
    meta: {
      select: `id,
                firstName,
                lastName,
                mobile,
                pledge`,
    },
  });

  return (
    <>
      <Card>
        <List>
          <Form {...formProps}>
            <Flex justify="space-between">
              <Text size="lg">Mkeka Wangu</Text>
              <Space direction="horizontal">
                <Button variant="outlined" onClick={showAhadiModal}>
                  Rekodi Ahadi
                </Button>
                <Button variant="outlined" onClick={showMchangoModal}>
                  Rekodi Mchango
                </Button>
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <Button icon={<DotsIcon />} />
                </Dropdown>
              </Space>
            </Flex>

            <Table
              {...tableProps}
              style={{ marginTop: "2rem" }}
              rowKey="id"
              size="small"
              bordered
              pagination={{
                ...tableProps.pagination,
              }}
              onRow={(record) => ({
                // eslint-disable-next-line
                onClick: (event: any) => {
                  if (event.target.nodeName === "TD") {
                    setEditId?.(record.id);
                  }
                },
              })}
            >
              <Table.Column
                dataIndex="firstName"
                title="First Name"
                //   defaultFilteredValue={getDefaultFilter("plotRef", filters)}
                filterIcon={<SearchOutlined />}
                filterDropdown={(props) => (
                  <FilterDropdown {...props}>
                    <Input style={{ width: 150 }} />
                  </FilterDropdown>
                )}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={(value, record) => {
                  if (isEditing(record.id)) {
                    return (
                      <Form.Item name="firstName" style={{ margin: 0 }}>
                        <Input />
                      </Form.Item>
                    );
                  }
                  return <TextField value={value} />;
                }}
              />
              <Table.Column
                dataIndex="lastName"
                title="Surname"
                render={(value, record) => {
                  if (isEditing(record.id)) {
                    return (
                      <Form.Item name="lastName" style={{ margin: 0 }}>
                        <Input />
                      </Form.Item>
                    );
                  }
                  return <TextField value={value} />;
                }}
              />
              <Table.Column
                dataIndex="mobile"
                title="Mobile"
                render={(value, record) => {
                  if (isEditing(record.id)) {
                    return (
                      <Form.Item name="mobile" style={{ margin: 0 }}>
                        <InputNumber />
                      </Form.Item>
                    );
                  }
                  return <TextField value={formatMobile(value)} />;
                }}
              />
              <Table.Column
                dataIndex="pledge"
                title="Pledge"
                //   defaultFilteredValue={getDefaultFilter(
                //     "surveyedPlotSize",
                //     filters
                //   )}
                render={(value, record) => {
                  if (isEditing(record.id)) {
                    return (
                      <Form.Item name="pledge" style={{ margin: 0 }}>
                        <InputNumber />
                      </Form.Item>
                    );
                  }
                  return <TextField value={currencyNumber(value)} />;
                }}
              />
              <Table.Column
                title=""
                dataIndex="actions"
                align="right"
                render={(_, record) => {
                  if (isEditing(record.id)) {
                    return (
                      <Space>
                        <SaveButton
                          {...saveButtonProps}
                          hideText
                          size="small"
                        />
                        <Button {...cancelButtonProps} size="small">
                          Cancel
                        </Button>
                      </Space>
                    );
                  }
                  return (
                    <Space.Compact>
                      <EditButton
                        {...editButtonProps(record.id)}
                        hideText
                        icon={<EditIcon />}
                        size="small"
                      />
                      <DeleteButton
                        recordItemId={record.id}
                        resource="plots"
                        confirmTitle="Are you sure to delete this pledge?"
                        confirmOkText="Yes, I'm Sure"
                        confirmCancelText="No, Cancel"
                        hideText
                        icon={<DeleteIcon />}
                        size="small"
                      />
                    </Space.Compact>
                  );
                }}
              />
            </Table>
          </Form>
        </List>
        {children}{" "}
      </Card>

      <Modal
        title="Ahadi Mpya"
        open={openAhadi}
        footer={false}
        onCancel={handleAhadiCancel}
      >
        <Form
          {...ahadiFormProps}
          layout="vertical"
          onFinish={handleAhadiSubmit}
          form={ahadiForm}
        >
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="Jina la Kwanza"
                rules={[{ required: true, message: "Tafadhali weka jina" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Jina la Ukoo"
                rules={[
                  { required: false, message: "Tafadhali weka jina la ukoo" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="countryCode"
                label="Nchi"
                rules={[{ required: true, message: "Chagua nchi" }]}
              >
                <Select
                  placeholder="Country Code"
                  options={countryCodes}
                  optionRender={(option) => (
                    <Space>
                      {option.data.flag}
                      {option.data.country}
                      <span style={{ fontSize: 11 }}>{option.data.value}</span>
                    </Space>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mobile"
                label="Namba ya Simu"
                rules={[{ required: true, message: "Namba ya Simu" }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="pledge"
                label="Kiasi Cha Ahadi"
                rules={[{ required: true, message: "Tafadhali weka Ahadi" }]}
              >
                <InputNumber
                  addonBefore="Tshs."
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                  }
                  style={{ width: "152%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Space direction="horizontal" style={{ marginTop: 8 }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={addAhadiLoading}
              >
                Save
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="Mchango Mpya"
        open={openMchango}
        footer={false}
        onCancel={handleMchangoCancel}
      >
        <Form
          {...mchangoFormProps}
          layout="vertical"
          onFinish={handleMchangoSubmit}
          form={mchangoForm}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Tarehe"
                rules={[{ required: true, message: "Tafadhali weka jina" }]}
              >
                <DatePicker format={"MMM DD, YYYY"} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mobile"
                label="Mtoa Ahadi"
                rules={[{ required: true, message: "Chagua Mtoa Ahadi" }]}
              >
                <Select
                  options={pledgers}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="amount"
                label="Kiasi Cha Ahadi"
                rules={[{ required: true, message: "Tafadhali weka Ahadi" }]}
              >
                <InputNumber
                  addonBefore="Tshs."
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                  }
                  style={{ width: "152%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Space direction="horizontal" style={{ marginTop: 8 }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={addMchangoLoading}
              >
                Save
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default PlotsEditableTable;
