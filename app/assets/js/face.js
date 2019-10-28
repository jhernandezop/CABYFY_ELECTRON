
// Configurar los eventos para desconectar el socket al cerrar el browser
// TODO:    
var primeraVez = 1;
var primeraVezCuerpo = 0;
var last_data = '';

var _oc_state = {
	LOGOFF: 0,
	LOGIN_IDLE: 1,
	ONCALL: 2,
	CALLING: 21,
	HANGUP: 22,
	PAUSE_BREAK: 31,
	PAUSE_LUNCH: 32,
	PAUSE_WC: 33,
	PAUSED_DIGIT :34,
	PAUSED_ADMIN :35,
	TRANSFER: 49,
	END: 97
};

window._oc_state = _oc_state;

$(document).load(function() {
	$(window).bind("beforeunload", function() {
		e = e || window.event;
		Face.Close();
	});

	$(window).bind("unload", function() {
		e = e || window.event;			
		Face.Close();
	});
});


/* Configura el Layout inicial de la Aplicacion */
$(document).ready(function() {

	$("#main").fadeOut();
/*
	if (require('electron').remote.getGlobal('face').produccion == true) {		
		checkVersion (respuesta => {
			if (respuesta == 'OK'){
				Face.Initialize();
			}
		});
	} else {
		Face.Initialize();
	}*/
	//Face.Initialize();
});


/*
* Clase _Face que contiene las propiedades y los metodos del Servicio
*/
var _Face = function() {

	const CUSTOM_PATH = require('electron').remote.getGlobal('face').apirestbase;
	const log = require('electron').remote.getGlobal('face').log;
	
	var className = "Face v5.0";
	var sock = null;
	var server = null;
	var port = null;
	var estacion = 1;				// Numero de Estacion
	var estado = null;
	
	// Datos para compartir
	var uniqueid = null;			// Identificador de la llamada
	var fono = null;				// Número de Teléfono
	var agente = null;				// PIN del Agente (o número de Anexo)
	var cedente = null;				// ID del Cedente
	var campania = null;			// ID de la campaña
	var PrimerPlugin = 0;

	/* Metodo publico invocado por la pagina principal. Inicializa la conexion con el servicio */
	this.Initialize = function() {
		
		server = LeerConfig("server");
		port = LeerConfig("port");

		if (require('electron').remote.getGlobal('face').asterix == false) {				
			$("#log").hide();
		} else {
			console.log("AQUI")
			var net = require('net');
			
			sock = net.connect({ host:server, port:port }, function(error) {					
				onConnect('',''); 
			});

			sock.on('error', (error) => {										
				let variable = JSON.stringify(error);	
				//log.error(variable);								
				if (variable.indexOf('ECONNREFUSED') > 0){
					MostrarMensaje(`NO SE LOGRO CONECTAR A <br> LA CENTRAL TELEFONICA <br>${server}:${port}<br> CONTACTE SOPORTE`,"fa-exclamation-triangle");
				} else {
					MostrarMensaje(`HA OCURRIDO UN ERROR <br> CONTACTE SOPORTE`,"fa-exclamation-triangle");
				}
			});

			sock.on('data', function(data) { 
				console.log(data);
				let string = data.toString();		
				if (last_data == data){
					//log.info('SAME DATA:'+ string)
				} else {
					last_data = data;						
					//log.info('DATA:'+string);  		
					if (string.indexOf("Query Error") > 0 || string.indexOf("PAUSE - ") > 0){
						//log.error('DATA:'+data.toString());  
						MostrarMensaje(`HA OCURRIDO UN ERROR <br> CONTACTE SOPORTE`,"fa-exclamation-triangle");
					} else {
						//log.info('DATA:'+data.toString());  
						//console.log(data.toString());
						// var documento_xml = $.xml2json(data.toString().replace("[","").replace("]",""));
     					 //console.log(documento_xml.Accion);
						 //if(documento_xml.Accion=="31"){
							// nombre_del_egente=documento_xml.DBResp.NomAgente
						 //}
						 //alert(nombre_del_egente)
						onData(data.toString());
					}
				}					
			});

			sock.on('end', function() { 					
				//log.info('Desconectado');
				sock.end();
			});
		}
	};	

	this.Close = function() {
		Finalizar();
		Send(_oc_state.END, "");
		sock.close();
	};

	this.Call = function(number) {			
		return Call(number);
	};

	this.Transfer = function() {
		Transfer();
	}
	
	this.Botonera = function(id, botones) {
		$("#" + id).detach();
		$("#botonera").append(botones);
	}

	/* Envia las peticiones al Socket para ser procesada por el servicio */
	var Send = function(accion, str) {
		var trama = "[<TX><Accion>" + accion + "</Accion><Estacion>" + estacion + "</Estacion>" + str + "</TX>]";
		//log.info('SEND:'+trama);
		sock.write(trama);
	};

	/* Cambia el estado de la Estacion segun el verbo (accion) recibido */
	var ProcesaAccion = function(accion, datos) {
		// TODO: Cambiar el diseño de la aplicación de acuerdo a lo que vaya ocurriendo			
		switch (accion) {

			case _oc_state.LOGOFF:
				// Al desconectarse, o abrir el browser, aparece todo apagado
				$("#usuario").html("&nbsp;");
				$("#cliente").html("&nbsp;");
				$("#campania").html("&nbsp;");					
				disable_button("pausa");
				disable_button("wc");
				disable_button("almuerzo");
				disable_button("cortar");
				disable_button("transferir");
				disable_button("digitando");
				disable_button("bodega_administracion");					
				break;

			case _oc_state.LOGIN_IDLE:					
				enable_button("pausa",_oc_state.PAUSE_BREAK);
				enable_button("wc",_oc_state.PAUSE_WC);
				enable_button("almuerzo",_oc_state.PAUSE_LUNCH);
				enable_button("digitando",_oc_state.PAUSED_DIGIT);
				enable_button("bodega_administracion",_oc_state.PAUSED_ADMIN);
				disable_button("cortar");
				disable_button("transferir");

				uniqueid = null;
				fono = null;
				$("#ani").html("");
				break;

			case _oc_state.PAUSE_BREAK:					
				// Se habilitan las opciones del boton Pausa para que la Ejecutiva cambie a IDLE
				//genera_interfaz();
				if (typeof datos.campania != "undefined") {
					campania = datos.idcampania;
				}
				$("#log").hide();
				pause_break(datos);									
				break;

			case _oc_state.PAUSE_LUNCH:
				// Se habilitan las opciones del boton Pausa para que la Ejecutiva cambie a IDLE
				enable_button("almuerzo",_oc_state.LOGIN_IDLE,1);
				disable_button("pausa");
				disable_button("wc");					
				disable_button("cortar");
				disable_button("transferir");
				disable_button("digitando");
				disable_button("bodega_administracion");					
				break;

			case _oc_state.PAUSED_DIGIT:
				// Se habilitan las opciones del boton Pausa para que la Ejecutiva cambie a IDLE
				enable_button("digitando",_oc_state.LOGIN_IDLE,1);
				disable_button("pausa");
				disable_button("wc");					
				disable_button("cortar");
				disable_button("transferir");
				disable_button("almuerzo");
				disable_button("bodega_administracion");					
				break;

			case _oc_state.PAUSED_ADMIN:
				// Se habilitan las opciones del boton Pausa para que la Ejecutiva cambie a IDLE
				enable_button("bodega_administracion",_oc_state.LOGIN_IDLE,1);
				disable_button("pausa");
				disable_button("wc");					
				disable_button("cortar");
				disable_button("transferir");
				disable_button("almuerzo");
				disable_button("digitando");					
				break;

			case _oc_state.PAUSE_WC:
				// Se habilitan las opciones del boton Pausa para que la Ejecutiva cambie a IDLE
				enable_button("wc",_oc_state.LOGIN_IDLE,1);
				disable_button("pausa");
				disable_button("bodega_administracion");					
				disable_button("cortar");
				disable_button("transferir");
				disable_button("almuerzo");
				disable_button("digitando");
				break;

			case _oc_state.ONCALL:
				$(".fx-modal-close").click();
				disable_button("pausa");
				disable_button("bodega_administracion");					
				disable_button("wc");
				disable_button("almuerzo");
				disable_button("digitando");
				enable_button("cortar",_oc_state.HANGUP);

				limpiar_campos();

				$(`#transferir`).removeClass("seleccionado");	
				$(`#transferir`).css("cursor", "pointer");
				$(`#transferir`).unbind("click");
				$(`#transferir`).one("click", function(event) {Transfer()});								
				$(`#transferir`).removeClass("disabled");
				if (typeof datos.uniqueid != "undefined") {
					uniqueid = datos.uniqueid;											
					$("#uniqueid").attr("value", datos.uniqueid.trim());
					//document.getElementById('buscar_empresa').click();
					fono = datos.ani;
					fono = $.trim(fono);	
					$("#ingresa_telefono1").attr("value", fono);						
					console.log("efrain ancan: uniqueid: " + $("#uniqueid").val());	
					actualizar_uid(datos.uniqueid.trim());	
					
					
					//$("#uniqueid").val(datos.uniqueid);
					//$("#id_tarea_llamando").val(id_tarea_llamando);
					//enviar_gestion_llamada()
					
													
				}					
				if (typeof datos.ani != "undefined") {
					fono = datos.ani;
					$("#ani").html("Ani: <strong>" + datos.ani + "</strong>");
				}
				break;

		}
		$("#clientes-popup").removeAttr("disabled");			
		Plugins(accion);
		//pasar_datos_numero()	
	};

	function actualizar_uid (uid){
		
		var uniqueid_res = uid;	
		var res = uniqueid_res.split(".");
		var res2 = uniqueid_res.split(".");
		res=parseInt(res[1])+1;
		res=res2[0]+'.'+res; 

		var id = $("#id_tarea_llamando").val();
		var idc = $("#idcampania").val();
		var agente = $("#agenteID").val();
		//console.log(global.face.apirestbase)
		$.ajax({
			type: "POST",
			url: CUSTOM_PATH+'tarea_atendida_res',
			data: { id_tarea:id, 
					uniqueid: uniqueid_res, 
					uniqueid_salida: res,
					id_campania: idc,
					agente: agente 
				  },
			success: (data) => {										
				console.log("OK");
			},
			error: () => {
				console.log(error);
			}
		});
	
}
	
	function disable_button (boton){
		$(`#${boton}`).css("background","white");
		$(`#${boton}`).css("cursor", "default");
		$(`#${boton}`).unbind("click");
		$(`#${boton}`).addClass('disabled');
	}

	function enable_button(boton,estado,unico){
		if (unico){					
			$(`#${boton}`).css("background","#F00");
		}else {
			$(`#${boton}`).css("background","white");				
		}			
		$(`#${boton}`).css("cursor", "pointer");
		$(`#${boton}`).unbind("click");
		$(`#${boton}`).one("click", function(event) {Send( estado, "" );});								
		$(`#${boton}`).removeClass("disabled");
	}

	// Controla el despliegue de los plugins
	var Plugins = function(accion) {
		var url = CUSTOM_PATH + "get_config";
		showPlugins(url, accion);
				
	};
	
	var showPlugins = function(url, accion) {			
		if (PrimerPlugin == 0){
			PrimerPlugin = 1;
			console.log('PRIMER FORMULARIO')
			$("#lista_formularios").html('');
		}
		let idcampania = $("#idcampania").val();
		// Leer plugins genericos (para cualquier cedente y cualquier campaña)
		$.post(url, {campania:campania}, null, "xml").success(function(xml) {
			$(xml).find("plugin").each(function() {
				var plugin = $(this).attr("id");					
				var ruta = $(this).attr("ruta");
				var plugin_ruta = CUSTOM_PATH + ruta;				
				$.post(plugin_ruta, {}, null, "xml").fail(function(xml) {  						
					xml = xml.responseText;
					$(xml).find("plugin").each(function() {
						var id = $(this).find("id").text();
						
						var ac = $(this).find("accion").text(); // Accion en la que se activara el plugin							
						let cargar_plugin = false;
						if ((ac != "") && $("#" + id).length > 0) {
							$("#" + id).detach(); //Para inicializar si tiene el pluggin 
							cargar_plugin = true;
						} else {
							if ($("#" + id).length == 0) {
								cargar_plugin = true;                                    
							}
						}

						console.log(ac+'|ID PLUGIN|'+id+'|'+cargar_plugin);

						if (cargar_plugin){

							let objeto = {
								accion: accion, 
								uniqueid: uniqueid, 
								agente: agente, 
								fono: fono, 
								cedente: cedente, 
								campania: campania,
								idcampania: idcampania
							};
							
							$.post(CUSTOM_PATH + ruta + "_plugin", objeto, null)
							.success(function(data) {
								if (data == ""){
									if (id == 'caller_plugin'){
										$("#boton_telefono").prop( "disabled", true );
										ocultar_telefono();								
									}
								} else {
									if (id == 'caller_plugin'){
										$("#boton_telefono").prop( "disabled", false );
										mostrar_telefono();
										
									}
								}	
								//Para Colocar las URL Que tiene el Electron y no Tener que estar Cambiando ambas cada vez que se actualiza algo
								data = data.replace('{URL_API}',require('electron').remote.getGlobal('face').apirestbase);
								data = data.replace('{URL_API_BUSCA_EMPRESA}',require('electron').remote.getGlobal('face').url_ws);										
								$("#lista_formularios").append(data);
								//$("#lista_formularios").html(data);
								$("#simplemodal-overlay").fadeOut();
								$("#simplemodal-container").fadeOut();
								
								
							});
						}
					});
				}
			)
			});
		});
		
		
	};


	/* Genera un llamado */
	var Call = function(number) {
		//debugger;
		
		if (estado == _oc_state.LOGIN_IDLE) {
			Send(_oc_state.CALLING, "<Fono>" + number + "</Fono>");				
			return true;
		} else {				
			new PNotify({
				title: 'Error',
				text: "Debe estar Disponible para poder llamar",
				type: 'error'                    
			});				
			return false;
		}
	}


	/* Transferir un Llamado */
	var Transfer = function() {
		//MUESTRO MODAL
		$("#myModal").modal("show");
		//MUESTRO HEADER Y FOOTER
		$("#myModal .modal-footer, #myModal .modal-header").show();
		//LLENO HEADER, BODY Y FOTTER
		$("#myModal").find(".modal-header").html("<h3 id='texto_trasnfer' class=text-center>Transferir Llamado</h3>");
		$("#myModal").find(".modal-body").html(`<label for="basic-url">Indica la extensión a transferir</label>
															<div class="input-group">
															<span class="input-group-addon" id="basic-addon3">Extención:</span>
															<input type="number" class="form-control" id="extension" aria-describedby="basic-addon3">
															</div>`);
		$("#myModal").find(".modal-footer").html(`<div class="btn-group btn-group-justified" role="group" aria-label="...">
							<div class="btn-group" role="group">
								<button type="button" class="btn btn-success" id="boton_transfer"  >Aceptar</button>
							</div>
							</div>`);
		//BLOQUE LA SOPCIONES DEL USUARIO
		$('#myModal').data('bs.modal').options.backdrop = 'static';
		$('#myModal').data('bs.modal').options.keyboard = false;
		//DEFINO TAMAÑO
		$('#myModal').find(".modal-dialog").removeClass("modal-sm, modal-lg");
		$('#myModal').find(".modal-dialog").addClass("modal-sm");

		$( "#boton_transfer" ).on('click' ,function() {
			Transferir()
		});
	}

	
	var Transferir = function ()   {
		var extension = $("#extension").val();
		if (extension != ''){
			Send(_oc_state.TRANSFER, "<Extension>" + extension + "</Extension>");
			$("#extension").val('');
			$("#myModal").modal("hide");
			$("#texto_trasnfer").html('');
		} else if ($("#texto_trasnfer").length > 0){
			new PNotify({
				title: 'Error',
				text: "Debe ingresar una Extension",
				type: 'error',
				//styling: 'bootstrap3'
			});
		}	
	}

	/* Lee los parametros de configuracion */
	var LeerConfig = function(parametro) {
		/* console.log(require('electron').remote.getGlobal('face').apirestbase+"server_port_config"); */
		$.ajax({
			type: "POST",
			async: false,
			url:  require('electron').remote.getGlobal('face').apirestbase+"server_port_config", 
			data: {parametro: parametro}, 
			complete: function(data) {
				ret = data.responseText;
			},
			error :( error) => {
				log.error(error);					
			}				
		});
		return ret;
	}; 


	var MostrarMensaje = function(mensaje,icono) {     
		if (typeof(icono) == 'undefined'){
			icono = 'fa-info-circle';
		}

		if(mensaje=="Debes conectarte al SoftPhone"){
			$("#lista_formularios").html('');
			$("#log").show();
			localStorage.clear();
			ocultar_telefono()
			estado_peticion="PIDIENDO";
			$("#msj").html(mensaje);
		}else{
			//MUESTRO MODAL
			$("#myModal").modal("show");
			//OCULTO HEADER Y FOOTER
			$("#myModal .modal-footer, #myModal .modal-header").hide();
			//LLENO HEADER, BODY Y FOTTER 
			$("#myModal").find(".modal-header").html('');
			let html = `<center>
						<i style="font-size:60px; margin: 10px;" class="fas ${icono}"></i>
						<h3>
							<span class="label label-danger">${mensaje}</span>
						</h3>
					</center>`
			$("#myModal").find(".modal-body").html(html);
			$("#myModal").find(".modal-footer").html('');
			//BLOQUE LA SOPCIONES DEL USUARIO
			$('#myModal').data('bs.modal').options.backdrop = 'static';
			$('#myModal').data('bs.modal').options.keyboard = false;
			//DEFINO TAMAÑO
			$('#myModal').find(".modal-dialog").removeClass("modal-sm, modal-lg");
			$('#myModal').find(".modal-dialog").addClass("modal-sm");
		}

		
	};


	var Finalizar = function() {
		$.ajax({
			type: "POST",
			async: false,
			url:  require('electron').remote.getGlobal('face').apirestbase+"acciones",
			data: {accion: "cerrar"},
			complete: function(data) {
				console.log(data.responseText);
				/* alert(data.responseText); */
			}	
		});			
	};

	
	var onConnect = function(success, data) {						
		Send(_oc_state.LOGOFF, "");
	};


	var onClose = function() { 
		// TODO: Eliminar el registro de la tabla face.db			
		Send(_oc_state.LOGOFF, ""); 
	};


	var onData = function(data) { 
		$.ajax({
			type: "POST",
			url: require('electron').remote.getGlobal('face').apirestbase + "procesa",
			dataType: "json",
			data: {xml: data},				
			complete: function(data) {
				console.log(data);
				var obj = jQuery.parseJSON(data.responseText);
				//log.info('PROCESA:'+JSON.stringify(obj));
				if (obj.flag == 1) {								
					if (typeof(obj.datos.ani) != 'undefined'){
						console.log("LLAMADA");								
						var electron = require('electron');
						var currentWindow = electron.remote.getCurrentWindow();
						currentWindow.show();
					}
					estado = obj.accion;
					window._estado = estado;
					var datos = obj.datos;
					ProcesaAccion(obj.accion, datos);
					if (primeraVez == 0){							
						//rtc_historia_llamadas();								
					} else {
						primeraVez = 0;
					}						
				}
				if (obj.msg != ""){
					$("#datos").html('');
					MostrarMensaje(obj.msg);
				}
			},
			error: function (xhr, ajaxOptions, thrownError){
				console.log(xhr)
				console.log(ajaxOptions)
				console.log(thrownError)
				//log.error(xhr);
			}
		});			
	};


	function pause_break(datos){
		var idcampania = $("#idcampania").val();
		console.log('PAUSE_BREAK');

		enable_button("pausa",_oc_state.LOGIN_IDLE,1);
		disable_button("wc");
		disable_button("almuerzo");
		disable_button("cortar");
		disable_button("transferir");
		disable_button("digitando");
		disable_button("bodega_administracion");
		console.log(datos);
		if (typeof datos.usuario != "undefined") {					
			console.log($("#usuario").length + ' EXISTE');
			$("#usuario").html("<span>Usuario: <strong>" + datos.usuario + "</strong></span>");
			agente = datos.agente;
			$("#agenteID").attr("value", agente);
		}					
		if (typeof datos.cedente != "undefined") {
			$("#cedente").html("<span>Cedente: <strong>" + datos.cedente + "</strong></span>");
			cedente = datos.idcedente;
		} 
		if (typeof datos.campania != "undefined") {
			$("#campania").html("<span>Campa&ntildea: <strong>" + datos.campania + "</strong></span>");
			$("#idcampania").val(datos.idcampania);
		}                    
		$("#myModal").modal("hide");
		if(idcampania == '3'){
			console.log("campania en face"+idcampania);
			//load_tareas_col();
			//window.reload_kanban();
			//load_tareas();
			login_face(datos.usuario)
		}
		else{
			//load_tareas();
			login_face(datos.usuario)
		}
		getNombreCampania(datos.idcampania, function(nombre) {
			
			console.log("idcampania/onChange/" + datos.idcampania);
			load_camban(datos.idcampania, nombre);

		});
	}


	function limpiar_campos (){
		$("#rut_empresa").val('');
		$("#rut_validacion").html('');
		$("#nombre_empresa").val('');
		$("#vin_patente").val('');
		$("#datos_vehiculo").html('');
	}

};


/*
* Variable Global, Instancia de la Clase _Face. Para ser usada desde el exterior
*/

var Face = new _Face(); 
window._face = Face;



///FUNCIONES DE INTERFAZ

function getNombreCampania(_campania, callback){
		
		/*if(_campania && !isNaN(_campania) && parseInt(_campania) > 0){				
			//console.log(JSON.stringify({'campania':_campania}));			
			$.ajax({
				url: apirestBase + 'campania',
				data: { 'campania':_campania},
				type: "POST",           
				dataType: 'json',

				success: function (data) {

					if (typeof callback == "function") {
						callback(data.nombre);
					}

				}			
			});
			
		}*/
	}
	
function limpiar () {
	$("#numero").val('');
}


function ocultar_telefono(){
	
	$(".telefono_pausado").attr("disabled", true);
	$(".call_telefono").removeClass("call_telefono_expandido");
}


function pausar_telefono(){
	
	$(".call_telefono").removeClass("call_telefono_expandido");
	$(".call_telefono").addClass("call_telefono_no_expandido");
	$(".telefono_pausado").attr("disabled", true);
}




function mostrar_telefono(){
	$("#numero").focus()
	//hasClass
	if ($(".call_telefono").hasClass('call_telefono_expandido')){
		$(".call_telefono").removeClass("call_telefono_expandido");
		$(".call_telefono").addClass("call_telefono_no_expandido");
	}else {
		$(".telefono_pausado").attr("disabled", false);
		$(".call_telefono").removeClass("call_telefono_no_expandido");
		$(".call_telefono").addClass("call_telefono_expandido");
	}
}





function marcado_telefonico(){
			
	/*document.addEventListener("keydown", function(event) {
		keycode=event.keyCode
		numero_actual=$("#numero").val()
		if (keycode == '96') {
			$("#numero").val(numero_actual+0)
		} else if (keycode == '97') {
			$("#numero").val(numero_actual+1)
		} else if (keycode == '98') {
			$("#numero").val(numero_actual+2)
		} else if (keycode == '99') {
			$("#numero").val(numero_actual+3)
		} else if (keycode == '100') {
			$("#numero").val(numero_actual+4)
		} else if (keycode == '101') {
			$("#numero").val(numero_actual+5)
		} else if (keycode == '102') {
			$("#numero").val(numero_actual+6)
		} else if (keycode == '103') {
			$("#numero").val(numero_actual+7)
		} else if (keycode == '104') {
			$("#numero").val(numero_actual+8)
		} else if (keycode == '105') {
			$("#numero").val(numero_actual+9)
		} else if (keycode == '106') {
			$("#numero").val(numero_actual+"*")
		} else if (keycode == '51' && event.key=="#") {
			$("#numero").val(numero_actual+"#")
		} else if (keycode == '8') {
			numero_actual=numero_actual.slice(0,-1);
			$("#numero").val(numero_actual)
		}
	
	});*/
}

marcado_telefonico();

