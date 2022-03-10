import './style.css'

// code from zzz.dog
var boxSize = 30;
var boxStroke = 2;
var boxOffset = boxSize + boxStroke + boxStroke;
var delayBeforeAnimation = 5000;

let illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true,
  // onDragStart: function() { isSpinning = false; },
  // onDragStop: function() { isSpinning = true; },  
});

var boxes = [];

// top of the box
let box1 = new Zdog.Box({
  addTo: illo,
  width: boxSize,
  height: boxSize,
  depth: boxSize,
  color: '#FFF'
});
box1.copy({ addTo: box1, stroke: boxStroke, fill: false, color: '#eee' }); // stroke for box1

/*
boxes.push(box1.copy({ addTo: box1, translate: { y: -boxOffset }, }));
boxes.push(box1.copy({ addTo: box1, translate: { y: -boxOffset, x: -boxOffset }, color: '#82C800', }));
boxes.push(box1.copy({ addTo: box1, translate: { y: -boxOffset, x: boxOffset }, color: '#82C800', }));
boxes.push(box1.copy({ addTo: box1, translate: { x: -boxOffset }, color: '#82C800', }));
boxes.push(box1.copy({ addTo: box1, translate: { x: boxOffset }, color: '#82C800', }));
boxes.push(box1.copy({ addTo: box1, translate: { y: boxOffset}, color: '#82C800', }));
boxes.push(box1.copy({ addTo: box1, translate: { y: boxOffset, x: boxOffset }, color: '#82C800', }));
boxes.push(box1.copy({ addTo: box1, translate: { y: boxOffset, x: -boxOffset }, color: '#82C800', }));

/*
// right side
boxes.push(box1.copy({ translate: { y: -boxOffset, x: boxOffset, z: -boxOffset }, color: '#82C800', }));
boxes.push(box1.copy({ translate: { x: boxOffset, z: -boxOffset }, }));
boxes.push(box1.copy({ translate: { y: boxOffset, x: boxOffset, z: -boxOffset }, }));
boxes.push(box1.copy({ translate: { y: -boxOffset, x: boxOffset, z: -boxOffset*2 }, color: '#82C800', }));
boxes.push(box1.copy({ translate: { x: boxOffset, z: -boxOffset*2 }, color: '#82C800', }));
boxes.push(box1.copy({ translate: { y: boxOffset, x: boxOffset, z: -boxOffset*2 }, color: '#82C800', }));

// front
boxes.push(box1.copy({ translate: { y: boxOffset, x: 0, z: -boxOffset*2 }, }));
boxes.push(box1.copy({ translate: { y: boxOffset, x: -boxOffset, z: -boxOffset*2 }, }));
boxes.push(box1.copy({ translate: { y: boxOffset, x: 0, z: -boxOffset }, }));
boxes.push(box1.copy({ translate: { y: boxOffset, x: -boxOffset, z: -boxOffset }, }));

// back
boxes.push(box1.copy({ translate: { y: -boxOffset, x: 0, z: -boxOffset }, }));
boxes.push(box1.copy({ translate: { y: -boxOffset, x: 0, z: -boxOffset*2 }, }));
boxes.push(box1.copy({ translate: { y: -boxOffset, x: -boxOffset, z: -boxOffset*2 }, }));
boxes.push(box1.copy({ translate: { y: -boxOffset, x: -boxOffset, z: -boxOffset }, }));
*/


// left
boxes.push(box1.copy({ translate: { y: 0, x: -boxOffset, z: -boxOffset }, }));
boxes.push(box1.copy({ translate: { y: 0, x: -boxOffset, z: -boxOffset*2 }, }));

// bottom
boxes.push(box1.copy({ translate: { y: 0, x: 0, z: -boxOffset*2 }, }));


// center
boxes.push(box1.copy({ translate: { y: 0, x: 0, z: -boxOffset }, }));

boxes.forEach(makeStrokeBox);

function makeStrokeBox(orgbox) {
  return orgbox.copy({ stroke: boxStroke , fill: false, color: '#eee' });
}

// animation
var TAU = Zdog.TAU;
var ticker = 0;

function animate() {
  // update
  if ( isSpinning ) {
    // animateRoteSlice();
    //annimateRotateAll();
  }
  illo.updateRenderGraph();
  requestAnimationFrame( animate );  
}

var animationSpeed = TAU/4/30;
var delayBetweenAnimation = 250;

var ticker2 = 0;
function animateRoteSlice() {
  box1.rotate.z += isSpinning ? animationSpeed : 0;  
  ticker++;  
  if (ticker >= ((TAU/4)/animationSpeed)) {
    isSpinning = false;
    ticker = 0;

    ticker2++;  
    
    if (ticker2 == 4) {
      ticker2 = 0;
      box1.rotate.z = 0; 
      setTimeout(function() { isSpinning = true }, delayBeforeAnimation);   
    }
    else {
      setTimeout(function() { isSpinning = true }, delayBetweenAnimation);   
    }
    
    
  }
}

var cycleCount = 105;

var keyframes = [
  { x: 1.0,           y: 0.0 },
  { x: TAU * 0.1,     y: TAU * 0.3 },
  { x: TAU * -0.1,    y: TAU * 1.4 },
  { x: TAU * -0.3,    y: TAU * 0.80 },
  { x: -0.7,          y: 0.2 },  
  { x: TAU * -0.1,    y: TAU * 1.2 },
  { x: TAU * 0.1,     y: TAU * 1.3 },
  { x: 1.0,           y: 0.0 },
];

function annimateRotateAll() {
  var progress = ticker / cycleCount;
  var tween = Zdog.easeInOut( progress % 1, 4 );
  var turnLimit = keyframes.length - 1;
  var turn = Math.floor( progress % turnLimit );
  var keyA = keyframes[ turn ];
  var keyB = keyframes[ turn + 1 ];
  illo.rotate.x = Zdog.lerp( keyA.x, keyB.x, tween );
  illo.rotate.y = Zdog.lerp( keyA.y, keyB.y, tween );
  ticker++;
}

illo.translate.y = -50;

illo.rotate.y = 0.0;
illo.rotate.z = 0.8;
illo.rotate.x = 1.0;

illo.updateRenderGraph();
let isSpinning = false;
animate(); 
setTimeout(function() { isSpinning = true }, delayBeforeAnimation); 

