function Pool(maxSize) {
    this.size = maxSize;
    this.pool = [];

    this.init = function (object) {
        if (object == "bullet") {
            for (var i = 0; i < this.size; i++) {
                var bullet = new Bullet("bullet");
                bullet.init(0, 0, imageRepository.bullet.width, imageRepository.bullet.height);
                bullet.collidableWith = ["enemy", "meteor", "bonus", "boss"];
                bullet.type = "bullet";
                this.pool[i] = bullet;
            }
        }
        else if (object == "enemy") {
            for (var i = 0; i < this.size; i++) {
                var enemy = new Enemy();
                /*
                this.enemiesFirstIndex = Math.floor(Math.random() * imageRepository.allEnemiesShip.length);
                this.enemiesSecondIndex = Math.floor(Math.random() * imageRepository.allEnemiesShip[this.enemiesFirstIndex].length);
                enemy.img = imageRepository.allEnemiesShip[this.enemiesFirstIndex][this.enemiesSecondIndex].img;
                */
                //   debugger;
                this.enemiesSecondIndex = Math.floor(Math.random() * imageRepository.allEnemiesShip[game.enemyWaves].length);
                enemy.img = imageRepository.allEnemiesShip[game.enemyWaves][this.enemiesSecondIndex].img;
                enemy.init(0, 0, enemy.img.width, enemy.img.height);
                this.pool[i] = enemy;
            }
        }
        else if (object == "enemyBullet") {
            for (var i = 0; i < this.size; i++) {
                var bullet = new Bullet("enemyBullet");
                bullet.init(0, 0, imageRepository.bullet.width, imageRepository.bullet.height);
                bullet.collidableWith = ["ship", "meteor", "shield"];
                bullet.type = "enemyBullet";
                this.pool[i] = bullet;
            }
        }
        else if (object == "meteor") {
            for (var i = 0; i < this.size; i++) {
                var meteor = new Meteor();
                this.length = imageRepository.allMeteors.length - 1;
                this.meteorfirstIndex = Math.floor(Math.random() * this.length);
                this.meteorSecondIndex = Math.floor(Math.random() * (imageRepository.allMeteors[this.meteorfirstIndex].length));
                meteor.img = imageRepository.allMeteors[this.meteorfirstIndex][this.meteorSecondIndex].img;

                meteor.init(0, 0, meteor.img.width, meteor.img.height);
                this.pool[i] = meteor;
            }
        }
        else if (object == "animation") {
            for (var i = 0; i < this.size; i++) {
                var animation = new Animation();
                animation.init();
                this.pool[i] = animation;
            }
        }
    }

    this.getPool = function () {
        var obj = [];
        for (var i = 0; i < this.size; i++) {
            if (this.pool[i] === undefined) {
                this.pool.splice(i, 1);
            }
            else {
                if (this.pool[i].alive) {
                    obj.push(this.pool[i]);
                }
            }
        }
        return obj;
    }

    this.get = function (x, y, speed, angle, yPrevKey) {
        if (this.pool[this.size - 1].alive == false) {
            this.pool[this.size - 1].spawn(x, y, speed, angle, yPrevKey);
            this.pool.unshift(this.pool.pop());
        }
    }

    this.getTwo = function (x1, y1, speed1, angle1, x2, y2, speed2, angle2, yPrevKey) {
        if (this.pool[this.size - 1].alive == false && this.pool[this.size - 2].alive == false) {
            if (this.pool[this.size - 1].type == "bullet" && game.ship.lasersNum == 3) {
                this.pool[this.size - 1].position = game.ship.yPrevKey == "up" ? "left" : "right";
                this.pool[this.size - 2].position = game.ship.yPrevKey == "up" ? "right" : "left";
            }
            this.get(x1, y1, speed1, angle1, yPrevKey);
            this.get(x2, y2, speed2, angle2, yPrevKey);
        }
    }

    this.animate = function () {
        for (var i = 0; i < this.size; i++) {
            if(typeof this.pool[i] === 'undefined') {
                continue;
            }


            if (this.pool[i].alive) {
                if (this.pool[i].draw()) {
                    this.pool[i].clear();
                    this.pool.push((this.pool.splice(i, 1))[0]);
                }
            }
        }
    }

    this.clear = function () {
        for (var i = 0; i < this.pool.length; i++) {
            this.pool[i].clear();
        }
    }

    this.set = function (object) {
        if(this.pool.length < this.size){
            this.pool.push(object);   
        }
    };

    this.getById = function (id) {
        for (var i = 0; i < this.size; i++) {
            if (this.pool[i].id == id) {
                return this.pool[i];
            }
        }
        return false;
    }
}