// JavaScript Document
//lugar, data, destino
function insertar_formulaario_formio(id_lugar, data, tx, proceso){
		$("#"+id_lugar).html("<div id='"+tx+"_"+proceso+"' class='col-xs-12 col-sm-12 col-md-12' style='padding-top:30px'></div>")
		Formio.icons = 'fontawesome';
		Formio.createForm(document.getElementById(tx+'_'+proceso), {
		   components: data
		}).then(function(form) {
		  form.on('submit', function(submission) {
			console.log(submission);
			envio_formulario_fomrio(submission, tx, proceso)
		  });
		});
}





function envio_formulario_fomrio(submission, tx, proceso){
	
	$.ajax({
			
			url: constantes.direccion_base,
			type: "POST",
			data:JSON.stringify({
								   "tx" : tx,
								   "usuario" : "op",
								   "operacion":proceso,
								   "data":submission.data,
								   "destino":constantes.destino
								}
					   
			),
			contentType: "text/plain",
			beforeSend: function () {
									
					$("#xxx").append('<div class="conter_loader"><div class="loader"></div></div>');
					
									
			},
			success: function(data) {
				data=JSON.parse(data)
				console.log(data)
				if(data.estatus){
					if(data.estatus=="OK" || data.estatus=="FIN"){
						
					
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


