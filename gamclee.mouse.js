/*
Class: gamclee.mouse

Description:
Information and functions for the mouse.

PLEASE NOTE:
There are browsers that are not able to handle
middle and right mouse buttons without problems.

Middle and right mouse button is successfully tested on current versions of:
* Chrome
* Firefox
* xxxterm
*/
define(function(){
	var Mouse = function() {
		this.pressedMap = {};
		this.mouseX = 0;
		this.mouseY = 0;
	}
	
	Mouse.prototype.LEFT = 0;
	Mouse.prototype.RIGHT = 1;
	Mouse.prototype.MIDDLE = 2;
	
	Mouse.prototype.isPressed = function(k) {
		return (k in this.pressedMap) && this.pressed[k];
	}
	
	Mouse.prototype.setPosition = function(x, y) {
		this.x = x; this.y = y;
	}
	
	Mouse.prototype.setPressed = function(k, v) {
		this.pressedMap[k] = v;
	}
	
	return new Mouse();
});