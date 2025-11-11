type unknown = any

class Buf {
    constructor(size: number) {
        return Buffer.create(size)
    }
}

class Array<T> {
    constructor(size: number, def?: T) {
        let arr: Array<T> = []
        const add = def || null
        for (let i = 0; i < size; i++) {
            arr[i] = add
        }
        return arr
    }
}
namespace Array {
    export function from<T, U>(input: T[], mapFn?: (val: T, index: number) => U): U[] {
        let result: U[] = [];
        for (let i = 0; i < input.length; i++) {
            if (mapFn) {
                result.push(mapFn(input[i], i));
            } else {
                result.push(<U><any>input[i]);
            }
        }
        return result;
    }

    export function of<T>(...args: any[]): T[] {
        return args
    }
    export function repeat(value: any, count: number): any[] {
        let arr: Array<any> = []
        const add = value
        for (let i = 0; i < count; i++) {
            arr[i] = add
        }
        return arr
    }
    export function range(start: number, end: number, step?: number): number[] {
        let arr: number[] = []
        for (let i = start; i < end; i += step) {
            arr.push(i)
        }
        return arr
    }
    export function chunk(arr: any[], size: number) {
        let Chunked: any[] = []
        let i = 0
        let b: any[] = []
        while (i < arr.length - 1) {
            if (b.length == size) { Chunked.push(b); b = [] }
            b.push(arr[i])
            i++
        }
        return Chunked
    }
}
enum TimeUnit {
    MilliSeconds = 0,
    Seconds = 1,
    Minutes = 2,
    Hours = 3,
    Days = 4,
    Years = 5,
}
type Wait = Promise<void>
class Timer {
    /** Returns a Promise that you can wait on with .then() , timer will wait in background, duration is in the currently set duration */
    static new(duration: number,mode:TimeUnit): Wait {
        let dur = Timer.UnitToMS(duration,mode)
        return new Promise<void>((resolve, reject) => {
            control.runInParallel(function () {
                pause(dur)
                resolve(null);
            })
        });
    }

    static UnitToMS(duration:number,mode:TimeUnit):number {
        let dur = duration
        switch (mode) {
            case 0: break;
            case 1: dur = dur * 1000; break;
            case 2: dur = (dur * 60) * 1000; break;
            case 3: dur = ((dur * 60) * 60) * 1000; break;
            case 4: dur = (((dur * 24) * 60) * 60) * 1000; break;
            case 5: dur = ((((dur * 365) * 24) * 60) * 60) * 1000; break;
        }
        return dur
    }
}
function assert(expression:() => boolean,value:boolean = true) {
    if (expression() != value) {
        throw "Failed Assert"
    }
}