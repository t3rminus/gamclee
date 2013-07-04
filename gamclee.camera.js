/*
Class: gamclee.camera

Description:
Handycam's got nothing on this...
*/

define(['gamclee.misc', 'gamclee.timer', 'gamclee.events', 'gamclee.screen', 'gamclee.vector2d'], function(Misc, TimerClass, EventClass, ScreenClass, Vector2d) {
	var Events = new EventClass(), Timer = new TimerClass(), Screen = new ScreenClass();
	
	var Camera = function(name,x,y,width,height,rotation,scale,xres,yres) {
		if(!Camera.prototype._cameraCount) {
			Camera.prototype._cameraCount = 1;
		} else {
			Camera.prototype._cameraCount++;
		}
		
		if(!name) {
			name = 'camera_'+Camera.prototype._cameraCount;
		}
		
		this.canvas = document.createElement('canvas');

		this.canvas.width = xres || width || Screen.width;
		this.canvas.height = yres || height || Screen.height;
		
		this.name = name;
		this.outPosition = new Vector2d(x || 0, y || 0);
		this.outWidth = width || Screen.width;
		this.outHeight = height || Screen.height;
		
		this.outScale = scale || 1;
		this.outRotation = rotation || 0;
		this.isPaused = false;
		
		this.position = new Vector2d();
		this.rotation = 0;
		this.scale = 1;
		
		Events.addEventListener('gamclee.draw', this.draw, 1000);
	};
	
	Camera.prototype.draw = function(dt, canvas) {
		// If we're paused, do nothing
		if(this.isPaused) {
			return false;
		}
		
		// Trigger my drawing routines!
		var ctx = this.canvas.getContext('2d');
		ctx.save();
		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(this.rotation);
		ctx.scale(this.scale);
		Events.triggerEvent('gamclee.draw.'+this.name, [dt, this.canvas]);
		ctx.restore();
		
		// Composite onto the main canvas
		var ctx = canvas.getContext('2d');
		ctx.save();
		ctx.translate(this.outPosition.x, this.outPosition.y);
		ctx.rotate(this.outRotation);
		ctx.scale(this.outScale);
		ctx.drawImage(this.canvas, -this.width / 2, -this.height / 2);
		ctx.restore();
	};
	
	return Camera;
});