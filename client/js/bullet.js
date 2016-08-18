function Bullet(object){
    this.alive = false;
    var self = object;
    this.position = "";

    this.spawn = function(x, y, speed, angle, yPrevKey){
        this.x = x - game.ship.width / 2;
        this.y = y;
        this.speed = yPrevKey == "down" ? -speed : speed;//(self == "bullet" && game.ship.yPrevKey == "down") ? -speed : speed;//speed;
        this.angle = angle;
        this.alive = true;
    }

    this.draw = function(){
        this.y -= this.speed;// game.ship.yPrevKey == "up" ? this.y - this.speed: this.y + this.speed;//-= this.speed;
        if(this.isColliding){
            return true;
        }
        else if(self === "bullet", this.y <= 0 - this.height){
            return true;
        }
        else if(self === "enemyBullet" && this.y >= this.canvasHeight){
            return true;
        }
        else{
            if(self === "bullet"){
                this.img = imageRepository.bullet;
              //  debugger;
                switch (this.position) {
                    case "left":
                        this.x -= this.speed / 3;
                        drawRotatedImage(this.context, this.img, this.x, this.y, -30 + this.angle);
                        break;
                    case "right":
                        this.x += this.speed / 3;
                        drawRotatedImage(this.context, this.img, this.x, this.y, 30 + this.angle);
                        break;
                    case "":
                        drawRotatedImage(this.context, this.img, this.x, this.y, this.angle);
                }
            }
            else if(self === "enemyBullet"){
                this.img = imageRepository.enemyBullet;
                //this.context.drawImage(this.img, this.x, this.y);
                switch (this.position) {
                    case "left":
                        this.x -= this.speed / 3;
                        drawRotatedImage(this.context, this.img, this.x, this.y, -30 + this.angle);
                        break;
                    case "right":
                        this.x += this.speed / 3;
                        drawRotatedImage(this.context, this.img, this.x, this.y, 30 + this.angle);
                        break;
                    case "":
                        drawRotatedImage(this.context, this.img, this.x, this.y, this.angle);
                }
            }
            return false;
        }
    }

    this.clear = function(){
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.alive = false;
        this.isColliding = false;
        this.position = "";
        this.angle = 0;
    }

    this.colliding = function(obj) {
        if(self == "bullet" && obj.type == "bonus"){
            if(obj == game.shield.bonus) {
                game.shield.alive = true;
                game.shield.status = game.shield.index + 1;
            }
            if(obj == game.laserBonus){
                game.ship.laserBonus = true;
                game.ship.lasersNum = game.laserBonus.index == 0 ? 3 : 4;
                game.ship.laserInitTime = Date.now();
                game.ship.laserTime = 0;

            }
        }
        this.isColliding = true
        this.alive = false;
    }
}

Bullet.prototype = new Drawable();