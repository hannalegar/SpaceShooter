var util = require("util"),
    io = require("socket.io"),
    Ship = require("./ship").Ship,
    Meteor = require("./meteor").Meteor;

var socket,
    players;

function init() {
    players = [];

    socket = io.listen(8000);
    socket.configure(function() {
        socket.set("transports", ["websocket"]);
        socket.set("log level", 2);
    });
};

function setEventHandlers() {
    socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
    util.log("New player has connected: " + client.id);
    client.on("disconnect", onClientDisconnect);
    client.on("new player", onNewPlayer);
    client.on("move player", onMovePlayer);
    client.on("remove player", onRemovePlayer);
    client.on("fire", onFire);
    client.on("damage", onDamage);
};

function onClientDisconnect() {
    util.log("Player has disconnected: " + this.id);
    onRemovePlayer.call(this);
};

function onNewPlayer(data) {
    console.log(data);
    if(players.length < 10){
        var newPlayer = new Ship(data.x, data.y);
        newPlayer.id = this.id;

        this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
        var i, existingPlayer;
        for (i = 0; i < players.length; i++) {
            existingPlayer = players[i];
            this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
        };

        players.push(newPlayer);
    }
};

function onMovePlayer(data) {
    var movePlayer = playerById(this.id);

    if(!movePlayer){
        util.log("Player not found: " + this.id);
        return;
    }

    movePlayer.setX(data.x);
    movePlayer.setY(data.y);
    movePlayer.angle = data.angle;
    movePlayer.yPrevKey = data.yPrevKey; 

    this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY(), angle: movePlayer.angle, yPrevKey: movePlayer.yPrevKey});
};

function onRemovePlayer(data) {
    var removePlayer = playerById(this.id);

    if (!removePlayer) {
        util.log("Player not found: " + this.id);
        return;
    };

    players.splice(players.indexOf(removePlayer), 1);
    this.broadcast.emit("remove player", {id: this.id});
}

function onFire(data) {
    var player = playerById(this.id);

    if(!player){
        util.log("Player not found: " + this.id);
    }

    player.fire = data.fire;
    this.broadcast.emit("fire", {id: player.id, fire: player.fire});
}

function onDamage(data) {
    var player = playerById(this.id);

    if(!player){
        util.log("Player not found:" + this.id);
    }

    player.status = data.status;
    this.broadcast.emit("damage", {id: player.id, status: player.status});
}

function playerById(id) {
    var i;
    for (i = 0; i < players.length; i++) {
        if (players[i].id == id)
            return players[i];
    };

    return false;
};

init();
setEventHandlers();