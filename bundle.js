(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"general-eca-runner":2}],2:[function(require,module,exports){
"use strict";
;
function padLeft(l, s, t) {
    while (s.length < l)
        s = t + s;
    return s;
}
function binaryFromRule(i) {
    return padLeft(8, i.toString(2), "0");
}
function outcomes(r) {
    return { "111": r[0],
        "110": r[1],
        "101": r[2],
        "100": r[3],
        "011": r[4],
        "010": r[5],
        "001": r[6],
        "000": r[7]
    };
}
function pattern(st, i) {
    return "" + (st[i - 1] || 0) + st[i] + (st[i + 1] || 0);
}
function compute(st, r) {
    var outcome = outcomes(binaryFromRule(r));
    var newState = [];
    for (var i = 0; i < st.length; i++)
        newState[i] = outcome[pattern(st, i)];
    return newState;
}
exports.compute = compute;

},{}]},{},[1]);
