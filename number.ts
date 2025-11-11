interface Number {
    //%helper=NUM_FIXED
    /**
     * Convert Number to Fixed-Point
     * @param digits Number of Fixed-Point digits to have in the string
     */
    toFixed(digits?:number):string;

    //%helper=NUM_VALUE
    /** 
     * Get the internal Value of the Number
    */
    toValue():number;
}

namespace Number {
    export const MAX_VALUE: number = 1.7976931348623157e+308;
    export const MIN_VALUE: number = 5e-324;
}

namespace helpers {
    export function NUM_FIXED(n:Number,digits?:number):string {
        return Math.roundWithPrecision(n as number,digits | 2).toString()
    }
    export function NUM_Value(n:Number) {
        return n as number
    }
}