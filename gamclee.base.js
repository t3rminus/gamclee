/*
Class: gamclee.statemanager

Description:
Information and functions for the game state.
*/


define(['gamclee.misc'], function(Misc){
		// Attempts to determine if touch events are supported
	var touchEventsSupported = function(){
			return ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch);
		},
		
		// Attempts to determine if orientation-change events are supported
		orientationEventsSupported = function(){
			return 'DeviceOrientationEvent' in window;
		},
		
		// Main Gamclee class (state + event manager)
		Gamclee = function(canvasId) {
			this.canvas = document.getElementById(canvasId);
			if(!this.canvas) {
				Misc.log('Canvas #'+canvasId+' was not found. Aborting.');
				return;
			}
	        this.canvas.oncontextmenu = function() { return false; };
	        this.context2d = this.canvas.getContext("2d");
			this.events = {};
			this.stopPropagation = {};
			this.eventStack = [];
			
			this.isFullScreen = false;
			this.hasTouch = touchEventsSupported();
			this.hasOrientation = orientationEventsSupported();
			
			this.init();
		};
		
		// Set up some (sane) browser defaults
		Gamclee.prototype.init = function() {
			// Add Object.keys for older browsers
			if (!Object.keys) {
			    Object.keys = function (obj) {
			        var keys = [],
			            k;
			        for (k in obj) {
			            if (Object.prototype.hasOwnProperty.call(obj, k)) {
			                keys.push(k);
			            }
			        }
			        return keys;
			    };
			}
			// Normalize Window.requestAnimationframe
			if(!window.requestAnimationFrame) {
				window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
	            window.mozRequestAnimationFrame ||
	            window.oRequestAnimationFrame ||
	            window.msRequestAnimationFrame ||
	            function(cb){
	                window.setTimeout(cb, 1000 / 60);
	            };
			}
		}
		
		Gamclee.prototype.addEventListener = function(eventName, callback, priority, callbackName) {
			if(!Misc.isset(priority)) {
				priority = 0;
			}
			
			if(!(eventName in this.events)) {
				this.events[eventName] = {};
			}
			
			if(!(priority in this.events[eventName])) {
				this.events[eventName][priority] = {};
			}
			
			if(!Misc.isset(callbackName)) {
				var i = 0;
				callbackName = "event_"+i;
				while(callbackName in this.events[eventName][priority]) {
					callbackName = "event_"+(++i);
				}
			}
			
			this.events[eventName][priority][callbackName] = callback;
		}
		
		Gamclee.prototype.triggerEvent = function(eventName, arguments, context) {
			if(!(eventName in this.events)) {
				return;
			}
			
			if(!Misc.isset(context)) {
				context = this;
			}
			
			this.eventStack.push(eventName);
			
			var keys = Object.keys(this.events[eventName]);
			keys.sort();
			
			for (i = 0; i < len; i++) {
				var priority = keys[i];
				for(var callbackName in this.events[eventName][priority]) {
					var callback = this.events[eventName][priority][callbackName];
					if(typeof(callback) == 'function') {
						callback.apply(context, arguments);
						if(this.stopPropagation[eventName] == true) {
							break;
						}
					}
				}
				if(this.stopPropagation[eventName] == true) {
					break;
				}
			}
			if(this.stopPropagation[eventName] == true) {
				delete(this.stopPropagation[eventName]);
			}
		}
		
		Gamclee.prototype.stopPropagation = function() {
			this.stopPropagation[this.eventstack.slice(-1)[0]] = true;
		}
		
		Gamclee.prototype.clearEventListener = function(eventName, callbackName) {
			if(!(eventName in this.events)) {
				return;
			}
			if(!Misc.isset(callbackName)) {
				this.events[eventName] = {};
				return;
			} else {
				var keys = Object.keys(this.events[eventName]);
				
				for (i = 0; i < len; i++) {
					var priority = keys[i];
					if(callblackName in this.events[eventName][priority]) {
						delete this.events[eventName][priority][callbackName];
						return;
					}
				}
			}
		}
		
		Gamclee.prototype.start = function(initialState) {
			
		};
		
		return Gamclee;
});