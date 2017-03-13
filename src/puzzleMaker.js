function Puzzle(game) {
    this.game = game;
    this.mouseClicked = false;
    this.statusChanged = false;
    this.ctx = game.ctx;
}

Puzzle.prototype.buildGrid = function() {
    var grid = [];
    
    for(var i = 0; i < this.cellsVertical; i++){
        var line = [];
        for(var j = 0; j < this.cellsHorizontal; j++){
            line.push(0);
        }
        grid.push(line);
    }
    
    return grid;
}

Puzzle.prototype.draw = function() {

    if (gameCanvas.playingPuzzle) {
        this.ctx.drawImage(this.instr, gameCanvas.width - this.instr.width, gameCanvas.height - this.instr.height);
        this.drawGrid();
        
        if (gameCanvas.scene === "red") {
            this.drawHints();
            this.markCells();
        }
    }
}

Puzzle.prototype.drawGrid = function() {
    this.ctx.clearRect(0, 0, this.grid_width, this.grid_height);
    this.ctx.fillStyle = "rgba(34,34,34, 0.2)";
    this.ctx.fillRect(0, 0, this.grid_width, this.grid_height);
    
    if (gameCanvas.scene === "orange") {
        this.drawSliderTiles();
    }
        
    // Draw grid lines
    if(!this.gridComplete()){
        for(var i = 0; i <= this.grid.length; i++){
            if (gameCanvas.scene === "red") {
                this.drawLine(0, i * this.cellSize.y, this.grid_width, i * this.cellSize.y, "#1F1F1F", 1);
            }
            if(i % this.sectionSize.y == 0){
                this.drawLine(0, i * this.cellSize.y, this.grid_width, i * this.cellSize.y, "#1F1F1F", 3);
            }
        }
        
        for(var i = 0; i <= this.grid[0].length; i++){
            if (gameCanvas.scene === "red") {
                this.drawLine(i * this.cellSize.x, 0, i * this.cellSize.x, this.grid_height, "#1F1F1F", 1);
            }
            if(i % this.sectionSize.x == 0){
                this.drawLine(i * this.cellSize.x, 0, i * this.cellSize.x, this.grid_height, "#1F1F1F", 3);
            }
        }
    }
}

Puzzle.prototype.drawHints = function() {
    this.ctx.font = "15px 'courier new'";
    this.ctx.fillStyle = "rgba(34,34,34, 1.0)";

    // Row hints
    for(var i = 0; i < this.rowsFilled.length; i++){
        var hint = " ";
        for(var j = 0; j < this.rowsFilled[i].length; j++){
            hint += this.rowsFilled[i][j] + "    ";
        }
        this.ctx.fillText(hint, this.grid_width + 10, this.cellSize.y * ( i + 1 ) - 7);
    }
    
    // Column hints    
    for(var i = 0; i < this.columnsFilled.length; i++){
        for(var j = 0; j < this.columnsFilled[i].length; j++){
            hint = this.columnsFilled[i][j];
            this.ctx.fillText(hint, this.cellSize.x * i + 5, this.grid_height + this.cellSize.y * ( j + 1 ) + 7);
        }
    }
}

Puzzle.prototype.changeMarks = function(row, col) {
    switch(this.clickAction){
        case "ERASE":
            this.grid[row][col] = 0;
            break;
        case "PAINT":
            this.grid[row][col] = 1;
            break;
        case "BLOCK":
            this.grid[row][col] = 2;
            break;
    } 
}

Puzzle.prototype.markCells = function() {
    this.ctx.fillStyle = "rgba(34,34,34, 1.0)";
    for(var i = 0; i < this.grid.length; i++){
        for(var j = 0; j < this.grid[i].length; j++){
            // Draw blocks
            if(this.grid[i][j] == 1){
                this.ctx.fillRect(this.cellSize.x * j, this.cellSize.y * i, this.cellSize.x, this.cellSize.y);   
            }else if(!this.gridComplete()){
                // Draw X's
                if(this.grid[i][j] == 2){
                    //this.ctx.clearRect(this.cellSize * j, this.cellSize * i, this.cellSize, this.cellSize);  
                    this.drawLine(this.cellSize.x * j, this.cellSize.y * i, this.cellSize.x * (j+1), this.cellSize.y * (i+1), "rgb(219, 112, 147)", 2);
                    this.drawLine(this.cellSize.x * (j+1), this.cellSize.y * i, this.cellSize.x * j, this.cellSize.y * (i+1), "rgb(219, 112, 147)", 2);
                }
            }
        }
    }
}


Puzzle.prototype.drawSliderTiles = function() {
    for(var i = 0; i < this.cellsVertical; i++) {
        for(var j = 0; j < this.cellsHorizontal; j++) {
            if (this.grid[i][j] != 14) {
                var x = (this.grid[i][j] % this.cellsHorizontal);
                var y = Math.floor(this.grid[i][j] / this.cellsHorizontal);
                //console.log(this.grid[i][j]);
                //console.log("row: " + y + ", col: " + x);
                this.ctx.drawImage(gameCanvas.puzzle.img, x * this.cellSize.x - 1, y * this.cellSize.y - 1, this.cellSize.x, this.cellSize.y,
                                   j * this.cellSize.x, i * this.cellSize.y, this.cellSize.x, this.cellSize.y);
            }
        }
    }
}

Puzzle.prototype.moveSliderTile = function(row, col) {
    if(row > 1 && this.grid[row - 1][col] == 14) {
        this.grid[row -1][col] = this.grid[row][col];
        this.grid[row][col] = 14;
    } else if (row < this.grid.length - 1 && this.grid[row + 1][col] == 14) {
        this.grid[row + 1][col] = this.grid[row][col];
        this.grid[row][col] = 14;
    } else if (col > 1 && this.grid[row][col - 1] == 14) {
        this.grid[row][col - 1] = this.grid[row][col];
        this.grid[row][col] = 14;
    } else if (col < this.grid[row].length -1 && this.grid[row][col + 1 == 14]) {
        this.grid[row][col + 1] = this.grid[row][col];
        this.grid[row][col] = 14;
    }
}

Puzzle.prototype.alreadyClicked = function(row, col) {
    switch(this.clickAction){
        case "ERASE":
            return this.grid[row][col] == 0;
        case "PAINT":
            return this.grid[row][col] == 1;
        case "BLOCK":
            return this.grid[row][col] == 2;
    }
}

Puzzle.prototype.click = function(row, col) {
    if(this.isValidLocation(row, col) && !this.alreadyClicked(row, col)){
        this.undoBuffer.push([[row, col], this.grid[row][col]]);
        
        if (gameCanvas.scene === "red") {
            this.changeMarks(row, col);
        } else if (gameCanvas.scene === "orange") {
            this.moveSliderTile(row, col);
        }
          
    }
}

Puzzle.prototype.isValidLocation = function(y, x) {
    return (x >= 0 && x * this.cellSize.x < this.grid_width && y >=0 && y * this.cellSize.y < this.grid_height);
}

Puzzle.prototype.drawLine = function(startx, starty, endx, endy, color, line_width){
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = line_width;
    this.ctx.beginPath();
    this.ctx.moveTo(startx, starty);
    this.ctx.lineTo(endx, endy);
    this.ctx.stroke();
}

Puzzle.prototype.undo = function() {
    if(this.undoBuffer.length == 0){
        return;
    }
    var action = this.undoBuffer.pop();
    var row = action[0][0];
    var col = action[0][1];
    var prevState = action[1];
    
    this.grid[row][col] = prevState;
}

Puzzle.prototype.setClickAction = function(row, col){
    if (this.isValidLocation(row, col)) {
        switch(this.grid[row][col]){
            case 0:
                this.clickAction = "PAINT";
                break;
            case 1:
                this.clickAction = "BLOCK";
                break;
            case 2:
                this.clickAction = "ERASE";
                break;
        }
    }
}

Puzzle.prototype.gridComplete = function() {
    for(var i = 0; i < this.grid.length; i++){
        for(var j = 0; j < this.grid[i].length; j++){
            if(this.grid[i][j] != this.finalGrid[i][j]){
                return false;
            }
        }
    }
    return true;
}

Puzzle.prototype.changePuzzle = function() {
    console.log("changePuzzle: gameCanvas.puzzle.name = " + gameCanvas.puzzle.name);
    this.instr = gameCanvas.puzzleLayout.instr;
    this.cellSize = gameCanvas.puzzleLayout.cellSize;
    this.sectionSize = gameCanvas.puzzleLayout.sectionSize;
    this.grid_width = gameCanvas.puzzle.width * this.cellSize.x;
    this.grid_height = gameCanvas.puzzle.height * this.cellSize.y;
    this.cellsHorizontal = gameCanvas.puzzle.width;
    this.cellsVertical = gameCanvas.puzzle.height;
    this.undoBuffer = []
        
    if (gameCanvas.scene === "orange") {
        this.grid = gameCanvas.puzzle.setup;
    } else {
        this.grid = this.buildGrid();
    }
    
    this.finalGrid = gameCanvas.puzzle.solution;
    this.rowsFilled = gameCanvas.puzzle.clueRows
    this.columnsFilled = gameCanvas.puzzle.clueCols;
}

Puzzle.prototype.update = function(){
        
    if (gameCanvas.playingPuzzle) {
        if (gameCanvas.puzzleChanged) {
            this.changePuzzle();
            gameCanvas.puzzleChanged = false;
        }
    
        if (this.game.mouseClicked) {
            console.log("x: " + this.game.mouse.x + ", y: " + this.game.mouse.y);
            if (gameCanvas.scene == "red" || gameCanvas.scene == "blue") {
                this.setClickAction(this.game.mouse.y, this.game.mouse.x);
            }
            
            this.click(this.game.mouse.y, this.game.mouse.x);
            this.game.mouseClicked = false;
        }
    }
}