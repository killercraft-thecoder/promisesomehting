// 🛑 Custom AbortController for cooperative cancellation

class AbortController {
    public readonly signal: AbortSignal;

    constructor() {
        this.signal = new AbortSignal();
    }

    // Cancels the signal
    abort(): void {
        this.signal.trigger();
    }
}

class AbortSignal {
    private aborted: boolean = false;
    private listeners: (() => void)[] = [];

    constructor() {}

    // Check if already aborted
    get isAborted(): boolean {
        return this.aborted;
    }

    // Subscribe to abort event
    onAbort(callback: () => void): void {
        if (this.aborted) {
            callback();
        } else {
            this.listeners.push(callback);
        }
    }

    // Trigger all listeners
    trigger(): void {
        if (this.aborted) return;
        this.aborted = true;
        for (let cb of this.listeners) {
            cb();
        }
    }
}
