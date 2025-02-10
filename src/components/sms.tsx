import { Button } from 'antd'
import React from 'react'
import { sendSMS } from '../utility/send-sms'

const SendSMS = () => {

    const handleClick = () => {
        const to = ["+255756658023"]
        const message = "Glad you are here"
        sendSMS(to, message)
    }

  return (
    <Button onClick={handleClick}>Send Message</Button>
  )
}

export default SendSMS

  