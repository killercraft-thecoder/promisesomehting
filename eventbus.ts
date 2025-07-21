class EventBus {
    private listeners: { [event: string]: ((arg:any,arg2:any) => void)[] } = {};

    on(event: string, callback: (args:any,arg2?:any) => void): void {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    off(event: string, callback: (args:any,arg2?:any) => void): void {
        if (!this.listeners[event]) return;
        const index = this.listeners[event].indexOf(callback);
        if (index > -1) this.listeners[event].splice(index, 1);
    }

    emit(event: string, arg:any,arg2?:any): void {
        if (!this.listeners[event]) return;
        for (const cb of this.listeners[event]) {
            cb(arg,arg2);
        }
    }

    clear(event?: string): void {
        if (event) this.listeners[event] = [];
        else this.listeners = {};
    }
}