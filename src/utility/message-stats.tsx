interface Recipient {
    cost: string;
    status: string;
}

interface Response {
    Message: string;
    Recipients: Recipient[];
}

export const messageStats = (response: Response) => {
    const costPerMessage = 35; // TZS per message
    let totalMessages = 0;
    let totalCost = 0;

    // Loop through recipients and calculate the total messages and cost
    for (const {cost, status} of response.Recipients) {
        if (status === "Success") {
            // Extract numeric value of the cost and calculate the number of messages
            const recipientCost = parseFloat(cost.replace('TZS ', '').trim());
            const recipientMessages = Math.ceil(recipientCost / costPerMessage); // Round up partial messages
            totalMessages += recipientMessages;
            totalCost += recipientCost; // Increment the total cost
        }
    }

    return {totalMessages, totalCost};
};