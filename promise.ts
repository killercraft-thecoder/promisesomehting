enum PromiseState {
    Pending,
    Fulfilled,
    Rejected
}

class PromiseCatchable<T> {
    private error: any = null;
    private resolvedValue: T = null;
    private finished: boolean = false;
    private value: T = null;
    private catchCallbacks: ((err: any) => void)[] = [];
    private afterCallbacks: ((value: T) => void)[] = [];

    constructor(callback: () => T) {
        try {
            this.resolvedValue = callback();
        } catch (e) {
            this.error = e;
        }
        this.finished = true;

        for (let cb of this.afterCallbacks) {
            cb(this.resolvedValue);
        }
    }

    __run__(callback: () => T): void {
        try {
            this.value = callback();
        } catch (e) {
            this.error = e;
        }
        this.finished = true;

        if (this.error) {
            for (let cb of this.catchCallbacks) cb(this.error);
        } else {
            for (let cb of this.afterCallbacks) cb(this.value);
        }
    }


    catch(callback: (err: any) => void): PromiseCatchable<T> {
        if (this.error) callback(this.error);
        return this;
    }

    after(callback: (value: T) => void): PromiseCatchable<T> {
        if (this.finished) {
            callback(this.resolvedValue);
        } else {
            this.afterCallbacks.push(callback);
        }
        return this;
    }
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

    then(callback: (value: T) => void): PromiseCatchable<T> {
        const catcher = new PromiseCatchable<T>(() => null); // Shared catchable

        if (this.state === PromiseState.Fulfilled) {
            catcher.__run__(() => {
                callback(this.value);
                return this.value;
            });
        } else if (this.state === PromiseState.Pending) {
            this.thenCallbacks.push((val: T) => {
                catcher.__run__(() => {
                    callback(val);
                    return val;
                });
            });
        }

        // If rejected, skip execution but still return a usable catchable
        return catcher;
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