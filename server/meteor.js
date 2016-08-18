function Meteor() {
    var id,
        x,
        y,
        speed,
        xDirection,
        speedX;

    var setX = function(newX){
        x = newX;
    }

    var setY = function(newY) {
        y = newY;
    }

    var setSpeed = function(newSpeed){
        speed = newSpeed;
    }

    var setXDirection = function(newXDirection){
        xDirection = newXDirection;
    }

    var setSpeedX = function(newSpeedX){
        speedX = newSpeedX;
    }
    
    var getX = function(){
        return x;
    }

    var getY = function() {
        return y;
    }

    var getSpeed = function(){
        return speed;
    }

    var getXDirection = function(){
        return xDirection;
    }

    var getSpeedX = function(){
        return speedX;
    }

    return {
        setX: setX,
        setY: setY,
        setSpeed: setSpeed,
        setSpeedX: setSpeedX,
        setXDirection: setXDirection,
        getX: getX,
        getY: getY,
        getSpeed: getSpeed,
        getSpeedX: getSpeedX,
        getXDirection: getXDirection
    }
}

exports.Meteor = Meteor;