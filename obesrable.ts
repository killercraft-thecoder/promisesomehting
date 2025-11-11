// Observable class for reactive programming

class Observable<T> {
    private listeners: ((value: T) => void)[] = [];
    private lastValue: T = null;
    private hasValue: boolean = false;
    private completed: boolean = false;

    constructor() {}
 
    // Subscribe to value updates
    subscribe(callback: (value: T) => void): void {
        if (this.hasValue) callback(this.lastValue);
        this.listeners.push(callback);
    }

    // Unsubscribe from updates
    unsubscribe(callback: (value: T) => void): void {
        for (let i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] == callback) {
                this.listeners.removeAt(i);
                break;
            }
        }
    }

    // Emit a new value
    next(value: T): void {
        if (this.completed) return;
        this.hasValue = true;
        this.lastValue = value;
        for (let cb of this.listeners) {
            cb(value);
        }
    }

    // Remove all listeners
    clear(): void {
        this.listeners = [];
    }

    // Mark as completed and stop emission
    complete(): void {
        this.completed = true;
        this.clear();
    }

    // Pipe transformation: creates derived observable
    pipe<U>(transform: (value: T) => U): Observable<U> {
        let derived = new Observable<U>();
        this.subscribe(val => {
            derived.next(transform(val));
        });
        return derived;
    }

    // Static creator from initial value
    static of<V>(value: V): Observable<V> {
        let obs = new Observable<V>();
        obs.next(value);
        return obs;
    }
}