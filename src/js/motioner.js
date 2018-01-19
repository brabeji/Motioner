require('../less/motioner.less');

// Polyfill
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var Motioner = {
  
  offsetTrigger: 700,
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
    
    console.log('Count of elements: ' + this.tree.length);
    console.log('Pointer before start init: ' + this.pointer);

    this.update();


    //alert(this.pointer);

    console.log('Pointer after start init: ' + this.pointer);
  },
  
  /**
   *  Move pointer to next element
   */
  next: function(){
    if(!this.tree[this.pointer].triggered){
      this.tree[this.pointer].node.className += ' mo-in';
      this.tree[this.pointer].triggered = true;
    }
  },
  
  /**
   *  Move pointer to previous element
   */
  prev: function(){
    if(this.tree[this.pointer].triggered){
      this.tree[this.pointer].node.className = this.tree[this.pointer].node.className.replace('mo-in', '');
      this.tree[this.pointer].triggered = false;
    }
  },
  
  /**
   *  Move pointer to next element
   */
  update: function(){
  
    var scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
    scrollOffset += this.offsetTrigger;

    console.log(scrollOffset + ' - ' + this.tree[this.pointer].y);
    
    // TODO: Remove only one step pointer increasing and replace it by while until positon
    if(scrollOffset > this.tmpOffset){  

      while(scrollOffset > this.tree[this.pointer].y && this.pointer < this.tree.length ){

          this.next();
          this.pointer++;

          if(this.pointer >= this.tree.length){
              this.pointer--;
             break;
          }

          console.log(this.pointer);
      }

    }else{

      console.log('scroll up' + this.pointer);
      console.log(scrollOffset + ' - ' + this.tree[this.pointer].y);

      while((scrollOffset < this.tree[this.pointer].y) && this.pointer > 0 ){
        this.prev();
        this.pointer--; 
        console.log()
        console.log(this.pointer);
      }

    }
  
    this.tmpOffset = scrollOffset;
    
  },
  
  /** 
   *  Update elements potisition
   *  It is used in resize callback and init
   */

  updatePositions: function(){
  
    for (var node of this.tree) {
      node.y = this.getPosition(node.node);
    }
    
  },

  /**
   *  Return position of element
   */
  
  getPosition: function(element) {
      var yPosition = 0;

      while(element) {
          yPosition += (element.offsetTop - element.clientTop);
          element = element.offsetParent;
      }

      return yPosition;
  }
  
}





document.addEventListener('DOMContentLoaded', function(){
  
  Motioner.init();
  
}, false);











