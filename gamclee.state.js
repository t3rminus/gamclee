/*
Class: gamclee.state

Description:
A state in the game
*/

define(['gamclee.misc', 'gamclee.events'], function(Misc, EventClass) {
	var Events = new EventClass();
	
	// The events that will be bound as part of the state.
	var eventsList = ['start', 'update', 'draw', 'end'];
	
	var State = function() {
		
	};
	
	State.prototye.bindEvents = function(){
		for(var idx in eventsList) {
			if(this[eventsList[idx]]) {
				Events.addEventListener('gamclee.'+eventsList[idx], this[eventsList[idx]]);
			}
		}
	};
	
	State.prototye.unbindEvents = function(){
		for(var idx in eventsList) {
			if(this[eventsList[idx]]) {
				Events.clearEventListener('gamclee.'+eventsList[idx], this[eventsList[idx]]);
			}
		}
	};
	
	return State;
}