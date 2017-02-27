function Puzzle(game, puzzle, cellSize){
    this.cellSize = cellSize;
    this.screen_width = puzzle.width * cellSize;
    this.screen_height = puzzle.height * cellSize;
    this.cellsHorizontal = puzzle.width;
    this.cellsVertical = puzzle.height;
    this.undoBuffer = []
    
    //this.paint = true;
        
    this.grid = this.buildGrid();
    this.finalGrid = puzzle.cells;
    this.linesFilled = puzzle.clueRows
    this.columnsFilled = puzzle.clueCols;
    
    this.ctx = game.ctx;
}

Puzzle.prototype.buildGrid = function(){
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
        this.ctx.clearRect(0, 0, this.screen_width, this.screen_height);
    this.ctx.fillStyle = "rgba(34,34,34, 0.2)";
    this.ctx.fillRect(0, 0, this.screen_width, this.screen_height);
        
    // Draw grid lines
    if(!this.gridComplete()){
        for(var i = 0; i <= this.grid.length; i++){
            this.drawLine(0, i*this.cellSize, this.screen_width, i*this.cellSize, "#1F1F1F", 1);
            if(i % 5 == 0){
                this.drawLine(0, i*this.cellSize, this.screen_width, i*this.cellSize, "#1F1F1F", 3);
            }
        }
        
        for(var i = 0; i <= this.grid[0].length; i++){
            this.drawLine(i*this.cellSize, 0, i*this.cellSize, this.screen_height, "#1F1F1F", 1);
            if(i % 5 == 0){
                console.log("ssd");
                this.drawLine(i*this.cellSize, 0, i*this.cellSize, this.screen_height, "#1F1F1F", 3);
            }
        }
    }
    
    // Draw hints
    this.ctx.font = "15px 'courier new'";
    this.ctx.fillStyle = "rgba(34,34,34, 1.0)";
    
    // Line hints
    for(var i = 0; i < this.linesFilled.length; i++){
        var hint = " ";
        for(var j = 0; j < this.linesFilled[i].length; j++){
            hint += this.linesFilled[i][j] + "    ";
        }
        this.ctx.fillText(hint, this.screen_width + 10, this.cellSize * ( i + 1 ) - 7);
    }
    
    // Column hints    
    for(var i = 0; i < this.columnsFilled.length; i++){
        for(var j = 0; j < this.columnsFilled[i].length; j++){
            hint = this.columnsFilled[i][j];
            this.ctx.fillText(hint, this.cellSize * i + 5, this.screen_height + this.cellSize * ( j + 1 ) + 7);
        }
    }
    
    this.ctx.fillStyle = "rgba(34,34,34, 1.0)";
    for(var i = 0; i < this.grid.length; i++){
        for(var j = 0; j < this.grid[i].length; j++){
            // Draw blocks
            if(this.grid[i][j] == 1){
                this.ctx.fillRect(this.cellSize * j, this.cellSize * i, this.cellSize, this.cellSize);   
            }else if(!this.gridComplete()){
                // Draw X's
                if(this.grid[i][j] == 2){
                    //this.ctx.clearRect(this.cellSize * j, this.cellSize * i, this.cellSize, this.cellSize);  
                    this.drawLine(this.cellSize*j, this.cellSize*i, this.cellSize*(j+1), this.cellSize*(i+1), "rgb(219, 112, 147)", 2);
                    this.drawLine(this.cellSize*(j+1), this.cellSize*i, this.cellSize*j, this.cellSize*(i+1), "rgb(219, 112, 147)", 2);
                }
            }
        }
    }
    }
}

Puzzle.prototype.alreadyClicked = function(row, col){
    switch(this.clickAction){
        case "ERASE":
            return this.grid[row][col] == 0;
        case "PAINT":
            return this.grid[row][col] == 1;
        case "BLOCK":
            return this.grid[row][col] == 2;
    }
}

Puzzle.prototype.click = function(x, y){
    col = Math.floor(x/this.cellSize);
    row = Math.floor(y/this.cellSize);
    if(this.isValidLocation(x, y) && !this.alreadyClicked(row, col)){
        
        this.undoBuffer.push([[x,y], this.grid[row][col]]);
        
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
}

Puzzle.prototype.isValidLocation = function(x, y){
    return (x >= 0 && x < this.screen_width && y >=0 && y < this.screen_height);
}

Puzzle.prototype.drawLine = function(startx, starty, endx, endy, color, line_width){
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = line_width;
    this.ctx.beginPath();
    this.ctx.moveTo(startx, starty);
    this.ctx.lineTo(endx, endy);
    this.ctx.stroke();
}

Puzzle.prototype.render = function(){
    
    
}

Puzzle.prototype.tileAt = function(x, y){
    var col = Math.floor(x/this.cellSize);
    var row = Math.floor(y/this.cellSize);
    
    return this.grid[row][col];
}

Puzzle.prototype.undo = function(){
    if(this.undoBuffer.length == 0){
        return;
    }
    var action = this.undoBuffer.pop();
    var x = action[0][0];
    var y = action[0][1];
    var prevState = action[1];
    
    var col = Math.floor(x/this.cellSize);
    var row = Math.floor(y/this.cellSize);
    
    this.grid[row][col] = prevState;
}

Puzzle.prototype.setClickAction = function(x, y){
    switch(this.tileAt(x, y)){
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

Puzzle.prototype.gridComplete = function() {
    for(var i = 0; i < this.grid.length; i++){
        for(var j = 0; j < this.grid[i].length; j++){
            if(this.grid[i][j] != 2 && this.grid[i][j] != this.finalGrid[i][j]){
                return false;
            }
        }
    }
    return true;
}

Puzzle.prototype.changePuzzle = function() {
    this.screen_width = gameCanvas.puzzle.width * this.cellSize;
    this.screen_height = gameCanvas.puzzle.height * this.cellSize;
    this.cellsHorizontal = gameCanvas.puzzle.width;
    this.cellsVertical = gameCanvas.puzzle.height;
    this.undoBuffer = []
        
    this.grid = this.buildGrid();
    this.finalGrid = gameCanvas.puzzle.cells;
    this.linesFilled = gameCanvas.puzzle.clueRows
    this.columnsFilled = gameCanvas.puzzle.clueCols;
}

Puzzle.prototype.update = function(){
    
    if (gameCanvas.puzzleChanged) {
        this.changePuzzle();
        gameCanvas.puzzleChanged = false;
    }
    /*
    var mousePressed = false;
    
    function mouseDown(e){
        mousePressed = true;
        this.setClickAction(e.x, e.y);
    }
    
    function mouseDrag(e){
        if(mousePressed){
            this.click(e.x, e.y);
        }
    }
    
    function mouseUp(e){
        mousePressed = false;
        this.click(e.x, e.y);
    }
    
    keys = {
        z: false,
        ctrl: false
    };
    
    function keyDown(e){
        if (event.keyCode == 90) {
            keys["z"] = true;
        } else if (event.keyCode == 17) {
            keys["ctrl"] = true;
        }

        if(keys["z"] && keys["ctrl"]){
            this.undo();    
        }
    }
    
    function keyUp(e){
        if (event.keyCode == 90) {
            keys["z"] = false;
        } else if (event.keyCode == 17) {
            keys["ctrl"] = false;
        }
    }
    
    document.addEventListener('mousedown', mouseDown, false);
    document.addEventListener('mousemove', mouseDrag, false);
    document.addEventListener('mouseup', mouseUp, false);
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
    /*
    setInterval(
        function(){
            this.update();
            this.render();
            
            
            //if(this.gridComplete()){
            //  console.log("GRID COMPLETE :D");
            //  return;
            //}
    }, 100)*/
}