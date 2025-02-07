import { Card, Col, Row } from "antd";
import { Text } from "../text";

type Props = {
  title: string;
  amount: string;
  description: string;
};

const DataCard = ({ title, amount, description }: Props) => {
  return (
    <Card
      size="small"
      styles={{
        header: { padding: "8px 16px" },
        body: { padding: "0 0.5rem" },
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <Text size="sm" style={{ marginLeft: "0.5rem" }}>
            {title}
          </Text>
        </div>
      }
    >
      <Col style={{ width: "100%", paddingTop: "0.5rem" }}>
        <Text size="lg" style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
          {amount}
        </Text>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.7rem",
          }}
        >
          {description}
        </Row>
      </Col>
    </Card>
  );
};

export default DataCard;
