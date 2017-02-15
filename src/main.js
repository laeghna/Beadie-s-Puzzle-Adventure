var AM = new AssetManager();

function Animation(spriteSheet, frameStart, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameAdjust = frameStart;
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

Animation.prototype.drawFrame = function (tick, ctx, x, y, xScale, yScale) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

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
    return Math.floor(this.elapsedTime / this.frameDuration) + this.frameAdjust;
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

Animation.prototype.changeAnimation = function (frameStart, frames) {
    this.frameAdjust = frameStart;
    this.totalTime = this.frameDuration * frames;
    // this.elapsedTime = 0;
}

// no inheritance
function Background(game, spritesheet) {
    this.spritesheet = spritesheet;
	this.lavaTimer = 0;
	this.lavaFrameRate = 20;
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

	/*
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

	this.tiles2 = [
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
	*/

	this.tiles = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,
        1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,
        1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
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
	if (this.lavaFrameRate % 5 === 0) {

    	var count = getRandomInt(1, 3);
	    var col = 0;
	    var row = 0;
	    var i = 0;

        while (i < count) {

		    col = getRandomInt(0, this.cols);
		    row = getRandomInt(0, this.rows);

		    if (this.tiles[row * this.cols + col] === 1)
		        this.tiles[row * this.cols + col] += 1;
		    i++;
	    }
	}
	if (this.lavaTimer === this.lavaFrameRate) {

		this.lavaTimer = 0;
        for(var c = 0; c < this.cols; c++) {

            for(var r = 0; r < this.rows; r++) {

			    var index = r * this.cols + c;
                var tile = this.tiles[index];

			    if (tile > 1) {

				    if (tile % this.lavaTileCount === 0)
					    this.tiles[index] = 1;
				    else
				    	this.tiles[index] += 1;
			    }
		    }
	    }
	}
};


function Poring(game, spritesheet) {
    this.animation = new Animation(spritesheet, E_START_STAND, CHAR_W, CHAR_H, SHEET_W, PORING_FRAME_DURATION, IDLE_FRAME_COUNT, true, 1);
	  this.x = 0;
	  this.y = 319;
	  this.speed = 1;
	  this.direction = "E";
    this.moving = false;
    this.statusChanged = false;
	  this.game = game;
    this.ctx = game.ctx;
    this.bounce = 0;
    this.height = 0;
}

Poring.prototype.draw = function () {

    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y - this.height, 1, 1);
}

Poring.prototype.update = function () {

    if (this.game.moving != this.moving || this.game.direction != this.direction) {

        this.statusChanged = true;
        this.moving = this.game.moving;
        this.direction = this.game.direction;
    }

    if (this.moving) {

        this.idleTimer = 1;

       if (this.direction === "N" && this.y - this.speed > 0) {

            this.y -= SPEED;
            if (this.statusChanged) {
                this.animation.changeAnimation(N_START_WALK, WALK_FRAME_COUNT);
                this.statusChanged = false;
            }

        } else if (this.direction === "W" && this.x - this.speed > 0) {

            this.x -= SPEED;
            if (this.statusChanged) {
                this.animation.changeAnimation(W_START_WALK, WALK_FRAME_COUNT);
                this.statusChanged = false;
            }

        } else if (this.direction === "S" && this.y + this.speed < 638) {

            this.y += SPEED;
            if (this.statusChanged) {
                this.animation.changeAnimation(S_START_WALK, WALK_FRAME_COUNT);
                this.statusChanged = false;
            }

        } else if (this.direction === "E" && this.x + this.speed < 1216) {

            this.x += SPEED;
            if (this.statusChanged) {
                this.animation.changeAnimation(E_START_WALK, WALK_FRAME_COUNT);
                this.statusChanged = false;
            }
        }



    } else {

        if (this.statusChanged) {
            switch(this.direction) {

                case "N":
                    this.animation.changeAnimation(N_START_STAND, IDLE_FRAME_COUNT);
                    this.statusChanged = false;
                    break;

                case "W":
                    this.animation.changeAnimation(W_START_STAND, IDLE_FRAME_COUNT);
                    this.statusChanged = false;
                    break;

                case "S":
                    this.animation.changeAnimation(S_START_STAND, IDLE_FRAME_COUNT);
                    this.statusChanged = false;
                    break;

                case "E":
                    this.animation.changeAnimation(E_START_STAND, IDLE_FRAME_COUNT);
                    this.statusChanged = false;
                    break;
            }
        }
    }

    var jumpDistance = this.animation.elapsedTime / this.animation.totalTime;
    var totalHeight = 2;

    if (jumpDistance > 0.6)
        jumpDistance = -(1 - jumpDistance);


    this.height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
}



AM.queueDownload("./img/ProjectUtumno.png");
AM.queueDownload("./img/poring.png");

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
	  gameEngine.addEntity(new Poring(gameEngine, AM.getAsset("./img/poring.png")));

    console.log("All Done!");
});
