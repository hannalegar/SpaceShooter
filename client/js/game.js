function Game() {
    this.init = function() {
        this.remotePlayers = [];
        this.state = "GAME_SCREEN";
        this.bgCanvas = document.getElementById('background');
        this.shipCanvas = document.getElementById('ship');  
        this.mainCanvas = document.getElementById('main');

        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');
            this.shipContext = this.shipCanvas.getContext('2d');
            this.mainContext = this.mainCanvas.getContext('2d');

            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;

            Ship.prototype.canvas = this.shipCanvas;
            Ship.prototype.context = this.shipContext;
            Ship.prototype.canvasWidth = Ship.prototype.canvas.width;
            Ship.prototype.canvasHeight = Ship.prototype.canvas.height;

            Bullet.prototype.context = this.mainContext;
            Bullet.prototype.canvasWidth = this.mainCanvas.width;
            Bullet.prototype.canvasHeight = this.mainCanvas.height;

            Enemy.prototype.canvas = this.mainCanvas;
            Enemy.prototype.context = this.mainContext;
            Enemy.prototype.canvasWidth = Enemy.prototype.canvas.width;
            Enemy.prototype.canvasHeight = Enemy.prototype.canvas.height;

            RemotePlayers.prototype.canvas = this.mainCanvas;
            RemotePlayers.prototype.context = this.mainContext;
            RemotePlayers.prototype.canvasWidth = RemotePlayers.prototype.canvas.width;
            RemotePlayers.prototype.canvasHeight = RemotePlayers.prototype.canvas.height;

            Boss.prototype.canvas = this.mainCanvas;
            Boss.prototype.context = this.mainContext;
            Boss.prototype.canvasWidth = Boss.prototype.canvas.width;
            Boss.prototype.canvasHeight = Boss.prototype.canvas.height;

            Meteor.prototype.canvas = this.mainCanvas;
            Meteor.prototype.context = this.mainContext;
            Meteor.prototype.canvasWidth = Meteor.prototype.canvas.width;
            Meteor.prototype.canvasHeight = Meteor.prototype.canvas.height;

            Bonus.prototype.canvas = this.mainCanvas;
            Bonus.prototype.context = this.mainContext;
            Bonus.prototype.canvasWidth = Bonus.prototype.canvas.width;
            Bonus.prototype.canvasHeight = Bonus.prototype.canvas.height;

            Shield.prototype.canvas = this.shipCanvas;
            Shield.prototype.context = this.shipContext;
            Shield.prototype.canvasWidth = Shield.prototype.canvas.width;
            Shield.prototype.canvasHeight = Shield.prototype.canvas.height;

            Animation.prototype.canvas = this.mainCanvas;
            Animation.prototype.context = this.mainContext;
            Animation.prototype.canvasWidth = Animation.prototype.canvas.width;
            Animation.prototype.canvasHeight = Animation.prototype.canvas.height;

            this.shield = new Shield(); 

            this.background = new Background();
            this.background.init(0,0);

            this.ship = new Ship();
            this.ship.alive = true;
            this.playerScore = 0;

            this.shipStartX = this.shipCanvas.width/2 - imageRepository.spaceShip.width;
            this.shipStartY = this.shipCanvas.height/4*3 + imageRepository.spaceShip.height*2 - 200;
            //debugger;
            this.shipImg = imageRepository.allPlayerShip[2][3].img;
            this.shipLifeImg = imageRepository.allPlayerLife[2][3].img;
            this.ship.init(this.shipImg, this.shipStartX, this.shipStartY, this.shipLifeImg);

           // this.enemyWaves = 0;
            //this.spawnWave();
            //this.boss = new Boss();
                
            this.enemyBulletPool = new Pool(200);
            this.enemyBulletPool.init("enemyBullet");

            this.meteors();

            this.quadTree = new QuadTree({
                x: 0,
                y: 0,
                width: this.mainCanvas.width,
                height: this.mainCanvas.height
            });

            this.laser = new SoundPool(10);
            this.laser.init("laser");

            this.laserBonus = new Bonus();
                       
            this.gameOverAudio = new Audio("assets/SpaceShooterRedux/Bonus/sfx_lose.ogg");
            this.gameOverAudio.loop = true;
            this.gameOverAudio.volume = .25;
            this.gameOverAudio.load();

            this.animationOptions = {
                img: imageRepository.smokeAnimation,
                screen: main,
                spw: 92,
                frames: 3 
            }

            this.animationPool = new Pool(10);
            this.animationPool.init("animation");

            this.remotePlayers = new Pool(10);

            this.checkAudio = window.setInterval(function() {checkReadyState()}, 1000);
            return true;
        }
        else {
            return false;
        }
    }

    this.draw = function() {
        for(var i = 0; i < this.remotePlayers.pool.length; i++){
            this.remotePlayers[i].draw();
        }
    }

    this.clearContext = function() {
        Ship.prototype.context.clearRect(0, 0, Ship.prototype.canvas.width, Ship.prototype.canvas.height);
        Bullet.prototype.context.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        Enemy.prototype.context.clearRect(0, 0, Enemy.prototype.canvas.width, Enemy.prototype.canvas.height);
        Meteor.prototype.context.clearRect(0, 0, Meteor.prototype.canvas.width, Meteor.prototype.canvas.height);
    }

    this.spawnWave = function() {
        this.enemiesNum = Math.floor(Math.random() * 20 + 1);//Math.floor(Math.random() * (this.enemyWaves * 5) + this.enemyWaves * 2);
        this.enemyPool = new Pool(this.enemiesNum);
        
        this.enemyBulletPool = new Pool(/*this.enemyWaves */ 40);
        this.enemyBulletPool.init("enemyBullet");

        this.enemyPool.init("enemy");
        this.enemies = [];

        for (var i = 0; i < this.enemiesNum; i++) {  
            do{
                this.x = Math.floor(Math.random() * 1800);
                this.y = 0 - this.enemyPool.pool[i].img.height - Math.floor(Math.random() * 1080);
            }while(this.enemiesCollision(this.x, this.y, this.enemyPool.pool[i].img, this.enemies));

            var enemy = {x: this.x, y: this.y, width: this.enemyPool.pool[i].img.width, height: this.enemyPool.pool[i].img.height};
/*
            this.x = Math.floor(Math.random() * 1820);
            this.y = 0;// - this.enemyPool.pool[i].img.height - Math.floor(Math.random() * 1080);
*/
            this.enemyPool.get(this.x, this.y, 2);
            this.enemies[i] = enemy;//this.enemyPool.pool[i];
        }
        
        this.enemyWaves++;
        if(this.enemyWaves == imageRepository.allEnemiesShip.length){
            this.enemyWaves = 0;
        }
    }

    this.generateBoss = function(){
      //  debugger;
      /*
        this.enemiesSecondIndex = Math.floor(Math.random() * imageRepository.allEnemiesShip[game.enemyWaves - 1].length);
        this.boss.img = imageRepository.allEnemiesShip[game.enemyWaves - 1][this.enemiesSecondIndex].img;
        */
        this.boss.img = imageRepository.bosses[Math.floor(Math.random() * imageRepository.bosses.length)].img;
        //this.boss.img = imageRepository.bosses[2].img;
        this.boss.init(Math.random() * (1920 - this.boss.img.width * 1.5), 0, this.boss.img.width * 1.5, this.boss.img.height * 1.5);
        this.enemyBulletPool = new Pool(/*this.enemyWaves */ 400);
        this.enemyBulletPool.init("enemyBullet");
    }

    this.enemiesCollision = function(x, y, img, enemies) {
       // debugger;
        for(var i = 0; i < enemies.length; i++){
            var enemy = enemies[i];
            if(((x >= enemy.x && x <= enemy.x + enemy.width) || (x <= enemy.x && x + img.width >= enemy.x)) && 
              ((y >= enemy.y && y <= enemy.y + enemy.height) || (y <= enemy.y && y + img.height >= enemy.y))){
                return true;
            }
        }
        return false;
    }


  //  this.enemiesCollision = function(x, y, img, enemy) {
    /*    console.log("x: " + x);
        console.log("y: " + y);
        console.log("x + img.width: " + (x + img.width));
        console.log("y + img.height: " + (y + img.height));
            
        console.log("enemy.x: " + enemy.x);
        console.log("enemy.y: " + enemy.y);
        console.log("enemy.x + enemy.img.width: " + (enemy.x + enemy.width));
        console.log("enemy.y + enemy.img.height: " + (enemy.y + enemy.height));*/
     //   debugger;
 /*       if(((x >= enemy.x && x <= enemy.x + enemy.width) || (x <= enemy.x && x + img.width >= enemy.x)) && 
        ((y >= enemy.y && y <= enemy.y + enemy.height) || (y <= enemy.y && y + img.height >= enemy.y))){
            return true;
        }
        return false;
    }
*/
    this.meteors = function(){
        this.meteorNum = Math.floor(Math.random() * 25 + 5);
        this.meteorPool = new Pool(50);
        this.meteorPool.init("meteor");

        for(var i = 0; i < 30; i++){
            if(i < this.meteorNum){
                do{
                    this.x = Math.floor(Math.random() * 1920);
                    this.y = Math.floor(Math.random() * 1080);
                }while(this.x > this.ship.x - 100 && this.x < this.ship.x + this.ship.width + 100 && this.y > this.ship.y - 100 && this.y < this.ship.y + this.ship.height + 100)
                this.speed = Math.random() * 2 + 0.1;

                this.meteorPool.get(this.x, this.y, this.speed, 0);
            }
        }
    }

    this.generateLaserBonus = function(){
        this.index = 0;//Math.floor(Math.random() * imageRepository.bonuses.length);
        this.laserBonusImg = imageRepository.bonuses[this.index].img;
        this.laserBonusX = Math.random() * (Bonus.prototype.canvasWidth - this.laserBonusImg.width);
        this.laserBonusY = Math.random() * (Bonus.prototype.canvasHeight - this.laserBonusImg.height);
        this.laserBonus.init(this.laserBonusX, this.laserBonusY, this.laserBonusImg);
        this.laserBonus.index = this.index;
    }

    this.startAnimation = function() {
        animate();
    }

    this.gameOver = function() {
        this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
        this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.gameOverAudio.currentTime = 0;
       // this.gameOverAudio.play();
        document.getElementById('game-over').style.display = "block";
        document.getElementById('scoreId').style.display = "none";
        
    }

    this.restart = function() {
	//	this.gameOverAudio.pause();
		
        document.getElementById('game-over').style.display = "none";
        document.getElementById('scoreId').style.display = "block";
		
        this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
		this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
		this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
		
        this.quadTree.clear();
		
        this.background.init(0,0);

		this.ship.init(this.shipStartX, this.shipStartY, imageRepository.spaceShip.width, imageRepository.spaceShip.height);
        this.ship.alive = true;
        this.ship.isColliding = false;
		this.playerScore = 0;
        this.ship.bulletPool.clear();
        this.ship.status = 4;
        this.ship.laserBonus = false;
        this.ship.lasersNum = 2;
        
        //this.boss.alive = false;
        //this.enemyWaves = 0;
		//this.spawnWave();
        this.enemyBulletPool = new Pool(200);
		this.enemyBulletPool.init("enemyBullet");
        //this.enemyPool.clear();

        this.meteors();
    
        this.shield.alive = false;
        this.shield.bonus.alive = false;
        
       // debugger;
        this.state = "GAME_SCREEN";
    }

    this.startScreen = function() {
        /*
        this.shipContext.rect((this.shipCanvas.width / 2) - 1, 0, 2, this.shipCanvas.height);
        this.shipContext.fillStyle = "white";
        this.shipContext.fill();

        this.shipContext.rect(0, (this.shipCanvas.height / 2) - 1, this.shipCanvas.width, 2);
        this.shipContext.fillStyle = "white";
        this.shipContext.fill();
        */

        this.playerShips = [];
        this.index = 0;
        for(var i = 0; i < imageRepository.allPlayerShip.length; i++){
            for(var j = 0; j < imageRepository.allPlayerShip[i].length; j++){
                //debugger;
                this.img = imageRepository.allPlayerShip[i][j].img;
                this.widthPadding = 150;
                this.heightPadding = 150;
                this.x = ((this.shipCanvas.width - this.img.width) / 2) - ((j - 1.5) * this.widthPadding);
                this.y = ((this.shipCanvas.height - this.img.height) / 2) - ((i - 2) * this.heightPadding);

                this.playerShip = {x: this.x, y: this.y, width: this.img.width, height: this.img.height, img: this.img, i: i, j: j};
                this.playerShips[this.index] = this.playerShip;
                this.index++;
                
                this.shipContext.clearRect(this.playerShip.x - 5, this.playerShip.y - 5, this.playerShip.width + 5, this.playerShip.height + 5);
                this.shipContext.drawImage(this.img, this.x, this.y);

            }
        }
    }

}