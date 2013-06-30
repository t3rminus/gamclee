/*
Class: gamclee.state

Description:
A state in the game
*/

define(['gamclee.misc', 'gamclee.events', 'gamclee.class'], function(Misc, EventClass, Class) {
	var Events = new EventClass();
	
	// The events that will be bound as part of the state.
	var eventsList = ['start', 'update', 'draw', 'end'];
	
	var State = Class.extend({
		bindEvents: function() {
			for(var idx in eventsList) {
				if(this[eventsList[idx]]) {
					Events.addEventListener('gamclee.'+eventsList[idx], this[eventsList[idx]]);
				}
			}
		},
		unbindEvents: function() {
			for(var idx in eventsList) {
				if(this[eventsList[idx]]) {
					Events.clearEventListener('gamclee.'+eventsList[idx], this[eventsList[idx]]);
				}
			}
		}
	});
	
	return State;
});