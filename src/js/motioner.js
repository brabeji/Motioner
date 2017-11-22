require('../less/motioner.less');

// Polyfill
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var elements = [];

var Motioner = {
	
  elementsDone: [],           // elements that have been already triggered
  elementsQueue: [],          // elements that have not been already triggered

  onetime: false,             // animation happend only one-time
  tmpScrollY: 0,             // current scroll position
  

  /*  Init
   * 
   *  It found all elements on the page that use motioner data attribute data-mo,
   *  push them into queue and init global scroll and resize event listeners
   *
   */
  init: function(){

    var self = this;

    elements = document.querySelectorAll('[data-mo]');                // work only in any browsers // needs to be updated

    for (var node of elements) {
   		
      node.className += " mo " + node.getAttribute('data-mo');       // add general motioner classes + add specific animation, delays and other setups;

      this.elementsQueue.push({
        y: this.getPosition(node),      // add default position
        offset: 0,                      // TODO
        targetTrigger: null,            // TODO
        triggered: false,
        node: node                      // add node
      });

    }


    var point = window.innerHeight/2;
    var checker = document.querySelector('.checker');
    checker.style.top = point + 'px';

    addEventListener('resize', function(e){ self.updatePosition(); self.update(); });
    addEventListener('scroll', function(e){ self.update(); });

    this.update();
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

    for (var node of this.elementsQueue) {
      node.y = this.getPosition(node)
    }

    for (var node of this.elementsDone) {
      node.y = this.getPosition(node)
    }

  },

  update: function(){

    var self = this;
    var point = window.innerHeight/2;
    var offset = window.pageYOffset || document.documentElement.scrollTop;

    offset += point;

    for(var node of this.elementsQueue){
      
      if(offset > this.tmpScrollY && !node.triggered){
        // down
          if(offset > node.y){
            node.node.className += " mo-in";
            node.triggered = true;
          }
      }else{

        console.log('Scroll up');

        if(offset < node.y){
          node.node.className = node.node.className.replace(" mo-in", "");
          node.triggered = false;
        }
      }

    }

    this.tmpScrollY = offset; // last scroll position
  }
  
}

Motioner.init();