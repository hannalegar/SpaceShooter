function Ship(){
    this.bulletPool = new Pool(1000);
    this.bulletPool.init("bullet");
    var fireRate = 15;
    var counter = 0;
    this.collidableWith = ["enemyBullet", "meteor", "bonus", "enemy", "boss"];
    this.type = "ship";
    this.status = 400;
    this.laserBonus = false;
    this.lasersNum = 2;
    this.laserTime = 0;
    this.id;
    this.angle = 0;
    this.key;
    this.yPrevKey = "";
    this.xPrevKey = "";

    this.init = function(img, x, y, lifeImg) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = img.width;
        this.height = img.height;
        this.alive = true;
        this.isColliding = false;
        this.speed = 10;
        this.lifeImg = lifeImg;
        this.getFire = false;
        this.prevGetFire = false;
    }
    
    this.draw = function(){
        /*
        this.context.drawImage(imageRepository.fire1, this.x + this.img.width / 2 - imageRepository.fire1.width / 2, this.y + this.img.height - 30);
        this.context.drawImage(this.img, this.x, this.y);
        */

        this.getAngle();
        drawRotatedImage(this.context, this.img, this.x, this.y, this.angle);

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
            drawRotatedImage(this.context, this.damageImg, this.x, this.y, this.angle);
        }

        for(var i = 1; i <= this.status; i++){
            //this.context.drawImage(this.lifeImg, this.canvas.width - i * (this.lifeImg.width + 10), 30);
        }

        if(this.shield){
            game.shield.draw(this.x, this.y, this.width, this.height, this.angle, this.yPrevKey);
        }
    }

    this.move = function(){
        counter++;

        this.prevGetFire = this.getFire;
        this.getFire = false;
        this.prevX = this.x;
        this.prevY = this.y;

        if(KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up){
            if(KEY_STATUS.left){
                this.x -= this.speed;
                this.key = "left";
                if(this.x <= 0){
                    this.x = 0;
                }
                //this.xPrevKey = this.key;
            }
            else if(KEY_STATUS.right){
                this.x += this.speed;
                this.key = "right";
                if(this.x >= this.canvasWidth - this.width){
                    this.x = this.canvasWidth - this.width;
                }
               // this.xPrevKey = this.key;
            }
            else if(KEY_STATUS.up){
                this.y -= this.speed;
                this.key = "up";
                if(this.y <= 0){
                    this.y = 0;
                }
                this.yPrevKey = this.key;
            }
            else if(KEY_STATUS.down){
                this.y += this.speed;
                this.key = "down";
                if(this.y >= this.canvasHeight - this.height){
                    this.y = this.canvasHeight - this.height;
                } 
                this.yPrevKey = this.key;
            }
            
        }
        
        if(this.alive){
            this.draw();
        }
        
        if(KEY_STATUS.space && counter >= fireRate){
            this.getFire = true;
            this.key = "space";
            this.fire();
            counter = 0;
        }

        return (this.prevX != this.x || this.prevY != this.y) ? true : false; 
    }

    this.getAngle = function() {
        switch (this.key) {/*
            case "right":
                this.angle = this.yPrevKey == "up" ? 40 : -220;
                break;
            case "left":
                this.angle = this.yPrevKey == "up" ? -40 : 220;
                break;*/
            case "up":
                this.angle = 0;
                break;
            case "down":
                this.angle = 180;
                break;
        }
    }

    this.fire = function(){
        if(this.getFire){
            this.bulletPool.getTwo(this.x, this.y, 10, this.angle, this.x + this.img.width - imageRepository.bullet.width, this.y, 10, this.angle, this.yPrevKey);
            switch (this.lasersNum) {
                case 3:
                    this.bulletPool.get(this.x + this.width / 2 - imageRepository.bullet.width / 2, this.y, 10, this.angle, this.yPrevKey);
                    break;
                case 4:
                    this.bulletPool.getTwo(this.x + this.width / 4, this.y, 10, this.x + (this.width / 4) * 3 - imageRepository.bullet.width, this.y, 10, this.yPrevKey);
                    break;
            }
            game.laser.get();
        }
    }

    this.colliding = function(obj) {
        if(obj.type == "bonus"){
            if(obj == game.shield.bonus){
                this.shield = true;
                game.shield.alive = true;
                game.shield.status = game.shield.index + 100;
                this.isColliding = true;
            }
            if(obj == game.laserBonus){
                this.laserBonus = true;
                this.lasersNum = game.laserBonus.index == 0 ? 3 : 4;
                this.laserInitTime = Date.now();
                this.laserTime = 0;
            }
        }
        else{
            this.status--;
            if(this.status == 0){
                this.alive = false;
            }
        }
    }

    this.getX = function(){
        return this.x;
    }

    this.getY = function() {
        return this.y;
    }

    this.setX = function(newX) {
        this.x = newX;
    }
    
    this.setY = function(newY) {
        this.y = newY;
    }
}

Ship.prototype = new Drawable();