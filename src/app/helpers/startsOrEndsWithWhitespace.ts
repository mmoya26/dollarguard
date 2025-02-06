export function startsOrEndsWithWhitespace(str: string) {
    return /^\s|\s$/.test(str);
}