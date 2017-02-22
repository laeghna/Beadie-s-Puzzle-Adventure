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

function startGame () {
    canvas.scene = "red";
    clickToPlay.style.display = "none";
}

// no inheritance
function Background(game, img) {
    this.tileset = AM.getAsset("./img/ProjectUtumno.png");
    this.scene = "red";
    this.world = redWorld;
    this.world.tiles = this.world.background;
    console.log(this.world.redTrailY);
    this.game = game;
    this.img = img;
    this.ctx = game.ctx;
    this.tile = {w: TILE_W, h: TILE_H}; //size in pixels
    this.cols = canvas.width/this.tile.w;
    this.rows = canvas.height/this.tile.h;
};

Background.prototype.draw = function () {
    
    if (canvas.scene == "intro") {
        this.ctx.drawImage(this.img, 0, 10, 1280, 732);
    } else {
        for(var c = 0; c < this.cols; c++) {
            for(var r = 0; r < this.rows; r++) {
                
                var tile = this.world.getTile(r * this.cols + c);
                
                this.ctx.drawImage(this.tileset,
                    tile.x, tile.y, this.tile.w, this.tile.h,
                    c * this.tile.w, r * this.tile.h,
                    this.tile.w, this.tile.h);
            }
        }
    }
};

Background.prototype.update = function () {
    
    if (canvas.scene != "intro") {
        if (this.worldChanged) {

            this.world.clear();
            switch(this.scene) {
                
                case "crystal":
                    this.world = crystalWorld;
                    break;
                
                case "red":
                    this.world = redWorld;
                    break;
                
                case "orange":
                    this.world = orangeWorld;
                    break;
                
                case "yellow":
                    this.world = yellowWorld;
                    break;
             
                case "green":
                    this.world = greenWorld;
                    break;
                
                case "blue":
                    this.world = blueWorld;
                    break;
                
                case "violet":
                    this.world = violetWorld;
                    break;
            }
        } else {
            this.world.update(this.cols, this.rows);
        }
    }
};


function Poring(game, spritesheet) {
    this.animation = new Animation(spritesheet, E_START_STAND, CHAR_W, CHAR_H, SHEET_W, PORING_FRAME_DURATION, IDLE_FRAME_COUNT, true, .75);
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
    if (canvas.scene != "intro") {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y - this.height, 1, 1);
    }
}

Poring.prototype.update = function () {
    if (canvas.scene != "intro") {
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
}


AM.queueDownload("./img/title.png");
AM.queueDownload("./img/ProjectUtumno.png");
AM.queueDownload("./img/poring.png");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min + 1)) + min;
}

AM.downloadAll(function () {
    this.canvas = document.getElementById("gameWorld");
    this.canvas.scene = "intro";
    var ctx = this.canvas.getContext("2d");
    
    clickToPlay.style.display = "inline";
    
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/title.png")));
    gameEngine.addEntity(new Poring(gameEngine, AM.getAsset("./img/poring.png")));
    
    console.log("All Done!");
});
