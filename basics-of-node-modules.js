// test.js

// without ./ node runtime will look for an npm module instead
var mymath = require("./mymath");
console.log("hello world"); // hello world
console.log(mymath(1, 2)); // 3

// mymath.js 
// Example 1

function add(a, b){
  return a + b;
}

// every file has the potential to be it's own module
// the module keyword allows the functionality
// module is an object scoped to each file
module.exports = add;

////////////////////////////////////////////////////
// Example 2
function add(a, b){
  return a + b;
}

var mymath = {
  add: add;
};

module.exports.add = add;
// OR (equivalent)
module.exports = mymath;

////////////////////////////////////////////////////
var mymath = require("./mymath");
console.log("hello world"); // hello world
console.log(mymath.add(1, 2)); // 3


////////////////////////////////////////////////////
// Example 3
function add(a, b){
  return a + b;
}

module.exports.add = add;
// OR (equivalent)
exports.add = add;

////////////////////////////////////////////////////
var mymath = require("./mymath");
console.log("hello world"); // hello world
console.log(mymath.add(1, 2)); // 3


////////////////////////////////////////////////////
// Example 3 (Preferred)
// create an object, then return that object from the module
// every file thus has its own scope
// like an IIFE in the browser - doesn't use a closure
// would have global variable leaks in the browser
// calling add from test.js would result in an error in the browser
// Note: node runtime would also accept the code if wrapped in an IIFE instead - no different
function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a - b;
}

var mymath = {
  add: add;
  subtract: subtract;
};

module.exports = mymath;

// exports = mymath; // WON'T WORK! - Doesn't export info correctly

////////////////////////////////////////////////////
var mymath = require("./mymath");
console.log("hello world"); // hello world
console.log(mymath.add(1, 2)); // 3
console.log(mymath.subtract(2, 1)); // 3
////////////////////////////////////////////////////

