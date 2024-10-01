export const getCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOffset);
    const result = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        result.push(day.toISOString().split('T')[0])
    }
    return result
}