
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
