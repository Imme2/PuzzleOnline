


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


/* 

	Lenguajes 

*/

// Este es el lenguaje inicial:
// Lenguajes validos = {spanish, english}
lenguaje = "spanish";



function cambiarLenguaje(oldLang,newLang){

	if (oldLang == newLang){
		return 1;
	}
	$('.'+lenguaje).each(function(){
		if ($(this).css('display') != "none"){
			$(this).fadeOut('slow',function(){
				$(this).css('display','none');
				var idUsado = $(this).attr("id");
				idUsado = idUsado.replace(oldLang,"");
				$("#" + idUsado + newLang).fadeIn('slow',function(){
					$(this).css('display','initial');
				});
			});
		};
	});



}


// Esperamos que la pagina este lista.
$(document).ready(function(){

	/* funcion que hace la primera transicion al hacer click en la
	   el div de la vista inicial */

	$('div.vista-inicial').click(function(){
		cambiarVista('vista-inicial','vista-menu-inicial');
	});

	/* 
		Vamos a darle a cada boton del menu-inicial su funcion
	*/
	$(".boton-presentacion").click(function(){}); 
	$(".boton-instrucciones").click(function(){});
	$(".boton-ver-manifestaciones").click(function(){
		cambiarVista('vista-menu-inicial','vista-seleccion-imagen');
	});
	$(".boton-resumir-partida").click(function(){});
	$(".boton-salir").click(function(){
		cambiarVista('vista-menu-inicial','vista-inicial');
	});


	/*
		Cuando se hace click en la vista de textos explicativos
			se debe cambiar la vista.
	*/

	$('.vista-textos-explicativos').click(function(){
		cambiarVista("vista-textos-explicativos","vista-juego");
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
		$("#" + id + "_explicacion" + "-" + lenguaje).fadeIn('slow',function(){
			$(this).css("display","initial");
		});
	});

	/* Para los botones de idioma les damos sus funciones. */

	$('#boton-ingles').click(function(){
		cambiarLenguaje(lenguaje,'english');
		lenguaje = "english";
	});
	$('#boton-espanol').click(function(){
		cambiarLenguaje(lenguaje,'spanish');
		lenguaje = "spanish"
	});

	/* Para las letras del menu principal */

	// Para simplificar cosas, guardamos que esta activo
	activo = "introduccion";

	$('.boton-introduccion').click(function(){
		if (activo != "introduccion"){
			auxActivo = activo
			$('.boton-'+auxActivo).css("color","white");
			$('.boton-introduccion').css("color","red");
			$('.texto-'+auxActivo+'-'+lenguaje).fadeOut('slow',function(){
				$(this).css('display','none');
				$('.texto-introduccion-'+lenguaje).fadeIn('slow',function(){
					$(this).css('display','initial');
				});
			});
			activo = "introduccion";
		}
	});

	$('.boton-instrucciones').click(function(){
		if (activo != "instrucciones"){
			auxActivo = activo
			$('.boton-'+auxActivo).css("color","white");
			$('.boton-instrucciones').css("color","red");
			$('.texto-'+auxActivo+'-'+lenguaje).fadeOut('slow',function(){
				$(this).css('display','none');
				$('.texto-instrucciones-'+lenguaje).fadeIn('slow',function(){
					$(this).css('display','initial');
				});
			});
			activo = "instrucciones";
		}
	});

});
