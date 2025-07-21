// 🔢 Simple Set class for unique values

class Set<T> {
    private items: T[] = [];
    
    constructor() {}

    // Adds value if it's not already present
    add(value: T): Set<T> {
        if (!this.has(value)) {
            this.items.push(value);
        }
        return this;
    }

    // Checks if value exists in the set
    has(value: T): boolean {
        for (let item of this.items) {
            if (item == value) return true;
        }
        return false;
    }

    // Removes a value from the set
    delete(value: T): boolean {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] == value) {
                this.items.removeAt(i);
                return true;
            }
        }
        return false;
    }

    // Empties the set
    clear(): void {
        this.items = [];
    }

    // Returns number of elements
    size(): number {
        return this.items.length;
    }

    // Returns array of values for iteration or display
    values(): T[] {
        return this.items.slice();
    }
    
    entries(): [T, T][] {
        let pairs: [T, T][] = [];
        for (let item of this.items) {
            pairs.push([item, item]);
        }
        return pairs;
    }

    forEach(callback: (value: T) => void): void {
        for (let item of this.items) {
            callback(item);
        }
    }

    union(other: Set<T>): Set<T> {
        let result = new Set<T>();
        for (let item of this.items) result.add(item);
        for (let item of other.values()) result.add(item);
        return result;
    }

    intersection(other: Set<T>): Set<T> {
        let result = new Set<T>();
        for (let item of this.items) {
            if (other.has(item)) result.add(item);
        }
        return result;
    }

    difference(other: Set<T>): Set<T> {
        let result = new Set<T>();
        for (let item of this.items) {
            if (!other.has(item)) result.add(item);
        }
        return result;
    }

}