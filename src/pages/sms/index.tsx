import {Card, Col, Row} from "antd";
import CountUp from "react-countup";
import {useGetIdentity, useList} from "@refinedev/core";
import {MkekaTable} from "../../components/table";

export const Messaging = () => {
    //Get user's Data
    const {data: profileData} = useList({
        resource: "profiles",
        meta: {
            select: `smsBalance, currentEvent`,
        },
    })

    const balance: number = profileData?.data?.[0]?.smsBalance ?? 0; // Default to 0 if undefined
    const currentEvent: string = profileData?.data?.[0]?.currentEvent ?? null; // Default to  if undefined
    const {data: identity} = useGetIdentity();
    const userId = (identity as { id: string }).id;

    const {data: events} = useList({
      resource: "events",
      meta: {
        select: `*`
      },
    })

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
          <MkekaTable balance={balance} userId={userId} events={events?.data[0]} currentEvent={currentEvent}/>
      </div>
    );
  };