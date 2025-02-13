import React, {useState} from 'react';
import {Button, Form, Input, Modal, Space, Statistic, Typography} from 'antd';
import {SendIcon} from "./icons";
import {sendDummySMS} from "../utility/send-sms";
import {useNotification} from "@refinedev/core";
import {messageStats} from "../utility/message-stats";
import {supabaseClient} from "../utility";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {MessageIcon} from "../../public/message";
import {AlertOutlined} from "@ant-design/icons";
import {createMessagePayload} from "../utility/message-payload";

const {TextArea} = Input
const {Text} = Typography

export const SMSBox = ({balance, userId, stateCheck, selectedPledgers}: {
    balance: number,
    userId: string,
    stateCheck: boolean,
    selectedPledgers: any
}) => {
    const {open: smsNotification} = useNotification();
    const [form] = Form.useForm();
    const typedMessage = Form.useWatch('message-input', form);

    const [openModal, setOpenModal] = useState(false);
    const [confirmModalLoading, setConfirmModalLoading] = useState(false);
    const [messageCount, setMessageCount] = useState<number>(0)
    const [messageBalance, setMessageBalance] = useState<number>(0)

    const showModal = () => {
        setOpenModal(true);
        //FIX ME - Correct the payload issue
        sendDummySMS(messagePayload).then(async res => {
            const count = messageStats(res)
            const smsBalance = balance - count.totalMessages
            setMessageCount(count.totalMessages)
            setMessageBalance(smsBalance)
        })
    };

    const handleOk = () => {
        setConfirmModalLoading(true);

        setTimeout(async () => {
            sendDummySMS(messagePayload).then(async res => {
                const count = messageStats(res)
                const smsBalance = balance - count.totalMessages

                //Update database with new sms amounts
                await supabaseClient
                    .from('profiles')
                    .update({"smsBalance": smsBalance})
                    .eq('id', userId)
                    .select()

                smsNotification?.({
                    type: "success",
                    message: `Successfully sent ${count.totalMessages} SMS`,
                    undoableTimeout: 5,
                });

                setOpenModal(false);
                setConfirmModalLoading(false);
            })
        }, 2000);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    const [text, setText] = useState(""); // State for the text area content
    const [tags] = useState(['{firstName}', '{lastName}', '{ahadi}', '{deni}']); // List of placeholder tags

    // Function to handle text insertion
    const insertTag = (tag: string) => {
        const textarea = document.getElementById('message-input-area') as HTMLTextAreaElement;

        if (textarea) {
            const cursorStart = textarea.selectionStart; // Get the current cursor start position
            const cursorEnd = textarea.selectionEnd; // Get the current cursor end position

            // Insert the tag at the cursor position
            const updatedText =
                text.slice(0, cursorStart) + // Text before the cursor
                tag +                       // The inserted tag
                text.slice(cursorEnd);      // Text after the cursor

            setText(updatedText);

            // Update the position of the cursor after the inserted tag
            // setTimeout(() => {
            //   const newCursorPosition = cursorStart + tag.length;
            //   textarea.setSelectionRange(newCursorPosition, newCursorPosition);
            //   textarea.focus();
            // }, 0);
            // Set the cursor position after the inserted tag
            setTimeout(() => {
                textarea.setSelectionRange(cursorStart + tag.length, cursorStart + tag.length);
                textarea.focus();
                console.log(text)
            }, 0);

        }

    };

    const messagePayloads = {
        phoneNumbers: ["+255610459965", "+255712459962", "+255689454965"],
        message: "Hey there! Just wanted to check in and see how things are going with the project. Hope everything's moving along smoothly on your end. If you need any help or want to go over anything, feel free to reach out! Looking forward to catching up soon.\nHey there! Just wanted to check in and see how things are going with the project. Hope everything's moving along smoothly on your end. If you need any help or want to go over anything, feel free to reach out! Looking forward to catching up soon"
    }

    const messagePayload = createMessagePayload(selectedPledgers);
    console.log(messagePayload)

    return (
        <>
        <Form
            layout="vertical"
            form={form}
            onFinish={showModal}
        >
            <Form.Item label="Message Preview">
                <TextArea rows={5} value={typedMessage} readOnly/>
            </Form.Item>
            <Form.Item name="message-input">
                <TextArea
                    id="message-input-area"
                    rows={6}
                    placeholder="Write your message"
                    // value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Space wrap>
                    {tags.map((tag) => (
                        <Button key={tag} size="small" variant="dashed" onClick={() => insertTag(tag)}>
                            {tag}
                        </Button>
                    ))}
                </Space>
            </Form.Item>

            <Form.Item>
                <Button type="primary" icon={<SendIcon/>} htmlType="submit" disabled={stateCheck}>Send SMS</Button>
            </Form.Item>
        </Form>
            <Modal
                title=""
                open={openModal}
                onOk={handleOk}
                confirmLoading={confirmModalLoading}
                onCancel={handleCancel}
                okText="Confirm Send"
                okButtonProps={{disabled: messageCount > balance}}
                footer={[
                    <Button
                        key="link"
                        type="primary"
                        onClick={() => {
                            ""
                        }}
                        hidden={messageCount < balance}
                    >
                        Purchase More SMS
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={confirmModalLoading}
                        onClick={handleOk}
                        hidden={messageCount > balance}
                    >
                        Confirm Send
                    </Button>,
                ]}
            >
                <Statistic title={`You are about to send`} value={messageCount} prefix={<MessageIcon/>}
                           suffix={messageCount === 1 ? "Message" : " Messages"}/>
                <Text style={{fontSize: "small", color: "orangered", fontStyle: "italic"}}
                      hidden={messageCount < balance}><AlertOutlined style={{color: "orangered"}}/> Insufficient SMS
                    Balance to send more messages</Text>
                <DotLottieReact
                    src="https://lottie.host/c1bef571-8c0e-43e5-9afc-376eef6b5535/MmbtZYxEUu.lottie"
                    loop
                    autoplay
                />
            </Modal>
        </>
    );
};