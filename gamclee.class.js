/*
Class: gamclee.class

Description:
Provides a base class and a system for inheritance
*/

define(function(){
	var objCounter = 1,
		creating = false,
		classObj = function(){};
		
	classObj.prototype.objectID = function() {
        if (typeof this.__oid == 'undefined') {
            this.__oid = objCounter++;
        }
        return this.__oid;
    };
	
	classObj.extend = function(prop) {
		creating = true;
		var ret,
			_super = this.prototype,
			parent = new this();
		creating = false;

		// Todo: better foreach?
		for(var name in prop) {
			if((typeof _super[name] == 'function') && (typeof prop[name] == 'function')) {
				parent[name] = (function(name, fn) {
					return function(){
						var ret, tmp = this._super;
						this._super = _super[name];
						ret = fn.apply(this, arguments);
						this._super = tmp;
					
						return ret;
					};
				})(name, prop[name]);
			} else {
				parent[name] = prop[name];
			}
		}

		ret = function() {
			if((!creating) && (typeof this.create == 'function')) {
				this.create.apply(this, arguments);
			}
		};
	
		ret.prototype = parent;
		ret.prototype.constructor = classObj;
		ret.extend = this.extend;
		return ret;
    };
	
	return classObj;
});