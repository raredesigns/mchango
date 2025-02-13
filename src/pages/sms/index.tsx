import {Card, Col, Row} from "antd";
import CountUp from "react-countup";
import {useGetIdentity, useList} from "@refinedev/core";
import {MkekaTable} from "../../components/table";

export const Messaging = () => {
    //Get user's SMS Balance
    const {data: smsBalance} = useList({
        resource: "profiles",
        meta: {
            select: `smsBalance`,
        },
    })
    const balance: number = smsBalance?.data?.[0]?.smsBalance ?? 0; // Default to 0 if undefined
    const {data: identity} = useGetIdentity();
    const userId = (identity as { id: string }).id;

    return (
      <div>
        <Row gutter={[32, 32]}>
            <Col xs={24} sm={24} xl={6}>
                <Card style={{display: "flex"}}>
                  <span style={{fontWeight: "bold"}}>
                     <CountUp end={balance} delay={1} prefix="SMS Balance: " duration={2}/>
                  </span>
                </Card>
          </Col>
        </Row>
          <MkekaTable balance={balance} userId={userId}/>
      </div>
    );
  };