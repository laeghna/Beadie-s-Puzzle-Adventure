var AM = new AssetManager();

$("#puzzle").on("click", "td", function(e) {
    canvas.puzzle.solveToggleClass();
})

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
    canvas.scene = "crystal";
    clickToPlay.style.display = "none";
    togglePortals();
}

function changeScene (scene) {
    canvas.scene = scene;
    switch(canvas.scene) {

        case "crystal":
            canvas.world = crystalWorld;
            hero.x = (canvas.width - CHAR_H) / 2;
            hero.y = (canvas.height - CHAR_H) / 2;
            break;

        case "red":
            canvas.world = redWorld;
            hero.x = 0;
            hero.y = (canvas.height - CHAR_H) / 2;
            hero.direction = "E";
            break;

        case "orange":
            canvas.world = orangeWorld;
            hero.x = 0;
            hero.y = (canvas.height - CHAR_H) / 2;
            hero.direction = "E";
            break;

        case "yellow":
            canvas.world = yellowWorld;
            hero.x = 0;
            hero.y = (canvas.height - CHAR_H) / 2;
            hero.direction = "E";
            break;

        case "green":
            canvas.world = greenWorld;
            hero.x = 0;
            hero.y = (canvas.height - CHAR_H) / 2;
            hero.direction = "E";
            break;

        case "blue":
            canvas.world = blueWorld;
            hero.x = 0;
            hero.y = (canvas.height - CHAR_H) / 2;
            hero.direction = "E";
            break;

        case "violet":
            canvas.world = violetWorld;
            hero.x = 0;
            hero.y = (canvas.height - CHAR_H) / 2;
            hero.direction = "E";
            break;
    }
    canvas.world.clear();
    togglePortals();
}

function displayPuzzle (num) {
    //document.getElementById("puzzleCanvas").style.zIndex = "2";
    canvas.playingPuzzle = true;
    canvas.puzzleNum = num;
    canvas.style.visibility = "hidden";
    //document.getElementById("puzzle").style.zIndex = "2";
    togglePortals();

                switch(canvas.scene) {

                case "red":

                    switch(canvas.puzzleNum) {

                        case 1:
                            console.log(redPuzzle1.clueRows);
                            this.solvePuzzle("puzzle", redPuzzle1);
                        case 2:
                            solvePuzzle("puzzle", redPuzzle2);
                        case 3:
                            solvePuzzle("puzzle", redPuzzle3);
                        case 4:
                            solvePuzzle("puzzle", redPuzzle4);
                        case 5:
                            solvePuzzle("puzzle", redPuzzle5);
                        case 6:
                            solvePuzzle("puzzle", redPuzzle1);
                    }
                    break;

                case "orange":
                    //Stuff
                    break;

                case "yellow":
                    //Yeah, More Stuff
                    break;

                case "green":
                    //Even More Stuff
                    break;

                case "blue":
                    //Will the Stuff Never End?!
                    break;

                case "violet":
                    //Finnally, the Last Stuff
                    break;
            }
}

function removePuzzle () {
    document.getElementById("puzzleCanvas").style.zIndex = "-1";
    canvas.playingPuzzle = false;
    togglePortals();
}

function togglePortals () {
    if (canvas.scene === "crystal") {
        redWorldPortal.style.display = "inline";
        orangeWorldPortal.style.display = "inline";
        yellowWorldPortal.style.display = "inline";
        greenWorldPortal.style.display = "inline";
        blueWorldPortal.style.display = "inline";
        violetWorldPortal.style.display = "inline";
        crystalWorldPortal.style.display = "none";
        puzzle1.style.display = "none";
        puzzle2.style.display = "none";
        puzzle3.style.display = "none";
        puzzle4.style.display = "none";
        puzzle5.style.display = "none";
        puzzle6.style.display = "none";
    } else {
        redWorldPortal.style.display = "none";
        orangeWorldPortal.style.display = "none";
        yellowWorldPortal.style.display = "none";
        greenWorldPortal.style.display = "none";
        blueWorldPortal.style.display = "none";
        violetWorldPortal.style.display = "none";

        if (canvas.playingPuzzle) {
            crystalWorldPortal.style.display = "none";
            puzzle1.style.display = "none";
            puzzle2.style.display = "none";
            puzzle3.style.display = "none";
            puzzle4.style.display = "none";
            puzzle5.style.display = "none";
            puzzle6.style.display = "none";
        } else {
            crystalWorldPortal.style.display = "inline";
            puzzle1.style.display = "inline";
            puzzle2.style.display = "inline";
            puzzle3.style.display = "inline";
            puzzle4.style.display = "inline";
            puzzle5.style.display = "inline";
            puzzle6.style.display = "inline";
        }
    }
}

// no inheritance
function Background(game, img) {
    this.tileset = AM.getAsset("./img/ProjectUtumno.png");
    canvas.world.tiles = canvas.world.background;
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
    } else if (canvas.playingPuzzle) {
        //Do nothing
    } else {
        for(var c = 0; c < this.cols; c++) {
            for(var r = 0; r < this.rows; r++) {

                var tile = canvas.world.getTile(r * this.cols + c);

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
        if (canvas.playingPuzzle) {
            //this.ctx.

        } else {
            canvas.world.update(this.cols, this.rows);
        }
    }
};


function Poring(game, spritesheet) {
    this.animation = new Animation(spritesheet, E_START_STAND, CHAR_W, CHAR_H,
      SHEET_W, PORING_FRAME_DURATION, IDLE_FRAME_COUNT, true, CHAR_SCALE);
    this.x = (canvas.width - CHAR_W) / 2;
    this.y = (canvas.height - CHAR_H) / 2;
    this.speed = 1;
    this.direction = "E";
    this.moving = false;
    this.statusChanged = false;
    this.game = game;
    this.ctx = game.ctx;
    this.bounce = 0;
    this.height = 0;
    this.w = CHAR_W * CHAR_SCALE; //width of scaled poring
    this.h = CHAR_H * CHAR_SCALE; //height of scaled poring
    this.okToMove = true;
}

Poring.prototype.draw = function () {
    if (canvas.scene != "intro") {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y - this.height, 1, 1);
    }
}

Poring.prototype.update = function () {

    var okToMoveN = true, okToMoveS = true, okToMoveE = true, okToMoveW = true;

    function getTile(x, y) {
      return canvas.world.background[pixelToTile(x) + (pixelToTile(y) * 40)];
    }

    function getPos(x,y) {
      return pixelToTile(x) + (pixelToTile(y) * 40);
    }

    function pixelToTile(n) {
      return Math.floor(n/TILE_W);
    } // pixel-to-tile conversion

    function tileToPixel(n) {
      return (n * TILE);
    } // tile-to-pixel conversion

    if (this.direction === "E"
    && (!OK_TILES.includes(getTile(this.x + this.w + this.speed, this.y)) //topright
    || !OK_TILES.includes(getTile(this.x + this.w + this.speed, this.y + this.h)))) { //bottomright
      okToMoveE = false;
      console.log("IT AINT OK TO MOVE E");
    }//poring right vs tile left
    if (this.direction === "S"
    && (!OK_TILES.includes(getTile(this.x + this.w, this.y + this.h + this.speed)) //bottomright
    || !OK_TILES.includes(getTile(this.x, this.y + this.h + this.speed)))) { //bottom left
      okToMoveS = false;
      console.log("IT AINT OK TO MOVE S");
    }
    if (this.direction === "N"
    && (!OK_TILES.includes(getTile(this.x, this.y - this.speed)) //topleft
    || !OK_TILES.includes(getTile(this.x + this.w, this.y - this.speed)))) { //topright
      okToMoveN = false;
      console.log("IT AINT OK TO MOVE N");
    }
    if (this.direction === "W"
    && (!OK_TILES.includes(getTile(this.x - this.speed, this.y)) //topleft
    || !OK_TILES.includes(getTile(this.x - this.speed, this.y + this.h)))) { //bottomleft
      okToMoveW = false;
      console.log("IT AINT OK TO MOVE W");
    }


    if (canvas.scene != "intro") {
            if (this.game.moving != this.moving || this.game.direction != this.direction) {

            this.statusChanged = true;
            this.moving = this.game.moving;
            this.direction = this.game.direction;
        }

        if (this.moving) {

            this.idleTimer = 1;

            if (this.direction === "N" && this.y - this.speed > 0 && okToMoveN) {

                this.y -= SPEED;
                if (this.statusChanged) {
                    this.animation.changeAnimation(N_START_WALK, WALK_FRAME_COUNT);
                    this.statusChanged = false;
                }

            } else if (this.direction === "W" && this.x - this.speed > 0 && okToMoveW) {

                this.x -= SPEED;
                if (this.statusChanged) {
                    this.animation.changeAnimation(W_START_WALK, WALK_FRAME_COUNT);
                    this.statusChanged = false;
                }

            } else if (this.direction === "S" && this.y + this.speed < 638 && okToMoveS) {

                this.y += SPEED;
                if (this.statusChanged) {
                    this.animation.changeAnimation(S_START_WALK, WALK_FRAME_COUNT);
                    this.statusChanged = false;
                }

            } else if (this.direction === "E" && this.x + this.speed < 1216 && okToMoveE) {

                this.x += SPEED;
                if (this.statusChanged) {
                    this.animation.changeAnimation(E_START_WALK, WALK_FRAME_COUNT);
                    this.statusChanged = false;
                }
            }

            var jumpDistance = this.animation.elapsedTime / this.animation.totalTime;
            var totalHeight = 2;

            if (jumpDistance > 0.6)
                jumpDistance = -(1 - jumpDistance);


            this.height = totalHeight * (-4 * (jumpDistance * jumpDistance - jumpDistance));

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
    this.canvas.playingPuzzle = false;
    this.canvas.puzzleNum = null;
    this.canvas.puzzle = {};
    this.canvas.world = crystalWorld;
    var ctx = this.canvas.getContext("2d");

    clickToPlay.style.display = "inline";

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    this.hero = new Poring(gameEngine, AM.getAsset("./img/poring.png"));

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/title.png")));
    gameEngine.addEntity(hero);

    console.log("All Done!");
});
