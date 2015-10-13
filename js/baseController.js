/**
 * Created by Guilin on 10/12/2015.
 */

var canvas = document.getElementById('space');
var context = canvas.getContext('2d');
var interval = 10; // ms

//cellwidth * cell*Len = 500
var cellWidth = 10;
var cellXLen = 50;
var cellYLen = 50;

var cells = [];
var running = 0;
var generation = 0;

function startConway () {
    alert("start!");
};

function wikiLink () {
  alert("Wiki");
};