"use client"

import { useState } from "react"
import axios from "axios"
import { useNotification } from "@refinedev/core"

const AFRICAS_TALKING_API_URL = "https://api.africastalking.com/version1/messaging"
const USERNAME = import.meta.env.VITE_AT_USERNAME
const API_KEY = import.meta.env.VITE_AT_API_KEY
const SENDERID = import.meta.env.VITE_AT_SENDER_ID

export const useSendSMS = () => {
  const [loading, setLoading] = useState(false)
  const { open } = useNotification()

  const sendSMS = async (to: string, message: string) => {
    setLoading(true)
    try {
      const response = await axios.post(
        AFRICAS_TALKING_API_URL,
        {
            username: USERNAME,
            phoneNumbers: to,
            message,
            senderId
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            apiKey: API_KEY,
          },
        },
      )

      open({
        type: "success",
        message: "SMS sent successfully",
      })

      return response.data
    } catch (error) {
      console.error("Error sending SMS:", error)
      open({
        type: "error",
        message: "Failed to send SMS",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { sendSMS, loading }
}

