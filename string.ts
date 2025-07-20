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

}
