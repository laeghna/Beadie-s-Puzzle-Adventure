var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frameDuration = frameDuration;
    this.frames = frames;
    this.loop = loop;
    this.scale = scale;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, rowStart, xScale, yScale) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth) + rowStart;
    
    ctx.scale(xScale, yScale);
    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
	if (xScale < 0 || yScale < 0) ctx.scale(xScale, yScale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.spritesheet = spritesheet;
	this.lavaTimer = 0;
	this.lavaFrameRate = 15;
	this.lavaTileCount = 6;
	this.lava1x = 1568;
	this.lava2x = 1600;
	this.lava3x = 1632;
	this.lava4x = 1664;
	this.lavaY = 416;
	this.redTrailX = 768;
	this.redTrailY = 448;
    this.game = game;
    this.ctx = game.ctx;
    this.cols = 40;
    this.rows = 22;
    this.tsize = 32;
    this.tiles1 = [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	    0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,
        0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,
        1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
        1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
        0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,
        0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,
        0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ];
	
	this.tiles = [
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,0,0,2,3,3,3,3,3,3,2,0,0,2,2,3,3,3,3,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,0,0,2,3,3,4,4,3,3,2,0,0,2,3,3,4,4,3,3,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,0,0,2,2,3,4,4,3,2,2,0,0,2,3,3,4,4,3,3,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,0,0,2,2,3,3,3,3,2,2,0,0,2,2,3,3,3,3,2,2,0,0,2,2,2,2,2,0,0,0,0,0,0,2,2,
        2,2,2,2,0,0,0,0,2,2,3,3,2,2,0,0,0,0,2,2,3,3,2,2,0,0,0,0,2,2,2,2,0,0,0,0,0,0,2,2,
        0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,
        0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,
        2,2,2,2,0,0,0,0,2,2,3,3,2,2,0,0,0,0,2,2,3,3,2,2,0,0,0,0,2,2,2,2,0,0,0,0,0,0,2,2,
        2,2,2,2,2,0,0,2,2,3,3,3,3,2,2,0,0,2,2,3,3,3,3,2,2,0,0,2,2,2,2,2,0,0,0,0,0,0,2,2,
        2,2,2,2,2,0,0,2,3,3,4,4,3,3,2,0,0,2,3,3,4,4,3,3,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,0,0,2,3,3,4,4,3,3,2,0,0,2,3,3,4,4,3,3,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,0,0,2,2,3,3,3,3,2,2,0,0,2,2,3,3,3,3,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2
	];
	
		this.tiles2 = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,2,2,1,1,0,0,0,0,1,1,2,2,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,0,0,2,3,3,3,3,3,3,2,0,0,2,2,3,3,3,3,2,2,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,0,0,2,3,3,4,4,3,3,2,0,0,2,3,3,4,4,3,3,2,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,0,0,2,2,3,4,4,3,2,2,0,0,2,3,3,4,4,3,3,2,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,0,0,2,2,3,3,3,3,2,2,0,0,2,2,3,3,3,3,2,2,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,
        1,1,1,1,0,0,0,0,2,2,3,3,2,2,0,0,0,0,2,2,3,3,2,2,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
        1,1,1,1,0,0,0,0,2,2,3,3,2,2,0,0,0,0,2,2,3,3,2,2,0,0,0,0,1,1,1,1,0,0,0,0,0,0,2,1,
        1,1,1,1,1,0,0,2,2,3,3,3,3,2,2,0,0,2,2,3,3,3,3,2,2,0,0,1,1,1,6,1,0,0,0,0,0,0,2,2,
        1,1,1,1,1,0,0,2,3,3,4,4,3,3,2,0,0,2,3,3,4,4,3,3,2,0,0,1,6,6,6,1,1,1,2,2,2,3,3,2,
        1,1,1,1,1,0,0,2,3,3,4,4,3,3,2,0,0,2,3,3,4,4,3,3,2,0,0,1,6,1,1,1,1,1,1,2,2,2,3,3,
        1,1,1,1,1,0,0,2,2,3,3,3,3,2,2,0,0,2,2,3,3,3,3,2,2,0,0,1,6,1,1,1,2,2,2,2,2,3,3,3,
        1,1,1,1,0,0,0,0,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,1,1,1,2,2,2,3,3,3,4,4,5,
        1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,3,3,4,4,5,6,
        1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,3,3,3,4,4,5,5,6,
        1,1,1,1,0,0,0,0,1,1,2,2,1,1,0,0,0,0,1,1,2,2,1,1,0,0,0,0,2,2,3,3,3,4,4,5,5,6,6,6,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,6,1,1,1,1,1,1,1,1,1,1,2,2,3,3,4,4,4,5,5,5,6,6,1
	];
};

Background.prototype.draw = function () {
    for(var c = 0; c < this.cols; c++) {
        for(var r = 0; r < this.rows; r++) {
            var tile = this.tiles[r * this.cols + c];
        var xsource;
		var ysource;
	    if(tile == 0){
            xsource = this.redTrailX;
            ysource = this.redTrailY;
        } else {
				switch(tile) {
				
				case 1: 
                    xsource = this.lava1x;
					break;
				case 2:
				    xsource = this.lava2x;
					break;
				case 3:
				    xsource = this.lava3x;
					break;
				case 4:
				    xsource = this.lava4x;
					break;
				case 5:
				    xsource = this.lava3x;
					break;
				case 6:
				    xsource = this.lava2x;
				    break;
				
				default:
				    break;
			}
			ysource = this.lavaY;
        }
        this.ctx.drawImage(this.spritesheet,
                xsource,ysource,this.tsize,this.tsize,
                c * this.tsize, r * this.tsize,
                this.tsize, this.tsize);
        }
    }
};

Background.prototype.update = function () {
	this.lavaTimer++;
	if (this.lavaTimer === this.lavaFrameRate) {
		this.lavaTimer = 0;
        for(var c = 0; c < this.cols; c++) {
            for(var r = 0; r < this.rows; r++) {
			    var index = r * this.cols + c;
                var tile = this.tiles[index];
			    if (tile > 0) {
				    if (tile % this.lavaTileCount === 0) 
					    this.tiles[index] = 1;
				    else
				    	this.tiles[index] += 1;
			    }
		    }
	    }
	}
};

function LittlePoring(game, spritesheet) {
    this.animation = new Animation(spritesheet, 64, 66, 4, 0.15, 4, true, 1);
	this.x = 0;
	this.y = 319;
	this.speed = 4;
	this.direction = "E";
	this.game = game;
    this.ctx = game.ctx;
}

LittlePoring.prototype.draw = function () {

    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 5, 1, 1);
}

LittlePoring.prototype.update = function () {
	if (this.game.moving) {
		if (this.game.direction === "N" && this.y - this.speed > 0) {
		    this.y -= this.speed;
		} else if (this.game.direction === "W" && this.x - this.speed > 0) {
		    this.x -= this.speed;
		} else if (this.game.direction === "S" && this.y + this.speed < 638) {
		    this.y += this.speed;
		} else if (this.game.direction === "E" && this.x + this.speed < 1216) {
		    this.x += this.speed;
		}
	}
}

AM.queueDownload("./img/ProjectUtumno.png");
AM.queueDownload("./img/tinyPoring.png");

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max-min + 1)) + min;
}

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/ProjectUtumno.png")));
		gameEngine.addEntity(new LittlePoring(gameEngine, AM.getAsset("./img/tinyPoring.png")));	

    console.log("All Done!");
});