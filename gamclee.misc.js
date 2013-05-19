define({
	isset: function(val){
		return typeof(val) !== 'undefined' && val !== null;
	},
	log: function(){
		if(console && typeof(console.log) === 'function') {
			console.log.apply(null, arguments);
		}
	}
});