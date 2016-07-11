var eca = require("general-eca-runner");

var state = Array.apply(null, Array(1000)).map(x => 0);
state[Math.ceil((state.length - 1) / 2)] = 1;

var canvas   = document.querySelector(".canvas");
var context  = canvas.getContext("2d");
canvas.width = canvas.height = document.body.clientHeight;

var cellSize = canvas.width / state.length;

function printRow (r)
{
  for (var i = 0; i < state.length; i++)
  {
    context.fillStyle = state[i] == 0 ? "white" : "black";
    context.fillRect(i * cellSize, r * cellSize, cellSize, cellSize);
  }
}

for (var i = 0; i < state.length; i++)
{
  printRow(i);
  state = eca.compute(state, 110);
}
