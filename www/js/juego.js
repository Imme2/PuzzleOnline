var tablero = document.getElementById("container-juego");

var imagen = "";



/* Funcion TEMPORAL *ihopeso que pone las imagenes en una tabla */

var root = "resources/temporal/";

function agregarImagenes(){
	var vistaImagenes = document.getElementById('vista-seleccion-imagen');
	for (var j = 1; j <= 16; j++){

		vistaImagenes.innerHTML += "<img src='" + root + j + ".jpg'" + 
							" onclick='cambiarVista(\"vista-seleccion-imagen\",\"vista-juego\");"+
							"startSlider(\"" + root + j + ".jpg\",4);'" + 
							"width='100' height='100'>";
		vistaImagenes.innerHTML += "</img>\n";
	}
}


/* Funcion que cambia de vista a vista con un fadein/fadeout */

function cambiarVista(vistaAnterior,vistaNueva){
	$("#" + vistaAnterior).fadeOut('slow',function(){
		document.getElementById(vistaAnterior).style.display = "none";
		$("#" + vistaNueva).fadeIn('slow',function(){
			document.getElementById(vistaNueva).style.display="initial";
		});
	});
}


/* 


Codigo del juego


*/

// Declaramos las variables globales para el juego

var canvas,boardSize, tileCount, tileSize;
var clickLoc, emptyLoc, solved, boardParts, img;
var movimientos = 0;

// Funcion que empieza el juego.
// @imageURL: Nos da el url de la imagen que vamos a usar
// @sizeOfBoard: nos da el tama;o del tablero (6 para 6x6, 3 para 3x3, etc)
function startSlider(imageURL, sizeOfBoard){
	canvas = document.getElementById("canvas-juego").getContext("2d");
	boardSize = document.getElementById('canvas-juego').width;

	if (sizeOfBoard > 20){
		// Esto es muy grande, dejemoslo en 10x10
		sizeOfBoard = 10
	}
	tileCount = sizeOfBoard;
	tileSize = boardSize / tileCount;

	clickLoc = new Object;
	clickLoc.x = 0;
	clickLoc.y = 0;

	emptyLoc = new Object;
	emptyLoc.x = 0;
	emptyLoc.y = 0;

	solved = false;
	boardParts = new Object;


	setBoard();


	img = new Image();
	img.src = imageURL;
	img.addEventListener('load', drawTiles, false);

}


// Esta funcion coloca la primera configuracion del tablero
// TODO: hacer que sea al azar
function setBoard() {
	boardParts = new Array(tileCount);
	for (var i = 0; i < tileCount; ++i) {
		boardParts[i] = new Array(tileCount);
		for (var j = 0; j < tileCount; ++j) {
			boardParts[i][j] = new Object;
			boardParts[i][j].x = (tileCount - 1) - i;
			boardParts[i][j].y = (tileCount - 1) - j;
		}
	}
	emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
	emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
	solved = false;
}


/* Funcion que cambia la escala dinamicamente (inutil por ahora)
document.getElementById('scale').onchange = function() {
tileCount = this.value;
tileSize = boardSize / tileCount;
setBoard();
drawTiles();
}; */

// Funciones que registran el mouse
document.getElementById('canvas-juego').onmousemove = function(e) {
	clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
	clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
};


document.getElementById('canvas-juego').onclick = function() {
	if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
		slideTile(emptyLoc, clickLoc);
		drawTiles();
	}
	if (solved) {
		setTimeout(function() {alert("You solved it!");}, 500);
	}
};



function distance(x1, y1, x2, y2) {
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

// funcion para mover Tiles
function slideTile(toLoc, fromLoc) {
	if (!solved) {
		boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
		boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
		boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
		boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
		toLoc.x = fromLoc.x;
		toLoc.y = fromLoc.y;
		movimientos++;
		checkSolved();
	}
}

function checkSolved() {
	var flag = true;
	for (var i = 0; i < tileCount; ++i) {
		for (var j = 0; j < tileCount; ++j) {
			if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
				flag = false;
			}
		}
	}
	solved = flag;
}

// Funcion que dibuja el tablero en realidad.
function drawTiles() {
	canvas.clearRect ( 0 , 0 , boardSize , boardSize );
	for (var i = 0; i < tileCount; ++i) {
		for (var j = 0; j < tileCount; ++j) {
			var x = boardParts[i][j].x;
			var y = boardParts[i][j].y;
			if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
				canvas.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
				i * tileSize, j * tileSize, tileSize, tileSize);
			}
		}
	}
	document.getElementById("movimientos").innerHTML = "Movimientos: " + movimientos
}

// Colocar Hint y quitarlo cuando sea presionado un boton.
function colocarHint(){
	// Solo dibujamos toda la imagen.
	canvas.drawImage(img,0,0);
}

function quitarHint(){
	// Redibujamos las tiles.
	drawTiles();
}