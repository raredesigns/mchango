type DataEntry = {
    id: number;
    firstName: string;
    lastName: string;
    mobile: string;
    amount: number;
    paid: number;
    balance: number;
    countryCode: string;
    relatedEvent: string;
  }[];

export const mkekaTextMessage = (data: DataEntry) => {
    if (!data) {
        return "No data available."; // You can customize the message as needed
      }

    return data.map((entry, index) => {
      const fullName = `${entry.firstName} ${entry.lastName}`;
      const amount = entry.amount.toLocaleString(); // Format number with commas
      let emoji;
  
      if (entry.paid === 0) {
        emoji = "🅰️";  // No payment yet
      } else if (entry.balance === 0) {
        emoji = "✅";  // Fully paid
      } else {
        emoji = "☑️";  // Partial payment
      }
  
      return `${index + 1}. ${fullName} - ${amount} ${emoji}`;
    }).join("\n");
  }