import { Row, Col } from "antd";

export const Messaging = () => {

    return (
      <div>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} xl={12}>
            SMS
          </Col>
        </Row>
        <Row gutter={[32, 32]} style={{ marginTop: "18px" }}>
          <Col xs={24} sm={24} xl={8} style={{ height: "100%" }}>
     
          </Col>
          <Col xs={24} sm={24} xl={8} style={{ height: "100%" }}>
  
          </Col>
          <Col xs={24} sm={24} xl={8} style={{ height: "100%" }}>
   
          </Col>
        </Row>
        <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
          <Col xs={24} sm={24} xl={24} style={{ height: "100%" }}>
  
          </Col>
        </Row>
        <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
          <Col xs={24} sm={24} xl={12} style={{ height: "100%" }}>
  
          </Col>
        </Row>
      </div>
    );
  };