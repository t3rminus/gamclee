/*
Class: gamclee.Vector2D

Description:
A 2D vector class

Constructor:
new gamclee.Vector2D(x, y);

Parameters:
x - The x part of the vector (optional)
y - The y part of the vector (optional)
*/
define(['gamclee.misc'], function(Misc){
	var Vector2D = function(x, y){
		this.x = (x) ? x : 0;
		this.x = (y) ? y : 0;
	};
	
	Vector2D.prototype.length = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	};
	
	Vector2D.prototype.quickLength = function() {
		return (this.x * this.x) + (this.y * this.y);
	};
	
	Vector2D.prototype.normalized = function() {
		var len = this.length();
		return new Vector2D(this.x / len, this.y / len);
	};
	
	Vector2D.prototype.rotate = function(r) {
		var s = Math.sin(r),
			c = Math.cos(r);
		
		return new Vector2D((c * this.x) - (s * this.y), (s * this.x) + (c * this.y));
	}
	
	Vector2D.prototype.subtract = function(v) {
		return new Vector2D(this.x - v.x, this.y - v.y);
	}
	
	Vector2D.prototype.add = function(v) {
		return new Vector2D(this.x + v.x, this.y + v.y);
	}
	
	Vector2D.prototype.difference = function(v) {
		return new Vector2D(v.x - this.x, v.y - this.y);
	}
	
	Vector2D.prototype.copy = function() {
		return new Vector2D(this.x, this.y);
	}
	
	Vector2D.prototype.distance = function(v) {
		return this.difference(v).length();
	}
	
	Vector2D.prototype.quickDistance = function(v) {
		return this.difference(v).quickLength();
	}
	
	return Vector2D;
});