var eca = require("general-eca-runner");

var state = defaultState();

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

function main (r)
{
  state = defaultState();
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < state.length; i++)
  {
    printRow(i);
    state = eca.compute(state, r);
  }
}

function defaultState ()
{
  var state = Array.apply(null, Array(Math.ceil(document.body.clientHeight / 4))).map(x => 0);
  state[Math.ceil((state.length - 1) / 2)] = 1;
  return state;
}

document.querySelector(".rule")
  .addEventListener("input", function (e)
    {
      main(e.target.value);
    }
  );

main(110);
