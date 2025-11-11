// tests go here; this will not be compiled when this package is used as an extension.
let years = 1
game.onUpdate(function() {
years += controller.dy()
scene.backgroundImage().fill(0)
let year = Timer.UnitToMS(years, TimeUnit.Years)
scene.backgroundImage().printCenter(year.toString(),30)
scene.backgroundImage().printCenter(`${years} years =`, 10)
scene.backgroundImage().printCenter("MilliSeconds", 50)
})


let arr:{} = {"abc":239}
console.log(arr.hasOwn("abc"))
let num = 32;
assert(() => num.isNumber())
let array = [5,53,34,3]
assert(() => array.isArray())

console.log(`Array in string form:${JS.stringify(array)}`)
let complex = {cool_node:array,nonsense:328397598659834658437658734,bruh:42,six:7,eight:9,prop:328}
console.log(`Complex Object in string form:${JS.stringify(complex)}`)