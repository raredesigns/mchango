import { Row, Col, Image, Divider, Form, Input, InputNumber, Select, Space, theme } from "antd"
import { countryCodes } from "../../constants"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { Edit } from "@refinedev/antd"

type Props = {
   formProps: any,
   saveButtonProps: any
}

export const Welcome = ({formProps, saveButtonProps}: Props) => {

 return (
         <Row gutter={[32, 32]} style={{ marginTop: "32px"}}>
            <Col xs={24} sm={24} xl={16} style={{ height: "100%" }}>
               <DotLottieReact
                  src="https://lottie.host/c1bef571-8c0e-43e5-9afc-376eef6b5535/MmbtZYxEUu.lottie"
                  loop
                  autoplay
               /><Image src="https://cdn.dribbble.com/users/1418633/screenshots/5400267/hilady_dribbble_studiotale.gif"/>
            </Col>
            <Col xs={24} sm={24} xl={8} style={{ height: "100%"}}>
               <Edit 
                  saveButtonProps={saveButtonProps}
                  headerButtons={() => (<></>)}
                  contentProps={{
                     style: {
                       padding: "0px",
                       boxShadow: "none",
                     },
                   }}
                  title={false}
                  footerButtons={() => (<></>)}
               >
                  <Form
                     {...formProps}
                     layout="vertical"
                  >
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
                  </Form>
               </Edit>         
            </Col>
         </Row>
 )
}