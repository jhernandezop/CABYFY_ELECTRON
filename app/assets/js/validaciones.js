

/*VALIDACION BASE DE IMPUT TEXT*/
validacampo = function(campo){

	if($("#"+campo).val()==""){ nota_negativa=nota_negativa+", "+campo; $("#"+campo).addClass("fucus_negativo"); $("#"+campo).focus()}
	else {$("#"+campo).removeClass("fucus_negativo");}
	
}

validacampo_fecha = function(campo, condicion){
	
	 if (condicion=="o"){
	//alert(condicion+"/"+campo)
		if($("#"+campo).val()==""){ nota_negativa=nota_negativa+", "+campo; $("#"+campo).addClass("fucus_negativo"); }
		else {
			
			if(!$("#"+campo).val().match(/^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/)){
					
				$("#"+campo).addClass("fucus_negativo");
				 nota_negativa=nota_negativa+", "+campo;	
			}else if($("#"+campo).val().match(/^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/)){
					
					
				$("#"+campo).removeClass("fucus_negativo");
			}
			
		}
	}else if (condicion=="n" ){
		
		
			if(!$("#"+campo).val().match(/^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/) && $("#"+campo).val()!=""){
				//alert("no "+condicion+"/"+campo)
				nota_negativa=nota_negativa+", "+campo;
				$("#"+campo).addClass("fucus_negativo");
					
			}else if($("#"+campo).val().match(/^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/) || $("#"+campo).val()=="" ){
					//alert("si "+condicion+"/"+campo)
					
				$("#"+campo).removeClass("fucus_negativo");
			}
	}
	
}

function validacampo_fecha_formato(campo){
	
	if(!$("#"+campo).val().match(/^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/) && $("#"+campo).val()!=""){
				//alert("no "+condicion+"/"+campo)
				//nota_negativa=nota_negativa+", "+campo;
				$("#"+campo).addClass("fucus_negativo");
					
			}else if($("#"+campo).val().match(/^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/) || $("#"+campo).val()=="" ){
					//alert("si "+condicion+"/"+campo)
					
				$("#"+campo).removeClass("fucus_negativo");
			}
}

validacampo_select = function(campo){

	if($("#"+campo).val()==""){ nota_negativa=nota_negativa+", "+campo; $("#"+campo).addClass("fucus_negativo"); $("#"+campo).focus()}
	else {$("#"+campo).removeClass("fucus_negativo");}
	
}

validacampo_correo = function(campo, condicion){

	
	
	if (condicion=="o"){
		
		if($("#"+campo).val()==""){ 
			nota_negativa=nota_negativa+", "+campo; $("#"+campo).addClass("fucus_negativo"); $("#"+campo).focus()}
		else {
			//$("#"+campo).removeClass("fucus_negativo");
			if(!$("#"+campo).val().match(/\S+@\S+\.\S+/)){
				
				$("#"+campo).addClass("fucus_negativo");
				
			}else if($("#"+campo).val().match(/\S+@\S+\.\S+/)){
				
				
				$("#"+campo).removeClass("fucus_negativo");
			}
			
		}
		
	}else if (condicion=="n"){
		
		if($("#"+campo).val()!=""){ 
			
			
			//$("#"+campo).removeClass("fucus_negativo");
			if(!$("#"+campo).val().match(/\S+@\S+\.\S+/)){
				
				$("#"+campo).addClass("fucus_negativo");
				nota_negativa=nota_negativa+", "+campo;
				$("#"+campo).focus()
				
			}else if($("#"+campo).val().match(/\S+@\S+\.\S+/)){
				
				
				$("#"+campo).removeClass("fucus_negativo");
			}
			
		}
		
		
	}
	
	
} 

validamcampo_radio = function(campo){
	

	if(String($("input[name='"+campo+"']:checked").val()) == "" || String($("input[name='"+campo+"']:checked").val()) == "undefined"){ 
	   		//alert("b")
			nota_negativa=nota_negativa+", "+campo; 
			
			$("input[name='"+campo+"']").addClass("fucus_negativo"); 
			/*$("#"+campo).addClass("fucus_negativo");*/ 
			$("input[name='"+campo+"']").focus()
	
	}else {$("input[name='"+campo+"']").removeClass("fucus_negativo");}
	
}




/*SOLO PERMITE NUMEO*/
validaciones_standard = function(campo){

	$(".numero").keyup(function(){
		
		
		$(this).val($(this).val().replace(/\D/g, ''))
	
	})
	
	
	
	$(".numero-negativo").keyup(function(){
		
		//alert( $(this).val()[0] )
		contenido=$(this).val().replace(/\D/g, '')
		if ($(this).val()[0]=="-"){simbilo="-"; }
		else {simbilo="";}
		
		$(this).val(simbilo+contenido)
		//$(this).val(simbilo+$(this).val().replace(/[a-zA-Z]/, ''))
		
		
		
		//if($(this).val()[1])
	
	})
	
	$(".porcentaje").keyup(function(){
		
		
		$(this).val($(this).val().replace(/\D/g, ''))
		
		$(this).attr("maxlength","3")
		
		if ($(this).val()>100){
			$(this).val("100")
		}
	
	})
	
	$(".refrescar_validacion").keyup(function(){

		validacampo($(this).attr("name"))
		

	})
	
	$(".refrescar_validacion_select").change(function(){
		
		validacampo_select($(this).attr("name"))


	})
	
	
	
	$(".calendario_002").keyup(function(){
		validacampo_fecha_formato($(this).attr("name"))
	})
	
	$(".calendario_002").change(function(){
		validacampo_fecha_formato($(this).attr("name"))
	})
	
	
	$(".correo").keyup(function(){

		validacampo_correo($(this).attr("name"), "n")

	})
	
	$(".rut").keyup(function(){
		Rut($(this).attr("name"))
	
	})
	
	$(".rut_form").keyup(function(){
		//Rut($(this).attr("name"))
		validacampo_Rut($(this).attr("name"))
	
	})
	
	
	
	
	
	
	$("input").on("click", function(){
		
		if($(this).attr("type")=="radio"){

				validamcampo_radio($(this).attr("name"))
		}
			
	})
	
	$( ".calendario_002").datepicker({
		format: "dd/mm/yyyy",
		changeMonth:true,
		changeYear:true,
	})/*.datepicker("option", "minDate", new Date())*/;
	
	

	
}	
	
	
	///*VALIDACIONES DE FORMULARIOS AUTOMATICOS*///
	
	
	function validacampo_auto(campo_validar){
		
		
		campo=campo_validar[0]
		tipo=campo_validar[1]
		condicion=campo_validar[2]
		nombre_campo=campo_validar[3]
		console.log(campo, tipo, condicion, nombre_campo)
		
		
		if(tipo=="texto"){
			 
			 if(condicion=="si" && $("#"+campo).val()==""){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				$("#"+campo).addClass("fucus_negativo"); 
			}else {$("#"+campo).removeClass("fucus_negativo");}
			 
		 }
		 
		 if(tipo=="lista_multi_comentarios"){
			 
			 if(condicion=="si" && $("#"+campo).val()==""){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				$("#"+campo).closest(".lista_multi_comentarios").find("textarea").addClass("fucus_negativo"); 
			}else {$("#"+campo).closest(".lista_multi_comentarios").find("textarea").removeClass("fucus_negativo");}
			 
		 }
		 
		 if(tipo=="file"){
			 
			 if(condicion=="si" && $("#"+campo).val()==""){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				$("#"+campo).parent().find($('input[type=text]')).addClass("fucus_negativo");
				
			}else {$("#"+campo).parent().find($('input[type=text]')).removeClass("fucus_negativo");}
			 	
		 }
		 
		 if(tipo=="porcentaje"){
			 
			 if(condicion=="si" && $("#"+campo).val()==""){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				$("#"+campo).addClass("fucus_negativo"); 
			}else {$("#"+campo).removeClass("fucus_negativo");}
			 
		 }
		 
		
		 
		 if(tipo=="numero"){
			 
			  if(condicion=="si" && $("#"+campo).val()==""){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				$("#"+campo).addClass("fucus_negativo"); 
			}else {$("#"+campo).removeClass("fucus_negativo");}
			 
		 }
		 
		 if(tipo=="fecha"){
			 
			 if(condicion=="si" && $("#"+campo).val()==""){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				$("#"+campo).addClass("fucus_negativo"); 
			 }else {
				
				if(!$("#"+campo).val().match(/^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/)){
					$("#"+campo).addClass("fucus_negativo");
				}else if($("#"+campo).val().match(/^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/)){
					$("#"+campo).removeClass("fucus_negativo");
				}
			}
			 
		 }
		 
		 if(tipo=="lista"){
			 
			 if(condicion=="si" && $("#"+campo).val()==""){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				$("#"+campo).parent(".lista").find(".btn").addClass("fucus_negativo"); 
			}else {$("#"+campo).removeClass("fucus_negativo");
				$("#"+campo).parent(".lista").find(".btn").removeClass("fucus_negativo"); 
			}
		 }
		 
		 
		  if(tipo=="lista_serach"){
			 
			 if(condicion=="si" && $("#"+campo).val()==""){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				$("#"+campo).parent(".lista_serach").find(".btn").addClass("fucus_negativo"); 
			}else if(condicion=="si" && $("#"+campo).val()!=""){
				$("#"+campo).removeClass("fucus_negativo");
				$("#"+campo).parent(".lista_serach").find(".btn").removeClass("fucus_negativo"); 
			}else {$("#"+campo).removeClass("fucus_negativo");
				$("#"+campo).parent(".lista_serach").find(".btn").removeClass("fucus_negativo"); 
			}
		 }
		 
		 
		 if(tipo=="area_texto"){
			 
			 if(condicion=="si" && $("#"+campo).val()==""){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				$("#"+campo).addClass("fucus_negativo"); 
			}else {$("#"+campo).removeClass("fucus_negativo");
				$("#"+campo).removeClass("fucus_negativo"); 
			}
		 }
		 
		 if(tipo=="lista_multi"){
			 
			 
			 
			 if(condicion=="si" && $("#"+campo).val()==""){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				$("#"+campo).addClass("fucus_negativo"); 
				$("#"+campo).parent("div").find("button").addClass("fucus_negativo")
				
			}else {$("#"+campo).removeClass("fucus_negativo");
			
			}
			 
		 }
		 
		 if(tipo=="tabla"){
			 
			 
			 
			 if(condicion=="si" && $("#"+campo).val()==""){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				
				
				$("#"+campo).parent("div").find("table").addClass("fucus_negativo")
				
			}else {$("#"+campo).parent("div").find("table").removeClass("fucus_negativo");
			
			}
			 
		 }
		 
		 
		 if(tipo=="check"){
			 
			 //$(".switch_obligatorio").keyup(function(){})
			 
			 if(condicion=="si" && $("#"+campo).val()=="false"){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				
				$("#"+campo).closest(".check").find(".round").addClass("fucus_negativo")
				
			}else {$("#"+campo).closest(".check").find(".round").removeClass("fucus_negativo");
			
			}
			 
		 }
		 
		 if(tipo=="rut"){
			 //alert(campo)
			 //$(".switch_obligatorio").keyup(function(){})
			 
			if(condicion=="si" && $("#"+campo).val()==""  ){ 
			 	nota_negativa=nota_negativa+", "+nombre_campo; 
				$("#"+campo).addClass("fucus_negativo"); 
			}else if(validacampo_Rut(campo)==true) {$("#"+campo).removeClass("fucus_negativo");
			}else if(validacampo_Rut(campo)==false) { $("#"+campo).addClass("fucus_negativo");   nota_negativa=nota_negativa+", "+respuesta_negativa}
			 
		 }
		 
		 
		 
		 
		 
		 
		 
		 
		
	 
	 
	
	
	}
	
	
	
	
	
	
	
	
	
function revisarDigito( dvr, campo )
{	
	dv = dvr + ""	
	if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K')	
	{		
		//alert("Debe ingresar un digito verificador valido");		
		//window.document.form1.rut.focus();		
		//window.document.form1.rut.select();	
		//console.log("Debe ingresar un digito verificador valido")	
		$("#"+campo).addClass("fucus_negativo");
		respuesta_negativa="Debe ingresar un digito verificador valido";	
		return false;	
	}	
	return true;
}

function revisarDigito2( crut ){
	campo=crut
	crut=$("#"+crut).val().replace(/\./g, '').replace(/\-/g, '');	
	//console.log(crut)	
	largo = crut.length;	
	if ( largo < 2 )	
	{			
		$("#"+campo).addClass("fucus_negativo");
		respuesta_negativa="Debe ingresar el rut completo";	
		return false;	
	}	
	if ( largo > 2 )		
		rut = crut.substring(0, largo - 1);	
	else		
		rut = crut.charAt(0);	
	dv = crut.charAt(largo-1);	
	revisarDigito( dv, campo );	

	if ( rut == null || dv == null )
		return 0	

	var dvr = '0'	
	suma = 0	
	mul  = 2	
	//console.log(rut+"/"+rut.length)
	for (i= rut.length -1 ; i >= 0; i--){	
		if(Number(rut.charAt(i))){}
			suma = suma + rut.charAt(i) * mul
			//console.log(rut.charAt(i) * mul)		
			//console.log(suma, rut.charAt(i), mul)
			if (mul == 7)			
				mul = 2		
			else    			
				mul++
		
				
	}	
	res = suma % 11	
	//console.log(suma)
	if (res==1)		
		dvr = 'k'	
	else if (res==0)		
		dvr = '0'	
	else	
	{		
		dvi = 11-res		
		dvr = dvi + ""	
	}
	//console.log(dvr +"/"+ dv.toLowerCase())
	if ( dvr != dv.toLowerCase() )	
	{				
		$("#"+campo).addClass("fucus_negativo");
		respuesta_negativa="EL rut es incorrecto";	
		return false	
	}

	return true
}


//DESDE EL IMPUT
function validacampo_Rut(campo){

	texto=$("#"+campo).val();
	var tmpstr = "";	
	for ( i=0; i < texto.length ; i++ )		
		if ( texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-' )
			tmpstr = tmpstr + texto.charAt(i);	
	texto = tmpstr;	
	largo = texto.length;	

	if ( largo < 2 )	
	{	
		$("#"+campo).addClass("fucus_negativo");
		respuesta_negativa="Debe ingresar el rut completo";		
		return false;	
	}	

	for (i=0; i < largo ; i++ )	
	{			
		if ( texto.charAt(i) !="0" && texto.charAt(i) != "1" && texto.charAt(i) !="2" && texto.charAt(i) != "3" && texto.charAt(i) != "4" && texto.charAt(i) !="5" && texto.charAt(i) != "6" && texto.charAt(i) != "7" && texto.charAt(i) !="8" && texto.charAt(i) != "9" && texto.charAt(i) !="k" && texto.charAt(i) != "K" )
 		{			
			
			$("#"+campo).addClass("fucus_negativo");
			respuesta_negativa="El valor ingresado no corresponde a un R.U.T valido";				
			return false;		
		}	
	}	

	var invertido = "";	
	for ( i=(largo-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + texto.charAt(i);	
	var dtexto = "";	
	dtexto = dtexto + invertido.charAt(0);	
	dtexto = dtexto + '-';	
	cnt = 0;	

	for ( i=1,j=2; i<largo; i++,j++ )	
	{		
		//alert("i=[" + i + "] j=[" + j +"]" );		
		if ( cnt == 3 )		
		{			
			dtexto = dtexto + '.';			
			j++;			
			dtexto = dtexto + invertido.charAt(i);			
			cnt = 1;		
		}		
		else		
		{				
			dtexto = dtexto + invertido.charAt(i);			
			cnt++;		
		}	
	}	

	invertido = "";	
	for ( i=(dtexto.length-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + dtexto.charAt(i);	
	
	$("#"+campo).val(invertido.toUpperCase())	
	
	if ( revisarDigito2(campo) )
		return true;
	
			

	return false;
}

	
	
	
	
// RUT CON DATO

function revisarDigito_texto( dvr )
{	
	dv = dvr + ""	
	if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K')	
	{		
		//alert("Debe ingresar un digito verificador valido");		
		//window.document.form1.rut.focus();		
		//window.document.form1.rut.select();	
		//console.log("Debe ingresar un digito verificador valido")	
		//$("#"+campo).addClass("fucus_negativo");
		//respuesta_negativa="Debe ingresar un digito verificador valido";	
		return false;	
	}	
	return true;
}

function revisarDigito2_texto( crut ){
	campo=crut
	crut=crut.replace(/\./g, '').replace(/\-/g, '');	
	//console.log(crut)	
	largo = crut.length;	
	if ( largo < 2 )	
	{			
		//$("#"+campo).addClass("fucus_negativo");
		//respuesta_negativa="Debe ingresar el rut completo";	
		return false;	
	}	
	if ( largo > 2 )		
		rut = crut.substring(0, largo - 1);	
	else		
		rut = crut.charAt(0);	
	dv = crut.charAt(largo-1);	
	revisarDigito_texto( dv );	

	if ( rut == null || dv == null )
		return 0	

	var dvr = '0'	
	suma = 0	
	mul  = 2	
	//console.log(rut+"/"+rut.length)
	for (i= rut.length -1 ; i >= 0; i--){	
		if(Number(rut.charAt(i))){}
			suma = suma + rut.charAt(i) * mul
			//console.log(rut.charAt(i) * mul)		
			//console.log(suma, rut.charAt(i), mul)
			if (mul == 7)			
				mul = 2		
			else    			
				mul++
		
				
	}	
	res = suma % 11	
	//console.log(suma)
	if (res==1)		
		dvr = 'k'	
	else if (res==0)		
		dvr = '0'	
	else	
	{		
		dvi = 11-res		
		dvr = dvi + ""	
	}
	//console.log(dvr +"/"+ dv.toLowerCase())
	if ( dvr != dv.toLowerCase() )	
	{				
		//$("#"+campo).addClass("fucus_negativo");
		//respuesta_negativa="EL rut es incorrecto";	
		return false	
	}

	return true
}

function validacampo_Rut_texto(texto){

	//console.log(texto)

	var tmpstr = "";	
	for ( i=0; i < texto.length ; i++ )		
		if ( texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-' )
			tmpstr = tmpstr + texto.charAt(i);	
	texto = tmpstr;	
	largo = texto.length;	

	if ( largo < 2 )	
	{	
			
		return false;	
	}	

	for (i=0; i < largo ; i++ )	
	{			
		if ( texto.charAt(i) !="0" && texto.charAt(i) != "1" && texto.charAt(i) !="2" && texto.charAt(i) != "3" && texto.charAt(i) != "4" && texto.charAt(i) !="5" && texto.charAt(i) != "6" && texto.charAt(i) != "7" && texto.charAt(i) !="8" && texto.charAt(i) != "9" && texto.charAt(i) !="k" && texto.charAt(i) != "K" )
 		{			
			
			//$("#"+campo).addClass("fucus_negativo");
			//respuesta_negativa="El valor ingresado no corresponde a un R.U.T valido";				
			return false;		
		}	
	}	

	var invertido = "";	
	for ( i=(largo-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + texto.charAt(i);	
	var dtexto = "";	
	dtexto = dtexto + invertido.charAt(0);	
	dtexto = dtexto + '-';	
	cnt = 0;	

	for ( i=1,j=2; i<largo; i++,j++ )	
	{		
		//alert("i=[" + i + "] j=[" + j +"]" );		
		if ( cnt == 3 )		
		{			
			dtexto = dtexto + '.';			
			j++;			
			dtexto = dtexto + invertido.charAt(i);			
			cnt = 1;		
		}		
		else		
		{				
			dtexto = dtexto + invertido.charAt(i);			
			cnt++;		
		}	
	}	

	invertido = "";	
	for ( i=(dtexto.length-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + dtexto.charAt(i);	
	
	//console.log(invertido.toUpperCase())
	
	//$("#"+campo).val(invertido.toUpperCase())	
	
	if ( revisarDigito2_texto(texto) )
		return true;
	
			

	return false;
}

	










