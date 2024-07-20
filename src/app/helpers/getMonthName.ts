export function getMonthName(date: Date) {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
}