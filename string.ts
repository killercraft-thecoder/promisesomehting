// 🔧 Polyfills for missing String methods in MakeCode Arcade

// Extend the String interface
interface String {
    //%helper=STR_STARTSWITH
    startsWith(search: string): boolean;

    //%helper=STR_ENDSWITH
    endsWith(search: string): boolean;
    //%helper=STR_PADSTART
    padStart(targetLength: number, padChar?: string): string;

    //%helper=STR_PADEND
    padEnd(targetLength: number, padChar?: string): string;
    //%helper=STR_toTitleCase
    toTitleCase():string;
    //%helper=STR_count
    count(substring: string, ignoreCase?: boolean):number;

}

// Provide the actual logic behind the methods
namespace helpers {
    export function STR_STARTSWITH(str: string, search: string): boolean {
        return str.substr(0, search.length) == search;
    }

    export function STR_ENDSWITH(str: string, search: string): boolean {
        return str.substr(str.length - search.length) == search;
    }
    export function STR_PADSTART(str: string, targetLength: number, padChar?: string): string {
        if (!padChar || padChar.length === 0) padChar = " ";
        if (str.length >= targetLength) return str;

        let padding = "";
        while (padding.length < targetLength - str.length) {
            padding += padChar;
        }

        return padding.substr(0, targetLength - str.length) + str;
    }

    export function STR_PADEND(str: string, targetLength: number, padChar?: string): string {
        if (!padChar || padChar.length === 0) padChar = " ";
        if (str.length >= targetLength) return str;

        let padding = "";
        while (padding.length < targetLength - str.length) {
            padding += padChar;
        }

        return str + padding.substr(0, targetLength - str.length);
    }
    export function STR_toTitleCase(str: string): string {
        let words = str.split(" ");
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            if (word.length > 0) {
                words[i] = word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
            }
        }
        return words.join(" ");
    }

    export function STR_count(str: string, sub: string,ignoreCase?:boolean): number {
        if (!sub || sub.length === 0) return 0;

        let source = ignoreCase ? str.toLowerCase() : str;
        let target = ignoreCase ? sub.toLowerCase() : sub;

        let count = 0;
        let index = 0;

        while (index <= source.length - target.length) {
            if (source.substr(index, target.length) === target) {
                count++;
                index += target.length; // or index++ for overlapping matches
            } else {
                index++;
            }
        }

        return count;
    }
}
