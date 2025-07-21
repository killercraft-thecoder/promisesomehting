class Buf {
    constructor(size:number) {
      return Buffer.create(size)
    }
}
class Array<T> {
    constructor(size:number,def?:T) {
        let arr:Array<T> = []
        const add = def || null
        for (let i = 0; i < size; i++) {
            arr[i] = add
        }
        return arr
    }
}
