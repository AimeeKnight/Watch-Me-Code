function Promise(){
  this.callbacks = [];
  this.resolved = false;
}

Promise.prototype.then = function(callback){
  if(this.resolved){
    callback(this.data);
  }else{
    // 1
    this.callbacks.push(callback);
  }
};

Promise.prototype.resolve = function(data){
  // 2
  this.resolved = true;
  this.data = data;

  var callback;
  for(var i = 0; i < this.callbacks.length; i++){
    callback = this.callbacks[i];
    callback(data);
  }
};
