// export const sendSMS = async (to: string, message: string) => {
//     const username = import.meta.env.VITE_AT_USERNAME; // Replace with your Africastalking username
//     const apiKey = import.meta.env.VITE_AT_API_KEY; // Replace with your Africastalking API Key
//     const shortCode = import.meta.env.VITE_AT_SENDER_ID; // Replace with your Africastalking shortcode or sender ID
//     console.log(apiKey)
//     const url = import.meta.env.VITE_AT_ENDPOINT;
    
//     // Prepare the data payload
//     const payload = new URLSearchParams();
//       payload.append('username', username);
//       payload.append('to', to);
//       payload.append('message', message);
//       payload.append('from', shortCode);
  
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           "Accept": "application/json",
//           "Content-Type" : "application/json",
//           "apiKey": `${apiKey}`
//         },
//         body: payload,
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         console.log('Message sent successfully:', data);
//       } else {
//         console.error('Error sending message:', data);
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//     }
//   };
const { VITE_AT_API_KEY: apiKey, VITE_AT_USERNAME: username,VITE_AT_SENDER_ID: senderId } = import.meta.env;

export const sendSMSs = async (to:string, message:string) => {
  try {
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "apiKey": apiKey,
    });

    const body = new URLSearchParams({
      username: "michango",
      senderId: "michango",
      to,
      message,
      enqueue: "1",
    }).toString(); 

    const response = await fetch("/api", {
      method: "POST",
      headers,
      body,
      redirect: "follow" 
    });

    const contentType = response.headers.get("content-type");
    const result = contentType?.includes("application/json") ? await response.json() : await response.text();

    console.log("SMS Response:", response);
    return result;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};

export const sendSMSing = async (to: string, message: string) => {
  const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    "apiKey": apiKey,
  });

  const urlencoded = new URLSearchParams({
    username: "sandbox",
    senderId: "michango",
    phoneNumbers: to,
    message: message,
    enqueue: "1"
  }) 

  const requestOptions = {
    headers: headers,
    method: "POST",
    body: urlencoded,
    redirect: "follow" 
  };

  fetch("/api", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

type Props = {
  phoneNumbers: string[], 
  message: string
}

export const sendSMS1 = async ({phoneNumbers, message}: Props) => {
  const payload = {
      username: username,
      senderId: senderId,
      message: message,
      phoneNumbers: phoneNumbers,
      enqueue: 1
  };
  
  const headers = {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "apiKey": apiKey
  };
  
  try {
      const response = await fetch("/send-sms", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error sending SMS:", error);
      throw error;
  }
}


export const sendSMS = async ({phoneNumbers, message}: Props) => {
  const phoneNumbersStr = Array.isArray(phoneNumbers) ? phoneNumbers.join(",") : phoneNumbers;

  const payload = new URLSearchParams({
      username,
      senderId,
      message,
      phoneNumbers: phoneNumbersStr
  });
  
  try {
      const response = await fetch("/send-sms", {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              "apiKey": apiKey,
          },
          body: payload.toString(),
      });
      
      const data = await response.json();
      return data.SMSMessageData;
  } catch (error) {
      console.error("Error sending SMS:", error);
      throw error;
  }
}