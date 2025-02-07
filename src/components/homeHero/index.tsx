import React from "react";
import { Card, Statistic, Row, Col } from "antd";
import { Liquid } from "@ant-design/plots";

const BudgetDashboard: React.FC = () => {
  // Liquid chart config
  const budgetConfig = {
    percent: 0.52, // 52%
    outline: { border: 4, distance: 4 },
    wave: { length: 128 },
    color: "#5C0FC7",
  };

  const commitmentsConfig = {
    percent: 0.28, // 28%
    outline: { border: 4, distance: 4 },
    wave: { length: 128 },
    color: "#5C0FC7",
  };

  return (
    <div className="p-4">
      <Row gutter={[16, 16]} align="middle">
        {/* Left Side Cards */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Bajeti" value={25000000} prefix="Tshs." />
            <p>Kiasi cha bajeti</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Pungufu ya Bajeti"
              value={11986000}
              prefix="Tshs."
            />
            <p>Kiasi kilichobakia kufikia bajeti</p>
          </Card>
        </Col>

        {/* Budget Liquid Chart */}
        <Col xs={24} sm={12} md={6} className="text-center">
          <Liquid {...budgetConfig} />
          <p>Asilimia Kufikia Bajeti</p>
        </Col>

        {/* Right Side Cards */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Ahadi" value={45750000} prefix="Tshs." />
            <p>Jumla ya Ahadi Zilizotolewa</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Ahadi Zilizolipwa"
              value={13014000}
              prefix="Tshs."
            />
            <p>Jumla ya Ahadi Zilizolipwa</p>
          </Card>
        </Col>

        {/* Commitments Liquid Chart */}
        <Col xs={24} sm={12} md={6} className="text-center">
          <Liquid {...commitmentsConfig} />
          <p>Asilimia Makusanyo ya Ahadi</p>
        </Col>
      </Row>
    </div>
  );
};

export default BudgetDashboard;
