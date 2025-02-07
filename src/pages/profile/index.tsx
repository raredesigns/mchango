import { Row, Col } from "antd";

export const Profile = () => {

    return (
      <div>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} xl={12}>
            Profile
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