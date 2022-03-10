import './style.css'
import Color from 'color'

// code from zzz.dog
var boxSize = 30
var boxStroke = 2
var boxOffset = boxSize + boxStroke + boxStroke
var delayBeforeAnimation = 5000

let illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true,
  onDragStart: function() { isSpinning = false; },
  onDragStop: function() { isSpinning = true; },
})

// top of the box
let box1 = new Zdog.Box({
  addTo: illo,
  width: boxSize,
  height: boxSize,
  depth: boxSize,
  color: '#FFF'
})
//box1.copy({ addTo: box1, stroke: boxStroke, fill: false, color: '#eee' }); // stroke for box1

//*
const colors = [
  'E5B740', // middle
  'A99790', // bottom
  'A24331', // right top
  '4B64AE', // right bottom
  '#3B7A57', // left top
  '915C83', // left bottom
  '841B2D', // top
  'green' // back (hidden)
]
//*/
/*
const colors = [
  'black', // middle
  'black', // bottom
  'black', // right top
  'black', // right bottom
  'black', // left top
  'black', // left bottom
  'black', // top
  'black' // back (hidden)
]
*/
colors.forEach(makeStrokeBox)

function makeStrokeBox(color, i) {
  const bin = i.toString(2).padStart(3, '0')
  const translate = {
    x: -1 * boxOffset * parseInt(bin[0]),
    y: -1 * boxOffset * parseInt(bin[1]),
    z: -1 * boxOffset * parseInt(bin[2])
  }
  if (!color.startsWith('#') && color.length === 6) {
    color = '#' + color
  }
  color = color.trim()
  let c = Color(color)
  c = c.lighten(0.2)
  c = c.desaturate(0.4)
  /*
  c = c.lighten(0.1)
  c = c.desaturate(0.1)
  */
  c = c.hex()
  //c = '#000'
  const orgbox = box1.copy({ translate, color: color })
  orgbox.copy({ stroke: boxStroke, fill: false, color: c })
}

// animation
var TAU = Zdog.TAU
var ticker = 0

function animate() {
  // update
  if (isSpinning) {
    annimateRotateAll();
  }
  illo.updateRenderGraph()
  requestAnimationFrame(animate)
}

var cycleCount = 105

var keyframes = [
  { x: 1.0, y: 0.0 },
  { x: 0.0, y: 0.0 },
  { x: -1.0, y: -1.0 },
  { x: -2.0, y: -3.0 },
  { x: 1.0, y: 0.0 },
  /*
  { x: 0.0, y: TAU * 1.0 },
  { x: 1.0, y: TAU * 1.0 },
  */
]

function annimateRotateAll() {
  var progress = ticker / cycleCount
  var tween = Zdog.easeInOut(progress % 1, 4)
  var turnLimit = keyframes.length - 1
  var turn = Math.floor(progress % turnLimit)
  var keyA = keyframes[turn]
  var keyB = keyframes[turn + 1]
  illo.rotate.x = Zdog.lerp(keyA.x, keyB.x, tween)
  illo.rotate.y = Zdog.lerp(keyA.y, keyB.y, tween)
  ticker++
}

illo.translate.y = -50

illo.rotate.y = 0.0
illo.rotate.z = 0.8
illo.rotate.x = 1.0

illo.updateRenderGraph()
let isSpinning = true
animate()
setTimeout(function () {
  isSpinning = true
}, delayBeforeAnimation)
