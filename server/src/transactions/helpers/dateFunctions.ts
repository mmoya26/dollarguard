function daysInMonth(m, y) {
    switch (m) {
        case 1:
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 8: case 3: case 5: case 10:
            return 30;
        default:
            return 31
    }
}

export function isValidDate(d, m, y) {
    if (d < 0 || m < 0 || y < 0) return false

    return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
}

export function isValidMonth(m: string): boolean {
    return Number(m) >= 1 && Number(m) <= 12
}