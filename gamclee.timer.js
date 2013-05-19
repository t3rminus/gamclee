/*
Class: gamvas.timer
Functions to get information about timing. Mostly for internal use.
*/

define(function(){
	var Timer = function() {
		this.timeScale = 1;
		this.startDate = new Date();
	}
	
	Timer.prototype.getSeconds = function() {
		return this.getMilliseconds() / 1000;
	}
	
	Timer.prototype.getMilliseconds = function() {
		return ((new Date).getTime() - this.startDate.getTime()) 
			* this.timeScale;
	}
	
	return new Timer();
});