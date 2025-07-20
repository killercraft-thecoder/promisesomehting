enum PromiseState {
    Pending,
    Fulfilled,
    Rejected
}

class Promise<T> {
    private state: PromiseState = PromiseState.Pending;
    private value: T = null;
    private error: any = null;
    private thenCallbacks: ((value: T) => void)[] = [];
    private catchCallbacks: ((err: any) => void)[] = [];
    private finallyCallbacks: (() => void)[] = [];

    constructor(executor: (resolve: (value: T) => void, reject: (err: any) => void) => void) {
        try {
            // Inline arrow functions capture 'this' implicitly
            executor(
                (val: T) => this.resolve(val),
                (err: any) => this.reject(err)
            );
        } catch (e) {
            this.reject(e);
        }
    }

    private resolve(val: T) {
        if (this.state !== PromiseState.Pending) return;

        this.state = PromiseState.Fulfilled;
        this.value = val;
        for (let cb of this.thenCallbacks) {
            cb(val);
        }
        this.runFinalizers();
    }

    private reject(err: any) {
        if (this.state !== PromiseState.Pending) return;

        this.state = PromiseState.Rejected;
        this.error = err;
        for (let cb of this.catchCallbacks) {
            cb(err);
        }
        this.runFinalizers();
    }

    then(callback: (value: T) => void): Promise<T> {
        const safeCallback = (val: T) => {
            try {
                callback(val);
            } catch (e) {
                this.reject(e);
            }
        };

        if (this.state === PromiseState.Fulfilled) {
            safeCallback(this.value);
        } else if (this.state === PromiseState.Pending) {
            this.thenCallbacks.push(safeCallback);
        }

        return this;
    }

    catch(callback: (err: any) => void): Promise<T> {
        if (this.state === PromiseState.Rejected) {
            callback(this.error);
        } else if (this.state === PromiseState.Pending) {
            this.catchCallbacks.push(callback);
        }
        return this;
    }

    finally(callback: () => void): Promise<T> {
        if (this.state !== PromiseState.Pending) {
            callback();
        } else {
            this.finallyCallbacks.push(callback);
        }
        return this;
    }

    private runFinalizers() {
        for (let cb of this.finallyCallbacks) {
            cb();
        }
    }
}