function Animation() {
    this.init = function(){
        this.x = 0;
        this.y = 0;
        this.imgFrames = 0;
        this.frame = 0;
        this.alive = false;
        this.lastUpdateTime = 0;
        this.acDelta = 0;
        this.msPerFrame = 50;
    }

    this.spawn = function(x, y, args){
      //  debugger;
        this.img = args.img;
        this.x = x;
        this.y = y;
        this.imgFrames = args.frames;
        this.spw = args.spw;
        this.alive = true; 
    }

    this.draw = function() {
        if(this.alive){
            //   debugger;
            this.delta = Date.now() - this.lastUpdateTime;
            if(this.acDelta > this.msPerFrame){
                this.acDelta = 0;  
                this.frame += 92;
                if( this.frame >= this.img.width ){
                    this.frame = 0;
                    this.alive = false;
                }
            }
            else {
                this.acDelta += this.delta;
            }
            
            this.context.save();
            this.context.globalAlpha = 0.4;
            this.context.drawImage(this.img, this.frame, 0, this.spw, this.spw, this.x, this.y, this.spw / 1.5, this.spw / 1.5);
            this.context.restore();

            this.lastUpdateTime = Date.now();
            return false; 
        }
        else {
            return true;
        }
    }

    this.clear = function() {
        this.x = 0;
        this.y = 0;
        this.imgFrames = 0; 
        this.frame = 0;
        this.alive = false;
    }
} 