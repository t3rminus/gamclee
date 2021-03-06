/*
Class: gamclee.statemanager

Description:
Information and functions for the game state.
*/


define(['gamclee.misc', 'gamclee.timer', 'gamclee.events', 'gamclee.screen'], function(Misc, TimerClass, EventClass, ScreenClass){
	var Timer = new TimerClass(), Events = new EventClass();
	
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
			
			this.hasTouch = touchEventsSupported();
			this.hasOrientation = orientationEventsSupported();
			
			this.states = [];
			
			// Perform some main init
			this.init();
			
			// Set-up the screen (screen handles DRAW loop)
			this.screen = new ScreenClass(this.canvas);
		};
		
	Gamclee.prototype.pushState = function(state){
		// Disable n - 1's event handling
		var curState = this.getCurrentState();
		curState && curState.unbindEvents();
		
		// Add n state
		this.states.push(state);
		
		// Bind n's events
		state.bindEvents();
	};
	
	Gamclee.prototype.popState = function(){
		// Disable n's event handling
		var oldState = this.getCurrentState();
		if(!oldState) {
			return false;
		}
		oldState.unbindEvents();
		
		// Remove n state
		this.states.pop();
		
		// Bind n - 1's (now n) events
		this.getCurrentState().bindEvents();
		
		// Return previous state;
		return oldState;
	};
	
	Gamclee.prototype.getCurrentState = function() {
		// Get state on top of stack
		if(this.states.length) {
			return this.states[this.states.length - 1];
		}
		return false;
	}
		
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
		// Thanks http://creativejs.com/resources/requestanimationframe/
		var lastTime = 0,
			vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
				|| window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if(!window.requestAnimationFrame) {
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}

		if(!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
		}
	};
		
	return Gamclee;
});