function Boss() {
    this.percentFire = 0.05;
    this.chance = 0;
    this.type = "boss";
    this.maxSpeed = 5;
    this.healthbarWidth = 75;
    this.healthbarHeight = 45;

    this.init = function(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;
        this.isColliding = false;
        this.xDirection = this.direction();
        this.yDirection = this.direction();
        this.speedX = (Math.random() * this.maxSpeed + 1) * this.xDirection;
        this.speedY = (Math.random() * this.maxSpeed + 1) * this.yDirection;
        this.status = 50;
       // debugger;
    }

    this.draw = function(){
        if(this.alive){
            this.isColliding = false;
            if(this.img.src.includes('1')){ //nagy
                this.leftPadding = this.width / 4 - 5;
                this.rigthPading = (this.width / 4) * 3 + 5;
                this.yPadding = -this.height / 2 + 20;
            }
            else if (this.img.src.includes('2')){ //kereszt
                this.leftPadding = this.width / 4 + 3;
                this.rigthPading = (this.width / 4) * 3 - 3;
                this.yPadding = -35;
            }
            else if (this.img.src.includes('3')){ //lapos
                this.leftPadding = this.width / 4 + imageRepository.fire2.width - 3;
                this.rigthPading = (this.width / 4) * 3 - imageRepository.fire2.width + 3;
                this.yPadding = -this.height / 2 + 5;
            }



            drawRotatedImage(this.context, imageRepository.fire2, this.x + this.leftPadding, this.y + this.yPadding, 180);
            drawRotatedImage(this.context, imageRepository.fire2, this.x + this.rigthPading, this.y + this.yPadding, 180);
            this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
            
            this.x += this.speedX;
            this.y += this.speedY;

            if(this.x <= 0 || this.x + this.width >= this.canvas.width){
                this.x = this.x <= 0 ? 0 : this.canvas.width - this.width;
                this.xDirection *= -1;
                this.speedX = (Math.random() * this.maxSpeed + 1) * this.xDirection;
                this.yDirection *= -1;
                this.speedY = (Math.random() * this.maxSpeed + 1) * this.yDirection;
            }

            if(this.y <= 0 || this.y + this.height >= this.canvas.height / 2){
                this.y = this.y <= 0 ? 0 : this.canvas.height / 2 - this.height;
                this.xDirection *= -1;
                this.speedX = (Math.random() * this.maxSpeed + 1) * this.xDirection;
                this.yDirection *= -1;
                this.speedY = (Math.random() * this.maxSpeed + 1) * this.yDirection;
            }
            this.chance = Math.floor(Math.random()*101);
            if (this.chance/100 < this.percentFire) {
                this.fire();
                game.laser.get();
            }
            
            this.healthbarX = this.x + (this.width - this.healthbarWidth) / 2;
            
            this.context.save();
            this.context.globalAlpha = 0.4;
            
            this.context.beginPath();
            //this.context.drawImage(this.healthbarImage, this.healthbarX, this.y + this.healthbarImage.height / 2, this.healthbarWidth, this.healthbarImage.height / 3);
            this.context.rect(this.healthbarX, this.y - 20, this.healthbarWidth, this.healthbarHeight / 3);
            this.context.fillStyle = "white";
            this.context.fill();
            this.context.closePath();
            this.context.restore();

            this.context.beginPath();
            this.context.rect(this.healthbarX, this.y - 20, this.healthbarWidth * (this.status / 50), this.healthbarHeight / 3);
            this.context.fillStyle = "#ac3939";
            this.context.fill();
            this.context.closePath();
        }
    }

    this.direction = function(){
     //   debugger;
        var ret = Math.floor(Math.random() * 2 + 1);
        if(ret == 1){
            ret = 1;
        }
        else {
            ret = -1;
        }
        return ret;
    }

    this.colliding = function(obj){
        this.isColliding = true;
        this.status--;
        if(this.status == 0){
            this.alive = false;
        }
    }
}

Boss.prototype = new Enemy();