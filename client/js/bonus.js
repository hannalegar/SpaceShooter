function Bonus() {
    this.alive = false;
    this.type = "bonus";
    this.collidableWith = ["bullet", "ship", "shield", "enemy"];

    this.init = function(x, y, img) {
        this.x = x;
        this.y = y;
        this.width = img.width;
        this.height = img.height;
        this.img = img;
        this.alive = true;
        this.isColliding = false;
    }

    this.draw = function() {
        if(this.alive){
            this.context.drawImage(this.img, this.x, this.y);
        }
    }

    this.clear = function() {
        this.x = 0;
        this.y = 0;
        this.alive = false;
        this.isColliding = false;
    }
    
    this.colliding = function(obj) {
        this.clear();
    }
}

Bonus.prototype = new Drawable();