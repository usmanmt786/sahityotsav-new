export function getInitials(input: string): string {
    const words = input.split(' ');
    if (words.length >= 2) {
        return words[0].charAt(0) + words[1].charAt(0);
    } else if (words.length === 1) {
        return words[0].charAt(0);
    }
    return '';
}