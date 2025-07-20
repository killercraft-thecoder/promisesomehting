class Map<K, V> {
    private keys: K[] = [];
    private values: V[] = [];
    
    constructor() {}

    // Sets a key-value pair
    set(key: K, value: V): Map<K, V> {
        let index = this.indexOfKey(key);
        if (index >= 0) {
            this.values[index] = value;
        } else {
            this.keys.push(key);
            this.values.push(value);
        }
        return this;
    }

    // Gets the value associated with a key
    get(key: K): V {
        let index = this.indexOfKey(key);
        if (index >= 0) {
            return this.values[index];
        }
        return null;
    }

    // Checks if the map contains a key
    has(key: K): boolean {
        return this.indexOfKey(key) >= 0;
    }

    // Deletes a key-value pair
    delete(key: K): boolean {
        let index = this.indexOfKey(key);
        if (index >= 0) {
            this.keys.removeAt(index);
            this.values.removeAt(index);
            return true;
        }
        return false;
    }

    // Removes all key-value pairs
    clear(): void {
        this.keys = [];
        this.values = [];
    }

    // Returns the number of entries
    size(): number {
        return this.keys.length;
    }

    // Returns a copy of all keys
    keysArray(): K[] {
        return this.keys.slice();
    }

    // Returns a copy of all values
    valuesArray(): V[] {
        return this.values.slice();
    }

    // Iterates over each key-value pair
    forEach(callback: (key: K, value: V) => void): void {
        for (let i = 0; i < this.keys.length; i++) {
            callback(this.keys[i], this.values[i]);
        }
    }

    // Internal: gets index of key
    private indexOfKey(key: K): number {
        for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i] == key) return i;
        }
        return -1;
    }
}