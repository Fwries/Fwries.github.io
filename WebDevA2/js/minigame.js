var myGamePiece;
var myObstacles = [];

function startGame() { // Create Player and start game
    myGamePiece = new component(50, 50, "img/right.gif", 250, 165, "image");
    myGameArea.start();
}

var myGameArea = { // Create canvas to project game onto
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 540;
        this.canvas.height = 330;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[2]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
	},
    clear : function() { // Clear so no worms
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() { // Stop program
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    
    this.update = function() { // Create Sprite
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    } // Speed acts how much to add every frame something like dt
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
	
	this.collideWith = function(otherobj) { // Hitbox
		var myleft = this.x + 10;
        var myright = this.x + (this.width) - 10;
        var mytop = this.y + 10;
        var mybottom = this.y + (this.height) - 10;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var collide = true;
		
		if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            collide = false;
        }
        return collide;
	}
}

function updateGameArea() { // Update
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) { // Check GameOver
        if (myGamePiece.collideWith(myObstacles[i])) { myGameArea.stop(); return; } 
    }
	
	myGameArea.clear(); // NO WORMS
	
	if (myGameArea.key) // Keyboard Input
	{
		myGamePiece.speedX = 0;
		myGamePiece.speedY = 0;
		if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -5; myGamePiece.image.src = "img/left.gif";}
		if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 5; myGamePiece.image.src = "img/right.gif";}
		if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -5; }
		if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 5; }
	}
	
	myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(15)) { // Spawn new obstacle
        x = Math.floor(Math.random() * myGameArea.canvas.width);
        y = 0;
        myObstacles.push(new component(10, 10, "black", x, y));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += 1;
        myObstacles[i].update();
    }
	
	myGamePiece.newPos(); // Set Player to new position
    myGamePiece.update(); // Update
	
	// Limit within borders
	if (myGamePiece.x < -5) { myGamePiece.x = -5; }
	else if (myGamePiece.x > 500) { myGamePiece.x = 500; }
	if (myGamePiece.y < 0) { myGamePiece.y = 0; }
	else if (myGamePiece.y > 290) { myGamePiece.y = 290; }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function move(dir) {
    if (dir == "up") {myGamePiece.speedY = -5; }
    if (dir == "down") {myGamePiece.speedY = 5; }
    if (dir == "left") {myGamePiece.speedX = -5; myGamePiece.image.src = "img/left.gif";}
    if (dir == "right") {myGamePiece.speedX = 5; myGamePiece.image.src = "img/right.gif";}
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

window.addEventListener('keydown', function (e) { myGameArea.key = e.keyCode; })

window.addEventListener('keyup', function (e) { myGameArea.key = false; clearmove(); })