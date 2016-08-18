function Meteor() {
    this.alive = false;
    this.img;
    this.type = "meteor";
    this.collidableWith = ["ship", "bullet", "enemyBullet", "enemy", "shield", "boss"];

    this.spawn = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.xDirection = Math.random() * 2 - 1;
        this.speedX = (Math.random() * 2 + 0.1) * this.xDirection;
        this.alive = true;
    }

    this.draw = function() {
        if(this.isColliding){
            return true;
        }
        else{
            this.context.drawImage(this.img, this.x, this.y);
            this.y += this.speed;
            this.x += this.speedX; 
            if(this.y > this.canvas.height || this.x > this.canvas.width || this.x + this.width < 0){
                this.y = 0 - this.height;
                this.x = Math.floor(Math.random() * 1920);
                this.speed = Math.random() * 2 + 1;    
            }
            return false;
        }
    }

    this.clear = function() {
        if(this.img.src.includes("small")){
            
            game.animationPool.get(this.x, this.y, game.animationOptions);

            this.length = imageRepository.allMeteors.length - 1;
            this.firstIndex = Math.floor(Math.random() * this.length);
            this.secondIndex = Math.floor(Math.random()* (imageRepository.allMeteors[this.firstIndex].length));
            this.img = imageRepository.allMeteors[this.firstIndex][this.secondIndex].img;
            this.x = Math.floor(Math.random() * 1920);
            this.y = 0 - this.img.height;
            this.speed = 0;
            this.alive = true;
            this.isColliding = false;
            

            if(Math.floor(Math.random() * 10 + 1) % 3 == 0){
                this.alive = false;
            }
        }
        else{/*
            var meteor = new Meteor();
            meteor.type = "meteor";
            meteor.collidableWidth = ["ship", "bullet", "enemyBullet", "enemy"];
            meteor.speed = this.speed;

            if(this.img.src.includes("big")){
                meteor.img = imageRepository.medMeteors[Math.floor(Math.random() * imageRepository.medMeteors.length)].img;
                this.img = imageRepository.medMeteors[Math.floor(Math.random() * imageRepository.medMeteors.length)].img;
            }
            else if(this.img.src.includes("med")){
                meteor.img = imageRepository.smallMeteors[Math.floor(Math.random() * imageRepository.smallMeteors.length)].img;
                this.img = imageRepository.smallMeteors[Math.floor(Math.random() * imageRepository.smallMeteors.length)].img;
            }
            else if(this.img.src.includes("small")){
                meteor.img = imageRepository.tinyMeteors[Math.floor(Math.random() * imageRepository.tinyMeteors.length)].img;
                this.img = imageRepository.tinyMeteors[Math.floor(Math.random() * imageRepository.tinyMeteors.length)].img;
            }

            meteor.init(this.x - Math.floor(Math.random() * 20), this.y - Math.floor(Math.random() * 20), meteor.img.width, meteor.img.height);
            game.meteorPool.pool.push(meteor);
            game.meteorPool.size = game.meteorPool.pool.length; 
            */
           // debugger;
            for(var i = 0; i < game.meteorPool.pool.length; i++){
                if(game.meteorPool.pool[i].alive == false){
                    var meteor = game.meteorPool.pool[i];
                    var index = i;
                    break;
                }
            }

            if(meteor != undefined){
                /*
                this.x = Math.floor(Math.random() * 1920);
                this.y = 0 - this.img.height;
                this.speed = 0;
                this.alive = false;
                this.isColliding = false;
                this.length = imageRepository.allMeteors.length;
                this.firstIndex = Math.floor(Math.random() * this.length);
                this.secondIndex = Math.floor(Math.random()* (imageRepository.allMeteors[this.firstIndex].length));
                this.img = imageRepository.allMeteors[this.firstIndex][this.secondIndex].img;*/
                if(this.img.src.includes("big")){
                        meteor.img = imageRepository.medMeteors[Math.floor(Math.random() * imageRepository.medMeteors.length)].img;
                    }
                    else if(this.img.src.includes("med")){
                        meteor.img = imageRepository.smallMeteors[Math.floor(Math.random() * imageRepository.smallMeteors.length)].img;
                    }/*
                    else if(this.img.src.includes("small")){
                        meteor.img = imageRepository.tinyMeteors[Math.floor(Math.random() * imageRepository.tinyMeteors.length)].img;
                    }*/
                    
                    meteor.x = this.x - Math.floor(Math.random() * 20);
                    meteor.y = this.y - Math.floor(Math.random() * 20);
                    meteor.speed = Math.random() * 2;
                    meteor.alive = true;
                    meteor.isColliding = false;
                    //game.meteorPool.pool[index] = meteor;
            }
            if(this.img.src.includes("big")){
                //meteor.img = imageRepository.medMeteors[Math.floor(Math.random() * imageRepository.medMeteors.length)].img;
                this.img = imageRepository.medMeteors[Math.floor(Math.random() * imageRepository.medMeteors.length)].img;
            }
            else if(this.img.src.includes("med")){
                //meteor.img = imageRepository.smallMeteors[Math.floor(Math.random() * imageRepository.smallMeteors.length)].img;
                this.img = imageRepository.smallMeteors[Math.floor(Math.random() * imageRepository.smallMeteors.length)].img;
            }/*
            else if(this.img.src.includes("small")){
              //  meteor.img = imageRepository.tinyMeteors[Math.floor(Math.random() * imageRepository.tinyMeteors.length)].img;
                this.img = imageRepository.tinyMeteors[Math.floor(Math.random() * imageRepository.tinyMeteors.length)].img;
            }*/

            this.x += Math.floor(Math.random() * 20);
            this.y += Math.floor(Math.random() * 20);
            this.alive = true;
            this.isColliding = false;
            /*meteor.x = this.x - Math.floor(Math.random() * 20);
            meteor.y = this.y - Math.floor(Math.random() * 20); 
            meteor.alive = false;
            meteor.isColliding = false;
            game.meteorPool.pool[index] = meteor;*/
            
        }
    }

    this.colliding = function() {
        this.isColliding = true;
        //game.animation.draw(this.x, this.y);
        //debugger;
    }
}

Meteor.prototype = new Drawable();