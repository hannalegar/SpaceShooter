function Shield() {
    this.bonus = new Bonus();
    this.type = "shield";
    this.collidableWith = ["enemyBullet", "meteor", "enemy", "bonus"];
    this.alive = false;

    this.newBonus = function() {
        this.index = Math.floor(Math.random() * imageRepository.shieldBonus.length);
        this.bonusImg = imageRepository.shieldBonus[this.index].img;
        
        this.bonusX = Math.random() * this.canvas.width - this.bonusImg.width + 1;
        this.bonusY = Math.random() * this.canvas.height - this.bonusImg.height + this.bonusImg.height;
        this.bonus.init(this.bonusX, this.bonusY, this.bonusImg);
    }

    this.draw = function(x, y, width, height, angle, yPrevKey){
        if(this.alive){
            this.img =  imageRepository.shields[this.index].img; 
            if(this.img.src.includes('3')){
                this.paddingY = 20;
            }
            else{
                this.paddingY = 0;
            }

            this.yDirection = yPrevKey == "up" ? 1 : -1;
            this.width = this.img.width;
            this.height = this.img.height;
                this.x = x;
            
            //x; //;
            this.y = this.yDirection == 1 ? (y - 15) : (y + 15); //- this.height + height + this.paddingY;
            drawRotatedImage(this.context, this.img, this.x, this.y, angle);
        }
    }

    this.clear = function(){
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.alive = false;
        this.isColliding = false;
        game.ship.isColliding = false;
    } 

    this.colliding = function(obj){
        if(obj.type == "bonus"){
            if(obj == game.laserBonus){
                game.ship.laserBonus = true;
                game.ship.lasersNum = game.laserBonus.index == 0 ? 3 : 4;
                game.ship.laserInitTime = Date.now();
                game.ship.laserTime = 0;
            }
        }
        else {
            this.status--;
            if(this.status == 0){
                this.clear();
            }
        }
    }   
}

Shield.prototype = new Drawable();