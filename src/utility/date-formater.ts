export const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export const daysUntil = (dateString: Date) => {
    const today = new Date(); // Get today's date
    const targetDate = new Date(dateString); // Convert the provided date string to a Date object
    
    // Calculate the difference in milliseconds
    const timeDifference = targetDate - today;
    
    // Convert the time difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // 1000ms * 3600s * 24h
    
    return daysDifference;
}