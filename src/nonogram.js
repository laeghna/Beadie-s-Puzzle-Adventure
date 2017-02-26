var tempYClues, tempXClues, xClues, yClues;

function solvePuzzle(tableID, puzzle) {
	var width = puzzle.width;
	var height = puzzle.height;
	xClues = puzzle.clueCols;
	yClues = puzzle.clueRows;
	
	tableMaker(tableID, puzzle);
	clueInjector(tableID, puzzle);
	
	tempYClues = generateClueArray(createBinaryStringArray(tableID));
	tempXClues = generateClueArray(createBinaryStringArrayColumns(tableID));	
}

Element.prototype.solveToggleClass = function(){
	this.toggleClass();
	var classes = this.className.split(' ');
	var rowClass = classes[0];
	var cellClass = classes[1];
	var row = rowClass[3];
	var cell = cellClass[4];
	var binaryArrays = createStringsForCell($("td." + rowClass + "." + cellClass));
	var xClue = generateClue(binaryArrays.columnString);
	var yClue = generateClue(binaryArrays.rowString);
	tempYClues[row] = yClue;
	tempXClues[cell] = xClue;
	
	for (i = 0; i < yClues[row].length; i++){
		if (yClue[i]==undefined){
			yClue[i]==0;
			$("span.row" + row + "Clue" + i).removeClass("correct");
		} 
		
		if (yClue[i] == yClues[row][i]) {
			$("span.row"+row+"Clue"+i).addClass("correct")
		} else {
			$("span.row"+row+"Clue"+i).removeClass("correct")
		}
	}
	
	for (i = 0; i < xClues[cell].length; i++){
		if (xClue[i]==undefined){
			xClue[i]==0;
			$("span.cell" + cell + "Clue" + i).removeClass("correct");
		} 
		
		if (xClue[i] == xClues[cell][i]) {
			$("span.cell"+cell+"Clue"+i).addClass("correct")
		} else {
			$("span.cell"+cell+"Clue"+i).removeClass("correct")
		}
	}
	
	if (JSON.stringify(tempYClues) == JSON.stringify(yClues) && JSON.stringify(tempXClues) == JSON.stringify(xClues)) {
		//$("#puzzle").html("<h1>You win!</h1>")
	}
}



function generateClue(binaryString){
	var counter = 0,
		clueArray = [],
		width = binaryString.length,
		index = 0;
		
	while (index < width) {
		var color = binaryString[index];
		if (color == "0" || color == "2") {
			index ++;
			if (counter > 0) {
				clueArray.push(counter);
				counter = 0
			}
		} else {
			index ++;
			counter ++;
			if (index == width) {clueArray.push(counter)}
		}
	}
	return clueArray
}

function generateClueArray(group){
	var groupArray = [];
	
	for (var i = 0; i < group.length; i++){
		groupArray.push(generateClue(group[i]))
	}
	
	return groupArray
}

function tableMaker(tableId, puzzle) {
	var table = document.getElementById(tableId);
	table.innerHTML = ("");
	var	tbody = document.createElement('tbody');
	
	//var	width = puzzle.width;
	//var	height = puzzle.height;
		
	table.appendChild(tbody);

	for (var i = 0; i < puzzle.height; i++) {
		tbody.insertRow(i);
		for (var j = 0; j < puzzle.width; j++) {
			tbody.rows[i].insertCell(j);
			tbody.rows[i].cells[j].addClassName("row" + i);
			tbody.rows[i].cells[j].addClassName("cell" + j);
		};
	}

	tbody.insertRow(0);
	for (var j = 0; j < puzzle.width; j++) {
		var th = document.createElement('th');
		th.addClassName("cell" + j)
		tbody.rows[0].appendChild(th);
	}

	tbody.rows[0].insertBefore(
		document.createElement('td'), tbody.rows[0].cells[0]
	).addClassName("empty");

	for (var i = 1; i <= puzzle.height; i++) {
		var th = document.createElement('th');
		th.addClassName("row" + (i - 1))
		tbody.rows[i].insertBefore(th, tbody.rows[i].cells[0])
	}
	
	//table.createCaption().innerHTML = puzzle.name;
	return true;
}

function clueInjector(tableId, puzzle) {
	var table = document.getElementById(tableId).tBodies[0];
	
	//var width=puzzle.width;
	//var height=puzzle.height;
	var xArray=puzzle.clueCols;
	var yArray=puzzle.clueRows;
	
	for (j = 1; j <= puzzle.width; j++){
		var cellArray=xArray[j - 1];
		var cell=table.rows[0].cells[j];
		cell.innerHTML = "";
		for (var i = 0; i < cellArray.length; i++) {
			var span = document.createElement('span');
			span.addClassName("cell" + (j-1) + "Clue" + i);
			span.innerHTML = cellArray[i];
			cell.appendChild(span)
		}
	}
	
	for (i = 1; i <= puzzle.height; i++){
		var cellArray=yArray[i - 1];
		var cell=table.rows[i].cells[0];
		cell.innerHTML = "";
		for (var j = 0; j < cellArray.length; j++) {
			var span = document.createElement('span');
			span.addClassName('row' + (i-1) + 'Clue' + j);
			span.innerHTML = cellArray[j] + ' ';
			cell.appendChild(span)
		}
	}
	
	return true
}

function puzzlePrinter(tableId, puzzle) {
	var table = document.getElementById(tableId).tBodies[0];
	
	//var width=puzzle.width;
	//var height=puzzle.height;
	var binaryArray = puzzle.cells;
	
	for (i = 1; i <= puzzle.height; i++){
		var row = table.rows[i];
		var rowString = binaryArray[i - 1];
		
		for (j = 1; j <= puzzle.width; j++){
			var cell = row.cells[j];
			var color = rowString[j - 1];
			
			
			if (color == "1"){
				cell.addClassName('black')
			} else if (color == "2"){
				cell.addClassName('flag')
			}
		}
	}
}

function createStringsForCell(tableCell){
	var classes = tableCell.attr('class').split(' ');
	var row = $("td." + classes[0]);
	var column = $("td." + classes[1]);
	
	var columnString = createString(column);
	var rowString = createString(row);
	
	return {
		"columnString": columnString,
		"rowString": rowString
	}
}

function createString(arrayOfElements){
	var binaryString = "";
	
	for (var i = 0; i < arrayOfElements.length; i++){
		if (arrayOfElements[i].hasClassName("black")){
			binaryString += "1"
		} else if (arrayOfElements[i].hasClassName("flag")){
			binaryString += "2"
		} else {binaryString += "0"}
	}
	
	return binaryString
}

function createBinaryStringArray(puzzleID){
	var puzzle = $("#" + puzzleID);
	var height = $("#" + puzzleID + " tr").length - 1;
	var binaryArray = [];
	for (var i = 0; i < height; i++){
		binaryArray.push(createString($("td.row" + i)))
	}
/*	for (var row in binaryArray) {
		console.log("\n" + row + ">" + binaryArray[row] + "\n  " + samplePuzzle.binaryArray[row])
		if (binaryArray[row] == samplePuzzle.binaryArray[row]) {console.log("This one's good")}
		else {console.log("What's up with this one?")}
	} */
	
	return binaryArray
}

function createBinaryStringArrayColumns(puzzleID){
	var puzzle = $("#" + puzzleID);
	var width = $("#" + puzzleID + " tr").first().children().length - 1;
	var binaryArray = [];
	
	for (var i = 0; i < width; i++) {
		binaryArray.push(createString($("td.cell" + i)))
	}
	
	return binaryArray
}

Element.prototype.hasClassName = function(name) {
    return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function(name) {
    if (!this.hasClassName(name)) {
        this.className = this.className ? [this.className, name].join(' ') : name;
    }
};

Element.prototype.removeClassName = function(name) {
    if (this.hasClassName(name)) {
        var c = this.className;
        this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
    }
};

Element.prototype.toggleClass = function() {
	if (this.hasClassName("black")){
		this.removeClassName("black");
	} else if (this.hasClassName("flag")){
		this.removeClassName("flag")
	}else {this.addClassName("black")}
}