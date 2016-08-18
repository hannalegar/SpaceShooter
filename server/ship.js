function Ship(startX, startY) {
    var x = startX,
        y = startY,
        id = id,
        fire,
        status,
        angle,
        yPrevKey;
    
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var setX = function(newX) {
        x = newX;
    };

    var setY = function(newY) {
        y = newY;
    };

    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        id: id,
        fire: fire,
        status: status,
        angle: angle,
        yPrevKey: yPrevKey
    }
};

exports.Ship = Ship;