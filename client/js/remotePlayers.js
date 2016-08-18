function RemotePlayers(id) {
    this.id = id;
    this.collidableWidth = ["bullet", "meteor", "ship", "bonus"];
    this.type = "enemy";    
    this.img = imageRepository.allPlayerShip[2][3].img;
    this.shield;
    this.status;
    this.angle;
    this.yPrevKey = "";

    this.spawn = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.width = this.img.width;
        this.height = this.img.height;
        this.speed = speed;
        this.alive = true;
        this.getFire = false;
        this.shield = false;
        this.status = 400;
    };

    this.draw = function() {
        if(this.alive){
          //  drawRotatedImage(this.context, imageRepository.fire1, this.x + this.width / 2, this.y - this.height / 2 + 20, 180);
            
            //this.context.drawImage(imageRepository.fire1, this.x + this.img.width / 2 - imageRepository.fire1.width / 2, this.y + this.img.height - 30);
            //this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
            drawRotatedImage(this.context, this.img, this.x, this.y, this.angle);

            if(this.getFire){
                this.fire();
                this.getFire = false;
            }

            if(this.status < 4){
                if(this.img.src.includes('1')){
                    this.damageImg = imageRepository.allDamage[0][this.status - 1].img;
                }
                else if(this.img.src.includes('2')){
                    this.damageImg = imageRepository.allDamage[1][this.status - 1].img;
                }
                else if(this.img.src.includes('3')){
                    this.damageImg = imageRepository.allDamage[2][this.status - 1].img;
                }
                //this.context.drawImage(this.damageImg, this.x, this.y);
                drawRotatedImage(this.context, this.damageImg, this.x, this.y, this.angle);
            }

            if(this.shield){
                game.shield.draw(this.x, this.y, this.width, this.height, this.angle, this.yPrevKey);
                this.isColliding = true;
            }

            return false;    
        }
        else {
            //   game.playerScore += 10;
            return true;
        }
    }

    this.fire = function() {
        game.enemyBulletPool.getTwo(this.x, this.y, 10, this.angle, this.x + this.img.width - imageRepository.enemyBullet.width, this.y, 10, this.angle, this.yPrevKey);
    }
                
    this.clear = function() {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.alive = false;
        this.isColliding = false;
    }

    this.colliding = function(obj){
        if(obj.type == "bonus"){
            if(obj == game.shield.bonus){
                this.shield = true;
                game.shield.alive = true;
                game.shield.status = game.shield.index + 100;
                this.isColliding = true;
            }
        }
        else {
            this.status--;
            if(this.status == 0){
                this.alive = false;
            }
        }
    }
}

RemotePlayers.prototype = new Drawable();