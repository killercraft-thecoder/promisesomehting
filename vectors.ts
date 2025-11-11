namespace helpers {
    export function ARR_SUM(array: any[]): number {
        let sum = 0
        array.forEach((a) => sum += a as number)
        return sum
    }
    export function ARR_inc(array:any[],element:any):boolean {return array.indexOf(element) != -1}
}

interface Array<T> {
    //%helper=ARR_SUM
    /** 
     * Return the sum of values in the array , this Only works for number arrays/convertable to number arrays
    */
    sum(): number;
    /**
     * Returns if the Array has this element
     * @param element the Element to check if exists
     */
    includes(element:T):boolean;
}

const NInfinity = -Infinity
function isFinite(value:number) {
    return value != Infinity && !(value == NInfinity)
}