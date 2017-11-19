require('../less/motioner.less');

// Polyfill
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var elements = [];

var Motioner = {
	
  elements: [],
  
  init: function(){

    // work only in any browsers // needs to be updated
    elements = document.querySelectorAll('[data-mo]');

    for (var node of elements) {
   		// add general motioner classes
      node.className += " mo mo-in";
      
      // add specific animation, delays and other setups;
      node.className += " " + node.getAttribute('data-mo'); 
    }

    addEventListener('resize', function(e){
      console.log("Resize");
      console.log(e);
    });

    addEventListener('scroll', function(e){
      console.log("Scroll");
      console.log(e);
    });

  },




  
}

Motioner.init();