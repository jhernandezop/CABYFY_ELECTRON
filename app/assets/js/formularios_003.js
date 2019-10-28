//FOMULARIOS 001 OPENPARTNER 2018
campos_contenidos=["texto","numero","fecha","porcentaje","password","area_texto","file","check","file_imagen","lista","lista_serach","lista_colapsable","lista_multi","lista_multi_comentarios","comentario_documento","panel_colapsable","panel_check_multi","ver_pdf","div","nota","tabla"];

//FUNCION PARA RENOMBRAR EN CADA INTERFAZ
function comportamiento_interfaz(){}

function llamar_datos_para_formulario( ws, para_formulario ) {
	//console.log(typeof(para_formulario))
	$.ajax({
				data : JSON.parse(para_formulario),
				url : direccion_ws+ws,
				type : "POST",           
				dataType: 'json',
				beforeSend: function () {
					
					
					
				},
				success: function(data){
					
					//console.log(eval(data.tipo_campania))
					//console.log(eval(data.tipo_campania).contendio[0].campos[0].opciones)
					
					cosntruir_formularios(eval(data.tipo_campania), data.tipo_campania, data)
					
					
				},
				error: function (xhr, ajaxOptions, thrownError) {
					
				}
	
			});
}

//FUNCION QUE CONSTRUYYE LOS FORMULARIOS Y LOS COLOCA EN EL LUGAR	
function cosntruir_formularios(formulario, lugar, datos_reconstruir){
	console.time('IN_F');
	campos_a_validar=[]
	
	/*valor = load("formularios_js/paga_menos.js", function(responseTxt, statusTxt, jqXHR){
		console.log(responseTxt, statusTxt, jqXHR)
							  
	})*/
	
	/*$.ajax({
				
				url : "formularios_js/paga_menos.json",
				type : "POST",           
				dataType: 'json',
				beforeSend: function () {
					
					
					
				},
				success: function(data){
					
					console.log(data)
					
					
				},
				error: function (xhr, ajaxOptions, thrownError) {
					console.log(xhr, ajaxOptions, thrownError)
				}
	
			});*/
			
	//console.log(formulario)
	
	// INSERTO VALOR A LOS OBJETOS BASICOS TEXTO NUMERO Y FECHA
	if(datos_reconstruir!=""){
		for (a in formulario.contendio){
			
			for (b in formulario.contendio[a].campos){
	
				if (formulario.contendio[a].campos[b].tipo=="texto" || formulario.contendio[a].campos[b].tipo=="numero" || formulario.contendio[a].campos[b].tipo=="fecha" || formulario.contendio[a].campos[b].tipo=="porcentaje" || formulario.contendio[a].campos[b].tipo=="tabla" || formulario.contendio[a].campos[b].tipo=="area_texto" || formulario.contendio[a].campos[b].tipo=="check" || formulario.contendio[a].campos[b].tipo=="rut"){
					propiedades = Object.keys(datos_reconstruir);
					//console.log(propiedades)
					/*for (c in propiedades){
						
						//console.log(datos_reconstruir[propiedades[c]])
						if(formulario.contendio[a].campos[b].id==propiedades[c]){
							//console.log(datos_reconstruir[propiedades[c]]+"/"+typeof(datos_reconstruir[propiedades[c]]))
							formulario.contendio[a].campos[b].opciones=datos_reconstruir[propiedades[c]]
							//console.log(formulario.contendio[a].campos[b])
							break
						}
	
					}*/
					
					var campo = propiedades.find(function(element) {
						if(formulario.contendio[a].campos[b].id==element){
							//element._source["ES_idCli"]=element._id
							return element
						}
					  //return element > 10;
					});
					formulario.contendio[a].campos[b].opciones=datos_reconstruir[campo]
					
				}else if(formulario.contendio[a].campos[b].tipo=="panel_check_multi"){
					propiedades = Object.keys(datos_reconstruir);
					
					for (c in propiedades){
						if(formulario.contendio[a].campos[b].id==propiedades[c]){
							//console.log(datos_reconstruir[propiedades[c]])
							Object.assign(formulario.contendio[a].campos[b], {selecionados: datos_reconstruir[propiedades[c]]});
							break
						}
					}
					
				}else if(formulario.contendio[a].campos[b].tipo=="comentario_documento"){
					propiedades = Object.keys(datos_reconstruir);
					
					for (c in propiedades){
						if(formulario.contendio[a].campos[b].id==propiedades[c]){
							//console.log(datos_reconstruir[propiedades[c]])
							formulario.contendio[a].campos[b].opciones=[{"tag":datos_reconstruir[propiedades[c]]}]
							break
						}
					}
						
				}
					
					
				
	
			}
	
		}
	}
	
	//CONTRUYO EL FORMULARIO
	$("#"+lugar).html("")
	
	$("#"+lugar).html('<form class="auto_form" id="form_'+lugar+'" method="post" >'+
							'<div class="row header_formularios">'+
								'<div class="col-xs-8 col-sm-8 col-md-8 text-left"><h2>'+formulario.formulario+'</h2></div>'+
								'<div class="col-xs-4 col-sm-4 col-md-4 ">'+
									'<ul id="lista_opciones_interz" class="nav nav-tabs">'+
									'<li role="presentation"  class="eliminar_formulario_auto" style="float: right; display: block;">'+
										'<a><i class="fas fa fa-times-circle" aria-hidden="true"></i></a>'+
									'</li>'+
									'</ul>'+
								'</div>'+
							'</div>'+
                           '<div class="row" id="fomulario_'+lugar+'"></div>'+
						   '<div class="row"><div class="col-xs-12 col-sm-12 col-md-12 text-center"><div style="margin-top:20px; display:none;"  class="alert  nota_kanban"></div></div></div>'+
						   '</form>')
						  
	/*$("#fomulario_"+lugar).append('<div class="col-xs-12 col-sm-12 col-md-12"><div class="page-header">'+
									  '<h1>'+formulario.formulario+'</h1>'+
									'</div></div>')*/
									
	tipo_envio_datos="procesar";	
	
	grupos_de_pestanias=[];
	//CONSTRUYO LOS GRUPOS							
	for (a in formulario.contendio){
		
		head_grupos='';
		
		
		
		//NOMBRE DE GRUPO
		if(formulario.contendio[a].grupo!=""){
			head_grupos='<div class="page-header text-left"><small><strong>'+formulario.contendio[a].grupo+'</small></strong></div>';
		}else if(formulario.contendio[a].grupo==""){
			head_grupos=''
		}
		//DEFINO Y CONSTRUYO GRUPOS O PESTAÑAS
		//PESTAÑAS
		if(formulario.contendio[a].pestania && formulario.contendio[a].pestania!=""){
			if(formulario.contendio[a].pestania[0].tipo=="seguimiento"){
				titulos_pestania=Number(a)+1;
				estilo=formulario.contendio[a].pestania[0].tipo
			}else if(formulario.contendio[a].pestania[0].tipo=="tabs"){
				titulos_pestania=formulario.contendio[a].grupo;
				estilo=formulario.contendio[a].pestania[0].tipo
			}
			pestania=formulario.contendio[a].pestania[0].nombre;
			id_elemento_pestania=formulario.contendio[a].grupo.replace(/\ /g, '_').toLowerCase();
			
			if(grupos_de_pestanias.indexOf(pestania[0].nombre+"")<0 ){
				
				grupos_de_pestanias.push(pestania[0].nombre+"")
				
				$("#fomulario_"+lugar).append('<div class="tipo_'+estilo+' col-xs-'+formulario.contendio[a].tamanio[0]+' col-sm-'+formulario.contendio[a].tamanio[1]+' col-md-'+formulario.contendio[a].tamanio[2]+'" >'+
											  <!-- Nav tabs -->
											  '<ul class="nav nav-tabs tabs_'+pestania+' " role="tablist">'+
											  	'<div class="desabilitar"></div>'+
												'<li role="presentation" class="visto active first"><a href="#grupo_'+a+id_elemento_pestania+'" aria-controls="grupo_'+a+id_elemento_pestania+'" role="tab" data-toggle="tab">'+titulos_pestania+'</a><div class="triangulo_sup"></div></li>'+
											  '</ul>'+
											
											  <!-- Tab panes -->
											  '<div class="row tab-content tabs_content_'+pestania+'">'+
												'<div role="tabpanel" class="tab-pane active" id="grupo_'+a+id_elemento_pestania+'"></div>'+
											  '</div>'+
									  '</div>')						
			
			}else{
				
				$(".tabs_"+pestania).append('<li role="presentation"><a href="#grupo_'+a+id_elemento_pestania+'" aria-controls="grupo_'+a+id_elemento_pestania+'" role="tab" data-toggle="tab">'+titulos_pestania+'</a><div class="triangulo_sup"></div>')	
				$(".tabs_content_"+pestania).append('<div role="tabpanel" class="tab-pane" id="grupo_'+a+id_elemento_pestania+'"></div>')	
									
			};
			
			
			
			//"#grupo_"+a+lugar)
			lugar=id_elemento_pestania
			
			
			
			
		//GRUPOS
		}else{
			lugar=lugar
			
			//CONSTRUYO GRUPO							
			$("#fomulario_"+lugar).append('<div class="col-xs-'+formulario.contendio[a].tamanio[0]+' col-sm-'+formulario.contendio[a].tamanio[1]+' col-md-'+formulario.contendio[a].tamanio[2]+'" >'+
											head_grupos+
											'<div class="row" id="grupo_'+a+lugar+'">'+
											'</div>'+
											'<div  class="btn-group btn-group-justified"role="group"aria-label="..." id="opciones_grupo_'+a+lugar+'">'+
											'</div>'+
											'<div>'+
									  '</div>')	
			
		}
		//console.log(grupos_de_pestanias)
		
		
		
									
		//INSERTO CAMPOS EN GRUPO							
		for (b in formulario.contendio[a].campos){
			construir_campos_de_formulario(formulario.contendio[a].campos[b], "#grupo_"+a+lugar)
		}
		//INSERTO BOTON EN PESTAÑAS
		//console.log(formulario.opciones)
		
		for (a in formulario.contendio){
		
			if(formulario.contendio[a].pestania && formulario.contendio[a].pestania!=""){
				if(formulario.contendio[a].opciones){
					
					 accion_post_envio_grupo="";
					 onClick_grupo="";
					 $('#grupo_'+a+lugar).append('<div  class="col-xs-12 col-sm-12 col-md-12 btn-group btn-group-justified"role="group"aria-label="..." id="opciones_grupo_'+a+lugar+'">')
					 
					for (b in formulario.contendio[a].opciones){
						if(formulario.contendio[a].opciones[b].accion_post_envio){
							if(formulario.contendio[a].opciones[b].accion_post_envio){
								accion_post_envio_grupo='data-accion_post_envio="'+formulario.contendio[a].opciones[b].accion_post_envio+'"';
							}else{
								accion_post_envio_grupo=""
							}
						}
						
						if(formulario.contendio[a].opciones[b].funcion){
							if(formulario.contendio[a].opciones[b].funcion){
								onClick_grupo='onClick="'+formulario.contendio[a].opciones[b].funcion+'"';
							}else{
								onClick_grupo='';
							}
						}
						
						$('#opciones_grupo_'+a+lugar).append('<div class="btn-group" role="group">'+
														'<button '+accion_post_envio_grupo+'  '+onClick_grupo+' type="button" class="btn btn-success enviar_form_001"  data-formulario="form_'+lugar+'" data-ws="'+formulario.contendio[a].opciones[b].ws+'">'+formulario.contendio[a].opciones[b].boton+'</button>'+
													 '</div>');
					}
					
					
				}
			}
		
		}
		
	}
	
	$(".nav-tabs>li").click(function(){
		$(this).addClass("visto")
		
	})		
			
			
	$("#fomulario_"+lugar).append('<div class="nota_validacion col-xs-12 col-sm-12 col-md-12"></div>')
	
	$("#fomulario_"+lugar).append('<div class="col-xs-12 col-sm-12 col-md-12"><div id="botones_'+lugar+'" class="btn-group btn-group-justified"role="group"aria-label="..."></div></div>')
		
		
		
	
	
	
	for (a in formulario.opciones){
		
		if(formulario.opciones[a].accion_post_envio){
			accion_post_envio='data-accion_post_envio="'+formulario.opciones[a].accion_post_envio+'"';
		}else{
			accion_post_envio=""
		}
		
		if(formulario.opciones[a].funcion){
			onClick='onClick="'+formulario.opciones[a].funcion+'"';
		}else{
			onClick='';
		}
		
		
		$("#botones_"+lugar).append('<div class="btn-group" role="group">'+
                                    	'<button '+accion_post_envio+'  '+onClick+' type="button" class="btn btn-success enviar_form_001"  data-formulario="form_'+lugar+'" data-ws="'+formulario.opciones[a].ws+'">'+formulario.opciones[a].boton+'</button>'+
                                     '</div>');
	
		
		
		
	}
	
	//FUNCIONES ESTADAR DE LIBRERIA
	
	//FUNCIONES DE SELCT
	$(".lista").find(".select_item").on("click", function(){
		$("#"+$(this).data("destino")).val($(this).data("opcion"))
		$(this).parent("ul").parent("div").find(".btn").html($(this).parent("ul").parent("div").find(".btn").data("base")+': '+$(this).find("a").html()+" <span class='caret'></span>")
		
		
		
		
		//DEPENDENCIA DE SELCT
		if($(this).data("dependencia")){
			seleccion_select=$(this).data("opcion");
			imput_select=$(this).data("dependencia");
			
			$("#select_"+$(this).data("dependencia")).parent(".lista").find("button").attr("disabled", true)
			
			$("#select_"+$(this).data("dependencia")).find("li").each(function(index, element) {
                if(seleccion_select!=$(this).data("dependiente")){
					$(this).hide()
					
					$(this).parent(".dropdown-menu").parent(".lista").find("button").html($(this).parent(".dropdown-menu").parent(".lista").find("button").data("base")+'<span class="caret"></span>')
					$("#"+imput_select).val("");
					
					
					
				}else if (seleccion_select==$(this).data("dependiente")){
					$(this).show()
					$(this).parent(".dropdown-menu").parent(".lista").find("button").attr("disabled", false)
					
					
					
				}
				
				
            });
			
		} 
		
		
	
	})
	
	$(".bootstrap-select").find(".select_item").on("click", function(){

		$(this).parent("li").parent("ul").parent(".dropdown-menu").parent(".bootstrap-select").parent(".btn-group").find(".refrescar_validacion").val($(this).data("tokens"))
	
	})
	//FUNCIONES LISTA COLAPSABLE
	$(".lista_colapsable").find(".select_item").on("click",function(){

		$(this).parent("optgroup").parent("ul").parent(".lista_colapsable").find(".refrescar_validacion").val($(this).data("opcion"))	
		
	})
	
	
	//FUNCIONES DE SELECT MULTI
	$(".select_item_multi").change(function(){
		//console.log($(this).find("input").val())
		
		
		
		if($(this).find("input").val()=="*" ){
			//todos chequeado
			if($(this).find("input").is(":checked")){
				$(this).parent("ul").find(".select_item_multi").each(function() {
					if($(this).find("input").val()!="*"){
						//$(this).is(":checked")
						
						if($(this).find("input").is(":checked")){
						
						}else{
							$(this).find("input").click()
						}
					}
				});
			}else{
				$(this).parent("ul").find(".select_item_multi").each(function() {
					if($(this).find("input").val()!="*"){
						//$(this).is(":checked")
						
						
							$(this).find("input").click()
						
					}
				})
			
			}
		} 
	})
	
	//SETEO DE SELECT MULTIPLES
	$(".select_item_multi").change(function(){
		valor=""
		$(this).parent(".multiselect-container").find(".active").each(function(index, element) {
			valor=valor+$(this).find("input").val()+":";
        });
		campo_id=$(this).parent(".multiselect-container").parent(".btn-group").parent("div").data("id");
		$("#"+campo_id).val(valor)
		
		if($(".multiselect").attr("title")=="None selected"){
		 	$(this).parent(".multiselect").html($(this).parent(".multiselect-container").parent(".multiselect").parent(".btn-group").parent("div").find(".refrescar_validacion").attr("placeholder"))
			
			$(this).parent(".multiselect-container").parent("div").find(".multiselect-selected-text").html($(this).parent(".multiselect-container").parent("div").parent("div").find(".refrescar_validacion").attr("placeholder"))
		}else if($(".multiselect").attr("title")!="None selected"){
			$(this).parent(".multiselect").html($(".multiselect").attr("title"))
		}
		
	})
	
	
	$('#form_'+lugar).find(".multiselect").each(function(index, element) {
		//console.log("aqui")
		$(this).find(".multiselect-selected-text").html("Seleccione "+$(this).parent("div").parent("div").find(".refrescar_validacion").attr("placeholder"))
		
		
        
    });
	
	
	
	
	//MULTISELECT EN LISTA MULTI
	$('#form_'+lugar+' .panel_lista_multi').find(".multiselect").each(function(index, element) {
		//console.log("aqui")
		$(this).find(".multiselect-selected-text").html('');
    });
	
	
	
	
	
	
	//PANEL COLAPSABLE
	
				$(".panel_colapsable").find(".label-default").on("click", function(){
					//alert($(this).attr("id").replace("id_","").replace("_grupo",""))
				
					$(this).parent("h5").parent(".panel_colapsable_header").parent(".panel_colapsable").find(".panel_colapsable_body_items").hide()
					$(this).parent("h5").parent(".panel_colapsable_header").parent(".panel_colapsable").find("#panel_colapsable_body_items_"+$(this).attr("id").replace("id_","").replace("_grupo","")).show()
			
				})
				
				$(".panel_colapsable").find(".select_item").on("click", function(){
					
					$(this).parent(".panel_colapsable_body_items").parent(".panel_colapsable_body").parent(".panel_colapsable").find(".refrescar_validacion").val($(this).data("opcion"))
				})
				
				$(".panel_colapsable").find(".btn-default").on("click", function(){
					//alert("e")
					$(this).parent(".panel_colapsable").find(".panel_colapsable_header").show();
					$(this).parent(".panel_colapsable").find(".panel_colapsable_body").show();
					
				})
				
				$(".panel_colapsable").find(".btn-default").mouseup(function(){ 
					
					//$(".panel_colapsable_header").hide();
					//$(".panel_colapsable_body").hide();
				});
				
				$(".panel_colapsable").find(".select_item").on("click", function(){ 
					
					$(".panel_colapsable_header").hide();
					$(".panel_colapsable_body").hide();
					
					$(this).closest(".panel_colapsable").find(".btn-default").html($(".panel_colapsable").find(".btn-default").data("base")+': '+$(this).html()+' <span class="caret"></span>')
					
				});
				
	//FUNCIONES  BUSCAR COLUMNAS EXCEL
	
	
	
	
	
	
	
	
	
	//COMPORTAMIENTOS DE INTERFAZ ESPEFICICA
	comportamiento_interfaz();
	
	//ARCHIVOS IMPUT FILE
	/*$('.btn-file').on('click', function(){
    	$(this).parent().prev().click();
	});*/
	// Cuando el autentico cambia hace cambiar al falso
	/*$('input[type=file]').on('change', function(e){
		$(this).next().find('input').val($(this).val());
	});*/
	
	$('.btn-file').on('click', function(){
		
    	$(this).parent().find($('input[type=file]')).click();
	});
	
	$('input[type=file]').on('change', function(e){
		//$(this).next().find('input').val($(this).val());
		//alert($(this).val())
		$(this).parent().find($('input[type=text]')).val($(this).val());
		
	});
	
	
	
	
	// INSERTO VALOR A LOS OBJETOS SELECT O MULTISELEC
	if(datos_reconstruir!=""){
		for (a in formulario.contendio){
			for (b in formulario.contendio[a].campos){
				if (formulario.contendio[a].campos[b].tipo=="lista"){
					propiedades = Object.keys(datos_reconstruir);
					
					for (c in propiedades){
						//console.log(datos_reconstruir[propiedades[c]])
						
						if(formulario.contendio[a].campos[b].id==propiedades[c]){
							
							//console.log(propiedades[c], datos_reconstruir[propiedades[c]])
							
							$("#"+formulario.contendio[a].campos[b].id.toLowerCase() ).parent("div").find("li").each(function(index, element) {
                                //console.log($(this).data("opcion")+"/"+datos_reconstruir[propiedades[c]])
								
								if($(this).data("opcion")==datos_reconstruir[propiedades[c]]){
									$(this).click()	
								}	
                            });
							break
						}
					}
				}
				if ( formulario.contendio[a].campos[b].tipo=="lista_serach"){
					//propiedades = Object.keys(datos_reconstruir);
					
					for (c in propiedades){
						//console.log(datos_reconstruir[propiedades[c]])
						
						if(formulario.contendio[a].campos[b].id==propiedades[c]){
							
							//console.log(propiedades[c], datos_reconstruir[propiedades[c]])
							
							$("#"+formulario.contendio[a].campos[b].id.toLowerCase() ).parent("div").find(".select_item").each(function(index, element) {
                                if($(this).data("tokens")!=null){
									//console.log($(this).data("tokens").toLowerCase()+"/"+datos_reconstruir[propiedades[c]].toLowerCase())
									
									if($(this).data("tokens").toLowerCase()==datos_reconstruir[propiedades[c]].toLowerCase()){
										$(this).closest("li").click()	
										$(this).closest("li").addClass("selected active").click()	
										$(this).closest(".lista_serach").find(".refrescar_validacion").val($(this).data("tokens"))
										$(this).closest(".lista_serach").find(".dropdown-toggle").attr("title",$(this).data("tokens"))
										$(this).closest(".lista_serach").find(".filter-option").html($(this).data("tokens"))
										return false;
									}	
								}
								
                            });
							break
						}
					}
				}
				
				if (formulario.contendio[a].campos[b].tipo=="lista_multi" ){
					propiedades = Object.keys(datos_reconstruir);
					for (c in propiedades){
						//console.log(datos_reconstruir[propiedades[c]])
						if(formulario.contendio[a].campos[b].id==propiedades[c]){
							
							//console.log(propiedades[c], datos_reconstruir[propiedades[c]])
							
							$("#"+formulario.contendio[a].campos[b].id.toLowerCase() ).parent("div").find(".checkbox").each(function(index, element) {
                                //
								lista_comparatvia=datos_reconstruir[propiedades[c]].split(":")
								
								
								for (d in lista_comparatvia){
									
									if($(this).find("input").val()==lista_comparatvia[d]){
										//console.log($(this).find("input").val())
										//console.log($("#"+formulario.contendio[a].campos[b].id).parent("div").data("id"))
										$("#"+formulario.contendio[a].campos[b].id).parent("div").removeAttr("style");
										$(this).click()	
								}
								}
								
									
                            });
							break
							
							
						}
					}
				}
				
				
			}
		}
	}
	
	//ELIMINAR FORMULARIO CREADO
	$(".eliminar_formulario_auto").on("click", function(){
			
		$("#"+lugar).html("")
		$(".defauld").html(nota_accion);
		
		
		if(interfaz=="slider"){
			//QUITO ESTILOS
			//$(".columnna").find(".marca_columna").removeClass("marca_columna_activa")
			//$(".columnna").find(".mostrar_columna").removeClass("mostrar_columna_activa")
			//PONGO ESTILOS
			//$(this).closest(".columnna").find(".marca_columna").addClass("marca_columna_activa");
			//$(this).closest(".columnna").find(".mostrar_columna").addClass("mostrar_columna_activa")
			
			$(".kanaban_load").find(".columnna").each(function(index, element) {
				//if($(this).attr("id").replace("columnna_","")!=posicion_tarea){
					$(this).find(".mostrar_columna").click();
				//}
			});
			
			
			$("#barra_ubicacion").html("")
			
		}else if(interfaz=="lista"){
			$("#lista_formularios").html(nota_campo_edicion)
		}
		
		
				
	})
	
	//DUPLICAR CAMPO
	$(".duplicar_campoX").on("click",function(){
		//$(this).parent("input-group").parent("div").parent(".row").parent("div").append($(this).parent("input-group").parent("div").parent(".row").html())
		//console.log($(this).parent(".input-group").find(".btn-file").attr("id"))
					
		cantidad_campos=Number($(this).parent(".input-group").find(".instancias").val())+1
		$(this).parent(".input-group").find(".instancias").val(cantidad_campos)
		console.log(cantidad_campos)
		/*$(this).parent(".input-group").parent("div").parent(".row").find(".input-group").each(function(index, element) {
                    cantidad_campos++
        });*/
		//$($(this).parent(".input-group").parent("div")).clone().appendTo($(this).parent(".input-group").parent("div").parent(".row"));
		//$(this).parent(".input-group").parent("div").parent(".row").append("ddd")
		//console.log($(this).data("campo").replace(/\'/g,'"'))
		campo_redibujar=JSON.parse($(this).data("campo").replace(/\'/g,'"'))
		//console.log(campo_redibujar)
		campo_redibujar.id=campo_redibujar.id+"_"+cantidad_campos
		campo_redibujar.duplicar="eliminar"
		
		//$(this).attr("data-instancias")==cantidad_campos
		id_padre=$(this).parent(".input-group").find(".refrescar_validacion").attr("id")
		console.log(id_padre)
		$(this).closest(".row").find(".eliminar_campo").each(function(index, element) {
           console.log( $(this).data("padre")+"-"+id_padre)
			if($(this).data("padre")==id_padre){
				$(this).hide();
			}
        });
		construir_campos_de_formulario(campo_redibujar, $(this).parent(".input-group").parent("div"))
		
	})
	
	$('.lista_serach').find("li").click(function(){
		//alert(())
		//console.log()
		//console.log($(this).find(".text").html())
		//$(this).closest(".lista_serach").find(".refrescar_validacion").val($(this).find(".text").html())
		$(this).closest(".lista_serach").find(".refrescar_validacion").val($(this).find("a").data("tokens"))
		//$("#"+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).val($(this).html())
			
		//$(this).closest(".lista_serach").find(".filter-option").html($(this).closest(".lista_serach").find(".refrescar_validacion").data("base")+":"+$(this).find(".text").html()  )
					
	})
	
	
	 
	//VALIDACIONES STANDARS
	validaciones_standard();
	//ENVIO AJAX STANDAR
	envios_standar();
	
console.timeEnd('IN_F');	
	
}	

function duplicar_campo(id){
	id=id.toLowerCase()
	//console.log($("#"+id).parent(".input-group").find(".instancias").val())
	//$("#"+id).hide()
	cantidad_campos=Number($("#"+id).parent(".input-group").find(".instancias").val())+1
		$("#"+id).parent(".input-group").find(".instancias").val(cantidad_campos)
		//console.log(cantidad_campos)
		/*$(this).parent(".input-group").parent("div").parent(".row").find(".input-group").each(function(index, element) {
                    cantidad_campos++
        });*/
		//$($(this).parent(".input-group").parent("div")).clone().appendTo($(this).parent(".input-group").parent("div").parent(".row"));
		//$(this).parent(".input-group").parent("div").parent(".row").append("ddd")
		//console.log($("#"+id).find(".duplicar_campo").data("campo"))
		campo_redibujar=JSON.parse($("#"+id).parent(".input-group").find(".duplicar_campo").data("campo").replace(/\'/g,'"'))
		//console.log(campo_redibujar)
		campo_redibujar.id=campo_redibujar.id+"__"+cantidad_campos
		campo_redibujar.duplicar="eliminar"
		console.log(campo_redibujar.botones[0].funcion)
		
		//$(this).attr("data-instancias")==cantidad_campos
		id_padre=id
		//console.log(id_padre)
		$("#"+id).closest(".row").find(".eliminar_campo").each(function(index, element) {
           console.log( $(this).data("padre")+"-"+id_padre)
			if($(this).data("padre")==id_padre){
				$(this).hide();
			}
        });
		console.log(campo_redibujar)
		construir_campos_de_formulario(campo_redibujar, $("#"+id).parent(".input-group").parent("div"))
		
		reajustar_formula=$("#"+id+"__"+cantidad_campos).closest(".input-group").find(".opcion_click").attr("onclick")
		reajustar_formula=reajustar_formula.split("(",2)
		id_new=reajustar_formula[1].split(",",3)
		console.log(id_new[0])
		nueva_funcion=reajustar_formula[0]+"(`"+id_new[0].replace(/\`/g,"")+"__"+cantidad_campos+"`, "+id_new[1]+","+id_new[2].replace(/\)/g,"")+")"
		$("#"+id+"__"+cantidad_campos).closest(".input-group").find(".opcion_click").attr("onclick",nueva_funcion)
		
}

function eliminar_campo(id_padre){
	
	console.log(id_padre)
		
		cantidad_campos=Number($("#"+id_padre).parent(".input-group").find(".instancias").val())
				
		$("#"+id_padre).parent(".input-group").find(".instancias").val(cantidad_campos-1)
					
		$("#"+id_padre).parent(".input-group").parent("div").find(".eliminar_campo").each(function(index, element) {
			if($(this).data("padre")==id_padre && (index+1)==(cantidad_campos-1)){
				$(this).show();
				
			}else if($(this).data("padre")==id_padre && (index+1)==cantidad_campos){
				$(this).closest(".input-group").parent("div").remove();
			}
		});
		
}

function construir_campos_de_formulario(campo_en_construccion, lugar){
	//console.log(campo_en_construccion)
	
			//CAMPOS OBLIGATORIOS
			obligatorio='';
			if(campo_en_construccion.obligatorio=="si"){
					obligatorio='required="required"'; 
					campos_a_validar.push(
											[campo_en_construccion.id.toLowerCase().replace(/\ /g,'_'), 
											 campo_en_construccion.tipo.toLowerCase().replace(/\ /g,'_'),
											 campo_en_construccion.obligatorio.toLowerCase().replace(/\ /g,'_'),
											 campo_en_construccion.campo
											 ]
										)
			}else if(campo_en_construccion.obligatorio=="no"){obligatorio='';}
			
			
			
			tipo_campo='';
			clase_tipo_campo='';
			opciones='';
			if(campo_en_construccion.tipo=="texto"){tipo_campo='text'; clase_tipo_campo='';}
			else if(campo_en_construccion.tipo=="fecha"){tipo_campo='text';clase_tipo_campo='calendario_002';}
			else if(campo_en_construccion.tipo=="numero"){tipo_campo='text';clase_tipo_campo='numero';}
			else if(campo_en_construccion.tipo=="combo"){tipo_campo='text';clase_tipo_campo='numero';}
			else if(campo_en_construccion.tipo=="porcentaje"){tipo_campo='text';clase_tipo_campo='porcentaje';}
			else if(campo_en_construccion.tipo=="password"){tipo_campo='password';clase_tipo_campo='';}
			else if(campo_en_construccion.tipo=="rut"){tipo_campo='text';clase_tipo_campo='rut_form';}
			
			
			contenido='';
			
			//console.log(campo_en_construccion.id+"/"+campo_en_construccion.opciones+"/"+typeof(campo_en_construccion.opciones))
			
			if(campo_en_construccion.tipo=="numero"){
				contenido=campo_en_construccion.opciones;
				
			}else{
				if(campo_en_construccion.opciones==""){
					contenido="";
				}else if(campo_en_construccion.opciones!=""){
					contenido=campo_en_construccion.opciones;
					
				}
			
			
			
			}
			
			
			
			//DEFINICION DE TAMAÑO O CAMPO OCULTO
			
			if (campo_en_construccion.tamanio==0){
				tamanio_campo="style='display:none;'";
				//tamanio_campo=""
				
			}else if (campo_en_construccion.tamanio!=0){
				tamanio_campo="class='col-xs-"+campo_en_construccion.tamanio[0]+" col-sm-"+campo_en_construccion.tamanio[1]+" col-md-"+campo_en_construccion.tamanio[2]+"'";
				
			}
			//console.log(campo_en_construccion)
			//DISNABLED ENABLE
			objetivo_campo="";
			if(campo_en_construccion.estado){
				if(campo_en_construccion.estado=="lectura"){
					objetivo_campo="disabled"
				}else if(campo_en_construccion.estado=="lectura_envio"){
					objetivo_campo="readonly";
				}
			}
			
			//OBJETO DUPLICABLE
			boton_duplicar="";
			if(campo_en_construccion.duplicar){
				if(campo_en_construccion.duplicar=="si"){
					boton_duplicar='<span class="input-group-addon duplicar_campo" onClick="duplicar_campo(`'+campo_en_construccion.id+'`)"  data-campo="'+JSON.stringify(campo_en_construccion).replace(/\"/g,"'")+'" id="basic-addon1"><i class="fa fa-clone"></i></span><input style="display:none" value="0" type="text" class="instancias" />';
					//
					
					
					
				}else if(campo_en_construccion.duplicar=="eliminar"){
					id_padre=campo_en_construccion.id.toLowerCase().split("__",2);
					boton_duplicar='<span  class="input-group-addon eliminar_campo" onClick="eliminar_campo(`'+id_padre[0]+'`)" data-padre="'+id_padre[0]+'"  id="basic-addon1"><i class="fas fa-times"></i></span>';
				}else{
					boton_duplicar="";
				}
			}
			
			//SE INICIA LA CONSTRUCCION
			if(campo_en_construccion.tipo=="texto" || campo_en_construccion.tipo=="numero" || campo_en_construccion.tipo=="fecha" || campo_en_construccion.tipo=="porcentaje" || campo_en_construccion.tipo=="password"){
				
				
				opciones_campo=""
				if(campo_en_construccion.botones){
					//opciones_campo='<button  type="button" class="btn btn-default" aria-label="Bold" disabled>'+campo_en_construccion.campo+'</button>';
					
					for (i in campo_en_construccion.botones){
						//opciones_campo=opciones_campo+'<button onClick="'+campo_en_construccion.botones[i].funcion+'" type="button" class="btn btn-default" aria-label="Bold">'+campo_en_construccion.botones[i].nombre+'</button>'
						opciones_campo=opciones_campo+'<span class="input-group-addon opcion_click" onClick="'+campo_en_construccion.botones[i].funcion+'" id="basic-addon1">'+campo_en_construccion.botones[i].nombre+'</span>';
						
					}
					opciones_campo=opciones_campo+'<span class="input-group-addon" id="basic-addon1">'+campo_en_construccion.campo+'</span>';
					//opciones_campo='<div class="input-group-btn">'+opciones_campo+'</div>'
					//opciones_campo='<span class="input-group-addon" id="basic-addon1">'+opciones_campo+'</span>';
    <!-- Buttons -->
  	
				}else{
					
					opciones_campo='<span class="input-group-addon" id="basic-addon1">'+campo_en_construccion.campo+'</span>';
				
				
				}
				
				
				
				
				
				
				if(campo_en_construccion.campo=="") {
					
						$("#grupo_"+a+lugar).append('<div '+tamanio_campo+'>'+
									
									'<input value="'+contenido+'" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="'+tipo_campo+'" placeholder="'+campo_en_construccion.nota+'" class="form-control refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+objetivo_campo+' />'+
								'</div>')
				}else{
					
				
				$(lugar).append('<div '+tamanio_campo+'><div class="input-group">'+
									boton_duplicar+
									opciones_campo+
									'<input value="'+contenido+'" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="'+tipo_campo+'" placeholder="'+campo_en_construccion.nota+'" class="form-control refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+objetivo_campo+' />'+
								'</div></div>')
				}	
				
				
										
				//
				
				if(campo_en_construccion.navegacion && campo_en_construccion.navegacion!=""){
					
					if( campo_en_construccion.navegacion=="mensual"){
						$( ".calendario_002").datepicker({
							format: "dd/mm/yyyy",
							changeMonth:true,
							changeYear:false,
						})
					}else if(campo_en_construccion.navegacion=="anual"){
						$( ".calendario_002").datepicker({
							format: "dd/mm/yyyy",
							changeMonth:false,
							changeYear:true,
						})
					} else if(campo_en_construccion.navegacion=="anual y mensual"){
						$( ".calendario_002").datepicker({
							format: "dd/mm/yyyy",
							changeMonth:true,
							changeYear:true,
						})
					}
					
					
				}else{
					$( ".calendario_002" ).datepicker();
				}
				
				
			
			}else if(campo_en_construccion.tipo=="area_texto"){
				
				$(lugar).append('<div '+tamanio_campo+'><div class="input-group">'+
									'<span class="input-group-addon" id="basic-addon1">'+campo_en_construccion.campo+'</span>'+
									'<textarea id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" placeholder="'+campo_en_construccion.nota+'"  maxlength="'+campo_en_construccion.maximo+'" class="form-control refrescar_validacion" rows="'+campo_en_construccion.alto+'" '+obligatorio+' '+objetivo_campo+'>'+contenido+'</textarea>'+
									//'<input value="'+contenido+'" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="'+tipo_campo+'" placeholder="'+campo_en_construccion.nota+'" class="form-control refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+objetivo_campo+' />'+
								'</div></div>')
				
				
				
			} else if(campo_en_construccion.tipo=="rut"){
				
				if(campo_en_construccion.campo=="") {
					
						$(lugar).append('<div '+tamanio_campo+'>'+
									
									'<input value="'+contenido+'" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="'+tipo_campo+'" placeholder="'+campo_en_construccion.nota+'" class="form-control refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+objetivo_campo+' />'+
								'</div>')
				}else{
					
				
				$(lugar).append('<div '+tamanio_campo+'><div class="input-group">'+
									'<span class="input-group-addon" id="basic-addon1">'+campo_en_construccion.campo+'</span>'+
									'<input value="'+contenido+'" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="'+tipo_campo+'" placeholder="'+campo_en_construccion.nota+'" class="form-control refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+objetivo_campo+' />'+
								'</div></div>')
				}	
				
				
				
			} else if(campo_en_construccion.tipo=="file" ){
				tipo_envio_datos="no_procesar";
				//OBJETO DUPLICABLE
				boton_duplicar="";
				if(campo_en_construccion.duplicar){
					if(campo_en_construccion.duplicar=="si"){
						boton_duplicar='<span class="input-group-addon duplicar_campo" data-campo="'+JSON.stringify(campo_en_construccion).replace(/\"/g,"'")+'" id="basic-addon1"><i class="fa fa-clone"></i></span>';
					}else{
						boton_duplicar="";
					}
				}
				
				//TIPO DE ARCHIVO
				
				if(campo_en_construccion.tipo_file){
					tipo_file='accept=".'+campo_en_construccion.tipo_file+'"';
				}else{
					tipo_file="";
				}
												
				$(lugar).append('<div '+tamanio_campo+'><div class="input-group">'+
										boton_duplicar+
									'<span class="input-group-addon " id="basic-addon1"><i class="far fa-folder-open"></i> '+campo_en_construccion.campo+'</span>'+
									
									'<input  value="'+contenido+'" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'_viuw" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'_viuw" type="text" placeholder="'+campo_en_construccion.nota+'" class="form-control btn-file refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+objetivo_campo+' />'+
									'<input style="display:none" value="'+contenido+'" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="file" placeholder="'+campo_en_construccion.nota+'" class="form-control file refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+tipo_file+' />'+
								'</div></div>')
				
				$(".duplicar_campo").on("click",function(){
					//$(this).parent("input-group").parent("div").parent(".row").parent("div").append($(this).parent("input-group").parent("div").parent(".row").html())
					//console.log($(this).parent(".input-group").find(".btn-file").attr("id"))
					
					cantidad_campos=0
					$(this).parent(".input-group").parent("div").parent(".row").find(".input-group").each(function(index, element) {
                        cantidad_campos++
                    });
					//$($(this).parent(".input-group").parent("div")).clone().appendTo($(this).parent(".input-group").parent("div").parent(".row"));
					$(this).parent(".input-group").parent("div").parent(".row").append("ddd")
					//console.log($(this).data("campo"))
					
					//construir_campos_de_formulario(campo_en_construccion, lugar)
					
				})
				
								
								
			} else if(campo_en_construccion.tipo=="check" ){
				//estado_checked=""
				/*estado_checked="checked"
				if(campo_en_construccion.opciones=="false"){
					estado_checked=""
				}else if(campo_en_construccion.opciones=="false" || campo_en_construccion.opciones==""){
					estado_checked=""
				}*/
				
				if(campo_en_construccion.obligatorio=="si"){
					estilo_obligatorio="switch_obligatorio"
				}else if(campo_en_construccion.obligatorio=="no"){
					estilo_obligatorio=""
				}
				
				
				$(lugar).append('<div class="check col-xs-'+campo_en_construccion.tamanio[0]+' col-sm-'+campo_en_construccion.tamanio[1]+' col-md-'+campo_en_construccion.tamanio[2]+'">'+
													'<span href="#"  class="">'+
														'<label class="switch">'+
															'<input class=""  type="checkbox" />'+
															'<span class="slider round"></span>'+
															'&nbsp;&nbsp;'+
														'</label>'+campo_en_construccion.campo+
											
													'</span>'+
													//
													'<input hidden id="'+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" value="'+campo_en_construccion.opciones+'" type="text" placeholder="'+campo_en_construccion.nota+'" class="'+estilo_obligatorio+' refrescar_validacion" '+obligatorio+' '+objetivo_campo+'/>'+
											   
											   '</div>');
									
				
					$(".check").find(".switch").change(function(){
						
						
								if($(this).find("input").is(":checked")){
									$(this).closest(".check").find(".refrescar_validacion").val("true")
									$(this).closest(".check").find(".round").removeClass("fucus_negativo")
									
								}else{
									$(this).closest(".check").find(".refrescar_validacion").val("false")
									
								}
							
			
					})
					
					if(campo_en_construccion.opciones!=""){
						if(campo_en_construccion.opciones==true || campo_en_construccion.opciones=="true"){
							$("#"+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')).closest(".check").find(".switch").click()
						}else if(campo_en_construccion.opciones==false ||  campo_en_construccion.opciones=="false"){
						
						}
					}else if(campo_en_construccion.opciones==""){
						
					}
					
					 
			
			
			
			}else if(campo_en_construccion.tipo=="file_imagen" ){
				tipo_envio_datos="no_procesar";
				//OBJETO DUPLICABLE
				boton_duplicar="";
				if(campo_en_construccion.duplicar){
					if(campo_en_construccion.duplicar=="si"){
						boton_duplicar='<span class="input-group-addon duplicar_campo" data-campo='+JSON.stringify(campo_en_construccion)+' id="basic-addon1"><i class="fa fa-clone"></i></span>';
					}else{
						boton_duplicar="";
					}
				}
				
				//TIPO DE ARCHIVO
				
				if(campo_en_construccion.tipo_file){
					tipo_file='accept=".'+campo_en_construccion.tipo_file+'"';
				}else{
					tipo_file="";
				}
												
				$(lugar).append('<div '+tamanio_campo+'><div class="input-group">'+
										boton_duplicar+
									'<span class="input-group-addon " id="basic-addon1"><i class="far fa-folder-open"></i> '+campo_en_construccion.campo+'</span>'+
									
									'<input  value="'+contenido+'" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'_viuw" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'_viuw" type="text" placeholder="'+campo_en_construccion.nota+'" class="form-control btn-file refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+objetivo_campo+' />'+
									'<input style="display:none" value="'+contenido+'" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="file" placeholder="'+campo_en_construccion.nota+'" class="form-control file refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+tipo_file+' />'+
									
									
								'</div></div>'+
								'<div '+tamanio_campo+'>'+
									'<div class="input-group" style="width: 100%;"><div id="imagen_'+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')+'" class="well well-sm"></div></div>'+
								'</div>')
								
				cantidad_campos=0
				$(".duplicar_campo").on("click",function(){
					//$(this).parent("input-group").parent("div").parent(".row").parent("div").append($(this).parent("input-group").parent("div").parent(".row").html())
					//console.log($(this).parent(".input-group").find(".btn-file").attr("id"))
					
					
					$(this).parent(".input-group").parent("div").parent(".row").find(".input-group").each(function(index, element) {
                        cantidad_campos++
                    });
					//console.log(cantidad_campos)
					//$($(this).parent(".input-group").parent("div")).clone().appendTo($(this).parent(".input-group").parent("div").parent(".row"));
					$(this).parent(".input-group").parent("div").parent(".row").append("ddd")
					
				})
				
								
								
			} else if(campo_en_construccion.tipo=="lista"){
				
				//DETERMINO DEPENDENCIA
				if(campo_en_construccion.dependiente && campo_en_construccion.dependiente!=""){
					dependencia="data-dependencia="+campo_en_construccion.dependiente;
				}else{
					dependencia="";
				}
				//DETERMINO DEPENDIENTE
				if(campo_en_construccion.dependencia && campo_en_construccion.dependencia!=""){
					estado_boton='disabled="disabled"'
				}else{
					estado_boton=''
				}
				
				//DETERMINO WS
				if(campo_en_construccion.ws && campo_en_construccion.ws!=""){
					ws_para_dependencia="data-ws_dependencia="+campo_en_construccion.ws;
				}else{
					ws_para_dependencia=''
				}
				
				
				
				//btn-group col-xs-12 col-sm-12 col-md-12
				$(lugar).append('<div class="col-xs-'+campo_en_construccion.tamanio[0]+' col-sm-'+campo_en_construccion.tamanio[1]+' col-md-'+campo_en_construccion.tamanio[2]+'"><div class="lista ">'+
													'<button '+estado_boton+' data-base="'+campo_en_construccion.campo+'" type="button" class="btn btn-default dropdown-toggle form-control selectpicker" data-toggle="dropdown" aria-haspopup="true"  data-live-search="true" aria-expanded="false" '+objetivo_campo+'>'+
														campo_en_construccion.campo+' <span class="caret"></span>'+
													'</button>'+
													'<ul id="select_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" class="dropdown-menu">'+
													'</ul>'+
											   //
											   '<input hidden id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="text" placeholder="'+campo_en_construccion.nota+'" class=" refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+objetivo_campo+'/>'+
											   '</div></div>');
									
				for (c in campo_en_construccion.opciones){
					//console.log(campo_en_construccion.opciones[c])
					
					if(campo_en_construccion.opciones[c].id_dependiente){
						dependiente="data-dependiente="+campo_en_construccion.opciones[c].id_dependiente;
							
					}else{
						dependiente="";
								
					}
					
					$("#select_"+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).append('<li data-destino="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" data-opcion="'+campo_en_construccion.opciones[c].id+'" '+dependencia+' '+dependiente+' '+ws_para_dependencia+' class="select_item"><a>'+campo_en_construccion.opciones[c].tag+'</a></li>')
					
				}
				


				
			} else if(campo_en_construccion.tipo=="lista_serach"){
				
				$(lugar).append('<div class="lista_serach col-xs-'+campo_en_construccion.tamanio[0]+' col-sm-'+campo_en_construccion.tamanio[1]+' col-md-'+campo_en_construccion.tamanio[2]+'">'+
													'<select id="select_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" data-base="'+campo_en_construccion.campo+'" class="selectpicker form-control"   data-live-search="true" data-hide-disabled="true">'+
														//'<option data-tokens="" class="select_item">'+campo_en_construccion.campo+' <span class="caret"></span></option>'+
													'</select>'+
													
											   // 
											   '<input hidden data-base="'+campo_en_construccion.campo+'" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="text" placeholder="'+campo_en_construccion.nota+'" class=" refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' />'+
											   '</div>')
									
				for (c in campo_en_construccion.opciones){
					//console.log(campo_en_construccion.opciones[c].tag)
					$("#select_"+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).append('<option data-tokens="'+campo_en_construccion.opciones[c].id+'"  class="select_item" ><a>'+campo_en_construccion.opciones[c].tag+'</a></option>')
					
				}
				
				
				$('.selectpicker').selectpicker();
				//$('.dropdown-menu').find(".text").click(function(){
				//alert(())
					//$("#"+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).val($(this).html())
					
					//$(this).closest(".lista_serach").find(".filter-option").html(campo_en_construccion.campo+": "+$(this).html()  )
					
				//})
				/*$(function () {
					$('selectpicker').selectpicker();
				});*/

				
			} else if(campo_en_construccion.tipo=="lista_colapsable"){
				
				
				$(lugar).append('<div class="btn-group lista_colapsable col-xs-'+campo_en_construccion.tamanio[0]+' col-sm-'+campo_en_construccion.tamanio[1]+' col-md-'+campo_en_construccion.tamanio[2]+'">'+
													'<button data-base="'+campo_en_construccion.campo+'" type="button" class="btn btn-default dropdown-toggle form-control selectpicker" data-toggle="dropdown" aria-haspopup="true"  data-live-search="true" aria-expanded="false">'+
														campo_en_construccion.campo+' <span class="caret"></span>'+
													'</button>'+
													'<ul id="select_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" class="dropdown-menu">'+
													'</ul>'+
											   //
											   '<input  hidden id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="text" placeholder="'+campo_en_construccion.nota+'" class=" refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' />'+
											   '</div>');
				items_construccion=""				
				for (c in campo_en_construccion.opciones){
			
					//console.log(campo_en_construccion.opciones)
					if(campo_en_construccion.opciones[c].tag=="grupo"){
						
						$("#select_"+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).append('<optgroup id="id_'+c+'_grupo" label="'+campo_en_construccion.opciones[c].grupo+'"></optgroup>');
						items_construccion=c
						
					}else{
						//$("#id_"+items_construccion+"_grupo").append('a ')
						$("#id_"+items_construccion+"_grupo").append('<option data-opcion="'+campo_en_construccion.opciones[c].id+'" class="select_item">'+campo_en_construccion.opciones[c].tag+'</option>')
					}
					
				}
				
				

				
			} else if(campo_en_construccion.tipo=="lista_multi"){
				
				$(lugar).append('<div data-id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" class="multi_lista col-xs-'+campo_en_construccion.tamanio[0]+' col-sm-'+campo_en_construccion.tamanio[1]+' col-md-'+campo_en_construccion.tamanio[2]+'">'+
'<select  title="" id="select_multi_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'"  multiple="multiple"></select>'+
'<input hidden id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="text" placeholder="'+campo_en_construccion.nota+'"  class="refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' />'	+
'</div>'
	//		
			)
									
				for (c in campo_en_construccion.opciones){
					//alert(campo_en_construccion.opciones[c].tag)
					$("#select_multi_"+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).append('<option class="select_item_multi"  value="'+campo_en_construccion.opciones[c].id+'">'+campo_en_construccion.opciones[c].tag+'</option>')
					
					
				}
				$('#select_multi_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).multiselect();
			
			
			
			} else if(campo_en_construccion.tipo=="lista_multi_comentarios"){
				
				id_lista_multi_comentarios=campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')
				//
				$(lugar).append('<div id="lista_multi_comentarios_'+id_lista_multi_comentarios+'" class="col-xs-12 col-sm-12 col-md-12 lista_multi_comentarios">'+
												'<input hidden style="width: 100%;" id="'+id_lista_multi_comentarios+'" name="'+id_lista_multi_comentarios+'" type="text" class=" refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' />'+
											'</div>')
				
				//console.log(campo_en_construccion)
				
				for (i in campo_en_construccion.opciones){
					
					$("#lista_multi_comentarios_"+id_lista_multi_comentarios).append('<div class="media">'+
																						'<div class="media-left media-middle">'+
																							//'<i class="fa fa-comment"></i>'+
																							'<i class="fas fa-share-alt"></i>'+
																						'</div>'+
																							'<div class="media-body">'+
																								'<h4 class="media-heading">'+
																									'<strong>'+
																										
																										'<label class="switch" data-controlar="">'+
																											'<input data-id="'+campo_en_construccion.opciones[i].id+'"  type="checkbox"/>'+
																											'<span class="slider round"></span>'+
																											'&nbsp;&nbsp;'+
																										'</label>'+
																										campo_en_construccion.opciones[i].tag+
																									'</strong>'+
																								'</h4>'+
																								'<textarea   placeholder="'+campo_en_construccion.nota+'"  maxlength="250" class="form-control" rows="2" '+obligatorio+' '+objetivo_campo+'></textarea>'+
																							'</div>'+
																					 '</div>');
				}
				
				$(lugar).append()
											   
											   
											   
			/*COMPORTAMIENTOS*/
			
			$(".lista_multi_comentarios").find("textarea").keyup(function(){
				
				objeto_id_lista_multi_comentarios=[];
				
				$(this).closest(".lista_multi_comentarios").find(".media").each(function(index, element) {
                    if($(this).find("input").is(":checked")){
						//console.log($(this).find("input").data("id"))
						$(this).closest('.media').find('textarea').removeClass(".fucus_negativo")
						objeto_id_lista_multi_comentarios.push({"id":$(this).find("input").data("id"),"nota": $(this).closest('.media').find('textarea').val()});
							
					}else{}
                });	
				
				if(objeto_id_lista_multi_comentarios.length==0){
					$(this).closest(".lista_multi_comentarios").find(".refrescar_validacion").val("")
				}else{
					$(this).closest(".lista_multi_comentarios").find(".refrescar_validacion").val(JSON.stringify(objeto_id_lista_multi_comentarios))
				}
				//$("#"+id_lista_multi_comentarios).val(JSON.stringify(objeto_id_lista_multi_comentarios))
				
			})
			
			
			$(".lista_multi_comentarios").find(".switch").change(function(){
				
				objeto_id_lista_multi_comentarios=[];
				
				$(this).closest(".lista_multi_comentarios").find(".media").each(function(index, element) {
                    if($(this).find("input").is(":checked")){
						//console.log($(this).find("input").data("id"))
						$(this).closest('.lista_multi_comentarios').find('textarea').removeClass("fucus_negativo")
						objeto_id_lista_multi_comentarios.push({"id":$(this).find("input").data("id"),"nota": $(this).closest('.media').find('textarea').val()});
							
					}else{}
                });	
				if(objeto_id_lista_multi_comentarios.length==0){
					$(this).closest(".lista_multi_comentarios").find(".refrescar_validacion").val("")
				}else{
					$(this).closest(".lista_multi_comentarios").find(".refrescar_validacion").val(JSON.stringify(objeto_id_lista_multi_comentarios))
				}
				//$("#"+id_lista_multi_comentarios).val(JSON.stringify(objeto_id_lista_multi_comentarios))
				
			})
			
			
			
			
			} else if(campo_en_construccion.tipo=="comentario_documento"){
				tipo_envio_datos="no_procesar";
				
				//////////////////////////////////////////
				/////////////////////ENVIO////////////////
				//////////////////////////////////////////
				id_lista_multi_comentarios=campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')
				//
				$(lugar).append('<div id="comentario_documento_'+id_lista_multi_comentarios+'" class="col-xs-12 col-sm-12 col-md-12 comentario_documento lista_multi_comentarios">'+
												'<input hidden style="width: 100%;" id="'+id_lista_multi_comentarios+'" name="'+id_lista_multi_comentarios+'" type="text" class=" refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' />'+
												'<div data-ws="'+campo_en_construccion.ws_post_notas+'" data-ws_descarga="'+campo_en_construccion.ws_get_descarga+'"  data-ws_carga="'+campo_en_construccion.ws_post_carga+'" class="comentarios" style="max-height: 350px;overflow: hidden; overflow-y: auto;"></div>'+
												'<div class="media">'+
																						'<div class="media-left media-middle">'+
																							'<i class="fa fa-comment"></i>'+
																						'</div>'+
																							'<div class="media-body">'+
																								'<h4 class="media-heading">'+
																									'<strong id="comentario_documento_usuarios_'+id_lista_multi_comentarios+'">'+
																										
																										
																									'</strong><br><br>'+
																								'</h4>'+
																								'<textarea   placeholder="'+campo_en_construccion.nota+'"  maxlength="250" class="form-control" rows="'+campo_en_construccion.alto+'" '+obligatorio+' '+objetivo_campo+'></textarea>'+
																									
																									'<button type="button" class="btn btn-default btn-xs agregar">'+
																										'<i class="fas fa-paperclip"></i>&nbsp;Adjuntar&nbsp;&nbsp;'+
																									'</button>'+
																							'</div>'+
																					 '</div>'+
												
											'</div>')
				//invoco la funcion de actualizacion de comentarios
				if(campo_en_construccion.ws_post_notas!=""){
					comentario_documento("comentario_documento_"+id_lista_multi_comentarios);
				}
				
				
				los_usuarios_comentario_documento={"usuarios":[], "nota":"","archivos":[]};
				for (i in campo_en_construccion.opciones){
					
					los_usuarios_comentario_documento.usuarios.push({"id_usuario":campo_en_construccion.opciones[i].id});
					
					$("#comentario_documento_usuarios_"+id_lista_multi_comentarios).append('<span class="label label-info"><i class="fas fa-user"></i>&nbsp;'+campo_en_construccion.opciones[i].tag+'</span>'+"&nbsp;");
				}
				//CONSTRYO Y ENVIO
				$(".comentario_documento").change(function(){
					los_usuarios_comentario_documento.nota=$(this).find("textarea").val();
					//VACIO LOS ARCHIVO
					los_usuarios_comentario_documento.archivos=[];
					//LLENO ARRAY DE ARCHIVOS QUE QUEDAN
					$(this).find(".file_comentario_documento").each(function(index, element) {
						if($(this).val()!=""){los_usuarios_comentario_documento.archivos.push($(this).val().substr(12));}
                    })
					//INSERTO OBJETO EN ENVIO
					$(this).find(".refrescar_validacion ").val(JSON.stringify(los_usuarios_comentario_documento))
					
				})
							   
			//AGREPO MAS CAMPOS O ELIMINO "
			$(".comentario_documento").find(".agregar").click(function(){
				
				//CAMTIDAD DE CAMPOS
				cantidad_campos=0
				$(this).closest(".media").find(".file_comentario_documento").each(function(index, element) {
                    cantidad_campos++
                })
				
				$(this).closest(".media").find(".media-body").append('<span style="display: none;" id="" class="envio">'+
																						'<div class="btn-group btn-group-xs" role="group" aria-label="...">'+
																						  '<button type="button" class="btn btn-warning archivo" disabled>&nbsp;</button>'+
																						  '<button type="button" class="btn btn-warning eliminar" disabled><i class="fas fa-trash"></i></button>'+
																						'</div>&nbsp;'+
																						'<input style="display: none; data-estado="pendiente" class="file_comentario_documento file" id="file_'+cantidad_campos+'"    type="file"   />'+
																					'</span>')
				$(this).closest(".comentario_documento").find("#file_"+cantidad_campos).click()
				
				
				
				///EVENTO DE ENVIO
				$(this).closest(".comentario_documento").find(".file_comentario_documento").change(function(){
					if($(this).val()==""){
						$(this).closest(".envio").remove();
							
					}else{
						$(this).closest(".envio").attr("id",$(this).val().substr(12).replace(/\ /g,"_").replace(/\./g,"_"))
						$(this).closest(".envio").find(".archivo").html($(this).val().substr(12));
						$(this).closest(".envio").show();
							
								//
								var formData = new FormData();
								
								var files = $(this).get(0).files;
								var formData = new FormData();
								for (var i = 0; i < files.length; i++) {
									var file = files[i];
									formData.append('file', file, file.name);
								}
								formData.append('paso_ws',1);
								formData.append('id_tarea', identificador);
								formData.append('usuario',localStorage.getItem("usuario_"+cliente_bs));
								
								elemento_id=$(this).closest(".envio").attr("id");
								
								$.ajax({
										url : direccion_ws+$(this).closest(".comentario_documento").find(".comentarios").data("ws_carga"),
										type : "POST",
										headers:{"authorization": "JWT" + " " +localStorage.token },           
										data: formData,
										processData: false,
										contentType: false,
										beforeSend: function () {
											$(".enviar_form_001").attr("disabled", true);
										},
										success: function(data){
											if(data.estatus){
												
												if(data.estatus=="OK" || data.estatus=="FIN"){
													$(".enviar_form_001").attr("disabled", false);
													
													$("#"+elemento_id).find(".eliminar").attr("data-name",data.archivo)
													
													$("#"+elemento_id).find(".eliminar").removeClass("btn-warning")
													$("#"+elemento_id).find(".archivo").removeClass("btn-warning")
													
													$("#"+elemento_id).find(".eliminar").addClass("btn-success")
													$("#"+elemento_id).find(".archivo").addClass("btn-success")
													
													$("#"+elemento_id).find(".eliminar").attr("disabled", false)
													$("#"+elemento_id).find(".archivo").attr("disabled", false)
													
													
												}else if(data.estatus=="NO OK"){
													controlar_no_ok_desconocido_error("NO OK", data)
												}
											}else{
												controlar_no_ok_desconocido_error("DESCONOCIDO", data)		
											}
										},
										error: function (xhr, ajaxOptions, thrownError) {
												controlar_no_ok_desconocido_error("ERROR", xhr.status)
										}
							
									});
				
			
								
						
						
						
						
					}
				})
			
			
				//EVENTO CLICK
				$(".comentario_documento").find(".archivo").click(function(){
					//$(this).closest(".envio").find(".file_comentario_documento").click();
				})
				//EVENTO ELIMINAR
				$(".comentario_documento").find(".eliminar").click(function(){
					
								var formData = new FormData();
								
								formData.append('file',$(this).data("name"));
								formData.append('paso_ws',2);
								formData.append('id_tarea', identificador);
								formData.append('usuario',localStorage.getItem("usuario_"+cliente_bs));
								
								elemento_id=$(this).closest(".envio").attr("id");
								
								$.ajax({
										url : direccion_ws+$(this).closest(".comentario_documento").find(".comentarios").data("ws_carga"),
										type : "POST",
										headers:{"authorization": "JWT" + " " +localStorage.token },           
										data: formData,
										processData: false,
										contentType: false,
										beforeSend: function () {
											//$(div).append('<div class="conter_loader"><div class="loader"></div></div>')
											
											los_usuarios_comentario_documento.archivos=[];
											$(".enviar_form_001").attr("disabled", true);
										},
										success: function(data){
											if(data.estatus){
												
												if(data.estatus=="OK" || data.estatus=="FIN"){
													$(".enviar_form_001").attr("disabled", false);
													//$("#"+elemento_id).remove();
													
													$("#"+elemento_id).find(".file_comentario_documento").val("")
													//los_usuarios_comentario_documento.nota=$("#"+elemento_id).find("textarea").val();
													//VACIO LOS ARCHIVO
													los_usuarios_comentario_documento.archivos=[];
													//LLENO ARRAY DE ARCHIVOS QUE QUEDAN
													$("#"+elemento_id).closest(".comentario_documento").find(".file_comentario_documento").each(function(index, element) {
														if($(this).val()!=""){los_usuarios_comentario_documento.archivos.push($(this).val().substr(12));}
													})
													//INSERTO OBJETO EN ENVIO
													$("#"+elemento_id).closest(".comentario_documento").find(".refrescar_validacion ").val(JSON.stringify(los_usuarios_comentario_documento))
													$("#"+elemento_id).remove();
													
												}else if(data.estatus=="NO OK"){
													controlar_no_ok_desconocido_error("NO OK", data)
												}
											}else{
												controlar_no_ok_desconocido_error("DESCONOCIDO", data)		
											}
										},
										error: function (xhr, ajaxOptions, thrownError) {
												controlar_no_ok_desconocido_error("ERROR", xhr.status)
										}
							
									});
					
					
				})
				
				
			})
			
			
			//////////////////////////////////////////////
			/////////////////////HISTORICO////////////////
			//////////////////////////////////////////////
				
				function comentario_documento(id_comentarios){
					
					$("#"+id_comentarios).find(".comentarios").data("ws");
			
									$.ajax({
										url : direccion_ws+$("#"+id_comentarios).find(".comentarios").data("ws"),
										type : "POST",
										headers:{"authorization": "JWT" + " " +localStorage.token },           
										data: {'id_tarea':identificador},
										dataType: 'json',
										beforeSend: function () {
											
										},
										success: function(data){
											if(data.estatus){
												
												if(data.estatus=="OK" || data.estatus=="FIN"){
													
													for(i in data.adjuntos){
														
														ws_descarga=$("#"+id_comentarios).find(".comentarios").data("ws_descarga"),
														
														$("#"+id_comentarios).find(".comentarios").append('<div class="media">'+
																											'<div class="media-left media-middle" style="background: #CCC;">'+
																												'<i class="fa fa-comment"></i>'+
																											'</div>'+
																												'<div class="media-body" style="border: 1px #CCC SOLID;">'+
																													'<h4 class="media-heading">'+
																														'<strong>'+
																															'<span class="label label-info"><i class="fas fa-user"></i>&nbsp;'+data.adjuntos[i].usuario+'</span>&nbsp;'+
																														'</strong>&nbsp;'+data.adjuntos[i].fecha+'<br><br>'+
																													'</h4>'+
																													'<span>'+data.adjuntos[i].nota+'</span>'+
																														
																													'<div class="btn-group btn-group-xs" role="group" aria-label="...">'+
																						  '<button  type="button" class="btn btn-success archivo">'+data.adjuntos[i].archivo+'</button>'+
								'<button data-ws="'+direccion_ws+ws_descarga+'/'+data.adjuntos[i].archivo+'"   type="button" class="btn btn-success descargar"><i class="fas fa-cloud-download-alt"></i></button>'+
																						'</div>&nbsp;'+
																												'</div>'+
																										 '</div>'+
												
																										'</div>')
														
														
														
														
														
														
													}
												}else if(data.estatus=="NO OK"){
													controlar_no_ok_desconocido_error("NO OK", data)
												}
											}else{
												controlar_no_ok_desconocido_error("DESCONOCIDO", data)		
											}
											
											$('.descargar').on('click', function() {
															var url =$(this).data("ws");
															var nombre_archivo = $(this).closest(".media").find(".archivo").html();
															
															$(this).attr("id", nombre_archivo)
															
															$.get( url, function( data ) {
																		var a = document.createElement('a');
																		
																		var binaryData = [];
																		binaryData.push(data);
																		var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))
																		a.href = url;
																		a.download = nombre_archivo;
																		a.click();
																		window.URL.revokeObjectURL(url);
																		
															});
															
															
											});
											
										},
										error: function (xhr, ajaxOptions, thrownError) {
												controlar_no_ok_desconocido_error("ERROR", xhr.status)
										}
							
									});
			
				}
				
				

				
			
			
			} else if(campo_en_construccion.tipo=="panel_colapsable"){
				
				id_elemento=campo_en_construccion.id.toLowerCase().replace(/\ /g,'_');
				$(lugar).append('<div class="col-xs-'+campo_en_construccion.tamanio[0]+' col-sm-'+campo_en_construccion.tamanio[1]+' col-md-'+campo_en_construccion.tamanio[2]+'"><div class="panel_colapsable" >'+
												'<button data-base="'+campo_en_construccion.campo+'" type="button" class="btn btn-default dropdown-toggle form-control selectpicker" data-toggle="dropdown" aria-haspopup="true"  data-live-search="true" aria-expanded="false">'+
												campo_en_construccion.campo+' <span class="caret"></span>'+
												'</button>'+
												'<div id="panel_colapsable_header_'+id_elemento+'" class="panel_colapsable_header" style="display:none"></div>'+
												'<div id="panel_colapsable_body_'+id_elemento+'" class="panel_colapsable_body" style="display:none"></div>'+
												//
											   	'<input hidden id="'+id_elemento+'" name="'+id_elemento+'" type="text" placeholder="'+campo_en_construccion.nota+'" class=" refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' />'+
											 '</div>&nbsp;</div>');
				items_construccion=""				
				for (c in campo_en_construccion.opciones){
			
					//console.log(campo_en_construccion.opciones)
					if(campo_en_construccion.opciones[c].tag=="grupo"){
						//<span class="label label-default">Default</span>
						if(items_construccion!=""){estilo_viw='style="display:none"'}else{estilo_viw=""}
						
						$("#panel_colapsable_header_"+id_elemento).append('<h5><span id="'+id_elemento+'_'+c+'" class="label label-default">'+campo_en_construccion.opciones[c].grupo+'</span></h5>');
						$("#panel_colapsable_body_"+id_elemento).append('<div class="panel_colapsable_body_items" id="panel_colapsable_body_items_'+id_elemento+"_"+c+'" '+estilo_viw+'></div>')
						items_construccion=c
						
					}else{
						//$("#id_"+items_construccion+"_grupo").append('a ')
						$("#panel_colapsable_body_items_"+id_elemento+"_"+items_construccion).append('<div data-opcion="'+campo_en_construccion.opciones[c].id+'" class="select_item">'+campo_en_construccion.opciones[c].tag+'</div>')
					}
					
				}
				
			} else if(campo_en_construccion.tipo=="panel_check_multi"){
				
				
				//TITULO Y TAMÑO DEL COBTENEDOR 
				$(lugar).append('<div class="panel_lista_multi text-left col-xs-'+campo_en_construccion.tamanio[0]+' col-sm-'+campo_en_construccion.tamanio[1]+' col-md-'+campo_en_construccion.tamanio[2]+'" >'+
											'<div class="well well-sm ">'+
												'<div class="row" id="panel_lista_multi_'+campo_en_construccion.id+'">'+
													
												'</div>'+
											'</div>'+
											'<input hidden  style="width:100%;"     id="'+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')+'" type="text"  class="refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' />'+
											'</div>')
				
				
				//RECORRO COLUMNASdisplay:none;
				for (c in campo_en_construccion.columnas){
					$("#panel_lista_multi_"+campo_en_construccion.id).append('<div class="col-xs-3 col-sm-3 col-md-3" >'+
																							'<div id="culumna_'+campo_en_construccion.id+'_'+b+'_'+c+'" class="list-group">'+
																							//'<div id="culumna_'+campo_en_construccion.id+'_'+b+'" class="list-group">'+
																								'<a  class="list-group-item disabled text-center">'+
																									campo_en_construccion.columnas[c]+
																								'</a>'+
																							'</div>'+
						
																					'</div>');
					
					//construir_lista(eval("COLUMNA_"+c), '#culumna_'+campo_en_construccion.id+'_'+b+'_'+c, c)
				}
				
				
				
									
				/*for (c in campo_en_construccion.opciones){
					//alert(campo_en_construccion.opciones[c].tag)
					$("#select_multi_"+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).append('<option class="select_item_multi"  value="'+campo_en_construccion.opciones[c].id+'">'+campo_en_construccion.opciones[c].tag+'</option>')
					
					
				}
				$('#select_multi_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).multiselect();*/
				
				
				
				
				for (d in campo_en_construccion.opciones){
					controlar=campo_en_construccion.opciones[d].tag.replace(/\ /g,'_')+"_"+d;
					lugar='#culumna_'+campo_en_construccion.id+'_'+b+'_'+0
					$(lugar).append('<a href="#"  class="list-group-item">'+
											'<label class="switch '+controlar+'" data-controlar='+controlar+'>'+
												'<input data-valor="'+campo_en_construccion.opciones[d].tag+'"  type="checkbox"/>'+
												'<span class="slider round"></span>'+
												'&nbsp;&nbsp;'+
											'</label>'+campo_en_construccion.opciones[d].tag+
											
										'</a>')
					
					//COLUMNA_0.push({"tag":campo_en_construccion.opciones[d].tag})
					for (e in campo_en_construccion.opciones[d].opciones){
							
							estilo=campo_en_construccion.opciones[d].tag.replace(/\ /g,'_')+"_"+d;
							controlar=campo_en_construccion.opciones[d].opciones[e].tag.replace(/\ /g,'_')+"_"+d+e;
							lugar='#culumna_'+campo_en_construccion.id+'_'+b+'_'+1
							$(lugar).append('<a href="#"  class="list-group-item '+estilo+'" style="display:none">'+
												'<label class="switch '+controlar+'" data-controlar='+controlar+'  data-controlado='+estilo+'>'+
													'<input data-valor="'+campo_en_construccion.opciones[d].opciones[e].tag+'"  type="checkbox"/>'+
													'<span class="slider round"></span>'+
													'&nbsp;&nbsp;'+
												'</label>'+
												'<div id="select_check_multi_'+controlar+'" data-en="'+controlar+'"  class="multi_lista_check">'+
													'<select  class="select_check_multi"   title=""  multiple="multiple"></select>'+
												'</div>'+
												campo_en_construccion.opciones[d].opciones[e].tag+
												
											'</a>')
											
											if(campo_en_construccion.opciones[d].opciones[e].atributos.length>=1){
												for (x in campo_en_construccion.opciones[d].opciones[e].atributos){
													//alert(campo_en_construccion.opciones[c].tag)
													$("#select_check_multi_"+controlar+" select").append('<option class="select_item_multi"  value="'+campo_en_construccion.opciones[d].opciones[e].atributos[x]+'">'+campo_en_construccion.opciones[d].opciones[e].atributos[x]+'</option>')
													
													
												}
												$('#select_check_multi_'+controlar+" select").multiselect();
												$('.multiselect').attr("disabled", true);
												
											}else{
												$('#select_check_multi_'+controlar).remove();
											}
											
											
						
						//COLUMNA_1.push({"tag":campo_en_construccion.opciones[d].opciones[e].tag, "origen":campo_en_construccion.opciones[d].tag})
						for (f in campo_en_construccion.opciones[d].opciones[e].opciones){
							
							estilo=campo_en_construccion.opciones[d].opciones[e].tag.replace(/\ /g,'_')+"_"+d+e;
							controlar=campo_en_construccion.opciones[d].opciones[e].opciones[f].tag.replace(/\ /g,'_')+"_"+d+e+f;
							lugar='#culumna_'+campo_en_construccion.id+'_'+b+'_'+2
							$(lugar).append('<a href="#"  class="list-group-item '+estilo+'" style="display:none">'+
												'<label class="switch '+controlar+'" data-controlar='+controlar+'  data-controlado='+estilo+'>'+
													'<input data-valor="'+campo_en_construccion.opciones[d].opciones[e].opciones[f].tag+'"  type="checkbox"/>'+
													'<span class="slider round"></span>'+
													'&nbsp;&nbsp;'+
												'</label>'+campo_en_construccion.opciones[d].opciones[e].opciones[f].tag+
											'</a>')
							
							
							//COLUMNA_2.push({"tag":campo_en_construccion.opciones[d].opciones[e].opciones[f].tag, "origen":campo_en_construccion.opciones[d].opciones[e].tag})
							
							for (g in campo_en_construccion.opciones[d].opciones[e].opciones[f].opciones){
								estilo=campo_en_construccion.opciones[d].opciones[e].opciones[f].tag.replace(/\ /g,'_')+"_"+d+e+f;
								controlar=campo_en_construccion.opciones[d].opciones[e].opciones[f].opciones[g].tag.replace(/\ /g,'_')+"_"+d+e+f+g;
								lugar='#culumna_'+campo_en_construccion.id+'_'+b+'_'+3
								$(lugar).append('<a href="#"  class="list-group-item '+estilo+'" style="display:none">'+
													'<label class="switch '+controlar+'" data-controlar='+controlar+'  data-controlado='+estilo+'>'+
														'<input data-valor="'+campo_en_construccion.opciones[d].opciones[e].opciones[f].opciones[g].tag+'"  type="checkbox"/>'+
														'<span class="slider round"></span>'+
														'&nbsp;&nbsp;'+
													'</label>'+campo_en_construccion.opciones[d].opciones[e].opciones[f].opciones[g].tag+
												'</a>')
								
								
								//COLUMNA_3.push({"tag":campo_en_construccion.opciones[d].opciones[e].opciones[f].opciones[g].tag, "origen":campo_en_construccion.opciones[d].opciones[e].opciones[f].tag})
							}
						}
					}
				}
				
				//$('.multi_lista').multiselect();
				
					//DETERMINAR POSICION DEL USURIO	
					$(".panel_lista_multi").find(".list-group-item").click(function(){
						
						nueva_columna=$(this).parent('.list-group').attr("id").slice(0,-1)+(Number($(this).parent('.list-group').attr("id").slice($(this).parent('.list-group').attr("id").length-1))+1);
						tercera_columna=$(this).parent('.list-group').attr("id").slice(0,-1)+(Number($(this).parent('.list-group').attr("id").slice($(this).parent('.list-group').attr("id").length-1))+2);
						cuarta_columna=$(this).parent('.list-group').attr("id").slice(0,-1)+(Number($(this).parent('.list-group').attr("id").slice($(this).parent('.list-group').attr("id").length-1))+3);
						
						$("#"+nueva_columna).find(".list-group-item").hide()
						$("#"+tercera_columna).find(".list-group-item").hide()
						$("#"+cuarta_columna).find(".list-group-item").hide()
						$("#"+nueva_columna+" .list-group-item:first").show()
						$("#"+nueva_columna).find("."+$(this).find(".switch").data('controlar')).show()
						
					})
					
					//DETRMINAR CAMBIO EN UN CHECK PADRE E HIJOS
					$(".panel_lista_multi").find(".switch").change(function(){
						
						//console.log("click")
						siguiente_columna=$(this).parent(".list-group-item").parent('.list-group').attr("id").slice(0,-1)+(Number($(this).parent(".list-group-item").parent('.list-group').attr("id").slice($(this).parent(".list-group-item").parent('.list-group').attr("id").length-1))+1);
						anterior_columna=$(this).parent(".list-group-item").parent('.list-group').attr("id").slice(0,-1)+(Number($(this).parent(".list-group-item").parent('.list-group').attr("id").slice($(this).parent(".list-group-item").parent('.list-group').attr("id").length-1))-1);
						actual_columna=$(this).parent(".list-group-item").parent('.list-group').attr("id");
						
						//ACTUAL HACIA ADELANTE
						actual="deshabilitado"
						
							$("#"+actual_columna).find('.'+$(this).data('controlar')).each(function(index, element) {
								if($(this).find("input").is(":checked")){
									actual="habilitado"
									
								}else{
									
								}
							});
							if(actual=="habilitado"){
							}
							if(actual=="deshabilitado"){
								$("#"+siguiente_columna).find('.'+$(this).data('controlar')).each(function(index, element) {
                                    if($(this).find("input").is(":checked")){
										$(this).find(".switch").click()
									}else{
									}
                                });
							}
						
						//ACTUAL HACIA ATRAS
						atras="deshabilitado"
						if($(this).data('controlado')){
							$("#"+actual_columna).find('.'+$(this).data('controlado')).each(function(index, element) {
								if($(this).find("input").is(":checked")){
									atras="habilitado"
									//return false;
								}
							});
							//console.log(atras)
							if(atras=="habilitado"){
								 if($("#"+anterior_columna).find('.'+$(this).data('controlado')).find("input").is(":checked")){
									return false;
								 }else{
									 $("#"+anterior_columna).find('.'+$(this).data('controlado')).click();
								 }
							}
							if(atras=="deshabilitado"){
								 if($("#"+anterior_columna).find('.'+$(this).data('controlado')).find("input").is(":checked")){
									$("#"+anterior_columna).find('.'+$(this).data('controlado')).click();
								 }else{
								 }
							}
						}
						
						//ELIMINO ATRIBUTOS
						//ELIMINO ATRIBUTOS
						if($(this).find("input").is(":checked")){
							$(this).parent(".list-group-item").find('.multiselect').attr("disabled", false);
							$(this).parent(".list-group-item").find(".multiselect").css({"background": "#449344", "color":"#FFF"})
						}else{
							$(this).parent(".list-group-item").find('.multiselect').attr("disabled", true);
							$(this).parent(".list-group-item").find(".multiselect").css({"background": "#CCC", "color":"#000"})
							
						}
										
					})
					
					
									
					//CONSTRUYO ARRAY DE ENVIO
					$(".panel_lista_multi").find(".switch, .checkbox").change(function(){
							
					
					
					
					$(".switch").each(function(){
						dato_final=[]
						$("#"+$(this).parent(".list-group-item").parent('.list-group').parent('div').parent('.row').attr('id')).find(".list-group").each(function(columna, element) {
							if(columna==0){
								$(this).find(".switch").each(function(switch_columna, element) {
									if($(this).find("input").is(":checked") && $(this).data("controlar")){
											dato_final.push({"tag":$(this).find("input").data("valor").replace(/\_/g,' '),"opciones":[], "atributos":[]})
									}
								})
								//console.log("a")
							}else if(columna ==1){
								$(this).find(".switch").each(function(switch_columna, element) {
									if($(this).find("input").is(":checked") ){	
											check_padre=$(this).data("controlar");
											for (var i = 0; i < dato_final.length; i++) {
												
												//console.log(dato_final[i].tag +"/"+ $(this).data("controlado"))
												if (dato_final[i].tag.replace(/\ /g,'_') === $(this).data("controlado").substring(0, dato_final[i].tag.length)) {
													 
													atributos_en=[]
													 $("#select_check_multi_"+check_padre).find(".checkbox").each(function(index, element) {
                                                        	if($(this).find("input").is(":checked")){
																//console.log(check_padre+"/"+$(this).closest(".multi_lista_check").data("en"))
																if(check_padre==$(this).closest(".multi_lista_check").data("en")){
																	atributos_en.push($(this).find("input").val())
																}
																
																
															}
                                                     });
													 
													 dato_final[i].opciones.push({"tag":$(this).find("input").data("valor").replace(/\_/g,' '),"opciones":[], "atributos":atributos_en});
													 
													 
													 
												}
											}
									
									
									}
								})
								//console.log("b")
							}else if(columna ==2){
								$(this).find(".switch").each(function(switch_columna, element) {
									if($(this).find("input").is(":checked") ){	
											
											for (var i = 0; i < dato_final.length; i++) {
												//
												for(e in dato_final[i].opciones){
													
													if (dato_final[i].opciones[e].tag.replace(/\ /g,'_') === $(this).data("controlado").substring(0, dato_final[i].opciones[e].tag.length)) {
													 	dato_final[i].opciones[e].opciones.push({"tag":$(this).find("input").data("valor").replace(/\_/g,' '),"opciones":[], "atributos":[]});
													}
												}
											}
									}
								})
							}else if(columna ==3){
								$(this).find(".switch").each(function(switch_columna, element) {
									if($(this).find("input").is(":checked") ){	
											
											for (var i = 0; i < dato_final.length; i++) {
												//
												for(e in dato_final[i].opciones){
													
													for(f in dato_final[i].opciones[e].opciones){
													
    if (dato_final[i].opciones[e].opciones[f].tag.replace(/\ /g,'_') === $(this).data("controlado").substring(0, dato_final[i].opciones[e].opciones[f].tag.length)) {
															dato_final[i].opciones[e].opciones[f].opciones.push({"tag":$(this).find("input").data("valor").replace(/\_/g,' '), "atributos":[]});
														}
													}
													
												}
											}
									}
								})
							}
							
							
                        });
						
						
						
						$(this).parent(".list-group-item").parent('.list-group').parent('div').parent('.row').parent('.well').parent('.panel_lista_multi').find(".refrescar_validacion").val(JSON.stringify(dato_final));
						})
						
						
				
				})
				
				if(campo_en_construccion.selecionados){
					
					
					
					for(a in campo_en_construccion.selecionados){
						//console.log(campo_en_construccion.selecionados[a].tag.replace(/\ /g,"_")+"_"+a)
						
						if(campo_en_construccion.selecionados[a].activo==true){
							$("."+campo_en_construccion.selecionados[a].tag.replace(/\ /g,"_")+"_"+a).click();
							
						}
						for(b in campo_en_construccion.selecionados[a].opciones){
							//console.log(campo_en_construccion.selecionados[a].opciones[b].tag.replace(/\ /g,"_")+"_"+a+b)
							if(campo_en_construccion.selecionados[a].opciones[b].activo==true){
								$("."+campo_en_construccion.selecionados[a].opciones[b].tag.replace(/\ /g,"_")+"_"+a+b).click();
								$("."+campo_en_construccion.selecionados[a].opciones[b].tag.replace(/\ /g,"_")+"_"+a+b).parent(".list-group-item").find('.multiselect').attr("disabled", false);
								$("."+campo_en_construccion.selecionados[a].opciones[b].tag.replace(/\ /g,"_")+"_"+a+b).parent(".list-group-item").find(".multiselect").css({"background": "#449344", "color":"#FFF"})
								
								for (i in campo_en_construccion.selecionados[a].opciones[b].atributos){
									$("#select_check_multi_"+campo_en_construccion.selecionados[a].opciones[b].tag.replace(/\ /g,"_")+"_"+a+b).find(".checkbox").each(function(index, element) {
										if($(this).find("input").val()==campo_en_construccion.selecionados[a].opciones[b].atributos[i]){$(this).find("input").click();}
									
									})
									
								}
							}
							for(c in campo_en_construccion.selecionados[a].opciones[b].opciones){
								//console.log(campo_en_construccion.selecionados[a].opciones[b].opciones[c].tag.replace(/\ /g,"_")+"_"+a+b+c)
								if(campo_en_construccion.selecionados[a].opciones[b].opciones[c].activo==true){
									$("."+campo_en_construccion.selecionados[a].opciones[b].opciones[c].tag.replace(/\ /g,"_")+"_"+a+b+c).click();
								}
								for(d in campo_en_construccion.selecionados[a].opciones[b].opciones[c].opciones){
									//console.log(campo_en_construccion.selecionados[a].opciones[b].opciones[c].opciones[d].tag.replace(/\ /g,"_")+"_"+a+b+c+d)
									if(campo_en_construccion.selecionados[a].opciones[b].opciones[c].opciones[d].activo==true){
										$("."+campo_en_construccion.selecionados[a].opciones[b].opciones[c].opciones[d].tag.replace(/\ /g,"_")+"_"+a+b+c+d).click();
									}
								}
							
							}
						
						
						}
					
					}
					
					
				}
				
				
				
			} else if(campo_en_construccion.tipo=="ver_pdf"){
				//alert(direccion_ws)
				$(lugar).append('<div '+tamanio_campo+'>'+
												'<div class="page-header text-left"><small><strong>'+campo_en_construccion.campo+'</small></strong></div>'+
											'</div>'+
											'<div '+tamanio_campo+'>'+
							"<embed src='"+direccion_ws+campo_en_construccion.opciones+"' width='100%' height='"+campo_en_construccion.altura+"px' type='application/pdf'>"+
											'</div>')
				
	
			} else if(campo_en_construccion.tipo=="div"){
				$(lugar).append('<div id="'+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')+'" '+tamanio_campo+'>'+campo_en_construccion.opciones+'</div>')
				
			}else if(campo_en_construccion.tipo=="nota"){
				$(lugar).append('<div id="'+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')+'" '+tamanio_campo+'>'+campo_en_construccion.opciones+'</div>')
				
			}else if(campo_en_construccion.tipo=="tabla"){
				$(lugar).append('<div '+tamanio_campo+'>'+
												'<table id="tabla_'+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')+'" class="table table-striped table-bordered nowrap" cellspacing="0" style="width:100%;">'+
													'<thead>'+
														'<tr class="thead" ></tr>'+
													'</thead>'+
													'<tbody></tbody>'+
												'</table>'+
												'<input hidden id="'+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="text" placeholder="'+campo_en_construccion.nota+'" class="refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' />'+
											
											'</div>')
				// 
					if(campo_en_construccion.ordenamiento){
						generar_tabla("#tabla_"+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_'), campo_en_construccion.opciones, campo_en_construccion.ordenamiento)
					}else{
						generar_tabla("#tabla_"+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_'), campo_en_construccion.opciones)
					}
					
					
					
					$("table").find(".seleccion_box").change(function(){
						check_selecionados=[];
						$("table").find(".seleccion_box").each(function(index, element) {
							if($(this).is(":checked") ){
								check_selecionados.push($(this).data("id"))	
							}
						});
						
						if(check_selecionados.length>=1){
							$("#"+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')).val(JSON.stringify(check_selecionados));
						}else{
							$("#"+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')).val("");
						}
						
					});
					
					$(".masterseleccionbox").click(function(){
						//$("table").append('<div class="conter_loader"><div class="loader"></div></div>');
					})
					
					
					$("table").find(".masterseleccionbox").change(function(){
						//check_selecionados=[];
						if($(this).is(":checked") ){
							check_selecionados=[];
							$("table").find(".seleccion_box").each(function(index, element) {
								if($(this).is(":checked") ){
									
								}else{
									//$(this).click()
									$(this).attr("checked", true)
									check_selecionados.push($(this).data("id"))	
								}
								
								
								if ($(this).attr("checked")==false){
									//$(this).click()
									$(this).attr("checked", true)
									check_selecionados.push($(this).data("id"))	
								}
								
							})
							
						}else{
							$("table").find(".seleccion_box").each(function(index, element) {
								check_selecionados.push($(this).data("id"))	
								if($(this).is(":checked") || $(this).attr("checked")==true){
									//$(this).click()
									//$(this).attr("checked", true)
									$(this).removeAttr("checked")
									check_selecionados=[];
								}else{
								}
							})
						
						
						}
						
						if(check_selecionados.length>=1){
							$("#"+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')).val(JSON.stringify(check_selecionados));
						}else{
							$("#"+campo_en_construccion.id.toLowerCase().replace(/\ /g,'_')).val("");
						}
						
						//$(".conter_loader").remove();
					})
				
			}else if(campo_en_construccion.tipo=="buscar_columnas_excel"){
				
				
				
				//TIPO DE ARCHIVO
				
				if(campo_en_construccion.tipo_file){
					tipo_file='accept=".'+campo_en_construccion.tipo_file+'"';
				}else{
					tipo_file="";
				}
						
						
				$(lugar).append('<div '+tamanio_campo+'><div class="input-group">'+
										
									'<span class="input-group-addon " id="basic-addon1"><i class="far fa-folder-open"></i> '+campo_en_construccion.campo+'</span>'+
									
									'<input  value="'+contenido+'" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'_viuw" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'_viuw" type="text" placeholder="'+campo_en_construccion.nota+'" class="form-control btn-file refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+objetivo_campo+' />'+
									'<input style="display:none" value="'+contenido+'" id="back_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" name="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" type="file" placeholder="'+campo_en_construccion.nota+'" class="form-control file refrescar_validacion '+clase_tipo_campo+'" '+obligatorio+' '+tipo_file+' />'+
								'</div>'+ //
									'<textarea style="display:none"  rows="5" id="'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'"></textarea>'+
									"<input id='obligatorio_"+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+"' style='display:none' value='' type='text'  class='form-control obligatorio' />"+
									'<div id="nota_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" class="alert alert-info" role="alert">Seleccione el archivo a procesar</div>'+
									//'<div class="htm_excel" id="htmlout_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'"></div>'+
									'<div id="insertar_tabla_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'"></div>'+
									//'<table id="htmlout_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'" class=" table table-striped table-bordered nowrap" cellspacing="0" style="width:100%;">'+
									//'</table>'+
									'<div id="out_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')+'"></div>'+
								'</div>')
				
				
				
					$("#back_"+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).change(function(){
							//$("#htmlout_"+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).html("<div class='loader'></div>");
							$('#insertar_tabla_'+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).html('<div class="conter_loader"><div class="loader"></div></div>');
							nevo_header=[]
							tabla="";
							//culumnas_obligatorias=campo_en_construccion.columnas_obligatorias
							
							
							tomar_culumnas_obligatorias=campo_en_construccion.columnas_obligatorias
							culumnas_obligatorias=[]
							console.log(tomar_culumnas_obligatorias)
							for(i in tomar_culumnas_obligatorias){
								console.log(tomar_culumnas_obligatorias[i])
								culumnas_obligatorias.push(tomar_culumnas_obligatorias[i].replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
								
							}
							$("#obligatorio_"+campo_en_construccion.id.toLowerCase().replace(/ /g,'_')).val(JSON.stringify(culumnas_obligatorias))
							//console.log(culumnas_obligatorias)
							//return false
							
							
							window.setTimeout(acciones_excel(campo_en_construccion.id.toLowerCase().replace(/ /g,'_'),event.target.files, campo_en_construccion.cordenadas), 10000);
							
							
					})
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
			}else if(campo_en_construccion.tipo=="boton"){
				
				if(campo_en_construccion.funcion){
							if(campo_en_construccion.funcion){
								onClick_grupo='onClick="'+campo_en_construccion.funcion+'"';
							}else{
								onClick_grupo='';
							}
						}
						
						
				
				//TIPO DE ARCHIVO
				$(lugar).append('<div class="btn-group col-xs-'+campo_en_construccion.tamanio[0]+' col-sm-'+campo_en_construccion.tamanio[1]+' col-md-'+campo_en_construccion.tamanio[2]+'" role="group">'+
                                    	'<button   '+onClick+' type="button" class="btn btn-success form-control" >'+campo_en_construccion.boton+'</button>'+
                                     '</div>')
				
				
				
				
					
				
				
				
				
				
				
				
				
				
			}
			
			
	
	
}



function envios_standar(){

$(".enviar_form_001").on("click", function(){
	
	if ($(this).data("ws")!=""){
		
	div="#"+$(this).data("formulario")
	nota_negativa="";
	
	//validacampo("descripcion");
	
	//console.log(campos_a_validar)
	for (i in campos_a_validar){
		//console.log(campos_a_validar[i])	
		if(campos_a_validar[i]!=""){
			validacampo_auto(campos_a_validar[i]);
		}
	}
	//console.log("es: "+nota_negativa)
	
	if($(this).data("accion_post_envio")){
		accion_post_envio=$(this).data("accion_post_envio")
	}else{
		accion_post_envio="";
	}
	
	//alert(campos_a_validar)
	//return false
	if(nota_negativa=="") {
		
		//EVALUAMOS TIPO DE ENVIO
		if(tipo_envio_datos=="procesar"){

			$.ajax({
					data:$("#"+$(this).data("formulario")).serialize() ,
					url : direccion_ws+$(this).data("ws").replace(/ /g,'_'),
					type : "POST",
					headers:{"authorization": "JWT" + " " +localStorage.token },           
					dataType: 'json',
					beforeSend: function () {
						//console.log(div)
						$(div).append('<div class="conter_loader"><div class="loader"></div></div>');
						$(".enviar_form_001").attr("disabled", true);
					},
					success: function(data){
						
						if(data.estatus){
						
							if(data.estatus=="OK" || data.estatus=="FIN"){
								//KANBAN
								$("#myModal").modal("hide");
								
								//LISTA
								nota_accion=nota_realizado
								$(div).hide();
								$("#lista_formularios").html(nota_accion)
								if(accion_post_envio!=""){
									eval(accion_post_envio)
								}else{
									load_tareas()
								}
								
							}else if(data.estatus=="NO OK"){
								controlar_no_ok_desconocido_error("NO OK", data)
							}
						}else{
							controlar_no_ok_desconocido_error("DESCONOCIDO", data)		
						}
						
						
						
						
					},
					error: function (xhr, ajaxOptions, thrownError) {
						controlar_no_ok_desconocido_error("ERROR", xhr.status)
		
					}
		
				});
		}if(tipo_envio_datos=="no_procesar"){
			
			
		var formData = new FormData();
		
		$(".auto_form").find(".file").each(function(index, element) {
			
				var files = $(this).get(0).files;
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					formData.append('files', file, file.name);
				}
            
        });
		
		
		$(".auto_form").find(".refrescar_validacion").each(function(index, element) {
				
				if($(this).attr("class")!="file"){
					formData.append($(this).attr("name"),$(this).val());
				}
		})
		
		//formData.append('usuario',$("input[name='usuario']").val());
			
			$.ajax({
					data:$("#"+$(this).data("formulario")).serialize() ,
					url : direccion_ws+$(this).data("ws").replace(/ /g,'_'),
					type : "POST",
					headers:{"authorization": "JWT" + " " +localStorage.token },           
					data: formData,
					processData: false,
					contentType: false,
					beforeSend: function () {
						//console.log(div)
						$(div).append('<div class="conter_loader"><div class="loader"></div></div>')
						$(".enviar_form_001").attr("disabled", true);
					},
					success: function(data){
						//{"estatus":"","mensaje_falla":"","data":""}
						if(data.estatus){
							
							if(data.estatus=="OK" || data.estatus=="FIN"){
								//KANBAN
								$("#myModal").modal("hide");
								
								//LISTA
								nota_accion=nota_realizado
								$(div).hide();
								$("#lista_formularios").html(nota_accion)
								if(accion_post_envio!=""){
									eval(accion_post_envio)
								}else{
									load_tareas()
								}
								
							}else if(data.estatus=="NO OK"){
								controlar_no_ok_desconocido_error("NO OK", data)
							}
						}else{
							controlar_no_ok_desconocido_error("DESCONOCIDO", data)		
						}
						
						
						//console.log(data)
						//actualizar_campañas(data)
						//carga_campanias()
						
					},
					error: function (xhr, ajaxOptions, thrownError) {
							controlar_no_ok_desconocido_error("ERROR", xhr.status)
					}
		
				});
			
		}
		
	}else{
			$(".conter_loader").hide();
			
			$(".nota_kanban").removeClass("alert-danger");
			$(".nota_kanban").removeClass("alert-warning");
			$(".nota_kanban").addClass("alert-warning");
			$(".nota_kanban").html("");
			$(".nota_kanban").append("Por favor, defina la información en:<strong>"+ nota_negativa.substring(1)+"</strong>");
			$(".nota_kanban").show();
			
	}
	
	
	}
})


}


//FUNCIONES INTEGRADAS CON KANBAN INTERFAZ, ID/NOMBREDOCUEMNTO, FORMULARIO JSON, DATOS DE FORMILARIO CUAN HAY WS
function mostrar_modal_formulario_de_formulario_json(interfaz, id_insertar, formulario_json, datos_para_formulario){
	if(interfaz=="kanban"){
		$("#myModal").modal('show');
		$(".modal-header").html("<button type='button' class='salir' data-dismiss='modal'>x</button><h4 class='modal-title'></h4>")
		$("#myModal > .modal-dialog").removeClass('modal-xs');
		$("#myModal > .modal-dialog").addClass('modal-lg');
		$("#myModal  .modal-body").html("<div  class='col-xs-12 col-sm-12 col-md-12' style='background: #FFF;'><div id='form_"+id_insertar+"'></div></div>");
		
		//FRMULARIO, LUGAR, DATOS DEL FORMUALRIO
		cosntruir_formularios(eval(formulario_json), "form_"+id_insertar, datos_para_formulario)	
										
		$("#lista_opciones_interz").hide()
		$(".modal-title").html($(".header_formularios").find("h2").html())
		$(".header_formularios").remove()
		
		return true;
	}else if(interfaz=="lista"){
		
		$("#lista_formularios").html("");
		$("#lista_formularios").html("<div id='form_"+id_insertar+"'></div>");
		cosntruir_formularios(eval(formulario_json), "form_"+id_insertar, datos_para_formulario)	
		
	}else if(interfaz=="slider"){
		
		$("#lista_formularios").html("");
		$("#lista_formularios").html("<div id='form_"+id_insertar+"'></div>");
		cosntruir_formularios(eval(formulario_json), "form_"+id_insertar, datos_para_formulario)	
		
	}
	
}

function mostrar_modal_formulario_de_formulario_html(interfaz, id_insertar, parametros_formulario, documento){
	
	
	
	if(interfaz=="kanban"){
		
		$("#myModal").modal('show');
		$(".modal-header").html("<button type='button' class='salir' data-dismiss='modal'>x</button><h4 class='modal-title'></h4>")
		$("#myModal > .modal-dialog").removeClass('modal-xs');
		$("#myModal > .modal-dialog").addClass('modal-lg');
		$(".modal-body").html("<div  class='col-xs-12 col-sm-12 col-md-12' style='background: #FFF;'><div id='form_"+id_insertar+"'></div></div>");
		
		
		$("#form_"+id_insertar).load(nivel_sistema+"formularios/"+documento+".html", function(responseTxt, statusTxt, jqXHR){
			if(statusTxt == "success"){
				
				$(".modal-title").html($(".titulo_html").html())
				
			}
		})
		
		return true;
	}else if(interfaz=="lista"){
		
		
		
	}
	
	
	
}

//ERRORES; NO OK Y DESCONOCIDO
function controlar_no_ok_desconocido_error(cursor,data){
	
	if(cursor=="NO OK"){
		
		$('#mensajes_alerta').modal("show");
		if(data.mensaje_error!=""){
			$('#mensajes_alerta').find("h1").html("!ERROR");
			$('#mensajes_alerta').find("h2").html(data.mensaje_error)
			$(".conter_loader").remove();
			$(".enviar_form_001").attr("disabled", false);
		}
		console.log(data.codigo_error);
		console.log(data.mensaje_error);	
		
	}else if(cursor=="DESCONOCIDO"){
		$('#mensajes_alerta').modal("show");
		$('#mensajes_alerta').find("h2").html('Si el problema persiste, contacta a soporte')
		console.log("desconocido");
		console.log(data);
		
	}else if(cursor=="ERROR"){
		$('#mensajes_alerta').modal("show");
		$('#mensajes_alerta').find("h2").html('Si el problema persiste, contacta a soporte')
		console.log(data);
		
	}	
	
}



//FUNCIONES EXCEL
function acciones_excel(i_imput, arhivo, cordenadas){
	
	//console.log(cordenadas)
	//console.log(i_imput)
	//console.log(arhivo)
	
	var XLSX = require('xlsx');
	var X = XLSX;
	
	
	
	//console.log(X)
	var XW = {
		/* worker message */
		msg: 'xlsx',
		/* worker scripts */
		worker: './SheetJS Live Demo_files/js-xlsx-master/xlsxworker.js'
	};

	var global_wb;
	
	var process_wb = (function() {
		//var OUT = document.getElementById('out');
		//var HTMLOUT = document.getElementById('htmlout');
		
		
		var get_format = (function() {
			var radios = document.getElementsByName( "format" );
			return function() {
				for(var i = 0; i < radios.length; ++i) if(radios[i].checked || radios.length === 1) return radios[i].value;
			};
		})();
	
		var to_json = function to_json(workbook) {
			var result = {};
			workbook.SheetNames.forEach(function(sheetName) {
				var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
				console.log(roa);
				if(roa.length) result[sheetName] = roa;
			});
			return JSON.stringify(result, 2, 2);
		};
	
		var to_html = function to_html(workbook) {
			
			//HTMLOUT.innerHTML = '<div class="alert alert-success" role="alert"> <strong>Atención!</strong> se encontraron las columnas a procesar </div>';
			$('#htmlout_'+i_imput).html('<div class="alert alert-success" role="alert"> <strong>Atención!</strong> se encontraron las columnas a procesar </div>');
			workbook.SheetNames.forEach(function(sheetName) {
				var htmlstr = X.write(workbook, {sheet:sheetName, type:'string', bookType:'html'});
				//HTMLOUT.innerHTML += htmlstr ;
				//$('#htmlout_'+i_imput).append(htmlstr)
			});
			return "";
		};
	
		return function process_wb(wb) {
			console.log(wb)
			global_wb = wb;
			output = to_json(wb);
			//PARSEO DEL OBJETO BASE
			//console.log(output)
			tabla= JSON.parse(output)
			
			for(a in tabla){
				console.log(tabla[a])
				console.log(tabla[a][cordenadas[0].x])
				header_temporal=tabla[a][cordenadas[0].x]
				tabla[a][cordenadas[0].x]=[]


				/*inicio_array_objetos_header=nueva_tabla[cordenadas[0].x]
				for (i in inicio_array_objetos_header){
					array_objetos_header.push(inicio_array_objetos_header[i].replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
				}*/

				for(b in header_temporal){
					console.log(header_temporal[b])

					if(header_temporal[b]==null){
							tabla[a][cordenadas[0].x].push("Defauld_"+i)
					}else{

						tabla[a][cordenadas[0].x].push(header_temporal[b].toString().replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
					}

					
					//tabla[a][0].push(header_temporal[b])
				}
				console.log(tabla[a][cordenadas[0].x])
				
				
			}
			
			console.log(tabla[0])
			//return false
			
			valida_construe_array_obejto_tabla(tabla, i_imput, cordenadas)
			//console.log(array_objetos_header)
			
			
		};
	})();
	
	
	
	var do_file = (function() {
		
		var rABS = typeof FileReader !== "undefined" && (FileReader.prototype||{}).readAsBinaryString;
		var domrabs = true//document.getElementsByName("userabs")[0];
		if(!rABS) domrabs.disabled = !(domrabs.checked = false);
	
		var use_worker = typeof Worker !== 'undefined';
		var domwork = true//document.getElementsByName("useworker")[0];
		if(!use_worker) domwork.disabled = !(domwork.checked = false);
	
		var xw = function xw(data, cb) {
			var worker = new Worker(XW.worker);
			worker.onmessage = function(e) {
				switch(e.data.t) {
					case 'ready': break;
					case 'e': console.error(e.data.d); break;
					case XW.msg: cb(JSON.parse(e.data.d)); break;
				}
			};
			worker.postMessage({d:data,b:rABS?'binary':'array'});
		};
	
		return function do_file(files) {
			
			rABS = domrabs.checked;
			use_worker = domwork.checked;
			var f = files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				//if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
				//console.log("X")
				//console.log(e)
				var data = e.target.result;
				if(!rABS) data = new Uint8Array(data);
				if(use_worker) xw(data, process_wb);
				else process_wb(X.read(data, {type: rABS ? 'binary' : 'array'}));
			};
			if(rABS) reader.readAsBinaryString(f); 
			else reader.readAsArrayBuffer(f);
		};
	})();
	
	do_file(arhivo)
}

function valida_construe_array_obejto_tabla(tabla, i_imput, cordenadas){
			
			//console.log(tabla)
			//console.log(i_imput)
			//console.log(cordenadas)
			
			
			nueva_tabla=[]
			for(a in tabla){
				nueva_tabla=tabla[a];
			}
			
			culumnas_obligatorias=JSON.parse($('#obligatorio_'+i_imput).val());
			
			
			//console.log(culumnas_obligatorias)
			//SI LA NUEVA TABLA EXISTE >1, le indico al usuario que seleciono
			if(nueva_tabla.length>=1){
				//Objeto
				array_objetos_tabla=[]
				//Array
				array_array_tabla=[]
				
				array_objetos_header=[];
				inicio_array_objetos_header=nueva_tabla[cordenadas[0].x]
				for (i in inicio_array_objetos_header){
					
					if(inicio_array_objetos_header[i]==null){
						array_objetos_header.push("Defauld_"+i)	
					}else{
						array_objetos_header.push(inicio_array_objetos_header[i].replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
					}
					
				}
				console.log(array_objetos_header)
				
				//VERIFICO EL PRIMER ELEMENTO CQUE ES EL HEADER
				/*for (i in array_objetos_header){
						
					
						if(array_objetos_header[i]==null){
							array_objetos_header[i]="Defauld_"+i	
						}	
						
				}*/

				
				for (i in culumnas_obligatorias ){
						console.log(array_objetos_header)
						console.log(culumnas_obligatorias[i])
						if(array_objetos_header.indexOf(culumnas_obligatorias[i])<0){
								reasignar_columna(tabla, i_imput, cordenadas)
								return false			
						}
				}
				nota_tabla="";
				for (i in culumnas_obligatorias){
					nota_tabla=nota_tabla+culumnas_obligatorias[i]+", &nbsp;"
				}
				$("#nota_"+i_imput).html("Se encontraron las columnas: <strong>"+nota_tabla+"</strong> para procesarlas")
				nivel_array=0
				for (i in nueva_tabla){
					if(nivel_array>=cordenadas[0].x){
						//Objeto
						var nuevo_objeto_in_array={};
						//Array
						var nuevo_array_array=[]
						
						fallidos=0
						for(b in array_objetos_header){
							//console.log(culumnas_obligatorias)
							//console.log(array_objetos_header[b])
								if(culumnas_obligatorias.indexOf(array_objetos_header[b])>=0){
									//Objeto
									key=array_objetos_header[b].replace(/\ /g,'_').replace(/\,/g,'');
									nuevo_objeto_in_array[key]=nueva_tabla[i][b];
									//array
									nuevo_array_array.push(nueva_tabla[i][b])
								}/*else if(culumnas_obligatorias.indexOf(array_objetos_header[b])<0){
									console.log("REASIGNE")
									reasignar_columna(tabla, i_imput, cordenadas)
									return false
								}
								console.log("ENCONTRE")*/
						}
						
						if(nivel_array>0){
							//Objeto
							array_objetos_tabla.push(nuevo_objeto_in_array)
							//Array
						}
						array_array_tabla.push(nuevo_array_array)
					}
					nivel_array++	
				}
			}
			console.log(tabla)
			console.log(array_array_tabla)
			construir_seleccion_dos(tabla, array_array_tabla, i_imput, cordenadas, "mostrar")
	
}


function construir_seleccion_dos(tabla, array_array_tabla, i_imput, cordenadas, obejtivo){
	
	//console.log(tabla)
	//console.log(array_array_tabla)
	//console.log(i_imput)
	//console.log(cordenadas)
	//console.log(obejtivo)
	
	
	culumnas_obligatorias=JSON.parse($('#obligatorio_'+i_imput).val());
	//generar_tabla('#htmlout_'+i_imput, array_objetos_tabla, "no")
	nuevo_header=""
			for(i in array_array_tabla[0]){
				nuevo_header=nuevo_header+'<th class="">'+array_array_tabla[0][i].replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')+'</th>'
			}	
			$('#insertar_tabla_'+i_imput).html("");
			$('#insertar_tabla_'+i_imput).html('<table id="htmlout_'+i_imput+'" class=" table table-striped table-bordered nowrap" cellspacing="0" style="width:100%;">'+
				'<thead><tr>'+nuevo_header+'</tr></thead><tbody></tbody>'+
			'</table>');
			
			
			var data = array_array_tabla.splice(1,array_array_tabla.length);
			 //console.log(data)
			$.fn.dataTable.ext.errMode = 'none';
			var table = $('#htmlout_'+i_imput).DataTable( {
				data:           data,
				deferRender:    true,
				scrollX: true,
				//scrollY:        1000,
				//scrollCollapse: true,
				//scroller:       true,
				ordering: false,
				order: false,
			} );
	
	
	
	if(obejtivo=="mostrar"){
		
		return false
			
		
	}else if(obejtivo=="editar"){
		
			//console.log("ES")
			columnas_disponibles=[]
			$("#insertar_tabla_"+i_imput).find("thead").find("tr:first").find("th").each(function(index, element) {
				//console.log($(this).html())
				//console.log($(this).html().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
				if(culumnas_obligatorias.indexOf($(this).html().replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))>=0){
					
					$(this).addClass("selec_columna")
					$(this).addClass("selec_columna_seleccionada");	
					columnas_disponibles.push($(this).html().replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
						
				}else if(culumnas_obligatorias.indexOf(array_array_tabla)<0){
					
			 		$(this).addClass("selec_columna_eliminada")			
				}
			 
				 
			})
			
			for(i in culumnas_obligatorias){
				
				if(columnas_disponibles.indexOf(culumnas_obligatorias[i])<0){
					
					renombrar_columa(columnas_disponibles, culumnas_obligatorias[i], tabla, i_imput, cordenadas)
					
				}
			}
		
		//
			
			
	}	
	
	
	//asignar_attr_tabla(array_objetos_tabla[0], array_objetos_tabla[0], array_objetos_tabla[0], i_imput)
	
}


function reasignar_columna(tabla, i_imput, cordenadas){
	//console.log(tabla)
	
	
			nueva_tabla=[]
			for(a in tabla){
				nueva_tabla=tabla[a];
			}
			
			culumnas_obligatorias=JSON.parse($('#obligatorio_'+i_imput).val());
			
			//SI LA NUEVA TABLA EXISTE >1, le indico al usuario que seleciono
			
			if(nueva_tabla.length>=1){
				//Array
				array_array_tabla=[]
				
				array_objetos_header=nueva_tabla[cordenadas[0].x]
				
				
				//VERIFICO EL PRIMER ELEMENTO CQUE ES EL HEADER
				for (i in array_objetos_header){
						if(array_objetos_header[i]==null){
							array_objetos_header[i]="Defauld_"+i	
						}
				}
				
				nivel_array=0
				for (i in nueva_tabla){
					if(nivel_array>=cordenadas[0].x){
						
						//Array
						var nuevo_array_array=[]
						
						for(b in array_objetos_header){
								
									nuevo_array_array.push(nueva_tabla[i][b])
								
						}
						
						
						array_array_tabla.push(nuevo_array_array)
					}
					i++	
				}
				
			}
			
			console.log(JSON.stringify(tabla))
			console.log(JSON.stringify(array_array_tabla))
			
			construir_seleccion_dos(tabla, array_array_tabla, i_imput, cordenadas, "editar")
	
	
	
}



function renombrar_columa(columnas_disponibles, la_culumna_obligatoria, tabla, i_imput, cordenadas){
	
	nuevo_campo=""
	//alert("Falta el campo"+la_culumna_obligatoria)
	$("#nota_"+i_imput).html("<strong>Advertencia</strong>, No se encontro la Columna: <strong>"+la_culumna_obligatoria+"</strong>"+
							 "<br>1. Seleccione la columna del coumento se debe renombrar como :<strong>"+ la_culumna_obligatoria +"</strong>"+
							 "<br>2. Oprima renombrar:<br>"+
							 '<button type="button" disabled class="btn btn-success">Si, Renombrar como <strong>'+la_culumna_obligatoria+'</strong></button>')
	
	$(".selec_columna_eliminada").click(function(){
			$(this).parent("tr").find("th").removeClass("selec_columna_seleccionada_temporal");
			//$("#nota_"+i_imput).html("usted desea renombrar la columna: "+$(this).html() +", como: "+ la_culumna_obligatoria)
			
											
			
			
			
			
			
			$(this).addClass("selec_columna_seleccionada_temporal");
			nuevo_campo=$(this).html();
			$("#nota_"+i_imput).find(".btn-success").attr("disabled", false)
			$("#nota_"+i_imput).find(".btn-success").html('Si, Renombrar la columna <strong>'+nuevo_campo+'</strong>, como: <strong>'+la_culumna_obligatoria+'</strong>')
	
	})
	
	$("#nota_"+i_imput).find(".btn-success").click(function(){
		
		//console.log(cordenadas[0].x)
		for(a in tabla){
				//tabla[a][0];
				//console.log(tabla[a][cordenadas[0].x])
				for(b in tabla[a][cordenadas[0].x]){
					//console.log(tabla[a][cordenadas[0].x][b]+"/"+nuevo_campo)
					if(tabla[a][cordenadas[0].x][b]==nuevo_campo){
						
						tabla[a][cordenadas[0].x][b]=la_culumna_obligatoria
					}
					
				}
				
				//console.log(tabla[a][cordenadas[0].x])
				valida_construe_array_obejto_tabla(tabla, i_imput, cordenadas)
				return false;
		}
		
		
	})
	
	
	
}













































function construir_seleccionXXXXX(tabla, i_imput, cordenadas){
		
		tabla=JSON.parse(tabla)
	
		//ELIMINO DEL HTML LO QUE EST FUERA DE LA SCORDENADAS
		if(cordenadas[0].x>0){
			
			for (i = 0; i < (cordenadas[0].x-1); i++) { 
			//for (i=0 in cordenadas[0].x){
				$('#htmlout_'+i_imput).find("tbody").find("tr:first").remove();
				
				
				
			}
			for (b in tabla) { 
					tabla[b].splice(0, 2)
				 	//tabla[b][cordenadas[0].x-1].substring(0, cordenadas[0].x-1)
			}
		}
	
		
		pass="SI"
		//console.log(Object.keys(tabla)[0])
		//console.log(tabla.length)
		
		
		pestania=[]
		for (i in tabla) { 
		
			for (b in tabla[i][0]){
				
				if(tabla[i][0][b]==null){
					tabla[i][0][b]="Defauld_"+b
					
				}
				//console.log(tabla[i][0][b])
			}
		pestania=tabla[i][0]
		 //pestania=tabla[i][cordenadas[0].x-1]
		}
		//console.log(pestania)
		//return false
		culumnas_obligatorias=JSON.parse($('#htmlout_'+i_imput).parent("div").find(".obligatorio").val());
		//console.log(culumnas_obligatorias)
		for (i in culumnas_obligatorias){
			//if(tabla.Sheet1[0].indexOf(culumnas_obligatorias[i])<0){
				//console.log(culumnas_obligatorias[i])
			if(culumnas_obligatorias[i]!=null){
			
				if(pestania.indexOf(culumnas_obligatorias[i])<0){
					//console.log(tabla)
					$("#htmlout_"+i_imput).attr("data-estado", 0)
					columna_no_encontrada(culumnas_obligatorias[i], pestania, tabla, i_imput)
					pass="NO"
					return false;
					
				}else{
					$("#htmlout_"+i_imput).attr("data-estado", 1)
					pass="SI"
				}
			}
		}
		if(pass=="SI"){
			if(nevo_header.length>=1){
				//tabla.Sheet1[0]=nevo_header
				for (i in tabla) { 
					tabla[i][0]=nevo_header
				}
			}
			asignar_attr_tabla(pestania, tabla, nevo_header, i_imput)
		}
	}





function asignar_attr_tablaXXXXXX(columnas, tabla, nevo_header, i_imput){
	//APLICO ESTILOS AL HEADER DE LA TABLA
	$("#htmlout_"+i_imput).find("tr:first").find("td").each(function(index, element) {
		 if($(this).html()==columnas[index]){
			 $(this).addClass("selec_columna")
			 $(this).addClass("selec_columna_eliminada")
			 $(this).attr("data-estado", 1)
			 $(this).attr("data-valor", columnas[index])
			 $(this).attr("data-nivel", index)	 
		 }else if($(this).html()==""){
			 $(this).html(columnas[index])
			 $(this).addClass("selec_columna")
			 $(this).addClass("selec_columna_eliminada")
			 $(this).attr("data-estado", 1)
			 $(this).attr("data-valor", columnas[index])
			 $(this).attr("data-nivel", index)	 
			 
		 }
    });
	//FUNCIONES DEL HEADER DE LA COLUMNA
	$("#htmlout_"+i_imput).find(".selec_columna").on("click", function(){
		posiciones_selecionadas=[]
		posiciones_eliminados=[]
		if($(this).data("estado")==0){
			/*$(this).data("estado", 1);
			$(this).removeClass("selec_columna_seleccionada");
			$(this).removeClass("selec_columna");
			$(this).addClass("selec_columna_eliminada");*/
		}else if($(this).data("estado")==1){
			$(this).data("estado", 0);
			$(this).removeClass("selec_columna_eliminada");
			$(this).addClass("selec_columna_seleccionada");
			$(this).attr("estado","selecionada");
		}
		$(this).html(nevo_header[$(this).data("nivel")])
		$("#htmlout_"+i_imput).find(".selec_columna").parent("tr").find(".selec_columna").each(function(index, element) {
            if($(this).data("estado")==0){
				posiciones_selecionadas.push($(this).data("nivel"))
			}else if($(this).data("estado")==1){
				posiciones_eliminados.push($(this).data("nivel"))
			}
        });
		if(nevo_header.length>=1){
			//tabla.Sheet1[0]=nevo_header
			for (i in tabla) { 
			 	tabla[i][0]=nevo_header
			}
		}
		tratar_tabla(posiciones_selecionadas, tabla, i_imput)
	})
	posiciones_ocultar=[]
	for (i in culumnas_obligatorias){
		$("#htmlout_"+i_imput).find("tr:first").find("td").each(function(index, element) {
			if($(this).html()==culumnas_obligatorias[i]){
				$(this).click();
				posiciones_ocultar.push(index)
			}	
		});
	}
	$("#htmlout_"+i_imput).find("tr").each(function(index, element) {
		$(this).find("td").each(function(index, element) {
			if(posiciones_ocultar.indexOf(index)<0){
				$(this).hide();
			}
		})		
	});		
}



