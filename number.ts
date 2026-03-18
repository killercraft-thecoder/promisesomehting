// number.ts — Extended Number utilities for MakeCode Arcade

interface Number {
    //%helper=NUM_FIXED
    /**
     * Convert Number to fixed‑point string.
     * @param digits Number of digits after the decimal.
     */
    toFixed(digits?: number): string;

    //%helper=NUM_VALUE
    /**
     * Returns the raw numeric value.
     */
    toValue(): number;

    //%helper=NUM_CLAMP
    /**
     * Clamp this number between min and max.
     */
    clamp(min: number, max: number): number;

    //%helper=NUM_ISINT
    /**
     * Returns true if this number is an integer.
     */
    isInteger(): boolean;

    //%helper=NUM_ISFINITE
    /**
     * Returns true if this number is finite.
     */
    isFinite(): boolean;

    //%helper=NUM_SIGN
    /**
     * Returns the sign of the number: -1, 0, or 1.
     */
    sign(): number;

    //%helper=NUM_MAP
    /**
     * Maps this number from one range to another.
     */
    mapRange(inMin: number, inMax: number, outMin: number, outMax: number): number;

    //%helper=NUM_PRECISION
    /**
     * Convert to string with given precision.
     */
    toPrecision(digits: number): string;

    //%helper=NUM_EXP
    /**
     * Convert to exponential notation.
     */
    toExponential(digits?: number): string;
}

namespace Number {
    export const MAX_VALUE: number = 1.7976931348623157e+308;
    export const MIN_VALUE: number = 5e-324;
}

namespace helpers {

    export function NUM_FIXED(n: number, digits?: number): string {
        return Math.roundWithPrecision(n, digits || 2).toString();
    }

    export function NUM_VALUE(n: number): number {
        return n as number;
    }

    export function NUM_CLAMP(n: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, n));
    }

    export function NUM_ISINT(n: number): boolean {
        return (n | 0) === n;
    }

    export function NUM_ISFINITE(n: number): boolean {
        return n !== Infinity && n !== -Infinity && !isNaN(n);
    }

    export function NUM_SIGN(n: number): number {
        return n > 0 ? 1 : n < 0 ? -1 : 0;
    }

    export function NUM_MAP(n: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        return (n - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    export function NUM_PRECISION(n: number, digits: number): string {
        return (n as number).toPrecision(digits);
    }

    export function NUM_EXP(n: number, digits?: number): string {
        return (n as number).toExponential(digits);
    }
}