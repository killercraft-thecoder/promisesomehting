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
}