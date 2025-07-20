// 📡 Observable class for reactive programming

class Observable<T> {
    private listeners: ((value: T) => void)[] = [];

    // Subscribe to value updates
    subscribe(callback: (value: T) => void): void {
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

    // Broadcast a new value
    next(value: T): void {
        for (let cb of this.listeners) {
            cb(value);
        }
    }

    // Remove all subscribers
    clear(): void {
        this.listeners = [];
    }
}