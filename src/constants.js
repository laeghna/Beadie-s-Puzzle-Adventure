//Character spritesheet frame width
SHEET_W = 8;

//Character sprite sheet index starting positions
//where count starts at zero
var N_START_STAND = 24;
var W_START_STAND = 0;
var S_START_STAND = 48;
var E_START_STAND = 4;

var N_START_WALK = 32;
var W_START_WALK = 8;
var S_START_WALK = 56;
var E_START_WALK = 16;

var N_START_IDLE = 28;
var W_START_IDLE = 40;
var S_START_IDLE = 52;
var E_START_IDLE = 44;

//Frame count for character animations
var IDLE_FRAME_COUNT = 4;
var WALK_FRAME_COUNT = 4;


var PORING_FRAME_DURATION = .12

//Character frame size
CHAR_W = 42;
CHAR_H = 42;
CHAR_SCALE = .75;

//Character movement speed
var SPEED = 1;

//Count for when to start idle animation
var START_IDLE_COUNT = 40;

//Count for idle animation duration
var IDLE_COUNT = 20;

//Background tile dimensions
var TILE_W = 32;
var TILE_H = 32;

//Acceptable tiles array
var OK_TILES = [0];

var CURR_WORLD_TILES = crystalWorld.background;
