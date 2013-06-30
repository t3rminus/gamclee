define({
	isset: function(val){
		return typeof(val) !== 'undefined' && val !== null;
	},
	log: function(){
		if(console && typeof(console.log) === 'function') {
			console.log.apply(null, arguments);
		}
	},
	// Shamelessly stolen from Underscore.js
	debounce: function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}
});