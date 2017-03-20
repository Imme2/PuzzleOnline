
/* funcion que hace la primera transicion al hacer click en la
   el div de la vista inicial */



$('div.vista-inicial').click(function(){
	cambiarVista('vista-inicial','vista-menu-inicial');
});


/* Para cada imagen de la seleccion cambiamos la vista 
  	a su explicacion (siempre idimagen_explicacion es el
  	id de la explicacion) 
*/

$('.imagen-seleccion').click(function(){
	var id = $(this).attr('id');
	var image = $(this).attr('src');
	startSlider(image, nivel);

	cambiarVista("vista-seleccion-imagen","vista-textos-explicativos");
	$("#" + id + "_explicacion").fadeIn('slow',function(){
		document.getElementById(id + "_explicacion").style.display="initial";
	});
});

/*
	Cuando se hace click en la vista de textos explicativos
		se debe cambiar la vista.
*/

$('.vista-textos-explicativos').click(function(){
	cambiarVista("vista-textos-explicativos","vista-juego");
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
