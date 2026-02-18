namespace Threading {
    let _id = 0

    export class Thread {
        id: number
        name: string
        code: () => void
        alive = true
        wakeTime = 0   // for sleep()

        constructor(code: () => void, name?: string) {
            this.id = _id++
            this.name = name || "Thread" + this.id
            this.code = code
        }
    }

    let threads: Thread[] = []
    let currentIndex = 0

    // Special tokens
    const YIELD_TOKEN = "YIELD_TOKEN"
    const EXIT_TOKEN = "EXIT_TOKEN"

    export function create(code: () => void, name?: string) {
        const t = new Thread(code, name)
        threads.push(t)
        return t
    }

    export function exit(): void {
        throw EXIT_TOKEN
    }

    export function Yield(): void {
        throw YIELD_TOKEN
    }

    export function sleep(ms: number): void {
        const t = threads[currentIndex]
        t.wakeTime = game.runtime() + ms
        throw YIELD_TOKEN
    }

    game.onUpdate(function () {
        if (threads.length === 0) return

        let checked = 0
        while (checked < threads.length) {
            const t = threads[currentIndex]

            if (!t.alive) {
                currentIndex = (currentIndex + 1) % threads.length
                checked++
                continue
            }

            // Skip sleeping threads
            if (game.runtime() < t.wakeTime) {
                currentIndex = (currentIndex + 1) % threads.length
                checked++
                continue
            }

            try {
                t.code()
            } catch (e) {
                if (e === YIELD_TOKEN) {
                    // normal cooperative yield
                } else if (e === EXIT_TOKEN) {
                    t.alive = false
                } else {
                    // real error
                    throw e
                }
            }

            break
        }

        currentIndex = (currentIndex + 1) % threads.length
    })
}