/*
Class: gamclee.Rect

Holds position and width information of a rectangle

Constructor:
new gamclee.Rect(x, y, w, h);

Parameters:
x/y - top left upper corner of the rectangle (optional)
w/h - the width and height of the rectangle (optional)
*/
define(['gamclee.misc', 'gamclee.class'], function(Misc, Class){
	var Rect = function(x, y, width, height) {
			this.topLeft = {'x': x, 'y': y};
			this.topRight = {'x': x + w, 'y': y};
			this.bottomRight = {'x': x + w, 'y': y + h};
			this.bottomLeft = {'x': x, 'y': y + h};
	},
	
	Rect.prototype.width = function() {
		var a = this.topRight.x - this.topLeft.x,
			b = this.topRight.y - this.topLeft.y;
			
		return Math.sqrt((a * a) + (b * b));
	}
	
	Rect.prototype.quickWidth = function {
		var a = this.topRight.x - this.topLeft.x,
			b = this.topRight.y - this.topLeft.y;
			
		return (a * a) + (b * b);
	}
	
	Rect.prototype.quickHeight = function() {
		var a = this.bottomLeft.x - this.topLeft.x,
			b = this.bottomLeft.y - this.topLeft.y;
			
		return (a * a) + (b * b);
	}
	
	Rect.prototype.height = function() {
		var a = this.bottomLeft.x - this.topLeft.x,
			b = this.bottomLeft.y - this.topLeft.y;
			
		return Math.sqrt((a * a) + (b * b));
	}
	
	Rect.prototype.rotate = function(r, centerpoint) {
		var w = this.width(),
			h =	this.height(),
			x = (this.topRight.x); // TODO: Get x/y "centrepoint"
			
		if(!centerpoint) {
			centerpoint = {
				x: w / 2,
				y: h / 2
			};
		}
		s = Math.sin(r)
		c = Math.cos(r)
		
		// TODO: Rotate rectangle
	};
	
	return Rect;
});