function Drawable() {
    this.init = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.collidableWith = "";
    this.isColliding = false;
    this.type = "";

    this.draw = function(){
    }

    this.move = function(){
    }

    this.isCollidableWith = function(object){
        return (this.collidAbleWith === object.type);
    }

    this.colliding = function() {
    }
}