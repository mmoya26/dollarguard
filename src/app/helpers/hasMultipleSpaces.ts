export function hasMultipleSpaces(str: string): boolean {
    return /\s{2,}/.test(str);
}