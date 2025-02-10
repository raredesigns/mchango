import {Button} from 'antd'
import {sendSMS} from '../utility/send-sms'
import {messageStats} from "../utility/message-stats";

const SendSMS = () => {

    const handleClick = async () => {
        const to = [...new Set(["+255756658023", "+255756658223"])];
        const message = "Hey there! Just wanted to check in and see how things are going with the project. Hope everything's moving along smoothly on your end. If you need any help or want to go over anything, feel free to reach out! Looking forward to catching up soon.";

        try {
            const result = await sendSMS({phoneNumbers: to, message});
            console.log(messageStats(result))
            console.log("SMS sent successfully:", result);
        } catch (error) {
            console.error("Error sending SMS:", error);
            // Optionally, show a user-friendly error message
            alert("Failed to send SMS. Please try again later.");
        }
    };

  return (
    <Button onClick={handleClick}>Send Message</Button>
  )
}

export default SendSMS

  