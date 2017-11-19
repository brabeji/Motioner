require('../less/motioner.less');

// Polyfill
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var elements = [];

var Motioner = {
	
  elements: [],
  elementsDone: [],
  elementsQueue: [],

  onetime: false,             // animation happend only one-time
  
  init: function(){

    // work only in any browsers // needs to be updated
    elements = document.querySelectorAll('[data-mo]');

    for (var node of elements) {
   		// add general motioner classes
      node.className += " mo";
      // add specific animation, delays and other setups;
      node.className += " " + node.getAttribute('data-mo'); 

      this.elementsQueue.push({
        y: this.getPosition(node),    // add default position
        node: node                      // add node
      });

    }

    var self = this;

    addEventListener('resize', function(e){ self.update(); });
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


  update: function(){

    var point = window.innerHeight/2;
    var offset = window.pageYOffset || document.documentElement.scrollTop;

    offset += point;

    for(var node of this.elementsQueue){

      if(offset > node.y){
        
        if(node.node.className.indexOf('mo-in') < 0){
          node.node.className += " mo-in";
        }

      }else{
        node.node.className = node.node.className.replace(" mo-in", "");
      }

    }

  }


  
}

Motioner.init();