function doWork(){
  var promise = new Promise();

  setTimeout(function(){
    // 2 - resolve the promise & execute the callback previously registered
    promise.resolve("timeout elapsed");
  }, 2000);

  return promise;

}

var promise = doWork();

// 1 - register callback
promise.then(function(message){
  // 3
  console.log(message);
});

var btn = document.getElementById("btn");
btn.addEventListener("click", function(){

 promise.then(function(message){
  console.log("from the click handler");
  console.log(message);
 });

});

