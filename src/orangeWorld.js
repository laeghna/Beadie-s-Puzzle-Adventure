/*********************

     ORANGE WORLD      

*********************/

var orangeWorld = {
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
    earthTimer: 0,
    earthFrameRate: 20,
    earthTileCount: 6,
    earth1x: 1664,
    earth2x: 1696,
    earth3x: 1728,
    earth4x: 1760,
    earthY: 512,
    orangeTrailX: 1888,
    orangeTrailY: 384,
    
    update: updateOrangeWorld,
    getTile: getOrangeWorldTile,
    clear: clearOrangeWorld
};

function updateOrangeWorld (cols, rows) {
    this.earthTimer++;
    if (this.earthTimer % 20 === 0) {
        
        var count = getRandomInt(1, 2);
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
    
    if (this.earthTimer === this.earthFrameRate) {
        
        this.earthTimer = 0;
        for(var c = 0; c < cols; c++) {
            
            for(var r = 0; r < rows; r++) {
                
                var index = r * cols + c;
                var tile = this.tiles[index];
                
                if (tile > 1) {
                    
                    if (tile % this.earthTileCount === 0) 
                        this.tiles[index] = 1;
                    else
                        this.tiles[index] += 1;
                }
            }
        }
    }
}

function getOrangeWorldTile (index) {
    var tile = {x: 0, y: 0};
    
    if(this.tiles[index] == 0){
            
            tile.x = this.orangeTrailX;
            tile.y = this.orangeTrailY;

    } else {
        switch(this.tiles[index]) {
                
                case 1:
                    tile.x = this.earth1x;
                    break;
                
                case 2:
                    tile.x = this.earth2x;
                    break;
                
                case 3:
                    tile.x = this.earth3x;
                    break;
                
                case 4:
                    tile.x = this.earth4x;
                    break;
                
                case 5:
                    tile.x = this.earth3x;
                    break;
                
                case 6:
                    tile.x = this.earth2x;
                    break;
            }
            
            tile.y = this.earthY;
    }
    
    return tile;
}

function clearOrangeWorld () {
    this.earthTimer = 0;
    this.tiles = this.background;
}