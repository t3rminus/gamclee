/*
Class: gamclee.Rect

Holds position and width information of a rectangle

Constructor:
new gamclee.Rect(x, y, w, h);

Parameters:
x/y - top left upper corner of the rectangle (optional)
w/h - the width and height of the rectangle (optional)
*/
define(function(){
	return function(x, y, width, height) {
		this.x = (x) ? x : 0;
		this.y = (y) ? y : 0;
		this.width = (width) ? width : 0;
		this.height = (height) ? height : 0;
	};
});