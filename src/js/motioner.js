require('../less/motioner.less');

// Polyfill
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var elements = [];

var Motioner = {
	
  elements: [],
  elementsDone: [],
  elementsQueue: [],

  onetime: false,             // animation happend only one-time
  tmpScrollY: -1,
  
  init: function(){

    // work only in any browsers // needs to be updated
    elements = document.querySelectorAll('[data-mo]');

    for (var node of elements) {
   		// add general motioner classes
      node.className += " mo";
      // add specific animation, delays and other setups;
      node.className += " " + node.getAttribute('data-mo'); 

      this.elementsQueue.push({
        y: this.getPosition(node),      // add default position
        offset: 0,                      // TODO
        targetTrigger: null,            // TODO
        triggered: false,
        node: node                      // add node
      });

    }

    var self = this;

    addEventListener('resize', function(e){ self.updatePosition(); self.update(); });
    addEventListener('scroll', function(e){ self.update(); });

    self.update();
  },

  getPosition: function(element) {
      var yPosition = 0;

      while(element) {
          yPosition += (element.offsetTop - element.clientTop);
          element = element.offsetParent;
      }

      return yPosition;
  },

  updatePosition: function(){

    for (var node of elements) {
      node.y = this.getPosition(node)
    }

  },

  update: function(){

    var point = window.innerHeight/2;
    var offset = window.pageYOffset || document.documentElement.scrollTop;

    offset += point;

    // Down
    if(offset > this.tmpScrollY){

      for(var node of this.elementsQueue){
        if(offset > node.y){
          node.node.className += " mo-in";
          this.elementsDone.push(node);
          this.elementsQueue.splice(this.elementsQueue.indexOf(node) , 1);
        }
      }

    }else{
    // Up
      for(var node of this.elementsDone){
        if(offset < node.y){
          node.node.className = node.node.className.replace(" mo-in", "");
          this.elementsQueue.push(node);
          this.elementsDone.splice(this.elementsDone.indexOf(node) , 1);
        }
      }      
    }

    this.tmpScrollY = offset; // last scroll position
  }
  
}

Motioner.init();