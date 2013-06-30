/*
Class: gamclee.events

Description:
Main screen turn on... It's you!
*/

define(['gamclee.misc', 'gamclee.timer', 'gamclee.events'], function(Misc, TimerClass, EventClass) {
	var Events = new EventClass(), Timer = new TimerClass();
	
	var Screen = function(canvas) {
		// Singleton-- additional instances will always return the same thing.
		if(Screen.prototype._singletonInstance) {
			return Screen.prototype._singletonInstance;
		}
		Screen.prototype._singletonInstance = this;
		
		this.canvas = canvas;
		
		this.width = canvas.width;
		this.height = canvas.height;
		
		this.isHidden = false;
		this.isFullScreen = false;
		this.isPaused = false;
		
		this.frameLimit = 0.1;
		this.lastFrameTime = -1;
		this.lastFrameLength = 0;
		this.lastFPSCheck = 0;
		this.lastFPS = 0;
		this.fpsCounter = 0;
		
		// Set-up pause/resume on window focus
		var screenInstance = this;
		Events.addDomEventListener('focus', window, Misc.debounce(function() { screenInstance.visible(); }, 100, true));
		Events.addDomEventListener('blur', window, Misc.debounce(function() { screenInstance.hidden(); }, 100, true));
		
		// Set-up the "draw" loop
		var objContext = this, drawHandler = function(){
			// Schedule next frame draw
			window.requestAnimationFrame(drawHandler);
			// Call Screen.draw in the right context
			objContext.draw.call(objContext);
		};
		// ...aaaand draw!
		window.requestAnimationFrame(drawHandler);
	};
	
	Screen.prototype.getCanvas = function() {
		return this.canvas;
	};
	
	Screen.prototype.hidden = function() {
		this.pause();
		this.isHidden = true;
	};
	
	Screen.prototype.visible = function() {
		this.resume();
		this.isHidden = false;
	}
	
	Screen.prototype.pause = function() {
		this.isPaused = true;
	};
	
	Screen.prototype.resume = function() {
		this.isPaused = false;
	};
	
	Screen.prototype.draw = function() {
		// If paused, do nothing!
        if(this.isPaused) {
            return;
        }
			
		// Count frames drawn since last second changeover
        var ms = Timer.getMilliseconds(); // Time since start of game
        if (this.lastFPSCheck < ms) {
			// Changeover frame-- reset check, frame count
            this.lastFPS = this.fpsCounter + 1;
            this.fpsCounter = 0;
            this.lastFPSCheck = ms + 1000;
        } else {
			// Normal frame. Increase fpsCounter.
            this.fpsCounter++;
        }
		// Get time since last frame
        if (this.lastFrameTime > -1) {
            this.lastFrameLength = (-this.lastFrameTime) + (this.lastFrameTime = (ms / 1000));
			// Clamp to frame limit
            if (this.lastFrameLength > this.frameLimit) {
                this.lastFrameLength = this.frameLimit;
            }
        } else {
            this.lastFrameTime = 0;
        }
		
		// Trigger main draw
		Events.triggerEvent('gamclee.draw', [this.lastFrameLength, this.canvas]);
		
		// Trigger main update
		Events.triggerEvent('gamclee.update', [this.lastFrameLength]);
	};
	
	Screen.prototype.getFPS = function() {
		return this.lastFPS;
	};
	
    Screen.prototype.hasFullScreen = function() {
		if(this.canvas) {
			if(this.canvas.requestFullscreen) {
				return true;
			} else if(this.canvas.mozRequestFullScreen) {
				return true;
			} else if(this.canvas.webkitRequestFullscreen) {
				return true;
			}
		}
		return false;
    };

	Screen.prototype.isFullScreen = function() {
		return this.isFullScreen;
	};

	Screen.prototype.setFullScreen = function(yesno) {
		if(this.canvas) {
			if(this.canvas.requestFullscreen) {
				this.isFullScreen = yesno;
				if(yesno) {
					this.canvas.requestFullscreen();
				} else {
					this.canvas.cancelFullscreen();
				}
			} else if(this.canvas.mozRequestFullScreen) {
				this.isFullScreen = yesno;
				if(yesno) {
					this.canvas.mozRequestFullScreen();
				} else {
					this.canvas.mozCancelFullScreen();
				}
			} else if(this.canvas.webkitRequestFullscreen) {
				this.isFullScreen = yesno;
				if(yesno) {
					this.canvas.webkitRequestFullscreen();
				} else {
					this.canvas.webkitCancelFullscreen();
				}
			}
		}
		return this.isFullScreen;
    };
	
	return Screen;
});