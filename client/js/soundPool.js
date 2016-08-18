function SoundPool(maxSize) {
    var size = maxSize;
    var pool = [];
    this.pool = pool;
    var currSound = 0;

    this.init = function(object) {
        if(object == "laser") {
            for (var i = 0; i < size; i++) {
                laser = new Audio('assets/SpaceShooterRedux/Bonus/sfx_laser2.ogg');
                laser.volume = .12;
                laser.load();
                pool[i] = laser;
            }
        }
        /*
        else if(object == "explosion"){
            for (var i = 0; i < size; i++) {
                var explosion = new Audio("");
                explosion.volume = .1;
                explosion.load();
                pool[i] = explosion;
            }
        }*/
    }

    this.get = function() {
        if(pool[currSound].currentTime == 0 || pool[currSound].ended){
          //  pool[currSound].play();
        }
        currSound = (currSound + 1) % size;
    }
}