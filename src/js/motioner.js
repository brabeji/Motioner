require('../less/motioner.less');

// Polyfill
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var Motioner = {
  
  offsetTrigger: 200,
  pointer: 0,       // it is a pointer to current depth
  tree: [],
  tmpOffset: 0,
  
  init: function() {
    var elements = document.querySelectorAll('[data-mo]'); 
    
    for (var node of elements) {
      
      // add prefixes and classes
      node.className += " mo mo-" + node.getAttribute('data-mo').replace(' ', ' mo-');

      this.tree.push({
        y: this.getPosition(node),      // add default position
        triggered: false,
        node: node                      // add node
      });

    }
    
    var self = this;
    
    addEventListener('scroll', function(e){ self.update() });
    addEventListener('resize', function(e){ self.updatePositions(); self.update() });
    
    this.update();
  },
  
  next: function(){
    if(!this.tree[this.pointer].triggered){
      this.tree[this.pointer].node.className += ' mo-in';
      this.tree[this.pointer].triggered = true;
    }
  },
  
  prev: function(){
    if(this.tree[this.pointer].triggered){
      this.tree[this.pointer].node.className = this.tree[this.pointer].node.className.replace('mo-in', '');
      this.tree[this.pointer].triggered = false;
    }
  },
  
  update: function(){
  
    var scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
    scrollOffset += this.offsetTrigger;
    
    if(scrollOffset > this.tmpOffset){
      if(scrollOffset > this.tree[this.pointer].y){
        this.next();
        this.pointer = this.pointer+1 >= this.tree.length ? this.pointer : this.pointer+1; 
//        console.log("Pointer - " + this.pointer);
      }
    }else{
      if(scrollOffset < this.tree[this.pointer].y){
        this.prev();
        this.pointer = this.pointer - 1 < 0 ? 0 : this.pointer-1; 
//        console.log("Pointer - " + this.pointer);
      }
    }
  
    this.tmpOffset = scrollOffset;
    
  },
  
  updatePositions: function(){
  
    for (var node of this.tree) {
      node.y = this.getPosition(node.node);
    }
    
  },
  
  getPosition: function(element) {
      var yPosition = 0;

      while(element) {
          yPosition += (element.offsetTop - element.clientTop);
          element = element.offsetParent;
      }

      return yPosition;
  }
  
}

Motioner.init();
