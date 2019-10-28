//KAMBAN 002 OPENPARTNER 2018
//SIMPLIFICA Y SEPARA METODO PARA LA CARGA DE TAREAS EN RELACION A LA VERSION 001
//ESTLIOS DE LAS TAREAS DISTINTO A VERSION 001

interfaz="";

function construccion_lugar_carga(tareas, kanban_usuario, lugar_carga){ 	
//kanban_usuario.interfaz="kanban"
	interfaz=kanban_usuario.interfaz
	//CONSTRCCION DE INTERFACS
	
	if(kanban_usuario.interfaz=="simple"){

		$(lugar_carga).append("<div class='seccion-head row'>"+
								  "<div class='col-xs-12 col-sm-4 col-md-6 text-left'>"+
									"<h2>"+kanban_usuario.nombre+"</h2>"+
								   "</div>"+
								   "<div id='filtros_camban_lugar' class='col-xs-12 col-sm-8 col-md-6 text-right'>"+
							
								   "</div>"+
								   /*"<div id='seach_camban' class='col-xs-12 col-sm-3 col-md-2 text-right'>"+
								   		"<div class='row input-group'>"+
										  "<input type='text' class='form-control search_input' placeholder='Buscar...'>"+
										  "<span class='input-group-btn'>"+
											"<button class='btn btn-default' type='button'><i class='fa fa-search' aria-hidden='true'></i></button>"+
											//"<button class='btn btn-default baul' type='button'><i class='fa fa-folder-open' aria-hidden='true'></i></button>"+
										  "</span>"+
										"</div>"+
							
								   "</div>"+*/
								"</div>");
	
	
		construir_filtros_lugar_carga(kanban_usuario.filtros, "#filtros_camban_lugar", lugar_carga);
		//construir_filtros(kanban_usuario.filtros, "'"+lugar_carga+" #filtros_camban_lugar'");
		/*$(lugar_carga).append("<div class='conetendor_columnas'>A</div>"+
						  "<div class='lista_formularios'>B</div>")*/
		$(lugar_carga).append("<div class=''>"+
								"<div  id='simple' class='col-xs-12 col-sm-12 col-md-12'></div>"+
						  "</div>")
	
		columnas=[];
	}else if(kanban_usuario.interfaz=="kanban"){
		$(lugar_carga).append("<div class='seccion-head row'>"+
								  "<div class='col-xs-12 col-sm-4 col-md-6 text-left'>"+
									"<h2>"+kanban_usuario.nombre+"</h2>"+
								   "</div>"+
								   "<div id='filtros_camban_lugar' class='col-xs-12 col-sm-8 col-md-6 text-right'>"+
							
								   "</div>"+
								   /*"<div id='seach_camban' class='col-xs-12 col-sm-3 col-md-2 text-right'>"+
								   		"<div class='row input-group'>"+
										  "<input type='text' class='form-control search_input' placeholder='Buscar...'>"+
										  "<span class='input-group-btn'>"+
											"<button class='btn btn-default' type='button'><i class='fa fa-search' aria-hidden='true'></i></button>"+
											//"<button class='btn btn-default baul' type='button'><i class='fa fa-folder-open' aria-hidden='true'></i></button>"+
										  "</span>"+
										"</div>"+
							
								   "</div>"+*/
								"</div>");
	
	
	construir_filtros_lugar_carga(kanban_usuario.filtros, "#filtros_camban_lugar", lugar_carga);
	//construir_filtros(kanban_usuario.filtros, "'"+lugar_carga+" #filtros_camban_lugar'");
	
	
	
	columnas=[];
	for (i in kanban_usuario.columnas){
		
		//kanban_usuario.columnas[i].nombre=kanban_usuario.columnas[i].nombre+"|";
		
		datos_columna=kanban_usuario.columnas[i].nombre.split("|",2);
		columnas.push({"columna":datos_columna[0].replace(/\ /g, "_"), "tag_metadata":kanban_usuario.columnas[i].tag_metadata});
		id_columna=datos_columna[0].replace(/\ /g, "_");
		nota_columna=datos_columna[1];
		//console.log(kanban_usuario.columnas[i].nombre)
		ancho=100/kanban_usuario.columnas.length;

		$(lugar_carga).append("<div class='columnna' id='columnna_"+id_columna+"'  style='width:"+ancho+"%; display:inline-grid; padding:0px;'>"+
										"<div class='panel panel-default' style=''>"+
                                   			"<div class='panel-heading text-center'>"+
												"<div class='titulo_kanban'>"+
													"<span>"+id_columna.replace(/\_/g, " ")+"&nbsp;</span>"+
													"<div class='btn-group'>"+
																	"<button class='btn btn-default btn-xs  dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
																		"<i class='fa fa-plus' aria-hidden='true'></i>&nbsp;"+
																		"<span class='caret'></span>"+
																	"</button>"+
																	"<ul id='lista_"+id_columna+"' class='dropdown-menu'>"+
																	"</ul>"+
													"</div>"+
													"<span>"+nota_columna+"&nbsp;</span>"+
												"</div>"+
												"<div id='conter_search_"+id_columna+"' class='row conter_search'>"+
													"<span id='_"+id_columna+"'>"+
																
													"</span>"+
													
													
												"</div>"+ 
											"</div>"+
                                   			"<div id='"+id_columna+"' class='panel-body' ></div>"+
										"</div>"+
                                  "</div>")
		//CALCULO LA DIMENSION DE LAS OPCIONES
		if(kanban_usuario.columnas[i].accion){
			if(kanban_usuario.columnas[i].accion.length>=1){								  
				//OPCIONES DE LA COLUMNA
				for (e in kanban_usuario.columnas[i].accion){
					
							var inserto_metodo_peticion="";
							if(kanban_usuario.columnas[i].accion[e].metodo){inserto_metodo_peticion=kanban_usuario.columnas[i].accion[e].metodo}else{inserto_metodo_peticion="POST"};
							
							$("#lista_"+id_columna).append("<li data-ws='"+JSON.stringify({'accion':kanban_usuario.columnas[i].accion[e].ws.replace(/\ /g, "_"), 'identificador':id_columna, 'posicion_tarea':"", 'documento':kanban_usuario.columnas[i].accion[e].doc, 'metodo':inserto_metodo_peticion})+"' class='accion'>"+
																"<a href='#'>"+kanban_usuario.columnas[i].accion[e].lista+"</a>"+
															 "</li>");
															 
															 
							
							
				}	
			} else if( kanban_usuario.columnas[i].accion.length==0){							
				$("#lista_"+id_columna).parents(".btn-group").hide();
			}
		} else{
			$("#lista_"+id_columna).parent(".btn-group").hide();
		}
		//TAG DE BUSQUEDA EN LA COLUMNA
		
		los_tag_columna=[];
		for (e in kanban_usuario.columnas[i].tag_metadata){
					
					$("#_"+id_columna).append("&nbsp;<span class='tag_dusqueda label' data-estado='0' data-tag_metadata='"+kanban_usuario.columnas[i].tag_metadata[e]+"'>"+kanban_usuario.columnas[i].tag_metadata[e]+"</span>");
					los_tag_columna.push(kanban_usuario.columnas[i].tag_metadata[e]);	
					
		}					  
				
		
	  }
	//refrescar_tareas(tareas, columnas);
	} else if(kanban_usuario.interfaz=="slider"){
		$(lugar_carga).append("<div class='seccion-head row'>"+
								  "<div class='col-xs-12 col-sm-4 col-md-6 text-left'>"+
									"<h2>"+kanban_usuario.nombre+"</h2>"+
								   "</div>"+
								   "<div id='filtros_camban_lugar' class='col-xs-12 col-sm-8 col-md-6 text-right'>"+
							
								   "</div>"+
								   /*"<div id='seach_camban' class='col-xs-12 col-sm-3 col-md-2 text-right'>"+
								   		"<div class='row input-group'>"+
										  "<input type='text' class='form-control search_input' placeholder='Buscar...'>"+
										  "<span class='input-group-btn'>"+
											"<button class='btn btn-default' type='button'><i class='fa fa-search' aria-hidden='true'></i></button>"+
											//"<button class='btn btn-default baul' type='button'><i class='fa fa-folder-open' aria-hidden='true'></i></button>"+
										  "</span>"+
										"</div>"+
							
								   "</div>"+*/
								"</div>");
	
	
	construir_filtros_lugar_carga(kanban_usuario.filtros, "#filtros_camban_lugar", lugar_carga);
	//construir_filtros(kanban_usuario.filtros, "'"+lugar_carga+" #filtros_camban_lugar'");
	/*$(lugar_carga).append("<div class='conetendor_columnas'>A</div>"+
						  "<div class='lista_formularios'>B</div>")*/
	$(lugar_carga).append("<div class='columnna_fija'>"+
								"<div id='barra_ubicacion' style='display:none;'></div>"+
								"<div class='columnna_fija'  id='lista_formularios'></div>"+
						  "</div>")
	
	columnas=[];
	for (i in kanban_usuario.columnas){
		
		//kanban_usuario.columnas[i].nombre=kanban_usuario.columnas[i].nombre+"|";
		
		datos_columna=kanban_usuario.columnas[i].nombre.split("|",2);
		columnas.push({"columna":datos_columna[0].replace(/\ /g, "_"), "tag_metadata":kanban_usuario.columnas[i].tag_metadata});
		id_columna=datos_columna[0].replace(/\ /g, "_");
		nota_columna=datos_columna[1];
		//console.log(kanban_usuario.columnas[i].nombre)
		ancho=100/kanban_usuario.columnas.length;

		$(lugar_carga).append("<div class='columnna' id='columnna_"+id_columna+"'   style='width:"+ancho+"%; display:inline-grid; padding:0px;'>"+
										"<div class='panel panel-default' style=''>"+
                                   			"<div class='panel-heading text-center'>"+
												"<div class='titulo_kanban'>"+
													"<span>"+id_columna.replace(/\_/g, " ")+"&nbsp;</span>"+
													"<div class='btn-group'>"+
																	"<button class='btn btn-default btn-xs  dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
																		"<i class='fa fa-plus' aria-hidden='true'></i>&nbsp;"+
																		"<span class='caret'></span>"+
																	"</button>"+
																	"<ul id='lista_"+id_columna+"' class='dropdown-menu'>"+
																	"</ul>"+
													"</div>"+
													"<span>"+nota_columna+"&nbsp;</span>"+
													"<span class='mostrar_columna'data-size='"+ancho+"%' style='display:none;'>"+
														"<span></span>"+
													"</span>"+
													"<span class='ocultar_columna'></span>"+
												"</div>"+
												"<div id='conter_search_"+id_columna+"' class='row conter_search'>"+
													"<span id='_"+id_columna+"'>"+
																
													"</span>"+
													
													
												"</div>"+ 
											"</div>"+
                                   			"<div id='"+id_columna+"' class='panel-body' >"+
												
											"</div>"+
										"</div>"+
                                  "</div>")
		//CALCULO LA DIMENSION DE LAS OPCIONES
		if(kanban_usuario.columnas[i].accion){
			if(kanban_usuario.columnas[i].accion.length>=1){								  
				//OPCIONES DE LA COLUMNA
				for (e in kanban_usuario.columnas[i].accion){
					
							var inserto_metodo_peticion="";
							if(kanban_usuario.columnas[i].accion[e].metodo){inserto_metodo_peticion=kanban_usuario.columnas[i].accion[e].metodo}else{inserto_metodo_peticion="POST"};
							
							$("#lista_"+id_columna).append("<li data-ws='"+JSON.stringify({'accion':kanban_usuario.columnas[i].accion[e].ws.replace(/\ /g, "_"), 'identificador':id_columna, 'posicion_tarea':"", 'documento':kanban_usuario.columnas[i].accion[e].doc, 'metodo':inserto_metodo_peticion})+"' class='accion'>"+
																"<a href='#'>"+kanban_usuario.columnas[i].accion[e].lista+"</a>"+
															 "</li>");
															 
															 
							
							
				}	
			} else if( kanban_usuario.columnas[i].accion.length==0){							
				$("#lista_"+id_columna).parents(".btn-group").hide();
			}
		} else{
			$("#lista_"+id_columna).parent(".btn-group").hide();
		}
		//TAG DE BUSQUEDA EN LA COLUMNA
		
		los_tag_columna=[];
		for (e in kanban_usuario.columnas[i].tag_metadata){
					
					$("#_"+id_columna).append("&nbsp;<span class='tag_dusqueda label' data-estado='0' data-tag_metadata='"+kanban_usuario.columnas[i].tag_metadata[e]+"'>"+kanban_usuario.columnas[i].tag_metadata[e]+"</span>");
					los_tag_columna.push(kanban_usuario.columnas[i].tag_metadata[e]);	
					
		}					  
				
		
	  }
	//refrescar_tareas(tareas, columnas);
	}
	
//FINALIZA KANBAN
//INICIA LISTA DE TARERAS
else if(kanban_usuario.interfaz=="lista"){		
			
	$(lugar_carga).append(`<div class='seccion-head row'>
								<div class='col-xs-12 col-sm-6 col-md-6 text-left'>
								  <h2>${kanban_usuario.nombre}
									<span class='label'>
										<span class='badge' id='usuario_'></span>&nbsp;
										<span class='badge' id='cedente'></span>&nbsp;
										<span class='badge' id='campania'></span>&nbsp;
										<span class='badge' id='ani'></span>
									</span>
								  </h2>
								   </div>
								   <div id='filtros_camban_lugar' class='col-xs-12 col-sm-6 col-md-6 text-right'>					
								   </div>								   
								</div>`);
	
	
	//construir_filtros(kanban_usuario.filtros, "#filtros_camban_lugar");
	construir_filtros_lugar_carga(kanban_usuario.filtros, "#filtros_camban_lugar", lugar_carga);

	$(lugar_carga).append("<div class='row'>"+
									"<div class='col-xs-6 col-sm-8 col-md-8 barra_tareas'>"+
										"<ul id='lista_opciones' class='row nav nav-tabs'></ul>"+
									"</div>"+
									"<div class='col-xs-6 col-sm-4 col-md-4 barra_tareas'>"+
										"<ul id='lista_opciones_interz' class='nav nav-tabs'>"+
											"<li role='presentation' class='eliminar_formulario' style='float: right;'><a><i class='fa fa-times-circle' aria-hidden='true'></i></a></li>"+
											"<li role='presentation' class='enviar_formulario accion' data-ws='' style='float: right; display:none' ><a><i class='fa fa-envelope' aria-hidden='true'></i></a></li>"+
											
											
										"</ul>"+
									"</div>"+
									
									"<div id='lista_tareas' class='col-xs-12 col-sm-3 col-md-3'></div>"+
									"<div id='lista_formularios' class='col-xs-12 col-sm-9 col-md-9'>"+
										nota_accion+
									"</div>"+
							 "</div>"
							 );
	$("#lista_opciones_interz > li").hide();
							  
	
	columnas=[];
	for (i in kanban_usuario.columnas){
		
		//console.log("ES:"+kanban_usuario.columnas[i].nombre.indexOf("|"))
		if(kanban_usuario.columnas[i].nombre.indexOf("|")<0){
			kanban_usuario.columnas[i].nombre=kanban_usuario.columnas[i].nombre+"|"
		}
		datos_columna=kanban_usuario.columnas[i].nombre.split("|",2);
		columnas.push({"columna":datos_columna[0].replace(/\ /g, "_"), "tag_metadata":kanban_usuario.columnas[i].tag_metadata});
		id_columna=datos_columna[0].replace(/\ /g, "_");
		nota_columna=datos_columna[1];
		$("#lista_opciones").append("<li id='opcion_"+id_columna+"'  role='presentation' ><a>"+id_columna.replace(/\_/, " ")+"</a></li>");
		$("#lista_tareas").append("<div id='columnna_"+id_columna+"' class='columnna row'   style='display:inline-grid; padding:0px; display: none;'>"+
										"<div class='panel panel-default' style=''>"+
                                   			"<div class='panel-heading text-center'>"+
												"<div class='titulo_kanban'>"+
													"<span>"+id_columna.replace(/\_/g, " ")+"&nbsp;</span>"+
													"<div class='btn-group'>"+
																	"<button class='btn btn-default btn-xs  dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
																		"<i class='fa fa-plus' aria-hidden='true'></i>&nbsp;"+
																		"<span class='caret'></span>"+
																	"</button>"+
																	"<ul id='lista_"+id_columna+"' class='dropdown-menu'>"+
																	"</ul>"+
													"</div>"+
													"<span>"+nota_columna+"&nbsp;</span>"+
												"</div>"+
												"<div id='conter_search_"+id_columna+"' class='row conter_search'>"+
													"<span id='_"+id_columna+"'>"+
																
													"</span>"+
													
													
												"</div>"+ 
											"</div>"+
                                   			"<div id='"+id_columna+"' class='panel-body' ></div>"+
										"</div>"+
                                  "</div>")
								  
		//SELECCIONO LA PRIMERA OPCION CREADA
		//alert(i)
		if (i == 0){$("#columnna_"+id_columna).show();};
		//CALCULO LA DIMENSION DE LAS OPCIONES
		if(kanban_usuario.columnas[i].accion){
			if(kanban_usuario.columnas[i].accion.length>=1){								  
				//OPCIONES DE LA COLUMNA
				for (e in kanban_usuario.columnas[i].accion){
							
							var inserto_metodo_peticion="";
							if(kanban_usuario.columnas[i].accion[e].metodo){inserto_metodo_peticion=kanban_usuario.columnas[i].accion[e].metodo}else{inserto_metodo_peticion="POST"};
							
							$("#lista_"+id_columna).append("<li data-ws='"+JSON.stringify({'accion':kanban_usuario.columnas[i].accion[e].ws.replace(/\ /g, "_"), 'identificador':id_columna, 'posicion_tarea':"", 'documento':kanban_usuario.columnas[i].accion[e].doc, 'metodo':inserto_metodo_peticion})+"' class='accion'>"+
																"<a href='#'>"+kanban_usuario.columnas[i].accion[e].lista+"</a>"+
															 "</li>");
															 
															 
							
							
				}	
			} else if( kanban_usuario.columnas[i].accion.length==0){							
				$("#lista_"+id_columna).parents(".btn-group").hide();
			}
		} else{
			$("#lista_"+id_columna).parent(".btn-group").hide();
		}
		
		//TAG DE BUSQUEDA EN LA COLUMNA		
		
		los_tag_columna=[];
		for (e in kanban_usuario.columnas[i].tag_metadata){
					
					$("#_"+id_columna).append("&nbsp;<span class='tag_dusqueda label label-default label-success' data-estado='0' data-tag_metadata='"+kanban_usuario.columnas[i].tag_metadata[e]+"'>"+kanban_usuario.columnas[i].tag_metadata[e]+"</span>")
					los_tag_columna.push(kanban_usuario.columnas[i].tag_metadata[e]);	
					
		}					  
		//if(tareas.length >=1 ){
		//$("#"+kanban_usuario.columnas[i].nombre.replace(/\ /g, "_")).html("");
		//}
		
		
		
		
	  }


}


//CLICK SOBRE LA OPCION DE LA FICHA O COLUMNA
	$(".panel-heading").find(".accion").on("click", function(){
		//alert(identificador)
		//$(".columnna").find('.tarea').each(function(){$('.tarea').removeClass("tarea_seleccionada");});
		//$('.tarea').removeClass("tarea_seleccionada");
		//$("#tarea_"+identificador).addClass("tarea_seleccionada");
		//DEFINO VARIABLES
		titulo=$(this).find('a').html();
		//identificador=$(this).data("ws").identificador;
		//posicion_tarea=$(this).data("ws").posicion_tarea;
		//key=JSON.stringify($("#tarea_"+$(this).parent("ul").attr("id").replace("lista_", "")).data("filtros_tarea"));
		ws=$(this).data("ws").accion;
		documento_accion=$(this).data("ws").documento;
		//DEFININO METODO DE LA PETICION
		if($(this).data("ws").metodo){metodo_peticion=$(this).data("ws").metodo;}else{metodo_peticion="POST";}
		//EJECUTO UN CLICK 
		tarea_click_cliente();
		
		if(interfaz=="slider"){
			//QUITO ESTILOS
			$(".columnna").find(".marca_columna").removeClass("marca_columna_activa")
			$(".columnna").find(".mostrar_columna").removeClass("mostrar_columna_activa")
			//PONGO ESTILOS
			$(this).closest(".columnna").find(".marca_columna").addClass("marca_columna_activa");
			$(this).closest(".columnna").find(".mostrar_columna").addClass("mostrar_columna_activa")
			
			$(this).closest(".kanaban_load").find(".columnna").each(function(index, element) {
				//if($(this).attr("id").replace("columnna_","")!=posicion_tarea){
					$(this).find(".ocultar_columna").click();
				//}
			});
			ubicacion=""
			ubicacion=ubicacion + $(this).closest(".columnna").attr("id").replace("columnna_","")+"&nbsp;&nbsp;<i class='fas fa-angle-right'></i>&nbsp;&nbsp;<span class='label label-success'>" + titulo + "</span>"
			
			$("#barra_ubicacion").html(ubicacion)
			
		}
		
		
	
	
	});

	console.log(columnas)
 refrescar_tareas(tareas, columnas, kanban_usuario);
 acciones_interfaz(kanban_usuario);	

}

function refrescar_tareas(tareas, columnas, kanban_usuario){
	
	
	nombres_columnas=[];
	insetar_tareas=[];
	los_tag_columna=[];

	for (i in columnas){
		id_columna=columnas[i].columna;
		tag_columna=columnas[i].tag_metadata;
		
		$("#"+id_columna).html("");

		insetar_tareas.push("");
		nombres_columnas.push(id_columna);
		los_tag_columna.push(tag_columna);
	};
		

	for (e in tareas){
		///CONSTRYO LAS TAREAS			
		//console.log(id_columna+"/"+tareas[e].posicion.replace(/\ /, "_"));
		var c = nombres_columnas.indexOf(tareas[e].posicion.replace(/\ /, "_"));			
		
		var nueva_tarea = construir_tarea(tareas[e], los_tag_columna[c]);
		insetar_tareas[c] = insetar_tareas[c] + nueva_tarea;						
	}


	for (i in nombres_columnas){
		$("#"+nombres_columnas[i]).append("<span class='marca_columna' style='display:none;'>"+
												"<span class='texto_columna'>"+nombres_columnas[i]+"&nbsp;(<span class='texto_columna_total'></span>)</span>"+
										  "</span >")
		//console.log(insetar_tareas);
		$("#"+nombres_columnas[i]).append(insetar_tareas[i]);
	}
	
	/*for (i in columnas ){
		
		id_columna=columnas[i].columna.replace(/\ /, "_").replace("|","");
		los_tag_columna=columnas[i].tag_metadata;
		
		$("#"+id_columna).html("");
		insetar_tareas=""
		for (e in tareas){
				
				
				///CONSTRYO LAS TAREAS
				if(id_columna==tareas[e].posicion.replace(/\ /, "_")){
					
					
					nueva_tarea=construir_tarea(tareas[e], los_tag_columna)
					insetar_tareas=insetar_tareas+nueva_tarea


				};
				
				
			
		};
		$("#"+id_columna).append(insetar_tareas)
	};*/
	
	$(".mas").on("click", function(){
		//console.log($(this).data("posicion"))
		if($(this).data("posicion")==0){
			$(this).data("posicion", 1);
			$('#descripcion_'+$(this).attr("id")).show();
			$("#"+$(this).attr("id")+" > .fa-chevron-down").hide();
			$("#"+$(this).attr("id")+" > .fa-chevron-up").show();
		}else if($(this).data("posicion")==1){
			$(this).data("posicion", 0);
			$('#descripcion_'+$(this).attr("id")).hide();
			$("#"+$(this).attr("id")+" > .fa-chevron-down").show();
			$("#"+$(this).attr("id")+" > .fa-chevron-up").hide();	
		}

	})	
	
	//CLICK SOBRE LA OPCION DE LA FICHA O COLUMNA
	$(".tarea").find(".accion").on("click", function(){
		//alert(identificador)
		//$(".columnna").find('.tarea').each(function(){$('.tarea').removeClass("tarea_seleccionada");});
		
		//DEFINO VARIABLES
		titulo=$(this).find('a').html();
		identificador=$(this).data("ws").identificador;
		posicion_tarea=$(this).data("ws").posicion_tarea;
		key=JSON.stringify($("#tarea_"+$(this).parent("ul").attr("id").replace("lista_", "")).data("filtros_tarea"));
		ws=$(this).data("ws").accion;
		documento_accion=$(this).data("ws").documento;
		//DEFININO METODO DE LA PETICION
		if($(this).data("ws").metodo){metodo_peticion=$(this).data("ws").metodo;}else{metodo_peticion="POST";}
		//EJECUTO UN CLICK 
		tarea_click_cliente();
		$('.tarea.tarea_seleccionada').removeClass("tarea_seleccionada");
		$(this).closest(".tarea").addClass('tarea_seleccionada');
		//$("#tarea_"+identificador).addClass("tarea_seleccionada");
		
		if(interfaz=="slider"){
			//QUITO ESTILOS
			$(".columnna").find(".marca_columna").removeClass("marca_columna_activa")
			$(".columnna").find(".mostrar_columna").removeClass("mostrar_columna_activa")
			//PONGO ESTILOS
			$(this).closest(".columnna").find(".marca_columna").addClass("marca_columna_activa");
			$(this).closest(".columnna").find(".mostrar_columna").addClass("mostrar_columna_activa")
			
			$(this).closest(".kanaban_load").find(".columnna").each(function(index, element) {
				if($(this).attr("id").replace("columnna_","")!=posicion_tarea){
					$(this).find(".ocultar_columna").click();
				}
			});
			ubicacion=""
			$(this).closest(".kanaban_load").find(".columnna").each(function(index, element) {
				
				if( $(this).attr("id").replace("columnna_","")!=posicion_tarea){
					
					ubicacion=ubicacion + $(this).attr("id").replace("columnna_","")+"&nbsp;&nbsp;<i class='fas fa-angle-right'></i>&nbsp;&nbsp;"
				
				}else if($(this).attr("id").replace("columnna_","")==posicion_tarea){
					ubicacion=ubicacion + $(this).attr("id").replace("columnna_","")+"&nbsp;&nbsp;<i class='fas fa-angle-right'></i>&nbsp;&nbsp;<span class='label label-success'>" + identificador + "</span>"
					return false;
				}
			});
			$("#barra_ubicacion").html(ubicacion)
		}
		
	
	
	});
	

	
	
	//DOBLE CLICK SOBRE LA FICHA
	$(".tarea").on("dblclick", function(){
		//DEFINO TAREA SELECIONADA
		$('.tarea.tarea_seleccionada').removeClass("tarea_seleccionada");
		$(this).addClass("tarea_seleccionada");
		//DEFINO VARIABLES
		identificador=$(this).attr("id").replace("tarea_", "");
		posicion_tarea=$(this).data("posicion");
		key=JSON.stringify($(this).data("filtros_tarea"));
		tarea_seleccionada=$(this).attr("id");
		//SI EXISTE WS DEFINO VARIABLES
		//alert($(this).data("ws").length)
		if($(this).data("ws") && $(this).data("ws").length>=1){
			
			titulo=$(this).data("ws")[0].titulo
			ws=$(this).data("ws")[0].ws
			documento=$(this).data("ws")[0].doc
		}else{
			titulo=""
			ws=""
			documento="";
		}
		//DEFININO METODO DE LA PETICION
		if($(this).data("ws").metodo){metodo_peticion=$(this).data("ws").metodo;}else{metodo_peticion="POST";}
		//EJECUTO DOBLE CLICK
		tarea_dblclick_cliente();
		
		if(interfaz=="slider"){
			//QUITO ESTILOS
			$(".columnna").find(".marca_columna").removeClass("marca_columna_activa")
			$(".columnna").find(".mostrar_columna").removeClass("mostrar_columna_activa")
			//PONGO ESTILOS
			$(this).closest(".columnna").find(".marca_columna").addClass("marca_columna_activa");
			$(this).closest(".columnna").find(".mostrar_columna").addClass("mostrar_columna_activa")
			//$(this).closest(".columnna").find(
			
			$(this).closest(".kanaban_load").find(".columnna").each(function(index, element) {
				//if($(this).attr("id").replace("columnna_","")!=posicion_tarea){
					$(this).find(".ocultar_columna").click();
				//}
			});
			ubicacion=""
			$(this).closest(".kanaban_load").find(".columnna").each(function(index, element) {
				
				if( $(this).attr("id").replace("columnna_","")!=posicion_tarea){
					
					ubicacion=ubicacion + $(this).attr("id").replace("columnna_","")+"&nbsp;&nbsp;<i class='fas fa-angle-right'></i>&nbsp;&nbsp;"
				
				}else if($(this).attr("id").replace("columnna_","")==posicion_tarea){
					ubicacion=ubicacion + $(this).attr("id").replace("columnna_","")+"&nbsp;&nbsp;<i class='fas fa-angle-right'></i>&nbsp;&nbsp;<span class='label label-success'>" + identificador + "</span>"
					return false;
				}
			});
			$("#barra_ubicacion").html(ubicacion)
		}
		
	})
	
	
	
	recorer_filtro()
	conteo_totales();
	
	
};




function acciones_interfaz(kanban_usuario){

	//ACCIONES SOBRE BAUL BUSCAR
	
	 
	
	$(".modal_baul").on("click", function(){
	
		
		var new_tag_formulario=$(this).data("formulario")
		//console.log( new_tag_formulario)	
		//FUNCIONES INTEGRADAS CON KANBAN INTERFAZ, ID/NOMBREDOCUEMNTO, FORMULARIO JSON, DATOS DE FORMILARIO CUAN HAY WS
		 mostrar_modal_formulario_de_formulario_json("kanban", "baul_buscar", new_tag_formulario, "")
		 
		 $("#myModal").find(".modal-dialog").removeClass("modal-lg");
		 $("#myModal").find(".modal-dialog").removeClass("modal-sm")
		$("#myModal").find(".modal-title").html("ASISTENTE")
		$("#grupo_0form_baul_buscar").prepend('<br><div class="col-xs-12 col-sm-12 col-md-12"><div class="alert alert-info" role="alert"><strong>Bienvenido al asistente de búsqueda</strong>, indique los criterio con el que necesites encontrar lo que buscas.</div></div>')
		
		
		
	
	})	
	
	
	//alert(kanban_usuario.interfaz)
	//SELECCIONA LA PESTAÑA POR DEFECTO
	if(posicion_usuario==""){
		
		if(kanban_usuario.interfaz=="lista"){
			//posicion_usuario=$("#lista_opciones > li:first > a").html().replace(/\ /g, "_");
			$("#lista_opciones > li:first").addClass("active");
			
		}else if(interfaz=="kanban"){
			$(".tarea").on("dblclick", function(){
				
			});
			
		};
		
		
	} else if(posicion_usuario!=""){
		if(interfaz=="lista"){
			$("#opcion_"+posicion_usuario).addClass("active");
			$("#lista_tareas > div").hide();
			$("#columnna_"+posicion_usuario).show();
		}else if(interfaz=="kanban"){
			
		};

		if(tarea_seleccionada!=""){
			
			opciones_disponibles=[]
			$("#columnna_"+posicion_usuario).find('.tarea').each(function() {
				
				if(tarea_seleccionada==$(this).attr("id") && $(this).data("filtros_tarea").tabla=="ocm_reserva"){
					opciones_disponibles.push(Number($(this).attr("id").replace("tarea_", "")));
					
				};
                
            });
			
			
			

			$("#tarea_"+Math.max(opciones_disponibles)).addClass("tarea_seleccionada");
			
		
		};
		
	};
	
	
	
	
	
	
	//BUSCAR GUARDAR FUNCION
	$(".search_input").keyup(function(){
		
		
		
		//$(".tarea").hide();
		// busqueda=$(this).val();
		
		refrescar_filtros(".search_input", $(this).val());
		recorer_filtro();
		/*if($(this).val()!=""){
			defaul_busqueda=$(this).val();
			for (i in kanban_usuario.columnas) {
				$("#"+kanban_usuario.columnas[i].nombre).find('.tarea').each(function(){
					
					
						seleccion=$(this).data("buscar")
						tamanio_busquena=busqueda.length
						
						
						for (i in seleccion){
								
								
								
								if(seleccion[i]!=null){
									if(seleccion[i].toUpperCase().indexOf(busqueda.toUpperCase())>=0){
									
										$(this).show();
										
									
									}
									
								}
								
								
							
								
								
								
								
							}
		
					
				});
			}
			
		}else if($(this).val()==""){
			
			
			 for (i in kanban_usuario.columnas) {
				$("#"+kanban_usuario.columnas[i].nombre).find('.tarea').each(function(){
				 
						$(this).show();
	
				});
			 }
			
		}*/
		//conteo_totales()
		///tag_seleccionados()
		//select_seleccionados()
		
	})
	
	//FILTRO CLICK
	$(".tag_dusqueda").click(function(){
		
		
		if ($(this).data("estado")==0){
			$(this).data("estado", 1);
			
		}else if($(this).data("estado")==1){
			$(this).data("estado", 0);
			
		}
		
		//OCULTO TODAS LAS TAREAS DE LA FILA
		$("#"+$(this).parent("span").attr("id").replace("_", "")).find('.tarea').each(function(){
			
			$(this).data("visulizacion_tag", 0);
			$(this).hide();
		})

		
		
		//RECORRO TODOS LOS FILTROS EN EL HEAD DE LA COLUMNA
		$("#"+$(this).parent("span").attr("id")).find('span').each(function(index){
				busqueda=$(this).data("tag_metadata")
				
				if ($(this).data("estado")==0){
					//$(this).find(".fa-eye").removeClass();
					//$(this).find("i").addClass("fa fa-eye-slash");
					$(this).addClass("tag_desactivado");
					
					
					
				}else if($(this).data("estado")==1){
					
					$(this).find(".fa-eye-slash").removeClass();
					$(this).find("i").addClass("fa fa-eye");
					$(this).removeClass("tag_desactivado");
					
				}
				//SI EL ESTADO DEL FILTRO EN LA COLUMNA ESTA SELECCIONADO=1
				if($(this).data("estado")==1){
						//RECORRO TODAS LAS TAREAS EN LA COLUMNA
						$("#"+$(this).parent("span").attr("id").replace("_", "")).find('.tarea').each(function(){
							//SELECCIONO EL OBJETO BUSCAR EN LA TAREA
							seleccion=$(this).data("tag_metadata");
								//alert($(this).data("visulizacion"))
								if($(this).data("visulizacion_tag")==0 && $(this).data("visulizacion")==1){
								//RECORRO EL OBJETO DE BUSCAR
									for (i in seleccion){
										 
											//Y SI ES IGUAL A LO QUE BUSCO LA MUESTRO
											if (busqueda==seleccion[i] ){
												
													
													$(this).show();
													$(this).data("visulizacion_tag", 1);
													//conteo_totales()
									
											} ;
									};
								};
								 
								/*else if($(this).data("visulizacion_tag")==1 && $(this).data("visulizacion")==1){
								//RECORRO EL OBJETO DE BUSCAR
									for (i in seleccion){
										 
											//Y SI ES IGUAL A LO QUE BUSCO LA MUESTRO
											if (busqueda!=seleccion[i] ){
												
													
													$(this).hide();
													$(this).data("visulizacion_tag", 0)
													
									
											} 
									}
								}*/
								
							
						});
					
				
				};  
				
				
		});
		
	
		
		
	});
	
	


	
	/* FUNCIONES FILTRO */
	
	function chequeo_base(){
		
		var valid = true;
		
		$("#filtros_camban_lugar").find('.filtro').each(function(index){				
			tipo_filtro_seleccionado=$(this).data("tipo");
			comportamiento=$(this).data("comportamiento");
				
			if (tipo_filtro_seleccionado=="input_buscar" && comportamiento=="interfaz"){
				busqueda=$(this).find('.search_input').val();						
				if(busqueda!=""){ valid = false };
			}else if (tipo_filtro_seleccionado=="input_fecha_rango" && comportamiento=="interfaz"){
				busqueda=$(this).find('.input_fecha_rango').val();						
				if(busqueda!=""){valid = false};
			}else if (tipo_filtro_seleccionado=="input_select" && comportamiento=="interfaz"){						
				busqueda=$(this).find('.seleccion_seccion').html().replace(' <span class="caret"></span>', '');
				if(busqueda!="TODOS"){valid = false};
			}
		});
	 	return valid;
		
	};
	
	$(".filtro > .dropdown-menu > li > a").on("click", function(){
		
		$(this).parents(".btn-group").find('.seleccion_seccion').html($(this).html()+" <span class='caret'></span>");

	});
	
	
	
	
	$(".filtro > .dropdown-menu > li > a").on("click", function(){
		//$("#lista_formularios").html(nota_accion);
		$("#lista_opciones_interz > li").hide();

		if (ws!="Nuevo Contacto" && identificador!="CONTACTOS" ){
			desbloqueo({ 'id_tarea':identificador, 'filtros_tarea':key, "usuario":usuario_log});
		}
		refrescar_filtros("#"+$(this).parent("li").parent("ul").attr("id"), $(this).html());
		
		recorer_filtro();
			
	
		
		
	});		

	/* CAMPOS FECHA */
	$('.input_fecha_rango').on('apply.daterangepicker', function(ev, picker) {
		$(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
		
		filtro_seleccionado=$(this).attr("id").toLowerCase().replace("filtro_", "");
		
		/* filtrar_por_fechas(picker.startDate.format('DD/MM/YYYY'), picker.endDate.format('DD/MM/YYYY'), filtro_seleccionado ) */
		recorer_filtro();
	});

	$('.input_fecha_rango').on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
		filtro_seleccionado=$(this).attr("id").toLowerCase().replace("filtro_", "");
		/* filtrar_por_fechas("", "",  filtro_seleccionado) */
		recorer_filtro();
	});




	/*//RECORRO LOS FILTROS SELECCIONADOS
	function recorer_filtro () {
		let filtro_usado = 0;
		if (chequeo_base()==false){
			//ALGUN CAMPO LLENO
			$(".tarea").hide();
			$(".tarea").data("visulizacion", 0);

			

			//RECOORO LOS FILTROS
			$("#filtros_camban_lugar").find('.filtro').each(function(index){
			
				tipo_filtro_seleccionado=$(this).data("tipo");
				comportamiento=$(this).data("comportamiento");
				
				if (tipo_filtro_seleccionado=="input_buscar" && comportamiento=="interfaz"){
						//ID DE FITRO SELECCIONADO
						filtro_seleccionado=$(this).find(".search_input").attr("id").toLowerCase().replace("filtro_", "");
						busqueda=$(this).find('.search_input').val();
						filtro_usado = mostrar_tarea(tipo_filtro_seleccionado, filtro_seleccionado, busqueda, filtro_usado)
						
						
			
				}else if (tipo_filtro_seleccionado=="input_fecha_rango" && comportamiento=="interfaz"){
						//ID DE FITRO SELECCIONADO
						filtro_seleccionado=$(this).find(".input_fecha_rango").attr("id").toLowerCase().replace("filtro_", "");
						busqueda=$(this).find('.input_fecha_rango').val();
						filtro_usado =  mostrar_tarea(tipo_filtro_seleccionado, filtro_seleccionado, busqueda, filtro_usado);
						
						
				}else if (tipo_filtro_seleccionado=="input_select" && comportamiento=="interfaz"){
						//ID DE FITRO SELECCIONADO
						filtro_seleccionado=$(this).find('ul').attr("id").toLowerCase().replace("filtro_", "");
						busqueda=$(this).find('.seleccion_seccion').html().replace(' <span class="caret"></span>', '');
						filtro_usado =  mostrar_tarea(tipo_filtro_seleccionado, filtro_seleccionado, busqueda, filtro_usado);
						
				
				}

				//console.log(filtro_seleccionado + ' | ' + filtro_usado);
			})
			
		}else {
			//TODOS LOS CAMPOS VACIOS
			
			$(".tarea").show();
			$(".tarea").data("visulizacion", 1);
		}
		conteo_totales();
		tag_seleccionados();
	}
	
	
	
	
	
	//MUESTRO U OCULTO SEGUN FILTRO
	function mostrar_tarea(tipo_filtro_seleccionado, filtro_seleccionado, busqueda, filtro_usado){
		//console.log(tipo_filtro_seleccionado+"/"+filtro_seleccionado+"/"+busqueda+"/"+filtro_usado)
		let ocultar = filtro_usado;
		let mostrar = 0;
		
		if(tipo_filtro_seleccionado=="input_fecha_rango"){
			busqueda=busqueda.split(" - ");
			f1=busqueda[0];
			f2=busqueda[1];
						
			if(f1!="" && f2!=""){
				
				filtro_usado = 1;

				var aFecha1 = f1.split('/'); 
				var aFecha2 = f2.split('/');
					//console.log(f1 +"|"+ f2 )			 
				var f1 = Date.UTC(aFecha1[2],aFecha1[1],aFecha1[0]); 
				var f2 = Date.UTC(aFecha2[2],aFecha2[1],aFecha2[0]);
					
				for (i in kanban_usuario.columnas) {
					
					
					datos_columna=kanban_usuario.columnas[i].nombre.split("|",2);
					id_columna=datos_columna[0].replace(/\ /g, "_");
					
					
					$("#"+id_columna).find('.tarea').each(function(){
						seleccion=$(this).data(filtro_seleccionado);
						var aFecha3 = seleccion.split('/');
						var f3 = Date.UTC(aFecha3[2],aFecha3[1],aFecha3[0]); 

						
						mostrar = 1;
						if (ocultar && $(this).data('visulizacion') == 0){
							mostrar = 0;
						};		

						//console.log('OCULTAR:'+ocultar + '| Mostrar' + mostrar);				



						
						if (f1 <= f3 && f2 >= f3 && mostrar){							
							$(this).show();
							$(this).data("visulizacion", 1);
						}else if ($(this).data("visulizacion") == 1) {
							//console.log('2');
							$(this).hide();
							$(this).data("visulizacion", 0);
						};
						

					});
				};
			};
			
		};
		
		if(tipo_filtro_seleccionado=="input_select"){
	

			if (busqueda != 'TODOS'){
				filtro_usado = 1;

				for (i in kanban_usuario.columnas) {
					
					datos_columna=kanban_usuario.columnas[i].nombre.split("|",2);
					id_columna=datos_columna[0].replace(/\ /g, "_");
												
					$("#"+id_columna).find('.tarea').each(function(){
						if($(this).data(filtro_seleccionado)){
							seleccion=$(this).data(filtro_seleccionado);	
							
							//console.log('ocultar|' + ocultar);
	
							mostrar = 1;
							if (ocultar && $(this).data('visulizacion') == 0){
								mostrar = 0;
							};
	
							//console.log('EACH INPUT ' + $(this).data("visulizacion"));
	
							
							if( busqueda==seleccion && mostrar){
								//console.log(busqueda+" / "+seleccion)
								$(this).show();
								$(this).data("visulizacion", 1)
							}else if ($(this).data("visulizacion") == 1) {
								//console.log('OCURTANDO');
								$(this).hide();
								$(this).data("visulizacion", 0);
							};
						};
						
					});
				};
			};
		};
		
		if(tipo_filtro_seleccionado=="input_buscar"){
			
			if (busqueda.length > 0){

				filtro_usado = 1;			
				for (i in kanban_usuario.columnas) {
					
					datos_columna=kanban_usuario.columnas[i].nombre.split("|",2);
					id_columna=datos_columna[0].replace(/\ /g, "_")
					
					$("#"+id_columna).find('.tarea').each(function(){
						seleccion=$(this).data(filtro_seleccionado);
											
						for (i in seleccion){
							if(seleccion[i]!=null){

								mostrar = 1;
								if (ocultar && $(this).data('visulizacion') == 0){
									mostrar = 0;
								}	
								
								if(seleccion[i].toUpperCase().indexOf(busqueda.toUpperCase())>=0 && mostrar){
									$(this).show();
									$(this).data("visulizacion", 1);
									break;
								}else if ($(this).data("visulizacion") == 1) {
									$(this).hide();
									$(this).data("visulizacion", 0);
								};
							};
						};

					});
				};
			};
			
		};

		//console.log(filtro_seleccionado + '^' + filtro_usado);

		return filtro_usado;
		
		
	};

*/

	/* FIN FUNCIONES FILTRO */
	
$( ".columnna, .conter_search, .tarea" ).mouseover(function() {
	  edicion=$(this).find(".conter_search").attr("id");

	  $("#"+edicion).addClass("ver");
	  
 });
 
$( ".columnna, .conter_search, .tarea" ).mouseout(function() {

	

 });		
		




	





//ACCIONES DE LA LISTA

$("#lista_opciones > .btn-group").on("click", function(){
	
	
	
	$("#lista_tareas").find('.columnna').each(function(){
		
		$(this).hide();
		
	});
	nota_accion=nota_campo_edicion
	$("#columnna_"+$(this).html().replace(/\ /, "_").replace("filtro_", "")).show();
	$("#lista_formularios").html(nota_accion);
	
	
		
 });



$("#lista_opciones > li > a").on("click", function(){
	
	//desbloqueo({ 'id_tarea':identificador, 'filtros_tarea':key, "usuario":usuario_log});
	
	
	$("#lista_tareas").find('.columnna').each(function(){
		

		$(this).hide();
		$(this).parent("li").removeClass("active");
		$(this).find('.conter_search').find('.tag_desactivado').each(function(){
			
			$(this).click();
		
		})
		
		
	});
	
	$("#columnna_"+$(this).html().replace(/\ /, "_").replace("filtro_", "")).show();
	nota_accion=nota_campo_edicion;
	$("#lista_formularios").html(nota_accion);
	
	
	
	
	$("#lista_opciones").find('li').each(function(){
		
		$(this).removeClass("active");
		
		
	});
	
	posicion_usuario=$(this).html().replace(/\ /, "_");
	posicion_usuario="";
	$(this).parent("li").addClass("active");
	$("#lista_opciones_interz > li").hide();
	//console.log("aqui")
	load_tareas();
	conteo_totales()
		
 });


$(".eliminar_formulario").on("click", function(){
	nota_accion=nota_campo_edicion;
	$("#lista_formularios").html(nota_accion);
	$("#lista_opciones_interz > li").hide();
 });





conteo_totales()


$("#lista_tareas").find(".columnna").each(function(index, elemento) {
	
 });


//VERIFICO LOS FILTROS PRESELCCIONADOS EN INTERFAZ
if(filtros_seleccionados.length!=0){
	//console.log("es:"+JSON.stringify(filtros_seleccionados))
	for(i in filtros_seleccionados){
		
		if (filtros_seleccionados[i].filtro==".search_input"){
			
			$(filtros_seleccionados[i].filtro).val(filtros_seleccionados[i].seleccion);
			//busqueda_campo(filtros_seleccionados[i].seleccion)
		}else if(filtros_seleccionados[i].filtro!=".search_input"){
			$(filtros_seleccionados[i].filtro).find("a").each(function() {
				if($(this).html()==filtros_seleccionados[i].seleccion){
					
					if($(this).data("comportamiento")!="baul"){
						$(this).click();
					}else{

						$(filtros_seleccionados[i].filtro).parent(".filtro").find(".seleccion_seccion").html($(this).html());
					}

					return false;
				};
			});
		};
		
		
	};
	//		
};



$(function() {

  $('.input_fecha_rango').daterangepicker({
      autoUpdateInput: false,
	  //opens: "left",
      locale: {
          cancelLabel: 'Clear',
		  	"format": "DD/MM/YYYY",
		    "applyLabel": "Aplicar",
			"cancelLabel": "Cancelar",
			//"fromLabel": "De",
			//"toLabel": "Até",
			
			"customRangeLabel": "Custom",
			"daysOfWeek": [
				"Dom",
				"Lun",
				"Mar",
				"Mie",
				"jue",
				"Vie",
				"Sáb"
			],
			"monthNames": [
				"Enero",
				"Febrero",
				"Marzo",
				"Abril",
				"Mayo",
				"Junio",
				"Julio",
				"Agosto",
				"Septiembre",
				"Octubre",
				"Noviembre",
				"Diciembre"
			],
      },
	  
  });

  

});



//ACCIONES DE SLIDER
$(".ocultar_columna").click( function(){
	console.log("click")
	$(this).closest(".columnna").attr("style", "width:50px; display:inline-grid; padding:0px;");
	$(this).closest(".columnna").addClass("columnna_oculta");
	$(this).closest(".columnna").find(".marca_columna").show();
	$(this).closest(".columnna").find(".mostrar_columna").show();
	recalcular_columnas()
})


$(".mostrar_columna").click( function(){
	
	var valor= 'width:'+$(this).data("size")+'; display:inline-grid; padding:0px;' 

	$(this).closest(".columnna").attr("style", valor);
	$(this).closest(".columnna").removeClass("columnna_oculta");
	$(this).closest(".columnna").find(".marca_columna").hide();
	$(this).closest(".columnna").find(".mostrar_columna").hide();
	recalcular_columnas()
})

function recalcular_columnas(){
	
	//console.log(lugar_carga)
	//console.log($(".kanaban_load").width())
	ancho_total=$(".kanaban_load").width()
	//console.log(posicion_tarea)
	$("#barra_ubicacion").html()
	$(".kanaban_load").find(".columnna").each(function(index, element) {
		console.log($(this).width());
		ancho_total=ancho_total-$(this).width();
    });
	
	if(ancho_total==0){
		$("#barra_ubicacion").hide()
	}else{
		$("#barra_ubicacion").show()
	}
	
	$(".columnna_fija").attr("style", 'width:'+ancho_total+'px');
	
	
	
}








}//FIN ACCIONES DE INTERFAZ


/* FUNCIONES FILTRO */
	
	function chequeo_base(){
		
		var valid = true;
		
		$("#filtros_camban_lugar").find('.filtro').each(function(index){				
			tipo_filtro_seleccionado=$(this).data("tipo");
			comportamiento=$(this).data("comportamiento");
				
			if (tipo_filtro_seleccionado=="input_buscar" && comportamiento=="interfaz"){
				busqueda=$(this).find('.search_input').val();						
				if(busqueda!=""){ valid = false };
			}else if (tipo_filtro_seleccionado=="input_fecha_rango" && comportamiento=="interfaz"){
				busqueda=$(this).find('.input_fecha_rango').val();						
				if(busqueda!=""){valid = false};
			}else if (tipo_filtro_seleccionado=="input_select" && comportamiento=="interfaz"){						
				busqueda=$(this).find('.seleccion_seccion').html().replace(' <span class="caret"></span>', '');
				if(busqueda!="TODOS"){valid = false};
			}
		});
	 	return valid;
		
	};

//RECORRO LOS FILTROS SELECCIONADOS
	function recorer_filtro() {
		let filtro_usado = 0;
		if (chequeo_base()==false){
			//ALGUN CAMPO LLENO
			$(".tarea").hide();
			$(".tarea").data("visulizacion", 0);

			

			//RECOORO LOS FILTROS
			$("#filtros_camban_lugar").find('.filtro').each(function(index){
			
				tipo_filtro_seleccionado=$(this).data("tipo");
				comportamiento=$(this).data("comportamiento");
				
				if (tipo_filtro_seleccionado=="input_buscar" && comportamiento=="interfaz"){
						//ID DE FITRO SELECCIONADO
						filtro_seleccionado=$(this).find(".search_input").attr("id").toLowerCase().replace("filtro_", "");
						busqueda=$(this).find('.search_input').val();
						filtro_usado = mostrar_tarea(tipo_filtro_seleccionado, filtro_seleccionado, busqueda, filtro_usado)
						
						
			
				}else if (tipo_filtro_seleccionado=="input_fecha_rango" && comportamiento=="interfaz"){
						//ID DE FITRO SELECCIONADO
						filtro_seleccionado=$(this).find(".input_fecha_rango").attr("id").toLowerCase().replace("filtro_", "");
						busqueda=$(this).find('.input_fecha_rango').val();
						filtro_usado =  mostrar_tarea(tipo_filtro_seleccionado, filtro_seleccionado, busqueda, filtro_usado);
						
						
				}else if (tipo_filtro_seleccionado=="input_select" && comportamiento=="interfaz"){
						//ID DE FITRO SELECCIONADO
						filtro_seleccionado=$(this).find('ul').attr("id").toLowerCase().replace("filtro_", "");
						busqueda=$(this).find('.seleccion_seccion').html().replace(' <span class="caret"></span>', '');
						filtro_usado =  mostrar_tarea(tipo_filtro_seleccionado, filtro_seleccionado, busqueda, filtro_usado);
						
				
				}

				//console.log(filtro_seleccionado + ' | ' + filtro_usado);
			})
			
		}else {
			//TODOS LOS CAMPOS VACIOS
			
			$(".tarea").show();
			$(".tarea").data("visulizacion", 1);
		}
		conteo_totales();
		tag_seleccionados();
	}
	
	
	
	
	
	//MUESTRO U OCULTO SEGUN FILTRO
	function mostrar_tarea(tipo_filtro_seleccionado, filtro_seleccionado, busqueda, filtro_usado){
		//console.log(tipo_filtro_seleccionado+"/"+filtro_seleccionado+"/"+busqueda+"/"+filtro_usado)
		let ocultar = filtro_usado;
		let mostrar = 0;
		
		if(tipo_filtro_seleccionado=="input_fecha_rango"){
			busqueda=busqueda.split(" - ");
			f1=busqueda[0];
			f2=busqueda[1];
						
			if(f1!="" && f2!=""){
				
				filtro_usado = 1;

				var aFecha1 = f1.split('/'); 
				var aFecha2 = f2.split('/');
					//console.log(f1 +"|"+ f2 )			 
				var f1 = Date.UTC(aFecha1[2],aFecha1[1],aFecha1[0]); 
				var f2 = Date.UTC(aFecha2[2],aFecha2[1],aFecha2[0]);
					
				for (i in kanban_usuario.columnas) {
					
					
					datos_columna=kanban_usuario.columnas[i].nombre.split("|",2);
					id_columna=datos_columna[0].replace(/\ /g, "_");
					
					
					$("#"+id_columna).find('.tarea').each(function(){
						seleccion=$(this).data(filtro_seleccionado);
						var aFecha3 = seleccion.split('/');
						var f3 = Date.UTC(aFecha3[2],aFecha3[1],aFecha3[0]); 

						
						mostrar = 1;
						if (ocultar && $(this).data('visulizacion') == 0){
							mostrar = 0;
						};		

						//console.log('OCULTAR:'+ocultar + '| Mostrar' + mostrar);				



						
						if (f1 <= f3 && f2 >= f3 && mostrar){							
							$(this).show();
							$(this).data("visulizacion", 1);
						}else if ($(this).data("visulizacion") == 1) {
							//console.log('2');
							$(this).hide();
							$(this).data("visulizacion", 0);
						};
						

					});
				};
			};
			
		};
		
		if(tipo_filtro_seleccionado=="input_select"){
	

			if (busqueda != 'TODOS'){
				filtro_usado = 1;

				for (i in kanban_usuario.columnas) {
					
					datos_columna=kanban_usuario.columnas[i].nombre.split("|",2);
					id_columna=datos_columna[0].replace(/\ /g, "_");
												
					$("#"+id_columna).find('.tarea').each(function(){
						if($(this).data(filtro_seleccionado)){
							seleccion=$(this).data(filtro_seleccionado);	
							
							//console.log('ocultar|' + ocultar);
	
							mostrar = 1;
							if (ocultar && $(this).data('visulizacion') == 0){
								mostrar = 0;
							};
	
							//console.log('EACH INPUT ' + $(this).data("visulizacion"));
	
							
							if( busqueda==seleccion && mostrar){
								//console.log(busqueda+" / "+seleccion)
								$(this).show();
								$(this).data("visulizacion", 1)
							}else if ($(this).data("visulizacion") == 1) {
								//console.log('OCURTANDO');
								$(this).hide();
								$(this).data("visulizacion", 0);
							};
						};
						
					});
				};
			};
		};
		
		if(tipo_filtro_seleccionado=="input_buscar"){
			
			if (busqueda.length > 0){

				filtro_usado = 1;			
				for (i in kanban_usuario.columnas) {
					
					datos_columna=kanban_usuario.columnas[i].nombre.split("|",2);
					id_columna=datos_columna[0].replace(/\ /g, "_")
					
					$("#"+id_columna).find('.tarea').each(function(){
						seleccion=$(this).data(filtro_seleccionado);
											
						for (i in seleccion){
							if(seleccion[i]!=null){

								mostrar = 1;
								if (ocultar && $(this).data('visulizacion') == 0){
									mostrar = 0;
								}	
								
								if(seleccion[i].toUpperCase().indexOf(busqueda.toUpperCase())>=0 && mostrar){
									$(this).show();
									$(this).data("visulizacion", 1);
									break;
								}else if ($(this).data("visulizacion") == 1) {
									$(this).hide();
									$(this).data("visulizacion", 0);
								};
							};
						};

					});
				};
			};
			
		};

		//console.log(filtro_seleccionado + '^' + filtro_usado);

		return filtro_usado;
		
		
	};		


//CLASES UNIVERSALES

//VERIFICO LOS TAG PRESELECCIONADOS
tag_seleccionados = function(){
$(".kanaban_load").find(".columnna").each(function() {
	//alert("#_"+$(this).attr("id").replace("columnna_", ""))
	
	la_columna=$(this).attr("id").replace("columnna_", "");
	
	$("#_"+la_columna).find(".tag_desactivado").each(function() {
		
		//alert($(this).data("tag_metadata"))
		
		el_estado_tag_desactivado_en_columna=$(this).data("tag_metadata");
		
		//if(el_estado_tag_desactivado_en_columna=="1"){
			
			$("#"+la_columna).find(".tarea").each(function() {
				
				
				//console.log($(this).attr("id")+" / "+$(this).data("tag_metadata"))
				
				//console.log($(this).data("tag_metadata")+" / "+el_estado_tag_desactivado_en_columna)
				if($(this).data("tag_metadata")==el_estado_tag_desactivado_en_columna){
				
					$(this).hide();
					
					$(this).data("visulizacion_tag", 0)	;
				};
				
				
				
				
				
			});
			
		//}
		
		
		
	});
	
    
});
};
//FIN





		
conteo_totales = function(){
	
//BUSCO EN LAS COLUNAS
$(".columnna").find(".conter_search ").each(function() {

	colunna_serch=$(this).attr("id").replace("conter_search_","");
	conteo_columna=0;
	
	$("#"+colunna_serch).find(".tarea").each(function() {
		if($(this).attr("style").replace("padding: 5px; ","")!="display: none;"){
			conteo_columna++
			
		}
	})
	$("#columnna_"+colunna_serch).find(".total_colunna").remove();
	$("#columnna_"+colunna_serch).find(".titulo_kanban").prepend("<span class='total_colunna'> "+conteo_columna+" <span>");
	
	$("#columnna_"+colunna_serch).find(".texto_columna_total").html(conteo_columna);
	
	//BUSCO EN LOS TAG DE LA COLUNAN
    $(this).find(".tag_dusqueda ").each(function() {

		conteo=0;
		tag_padre=$(this).html().split(" : ");
		
		
		//POR CADA TAG, REVISO LAS TAREAS DE LA COLUMNA 
		$("#"+colunna_serch).find(".tarea").each(function() {
			
			
			//IDENTIFICO SI ES VISIBLE EL ELEMENTO PARA CONTARLO
			if($(this).attr("style").replace("padding: 5px; ","")!="display: none;"){
			
			//DENTRO DE LA TAREA REVISO LOS TAG QUE CONTIENE Y LO COMPARO CON EL TAG DE LA COLUMNA
				$(this).find(".panel-footer > .btn-toolbar:first" ).find("span").each(function(index, element) {
					//AUMENTO CONTEO
					if($(this).attr("class")=="label label-success"){
						tag_hijo=$(this).html().replace('<span class="triangulo"></span>','');
						
						if(tag_padre[0]==tag_hijo){
							conteo++;
						};
					};
					
				});
			};
            
        });
		
	//INSERTO EL RESULTADO EN TAG
	$(this).html(tag_padre[0]+" : <span><i class='fa fa-eye'></i> "+conteo+" </span>");
	
	});


});
	
};

desbloqueo = function(datos_desbloqueo){

//alert(JSON.stringify(datos_desbloqueo.id_tarea))
		if(datos_desbloqueo.id_tarea!=""){
			$.ajax({
				data:datos_desbloqueo,
				url : direccion_ws+"desbloquear_tarea",
				type : "POST",           
				dataType: 'json',
				beforeSend: function () {
					
				
					
				},
				success: function(data){
					

					identificador="";
	
					
				
				},
				error: function (xhr, ajaxOptions, thrownError) {
	
				}
	
			});	
		};
};


//FIN

//LLENA EL ARREGLO DE FILTROS SELECCIONADOS
refrescar_filtros = function(filtro, seleccion){
	
		if (filtros_seleccionados.length==0){
			filtros_seleccionados.push({filtro:filtro, seleccion:seleccion});
			//console.log(filtros_seleccionados)
		
		}else if(filtros_seleccionados.length!=0){
			
			for(var i=0;i<filtros_seleccionados.length;i++){
				if(filtros_seleccionados[i].filtro==filtro){
					filtros_seleccionados[i].seleccion=seleccion; 
					return false;
				} 
				
			
			}
			
			filtros_seleccionados.push({filtro:filtro, seleccion:seleccion});
			//alert("b")

		
		};
		
		
	
	
	
};
//FIN

busqueda_campo = function(busqueda){
	
		$(".tarea").hide();
		 busqueda=busqueda;
		if(busqueda!=""){
			defaul_busqueda=busqueda;
			for (i in kanban_usuario.columnas) {
				
				datos_columna=kanban_usuario.columnas[i].nombre.split("|",2);
				id_columna=datos_columna[0].replace(/\ /g, "_");
				
				$("#"+id_columna).find('.tarea').each(function(){
						seleccion=$(this).data("buscar");
						for (i in seleccion){
							tamanio_busquena=busqueda.length;
								if(seleccion[i]!=null){
									if(seleccion[i].toUpperCase().indexOf(busqueda.toUpperCase())>=0){
						
										$(this).show();
									
									};
									
								};
							
							};
				});
			};
			
		}else if(busqueda==""){
			
			
			 for (i in kanban_usuario.columnas) {
				 
				 datos_columna=kanban_usuario.columnas[i].nombre.split("|",2);
					id_columna=datos_columna[0].replace(/\ /g, "_");
				 
				$("#"+id_columna).find('.tarea').each(function(){
				 
						$(this).show();
	
				});
			 };
			
		};
		

	
	
};




construir_tarea = function(tareas, los_tag_columna) {
	//console.log(tareas, los_tag_columna)
	
	estado_color=tareas.estilo.split("|",2);
	
	color_tarea=estado_color[0];
	estado_tarea=estado_color[1];
	
	
	if (estado_tarea=="deshabilitada" ){
		estilo_habil="tarea "+estado_tarea+" "+color_tarea;
		estilo_panel=color_tarea;
		sigueinte_accion='data-ws=""'
	}else{
		estilo_habil="tarea";
		estilo_panel=color_tarea;
		sigueinte_accion="data-ws='"+JSON.stringify(tareas.siguiente_accion)+"'";
	}
	
	//console.log(tareas.indicador.replace(/\'/g, ''))
	/*tag_boton='<i class="fa  fa-phone" style="font-size:16px !important;" aria-hidden="true"></i>&nbsp;<button type="button" class="btn btn-primary" onclick="llamar_no_atendido(9979670431)">9979670431</button> <br> 05/07/2018 18:53';
	tag_boton="d"*/
	
	//INSERTO TAG DE FILTROS		
	filtros_tarea="";
	for (a in tareas.filtros){
		
		filtros_tarea=filtros_tarea+" data-"+tareas.filtros[a].nombre.toLowerCase()+"='"+JSON.stringify(tareas.filtros[a].opciones)+"'";				
						
	};
	
	//MIDO LA DIMENCION DE LAS ACCIONES APLICABLES EN UNA TAREA Y SI ES MAYO A UNO CREO EL OBJETO
	accione_tarea=""
	if(tareas.accion.length>=1){
		accione_tarea="<button class='btn btn-default btn-xs dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
																	"<i class='fa fa-cog' aria-hidden='true'></i>&nbsp;"+
																"</button>"+
																"<ul id='lista_"+tareas.id+"_"+tareas.posicion.replace(/\ /g, "_")+"' class='dropdown-menu dropdown-menu-right'>";
		for (f in tareas.accion){
			
			var inserto_metodo_peticion="";
			if(tareas.accion[f].metodo){inserto_metodo_peticion=tareas.accion[f].metodo}else{inserto_metodo_peticion="POST"};
			
			accione_tarea=accione_tarea+"<li data-ws='"+JSON.stringify({'accion':tareas.accion[f].ws, 'identificador':tareas.id, 'posicion_tarea':tareas.posicion, 'documento':tareas.accion[f].doc, 'metodo':inserto_metodo_peticion})+"' class='accion'>"+
											"<a href='#'>"+tareas.accion[f].lista+"</a>"+
										"</li>";
		};
		accione_tarea=accione_tarea+"</ul>";
	} else if(tareas.accion.length==0){
		accione_tarea="";						
	}
	
	
	//MIDO LA DIMENCION DE TAG DE BUSQUEDA,SI EXISTENTES EN UNA TAREA Y SI ES MAYOR A UNO CREO EL OBJETO
	tag_metadata_tarea=""
	conteo_tag_metadata_tarea=""
	//console.log(tareas.tag_metadata+" / "+tareas.tag_historico)
	if(tareas.tag_metadata.length>=1){
		//alert(los_tag_columna)	
		for (f in los_tag_columna){
			estilo_chec="label-default";
			//REVISO EL HISTORICO
			for (g in tareas.tag_historico ){
				if(tareas.tag_historico[g].toUpperCase()==los_tag_columna[f].toUpperCase()){
				 	estilo_chec="label-success";
				break;
			}; 
			};
			//alert(typeof(tareas.tag_metadata))
			for (g in  tareas.tag_metadata){
				console.log(tareas.tag_metadata[g].toUpperCase()+"/"+los_tag_columna[f])
				if(tareas.tag_metadata[g].toUpperCase()==los_tag_columna[f].toUpperCase()){
					conteo_tag_metadata_tarea=conteo_tag_metadata_tarea+"&nbsp;<span class='label label-success' style='display:none;'>"+los_tag_columna[f]+"</span>";
					break;
				}; 
			};		
			tag_metadata_tarea=tag_metadata_tarea+"&nbsp;<span class='label "+estilo_chec+"'>"+los_tag_columna[f]+"</span>";
		};
	};
	//BODY DE TAREA
	if(tareas.descripcion!=""){
		body_taera="<div id='descripcion_"+tareas.id+"_"+tareas.posicion.replace(/\ /g, "_")+"' class='panel-body descripcion' style='display: none;'>"+
													tareas.descripcion+
												"</div>";
		boton_desplegar="<span id='"+tareas.id+"_"+tareas.posicion.replace(/\ /g, "_")+"' data-posicion='0' class='mas col-xs-1 col-sm-1 col-md-1'>"+
															"<i class='fa fa-chevron-down' aria-hidden='true' style=''></i>"+
															"<i class='fa fa-chevron-up' aria-hidden='true' style='display: none;'></i>"+
														
															
														
														"</span>";
	}else if(tareas.descripcion==""){
		body_taera="";
		boton_desplegar="";
	}
	//FOOTER TAREA
	if(tag_metadata_tarea!="" || conteo_tag_metadata_tarea!=""){
		footer_tarea="<div class='panel-footer' >"+
													"<span id='_"+tareas.id+"' class='btn-toolbar' role='toolbar' aria-label='...'>"+
														conteo_tag_metadata_tarea+
													"</span>"+
													"<span id='tiempo_"+tareas.id+"' class='btn-toolbar tiempo' role='toolbar' aria-label='...'>"+
														tag_metadata_tarea+
													"</span>"+
													"<span id='alarmas_"+tareas.id+"' class='btn-toolbar' role='toolbar' aria-label='...'>"+
													"</span>"+
													
													
													
												"</div>";
	}else if(tag_metadata_tarea=="" && conteo_tag_metadata_tarea==""){
		footer_tarea=""
	}
	
	
	tarea_construida="<div id='tarea_"+tareas.id+"' "+filtros_tarea+"  data-posicion='"+tareas.posicion.replace(/\ /g, "_")+"' data-fecha='"+tareas.busqueda[5]+"' data-identificador='"+tareas.id+"' data-filtros_tarea='"+JSON.stringify(tareas.filtros_tarea)+"' "+sigueinte_accion+"  class='"+estilo_habil+"' data-visulizacion='1' data-visulizacion_tag='1' style='padding:5px;' data-tag_metadata='"+JSON.stringify(tareas.tag_metadata)+"' data-buscar='"+JSON.stringify(tareas.busqueda)+"'>"+
											"<div class='panel panel-"+estilo_panel+"' style=''>"+
												"<div class='panel-heading heading'>"+
													"<div class='row'>"+
														"<span class='head_ind col-xs-10 col-sm-0 col-md-10'>"+tareas.indicador+"</span>"+
														
														"<span class='btn-group col-xs-1 col-sm-1 col-md-1'>"+
														
																/*"<button class='btn btn-default btn-xs dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
																	"<i class='fa fa-cog' aria-hidden='true'></i>&nbsp;"+
																"</button>"+
																"<ul id='lista_"+tareas.id+"_"+tareas.posicion.replace(/\ /g, "_")+"' class='dropdown-menu dropdown-menu-right'>"+
																"</ul>"+*/
																accione_tarea+
														"</span>"+
														//BOTON DEPLEGAR
														boton_desplegar+
														
													"</div>"+
												"</div>"+
												//BODY TAREA
												body_taera+
												//FOOTER
												footer_tarea+
												
											"</div></div>";
											
		//console.log(tarea_construida)										
		return tarea_construida;
										
	
	
}

construir_filtros_lugar_carga = function(kanban_usuario, lugar, lugar_carga){
	//alert(lugar_carga)
	lugar=lugar_carga+" "+lugar;
	if(kanban_usuario!=""){
	//kanban_usuario=[];
	//{tipo_de_filtro: "input_seacrh", nombre: "BUSCAR", presholder: "BUSCAR..."}
	//kanban_usuario.push({tipo_de_filtro: "input_buscar",  nombre: "BUSCAR", presholder: "BUSCAR..."})
	//kanban_usuario.push({tipo_de_filtro: "input_select", baul:"baul", nombre: "IMPORTANCIA", opciones: ["TODOS", "MONTO", "FECHA ENTREGA"]})
	//kanban_usuario.push({tipo_de_filtro: "input_buscar", nombre: "BUSCAR", presholder: "BUSCAR...", baul:"baul"})
	//kanban_usuario.push({tipo_de_filtro: "input_select", baul:"baul",  nombre: "semana", opciones: ['<span class="label label-default">SEMANA: 1</span>  01/01/2018 | 07/01/2018', '<span class="label label-default">SEMANA: 2</span>  01/01/2018 | 07/01/2018', '<span class="label label-default">SEMANA: 3</span>  01/01/2018 | 07/01/2018']})
	//kanban_usuario.push({tipo_de_filtro: "input_fecha_rango", nombre: "FECHA DE ACTUALIZACIÓN", presholder: "RANGO DE FECHA"})
	//console.log(kanban_usuario)
	
	for (a in kanban_usuario){
		
		if(kanban_usuario[a].tipo_de_filtro=="input_fecha_rango"){
			
			if(kanban_usuario[a].baul){
				funcion="onchange=baul($(this).val(),'"+kanban_usuario[a].nombre.replace(/ /g, "_")+"')";
				comportamiento="baul";
			}else{
				funcion="";
				comportamiento="interfaz";
			};
			
			$(lugar).append("<div class='btn-group filtro' data-comportamiento='"+comportamiento+"' data-tipo="+kanban_usuario[a].tipo_de_filtro+">"+
											 "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
												"<div class='titular_seccion'>"+kanban_usuario[a].nombre+"</div>"+
												"<div class='seleccion_seccion'>"+
													//kanban_usuario[a].opciones[0].replace("_", " ")+" <span class='caret'></span>"+
													'<input id="filtro_'+kanban_usuario[a].nombre.replace(/ /g, "_")+'"  type="text" class="form-control input_fecha_rango " placeholder="'+kanban_usuario[a].presholder.replace("_", " ")+'" aria-describedby="sizing-addon3">'+
												"</div>"+
											 "</button>"+
										"</div>");
			
		}else if(kanban_usuario[a].tipo_de_filtro=="input_buscar"){
			
			if(kanban_usuario[a].baul){
				funcion="onchange=baul($(this).val(),'"+kanban_usuario[a].nombre.replace(/ /g, "_")+"')";
				comportamiento="baul";
			}else{
				funcion="";
				comportamiento="interfaz";
			};
			
			$(lugar).append("<div class='btn-group filtro' data-comportamiento='"+comportamiento+"'  data-tipo="+kanban_usuario[a].tipo_de_filtro+">"+
											 "<span  class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
												//"<div class='titular_seccion'>"+kanban_usuario[a].nombre+"</div>"+
												"<div class='seleccion_seccion'>"+
													//kanban_usuario[a].opciones[0].replace("_", " ")+" <span class='caret'></span>"+
													'<input data-comportamiento='+comportamiento+' '+funcion+' id="filtro_'+kanban_usuario[a].nombre.replace(/\ /g, "_")+'"  type="text" class="form-control search_input" placeholder="'+kanban_usuario[a].presholder.replace("_", " ")+'" aria-describedby="sizing-addon3">'+
												"</div>"+
											 "</span>"+
											  
											  
												
										"</div>");
			
		}else if(kanban_usuario[a].tipo_de_filtro=="input_select") {
			
			if (kanban_usuario[a].opciones.length>0){
				
				if(kanban_usuario[a].baul){
					funcion="onClick=baul($(this).html(),'"+kanban_usuario[a].nombre.replace(/ /g, "_")+"')";
					comportamiento="baul";
				}else{
					funcion=""
					comportamiento="interfaz";
				}
				
				$(lugar).append("<div class='btn-group filtro' data-comportamiento='"+comportamiento+"' data-tipo="+kanban_usuario[a].tipo_de_filtro+">"+
												 "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
													"<div class='titular_seccion'>"+kanban_usuario[a].nombre+"</div>"+
													"<div class='seleccion_seccion'>"+
														kanban_usuario[a].opciones[0].replace("_", " ")+" <span class='caret'></span>"+
													"</div>"+
												 "</button>"+
												  "<ul id='filtro_"+kanban_usuario[a].nombre.replace(/\ /g, "_")+"' class='dropdown-menu'>"+
													
												  "</ul>"+
											"</div>");
				
				for (e in kanban_usuario[a].opciones){							
					$("#filtro_"+kanban_usuario[a].nombre.replace(/\ /g, "_")).append("<li ><a class='text-right' data-comportamiento='"+comportamiento+"' "+funcion+" >"+kanban_usuario[a].opciones[e].replace("_", "")+"</a></li>");
				};
			};
		}else if(kanban_usuario[a].tipo_de_filtro=="baul") {
			
			var baul_base={
						"formulario":'Buscar',
						"contendio":[	
										{
										"grupo":"",
										"tamanio":[12,12,12],
										"campos":[]
										}
									
						],
						"opciones":[{
							"boton":"BUSCAR",
							"ws":"",
							"funcion":"buscar_baul()"
						}]
				
			}
			
			for (i in kanban_usuario[a].parametros){
					
					if(kanban_usuario[a].parametros[i].tipo=="lista"){
						var lista = []
						for(b in kanban_usuario[a].parametros[i].parametros){
							lista.push({"tag":kanban_usuario[a].parametros[i].parametros[b].tag,"id":kanban_usuario[a].parametros[i].parametros[b].id.replace(/\ /g,"_")})
						}
						
					}else{
						var lista =[]
					}
					
					
					
					var new_tag={
									"campo":  kanban_usuario[a].parametros[i].id.replace(/\_/g," "),
									"tipo": kanban_usuario[a].parametros[i].tipo,
									"opciones":lista,
									"obligatorio":"no",
									"nota":"Buscar...",
									"tamanio":[6,6,6],
									"id":kanban_usuario[a].parametros[i].id.replace(/\" "/g,"_")
								}
					baul_base.contendio[0].campos.push(new_tag)	
				
			}
			
			//console.log(baul_base)
			
			$(lugar).append("<div class='btn-group filtro' data-comportamiento=''  data-tipo=''>"+
											 "<span  class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
												//"<div class='titular_seccion'>"+kanban_usuario[a].nombre+"</div>"+
												"<div class='seleccion_seccion modal_baul' data-formulario='"+JSON.stringify(baul_base)+"' style='font-size: 23px;'>"+
													//kanban_usuario[a].opciones[0].replace("_", " ")+" <span class='caret'></span>"+
													'<i class="fas fa-archive"></i>'+
												"</div>"+
											 "</span>"+
											  
											  
												
										"</div>");
			
		
		
		
		};
		
		
		
		
	};
	};
	
};


/* FUNCIONES FILTRO */

