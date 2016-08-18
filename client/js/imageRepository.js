var imageRepository = new function() {
    this.background = new Image();
    this.spaceShip =  new Image();
    this.bullet = new Image();
	this.enemy = new Image();
	this.enemyBullet = new Image();
    this.fire1 = new Image();
    this.fire2 = new Image();
    this.fire3 = new Image();
    this.smokeAnimation = new Image();
    this.planet = new Image();

    this.playerShipOne = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip1_blue.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip1_green.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip1_orange.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip1_red.png' 
    }];

    this.playerShipTwo = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip2_blue.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip2_green.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip2_orange.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip2_red.png' 
    }];

    this.playerShipThree = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip3_blue.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip3_green.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip3_orange.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/playerShip3_red.png' 
    }];

    this.allPlayerShip = [this.playerShipThree, this.playerShipTwo, this.playerShipOne];

    this.playerLifeOne = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife1_blue.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife1_green.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife1_orange.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife1_red.png' 
    }];

    this.playerLifeTwo = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife2_blue.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife2_green.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife2_orange.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife2_red.png' 
    }];

    this.playerLifeThree = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife3_blue.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife3_green.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife3_orange.png' 
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/UI/playerLife3_red.png' 
    }];

    this.allPlayerLife = [this.playerLifeThree, this.playerLifeTwo, this.playerLifeOne];

    this.enemyShipOne = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyBlack1.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyBlue1.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyGreen1.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyRed1.png'
    }];

    this.enemyShipTwo = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyBlack2.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyBlue2.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyGreen2.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyRed2.png'
    }];


    this.enemyShipThree = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyBlack3.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyBlue3.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyGreen3.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyRed3.png'
    }];

    
    this.enemyShipFour = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyBlack4.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyBlue4.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyGreen4.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyRed4.png'
    }];

    
    this.enemyShipFive = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyBlack5.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyBlue5.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyGreen5.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Enemies/enemyRed5.png'
    }];

    this.allEnemiesShip = [ this.enemyShipOne, this.enemyShipTwo, this.enemyShipThree, this.enemyShipFour, this.enemyShipFive ];

    this.bigMeteors = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Meteors/meteorBrown_big2.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Meteors/meteorBrown_big3.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Meteors/meteorBrown_big4.png'
    }];

    this.medMeteors = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Meteors/meteorBrown_med1.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Meteors/meteorBrown_med3.png'
    }];


    this.smallMeteors = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Meteors/meteorBrown_small1.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Meteors/meteorBrown_small2.png'
    }];


    this.tinyMeteors = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny1.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny2.png'
    }];

    this.allMeteors = [this.bigMeteors, this.medMeteors, this.smallMeteors, this.tinyMeteors ];

    this.damageShipOne = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Damage/playerShip1_damage3.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Damage/playerShip1_damage2.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Damage/playerShip1_damage1.png'
    }];

    this.damageShipTwo = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Damage/playerShip2_damage3.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Damage/playerShip2_damage2.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Damage/playerShip2_damage1.png'
    }];

    this.damageShipThree = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Damage/playerShip3_damage3.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Damage/playerShip3_damage2.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Damage/playerShip3_damage1.png'
    }];

    this.allDamage = [this.damageShipOne, this.damageShipTwo, this.damageShipThree];

    this.shieldBonus = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Power-ups/shield_bronze.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Power-ups/shield_silver.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Power-ups/shield_gold.png'
    }];

    this.shields = [{
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Effects/shield1.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Effects/shield2.png'
    },
    {
        img: new Image(),
        file: 'assets/SpaceShooterRedux/PNG/Effects/shield3.png'
    }];

    this.bosses = [{
        img: new Image(),
        file: 'assets/boss1.png'
    },
    {
        img: new Image(),
        file: 'assets/boss2.png'
    },
    {
        img: new Image(),
        file: 'assets/boss3.png'
    }];

    this.bonuses = [{
        img: new Image(),
        file: "assets/SpaceShooterRedux/PNG/Power-ups/bold_silver.png"
    },
    {
        img: new Image(),
        file: "assets/SpaceShooterRedux/PNG/Power-ups/bolt_gold.png"
    }]

    var numImages = 84;
    var numLoaded = 0;

    function imageLoaded(){
        numLoaded++;
        //console.log(numLoaded);
        if(numLoaded === numImages){
            window.init();
        }
    }

    this.background.onload = function(){
        imageLoaded();
    }
    this.spaceShip.onload = function(){
        imageLoaded();
    }
    this.bullet.onload = function(){
        imageLoaded();
    }
    this.enemy.onload = function() {
        imageLoaded();
    }
    this.enemyBullet.onload = function() {
        imageLoaded();
    }

    this.fire1.onload = function() {
        imageLoaded();
    }

    this.fire2.onload = function() {
        imageLoaded();
    }
    
    this.fire3.onload = function() {
        imageLoaded();
    }

    this.smokeAnimation.onload = function(){
        imageLoaded();
    }

    this.planet.onload = function(){
        imageLoaded();
    }

    this.loadAllShips = function(ships){
        this.ship = [];
        this.loadShip = function(i){
            return ships[i].img.onload = function(){
                imageLoaded();
            }
        }
        for(var i = 0; i < ships.length;  i++){
            this.ship[i] = this.loadShip(i);
            ships[i].img.src = ships[i].file;
        }
    }
                
    for(var j = 0; j < this.allPlayerShip.length; j++){
        this.loadAllShips(this.allPlayerShip[j]);
    }

    for(var j = 0; j < this.allEnemiesShip.length; j++){
        this.loadAllShips(this.allEnemiesShip[j]);
    }

    for(var j = 0; j < this.allMeteors.length; j++){
        this.loadAllShips(this.allMeteors[j]);
    }

    for(var j = 0; j < this.allDamage.length; j++){
        this.loadAllShips(this.allDamage[j]);
    }

    for(var j = 0; j < this.allPlayerLife.length; j++){
        this.loadAllShips(this.allPlayerLife[j]);
    }
    
    this.loadAllShips(this.shieldBonus);
    this.loadAllShips(this.shields);
    this.loadAllShips(this.bosses);
    this.loadAllShips(this.bonuses);

    this.background.src = "assets/Background2.png";
    this.spaceShip.src = "assets/SpaceShooterRedux/PNG/playerShip1_blue.png";
    this.bullet.src = "assets/SpaceShooterRedux/PNG/Lasers/laserBlue07.png";
    this.enemy.src = "assets/SpaceShooterRedux/PNG/Enemies/enemyBlack1.png";
    this.enemyBullet.src = "assets/SpaceShooterRedux/PNG/Lasers/laserRed07.png";
    this.fire1.src = "assets/fire1.png";
    this.fire2.src = "assets/fire2.png";
    this.fire3.src = "assets/fire3.png";
    this.smokeAnimation.src = 'assets/smokeAnimation.png';
    this.planet.src = "assets/planet.png";
}