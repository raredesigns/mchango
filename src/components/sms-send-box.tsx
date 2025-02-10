import React, {useState} from 'react';
import {Button, Form, Input, Space} from 'antd';
import {SendIcon} from "./icons";
import {sendSMS} from "../utility/send-sms";
import {useNotification} from "@refinedev/core";
import {messageStats} from "../utility/message-stats";
import {supabaseClient} from "../utility";

const {TextArea} = Input

export const SMSBox = ({balance, userId}: { balance: number, userId: string }) => {
    const {open: smsNotification} = useNotification();
    const [form] = Form.useForm();
    const typedMessage = Form.useWatch('message-input', form);

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
    const messagePayload = {
        phoneNumbers: ["+255610459965", "+255712459962", "+255689454965"],
        message: "Hey there! Just wanted to check in and see how things are going with the project. Hope everything's moving along smoothly on your end. If you need any help or want to go over anything, feel free to reach out! Looking forward to catching up soon.\nHey there! Just wanted to check in and see how things are going with the project. Hope everything's moving along smoothly on your end. If you need any help or want to go over anything, feel free to reach out! Looking forward to catching up soon"
    }

    const handleSubmit = () => {
        sendSMS(messagePayload).then(async res => {
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
        })
    }

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
        >
            <Form.Item label="Message Preview">
                <TextArea rows={5} value={typedMessage}/>
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
                <Button type="primary" icon={<SendIcon/>} htmlType="submit">Send SMS</Button>
            </Form.Item>
        </Form>
    );
};