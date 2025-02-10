import {Col, Progress, Row, Space} from "antd";
import DataCard from "../../components/card";
import PlotsEditableTable from "../../components/editableTable";
import {useList} from "@refinedev/core";

export const Home = () => {  
  const { data: pledges, isLoading: pledgesLoading } = useList({
    resource: "pledges_summary",
    meta: {
      select: `totalamount`,
    },
  });

  const { data: collections, isLoading: collectionLoading } = useList({
    resource: "collections_summary",
    meta: {
      select: `totalamount`,
    },
  });

const totalPledges = pledges?.data?.reduce((sum, { totalamount = 0 }) => sum + totalamount, 0) as number
const totalCollections = collections?.data?.reduce((sum, { totalamount = 0 }) => sum + totalamount, 0) as number

  return (
    <div>
      <Row gutter={[32, 32]} style={{marginBottom: "2rem"}}>
        <Col xs={24} sm={24} xl={12}>
          <Space direction="horizontal" style={{display: "flex", justifyContent: "space-evenly"}}>
            <Space direction="vertical">
              <DataCard
                title="Bajeti"
                description="Kiasi cha bajeti"
                amount={490000}
              />
              <DataCard
                title="Purngufu ya Bajeti"
                description="Kiasi kilichobakia kufikia bajeti"
                amount={125000}
              />              
            </Space>
            <Progress type="circle" percent={Number((totalCollections / totalPledges * 100).toFixed(0))}
                      size={[240, 240]}/>
          </Space>
        </Col>
        <Col xs={24} sm={24} xl={12}>
          <Space direction="horizontal" style={{display: "flex", justifyContent: "space-evenly"}}>
            <Space direction="vertical">
              <DataCard
                  title="Ahadi"
                  description="Jumla ya Ahadi"
                  amount={totalPledges}
              />
              <DataCard
                  title="Ahadi Zilizolipwa"
                  description="Jumla ya Ahadi Zilizolipwa"
                  // amount={currencyNumber(totalCollections)}
                  amount={totalCollections}
              />
            </Space>
            <Progress type="circle" percent={Number((totalCollections / totalPledges * 100).toFixed(0))}
                      size={[240, 240]}/>
          </Space>
        </Col>
      </Row>
      <PlotsEditableTable initialFilterValue={""}/>
      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={24} style={{ height: "100%" }}></Col>
      </Row>
    </div>
  );
};


