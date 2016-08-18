function Enemy(img) {
    this.percentFire = 0.01;
    var chance = 0;
    this.alive = false;
    this.collidableWidth = ["bullet", "meteor", "ship", "shield"];
    this.type = "enemy";

    this.spawn = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.alive = true;
    };

    this.draw = function() {
        this.y += this.speed;
        if(!this.isColliding){
            drawRotatedImage(this.context, imageRepository.fire1, this.x + this.width / 2, this.y - this.height / 2 + 20, 180);
            this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
            chance = Math.floor(Math.random()*101);
            if (chance/100 < this.percentFire) {
                this.fire();
                game.laser.get();
            }
            if(this.y > this.canvas.height){
            //  debugger;
                do{
                    this.y = 0 - this.img.height - Math.floor(Math.random() * 100); 
                    this.x = Math.floor(Math.random() * (1920 - this.img.width));
                }while(this.newPosition(this.x, this.y))
            }
            return false;    
        }
        else {
            //   game.playerScore += 10;
            return true;
        }
    }

    this.newPosition = function(x, y) {
       //  debugger;
        for(var i = 0; i < game.enemyPool.pool.length; i++){
            var enemy = game.enemyPool.pool[i];
            if(enemy.alive && this != enemy){
                if(((x >= enemy.x && x <= enemy.x + enemy.width) || (x <= enemy.x && x + this.img.width >= enemy.x)) && 
                ((y >= enemy.y && y <= enemy.y + enemy.height) || (y <= enemy.y && y + this.img.height >= enemy.y))){
                    return true;
                }
            }
        }
        return false;
    }

    this.fire = function() {
        if(this.y > Math.floor(Math.random() * 0 - this.img.height / 2)){
            game.enemyBulletPool.getTwo(this.x + this.width * 2/3 , this.y + this.height * 3/4, -10, this.x + this.width * 1/4, this.y + this.height * 3/4, -10);
        }
    }
                
    this.clear = function() {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.alive = false;
        this.isColliding = false;
        this.img = imageRepository.enemyShipOne[Math.floor(Math.random() * (imageRepository.enemyShipOne.length - 1))].img;
    }

    this.colliding = function(obj){
        this.isColliding = true;
        this.alive = false;
    }
}

Enemy.prototype = new Drawable();