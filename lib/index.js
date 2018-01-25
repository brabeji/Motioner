'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// Polyfill
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var Motioner = {

	offsetTrigger: 700,
	pointer: 0, // it is a pointer to current depth
	tree: [],
	tmpOffset: 0,
	viewHeight: 0,

	init: function init() {
		var elements = document.querySelectorAll('[data-mo]');

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var node = _step.value;


				node.className += " mo mo-" + node.getAttribute('data-mo').replace(/  /g, ' ').replace(/ /g, ' mo-'); // remove double spaces and add prefixes

				this.tree.push({
					y: this.getPosition(node), // add default position
					triggered: false,
					node: node // add node
				});
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		this.viewHeight = window.innerHeight;

		var self = this;

		addEventListener('scroll', function (e) {
			self.update();
		});
		addEventListener('resize', function (e) {
			self.updatePositions();
			self.update();
		});

		//console.log('Count of elements: ' + this.tree.length);
		//console.log('Pointer before start init: ' + this.pointer);

		this.update();

		//console.log('Pointer after start init: ' + this.pointer);
	},

	/**
  *  Move pointer to next element
  */
	next: function next() {
		if (!this.tree[this.pointer].triggered) {
			this.tree[this.pointer].node.className += ' mo-in';
			this.tree[this.pointer].triggered = true;
		}
	},

	/**
  *  Move pointer to previous element
  */
	prev: function prev() {
		if (this.tree[this.pointer].triggered) {
			this.tree[this.pointer].node.className = this.tree[this.pointer].node.className.replace('mo-in', '');
			this.tree[this.pointer].triggered = false;
		}
	},

	/**
  *  Move pointer to next element
  */
	update: function update() {

		var scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
		scrollOffset += this.viewHeight; // TODO: implement offset trigger

		//console.log(scrollOffset + ' - ' + this.tree[this.pointer].y);

		// TODO: Remove only one step pointer increasing and replace it by while until positon
		if (scrollOffset > this.tmpOffset) {

			while (scrollOffset > this.tree[this.pointer].y && this.pointer < this.tree.length) {

				this.next();
				this.pointer++;

				if (this.pointer >= this.tree.length) {
					this.pointer--;
					break;
				}

				//console.log(this.pointer);
			}
		} else {

			//console.log('scroll up' + this.pointer);
			//console.log(scrollOffset + ' - ' + this.tree[this.pointer].y);

			while (scrollOffset < this.tree[this.pointer].y && this.pointer > 0) {
				this.prev();
				this.pointer--;
				//console.log()
				//console.log(this.pointer);
			}
		}

		this.tmpOffset = scrollOffset;
	},

	/**
  *  Update elements potisition
  *  It is used in resize callback and init
  */

	updatePositions: function updatePositions() {

		this.viewHeight = window.innerHeight;

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = this.tree[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var node = _step2.value;

				node.y = this.getPosition(node.node);
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}
	},

	/**
  *  Return position of element
  */

	getPosition: function getPosition(element) {
		var yPosition = 0;

		while (element) {
			yPosition += element.offsetTop - element.clientTop;
			element = element.offsetParent;
		}

		return yPosition;
	}

};

exports.default = Motioner;