import { Col, Row, Space } from "antd";
import DataCard from "../../components/card";
import { LiquidProgress } from "../../components/liquidChart";
import BudgetDashboard from "../../components/homeHero";
import PlotsEditableTable from "../../components/editableTable";

export const Home = () => {

  return (
    <div>
      <PlotsEditableTable initialFilterValue={""} />
      {/* <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={12}>
          <Space direction="horizontal">
            <Space direction="vertical">
              <DataCard
                title="Bajeti"
                description="Kiasi cha bajeti"
                amount="Tshs. 25,000"
              />
              <DataCard
                title="Ahadi"
                description="Jumla ya Ahadi"
                amount="Tshs. 25,000,000"
              />
            </Space>

          </Space>
        </Col>
        <Col xs={24} sm={24} xl={12}>
          <Space direction="horizontal">
            <Space direction="vertical">
              <DataCard
                title="Purngufu ya Bajeti"
                description="Kiasi kilichobakia kufikia bajeti"
                amount="Tshs. 125,000"
              />
              <DataCard
                title="Ahadi Zilizolipwa"
                description="Jumla ya Ahadi Zilizolipwa"
                amount="Tshs. 415,000"
              />
            </Space>

          </Space>
        </Col>
        <Col xs={24} sm={24} xl={12}></Col>
        <Col xs={24} sm={24} xl={12}></Col>
      </Row> */}
      <Row
        gutter={[32, 32]}
        style={{ display: "flex", marginTop: "18px" }}
      ></Row>
      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={24} style={{ height: "100%" }}></Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={12} style={{ height: "100%" }}></Col>
      </Row>
    </div>
  );
};
