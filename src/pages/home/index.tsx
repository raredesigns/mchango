import { Col, Row, Skeleton, Space } from "antd";
import DataCard from "../../components/card";
import { LiquidProgress } from "../../components/liquidChart";
import PlotsEditableTable from "../../components/editableTable";
import { useList } from "@refinedev/core";
import { currencyNumber } from "../../utility/currency-numbers";

// Create a function to call the RPC
// const getSumOfPledges = async (relatedEventUuid = null) => {
//   const { data, error } = await supabaseClient.rpc("get_sum_of_pledges_by_event", { related_event_uuid: relatedEventUuid });

//   if (error) {
//     throw new Error(error.message);
//   }
//   return data;
// };

// Create a function to call the RPC
// const getSumOfCollections = async (relatedEventUuid = null) => {
//   const { data, error } = await supabaseClient
//     .rpc("get_sum_of_collections_by_event", { related_event_uuid: relatedEventUuid });

//   if (error) {
//     throw new Error(error.message);
//   }
//   return data;
// };


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
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={12}>
          <Space direction="horizontal">
            <Space direction="vertical">
              <DataCard
                title="Bajeti"
                description="Kiasi cha bajeti"
                amount="Tshs. 25,000"
              />
              <DataCard
                title="Purngufu ya Bajeti"
                description="Kiasi kilichobakia kufikia bajeti"
                amount="Tshs. 125,000"
              />              
            </Space>
            <LiquidProgress progress={0.23}/>
          </Space>
        </Col>
        <Col xs={24} sm={24} xl={12}>
          <Space direction="horizontal">
            <Space direction="vertical">
            <DataCard
                title="Ahadi"
                description="Jumla ya Ahadi"
                // amount={currencyNumber(totalPledges)}
                amount={pledgesLoading ? <Skeleton.Input active={pledgesLoading} size="default" /> : currencyNumber(totalPledges)}
              />
              <DataCard
                title="Ahadi Zilizolipwa"
                description="Jumla ya Ahadi Zilizolipwa"
                // amount={currencyNumber(totalCollections)}
                amount={collectionLoading ? <Skeleton.Input active={collectionLoading} size="default" /> : currencyNumber(totalCollections)}
              />
            </Space>
            <LiquidProgress progress={totalCollections/totalPledges}/>
          </Space>
        </Col>
        <Col xs={24} sm={24} xl={12}></Col>
        <Col xs={24} sm={24} xl={12}></Col>
      </Row>
      <PlotsEditableTable initialFilterValue={""} />      
      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={24} style={{ height: "100%" }}></Col>
      </Row>
    </div>
  );
};


