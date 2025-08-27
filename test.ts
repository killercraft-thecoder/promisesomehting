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
