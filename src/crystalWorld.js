/*********************

     CRYSTAL WORLD      

*********************/

var crystalWorld = {
    background: [
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
    ],
    tiles: [],
    crystalTimer: 0,
    crystalFrameRate: 20,
    crystalTileCount: 6,
    crystal1x: 1248,
    crystal2x: 1280,
    crystal3x: 1312,
    crystal4x: 1344,
    crystalY: 608,
    crystalTrailX: 1472,
    crystalTrailY: 512,
    
    update: updateCrystalWorld,
    getTile: getCrystalWorldTile,
    clear: clearCrystalWorld
};

function updateCrystalWorld (cols, rows) {
    this.crystalTimer++;
    if (this.crystalFrameRate % 21 === 0) {
        
        var count = getRandomInt(1, 3);
        var col = 0; 
        var row = 0;
        var i = 0;
        
        while (i < count) {
            
            col = getRandomInt(0, cols);
            row = getRandomInt(0, rows);
            
        if (this.tiles[row * cols + col] === 1)
            this.tiles[row * cols + col] += 1;
        
        i++;
        }
    }
    
    if (this.crystalTimer === this.crystalFrameRate) {
        
        this.crystalTimer = 0;
        for(var c = 0; c < cols; c++) {
            
            for(var r = 0; r < rows; r++) {
                
                var index = r * cols + c;
                var tile = this.tiles[index];
                
                if (tile > 1) {
                    
                    if (tile % this.crystalTileCount === 0) 
                        this.tiles[index] = 1;
                    else
                        this.tiles[index] += 1;
                }
            }
        }
    }
}

function getCrystalWorldTile (index) {
    var tile = {x: 0, y: 0};
    
    if(this.tiles[index] == 0){
            
            tile.x = this.crystalTrailX;
            tile.y = this.crystalTrailY;

    } else {
        switch(this.tiles[index]) {
                
                case 1:
                    tile.x = this.crystal1x;
                    break;
                
                case 2:
                    tile.x = this.crystal2x;
                    break;
                
                case 3:
                    tile.x = this.crystal3x;
                    break;
                
                case 4:
                    tile.x = this.crystal4x;
                    break;
                
                case 5:
                    tile.x = this.crystal3x;
                    break;
                
                case 6:
                    tile.x = this.crystal2x;
                    break;
            }
            
            tile.y = this.crystalY;
    }
    
    return tile;
}

function clearCrystalWorld () {
    this.crystalTimer = 0;
    this.tiles = this.background;
}