export const getBudgetAmountForCurrentEvent = (data: any) => {
    // Create an object where the event ID is the key for faster access
    const eventLookup = Object.fromEntries(data.events.map((event: { id: any; }) => [event.id, event]));

    // Return the budgetAmount for the currentEvent if it exists
    return eventLookup[data.currentEvent]?.budgetAmount || null;
}