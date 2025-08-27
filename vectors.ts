class Vector2 {
    constructor(public x: number, public y: number) { }

    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    subtract(v: Vector2): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    multiply(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector2 {
        let len = this.length();
        return len == 0 ? new Vector2(0, 0) : new Vector2(this.x / len, this.y / len);
    }

    distanceTo(v: Vector2): number {
        return this.subtract(v).length();
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    get vector(): number[] {
        return [this.x, this.y]
    }

    get dim(): number {
        return 3
    }
}

class Vector3 {
    constructor(public x: number, public y: number, public z: number) { }

    add(v: Vector3): Vector3 {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    subtract(v: Vector3): Vector3 {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    multiply(scalar: number): Vector3 {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    normalize(): Vector3 {
        let len = this.length();
        return len == 0 ? new Vector3(0, 0, 0) : new Vector3(this.x / len, this.y / len, this.z / len);
    }

    distanceTo(v: Vector3): number {
        return this.subtract(v).length();
    }

    clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    toString(): string {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    get vector():number[] {
        return [this.x,this.y,this.z]
    }

    get dim():number {
        return 3
    }
}

namespace helpers {
    export function ARR_SUM(array: any[]): number {
        let sum = 0
        array.forEach((a) => sum += a as number)
        return sum
    }
    export function ARR_ADD(array: any[], other: any[]): any[] {
        let added: number[] = []
        for (let i = 0; i < array.length - 1; i++) {
            if (other.length - 1 > i) {
                added.push(array[i] + other[i])
            } else {
                added.push(array[i])
            }
        }
        return added
    }
    export function ARR_SUB(array: any[], other: any[]): any[] {
        let added: number[] = []
        for (let i = 0; i < array.length - 1; i++) {
            if (other.length - 1 > i) {
                added.push(array[i] - other[i])
            } else {
                added.push(array[i])
            }
        }
        return added
    }

    export function ARR_inc(array:any[],element:any):boolean {return array.indexOf(element) != -1}
}

interface Array<T> {
    //%helper=ARR_SUM
    /** 
     * Return the sum of values in the array , this Only works for number arrays/convertable to number arrays
    */
    sum(): number;
    //%helper=ARR_ADD
    /** 
     * Return a Array that has the Addef values of this array with the other array , does not matter if the length of the other array is shorter than this array , it will only add up to the end of the other array , the nthe values will eb the  same as this array
    */
    add(other: Array<T>): Array<T>;
    //%helper=ARR_SUB
    /** 
     * Return a Array that has the Subtracted values of this array with the other array , does not matter if the length of the other array is shorter than this array , it will only subtract up to the end of the other array , the nthe values will eb the  same as this array
     */
    sub(other: Array<T>): Array<T>;
    //%helper=ARR_inc
    includes(element:T):boolean;
}

class Vector {
    constructor(public vector: number[], public dim?: number) { 
        if (!dim) {
            this.dim = this.vector.length
        }
    }
    add(v: Vector): Vector {
        let added: number[] = []
        this.vector.forEach((a, i) => added.push(a + v.vector[i]))
        return new Vector(added, this.dim);
    }
    subtract(v: Vector): Vector {

        let added: number[] = []
        this.vector.forEach((a, i) => added.push(a - v.vector[i]))
        return new Vector(added, this.dim);

    }
    length(): number {
        let arr: number[] = []
        this.vector.forEach((a) => arr.push(a * a))
        let sum = arr.sum()
        return Math.sqrt(sum);
    }
    multiply(scalar: number): Vector {
        let added: number[] = []
        this.vector.forEach((a, i) => added.push(a * scalar))
        return new Vector(added, this.dim);
    }
    clone(): Vector {
        return new Vector(this.vector.slice(0),this.dim);
    }
    toString(): string {
        return `(${this.vector.join(',')})`;
    }
}
const NInfinity = -Infinity
function isFinite(value:number | Vector | Vector2 | Vector3) {
    if (typeof value == "number") {
        return value != Infinity && !(value == NInfinity)
    } else {
        let val = value as Vector
        for (let i = 0; i < val.dim-1; i++) {
            if (val.vector[i] == Infinity || val.vector[i] == NInfinity) {
                return true
            }
        }
        return false
    }
}