
/* funcion que hace la primera transicion al hacer click en la
   el div de la vista inicial */

$('div.vista-inicial').click(function(){
	cambiarVista('vista-inicial','vista-menu-inicial');
});


/* Funcion que cambia de vista a vista con un fadein/fadeout */

function cambiarVista(vistaAnterior,vistaNueva){
	$("." + vistaAnterior).fadeOut('slow',function(){
		document.getElementById(vistaAnterior).style.display = "none";
		$("." + vistaNueva).fadeIn('slow',function(){
			document.getElementById(vistaNueva).style.display="initial";
		});
	});
}

/* Funcion que se encarga de cambiar los highlights de los niveles */ 

function cambiarNivel(numero){
	for (var i = 3; i < 7; i++){
		if (i == numero){
			document.getElementById("nivel-"+i).style.background = "white";
			document.getElementById("nivel-"+i).style.color = "black";
		}
		else{
			document.getElementById("nivel-"+i).style.background = "black";
			document.getElementById("nivel-"+i).style.color = "white";
		}
	}
	nivel = numero;
}

/* Funcion TEMPORAL *ihopeso que pone las imagenes en una tabla */

var root = "resources/temporal/";

function agregarImagenes(){
	var vistaImagenes = document.getElementById('vista-seleccion-imagen');
	for (var j = 1; j < 15; j++){

		vistaImagenes.innerHTML += "<img src='" + root + j + ".jpg'" + 
							" onclick='cambiarVista(\"vista-seleccion-imagen\",\"vista-juego\");"+
							"startSlider(\"" + root + j + ".jpg\",4);'" + 
							"width='150' height='150'>";
		vistaImagenes.innerHTML += "</img>\n";
	}
}
