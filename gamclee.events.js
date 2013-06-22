/*
Class: gamclee.events

Description:
Binding and managing events
*/

define(['gamclee.misc'], function(Misc) {
	var Events = function() {
		// Singleton-- additional instances will always return the same thing.
		if(Screen.prototype._singletonInstance) {
			return Screen.prototype._singletonInstance;
		}
		Screen.prototype._singletonInstance = this;
		
		this.events = {};
		this.stopPropagation = {};
		this.eventStack = [];
	};
	
	Events.prototype.addDomEventListener = function(eventName, domElement, handler) {
		if(!handler && typeof domElement == "function") {
			handler = domElement;
			domElement = window ? window : document; // Some environments (ejecta) don't have a window
		}
		if(!domElement) {
			domElement = window ? window : document; // Some environments (ejecta) don't have a window
		}
		if(domElement.addEventListener) {
			domElement.addEventListener(eventName, handler, false);
		} else {
			domElement.attachEvent('on'+eventName, handler);
		}
	};
	
	Events.prototype.removeDomEventListener = function(eventName, domElement, handler) {
		if(!handler && typeof domElement == "function") {
			handler = domElement;
			domElement = window ? window : document; // Some environments (ejecta) don't have a window
		}
		if(!domElement) {
			domElement = window ? window : document; // Some environments (ejecta) don't have a window
		}
		if(domElement.removeEventListener) {
			domElement.removeEventListener(eventName, handler, false);
		} else {
			domElement.attachEvent('on'+eventName, handler);
		}
	};
	
	Events.prototype.addEventListener = function(eventName, callback, priority) {
		// Default priority = 0
		if(!Misc.isset(priority)) {
			priority = 0;
		}

		// Initialize event array, if not set
		if(!(eventName in this.events)) {
			this.events[eventName] = {
				_priorities: []
			};
		}

		// Initialize priority, if not set. Sort priorities
		if(!(priority in this.events[eventName])) {
			this.events[eventName][priority] = [];
			this.events[eventName]._priorities.push(priority);
			this.events[eventName]._priorities.sort();
		}

		// Add the event handler
		this.events[eventName][priority].push(callback);
	};

	Events.prototype.triggerEvent = function(eventName, args, context) {
		// If there are no handlers, abort
		if(!(eventName in this.events)) {
			return;
		}

		// gamclee object is the default context
		if(!Misc.isset(context)) {
			context = this;
		}

		// Push the current event onto the stack
		// This allows us to stop propagation on the current event
		this.eventStack.push(eventName);

		// Loop through priorities for current event name
		priorityLoop: // Labels? Sure, whatever.
		for(var i in this.events[eventName]._priorities) {
			var priority = this.events[eventName]._priorities[i];
			// Loop through handlers in current priority
			for(var j in this.events[eventName][priority]) {
				// Get the callback
				var callback = this.events[eventName][priority][j];
				// If the callback is good, then call it
				if(typeof(callback) == 'function') {
					callback.apply(context, args);
					// Did the callback stop propagation by setting the flag?
					if(this.stopPropagation[eventName] == true) {
						break priorityLoop; // Works because of label
					}
				}
			}
		}
		// If propagation was stopped, remove it from the flag set
		if(this.stopPropagation[eventName] == true) {
			delete(this.stopPropagation[eventName]);
		}
		// Pop the current event off of the stack
		this.eventStack.pop();
	};

	// Stops propagation by setting the flag of the current event
	Events.prototype.stopPropagation = function() {
		this.stopPropagation[this.eventStack.slice(-1)[0]] = true;
	};

	// Clear all event handlers, or a specific one
	Events.prototype.clearEventListener = function(eventName, callbackFn) {
		// If no event handlers are set, do nothing
		if(!(eventName in this.events)) {
			return;
		}
		// If there's no callback function specified, clear all events
		if(!Misc.isset(callbackFn)) {
			this.events[eventName] = {};
			return;
		} else {
			// Otherwise obliterate the matching function
			for(var i in this.events[eventName]._priorities) {
				var priority = this.events[eventName]._priorities[i];
				for(var j in this.events[eventName][priority]) {
					if(this.events[eventName][priority][j] == callbackFn) {
						delete this.events[eventName][priority][j];
						return;
					}
				}
			}
		}
	};
	
	return Events;
}