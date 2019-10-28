

if(localStorage.getItem("constantes")){
	//console.log(JSON.parse(localStorage.getItem("constantes")));
	//AQUI TOMA LA ULTIMA CONSTANTE QUE QUEDO
	 constantes =  JSON.parse(localStorage.getItem("constantes"));
	
	
}else{
	 constantes = { 
		cliente:"bs_cabify",
		//DESARROLLO
		face:"no",
		direccion_ws_FACE:"",
		direccion_ws_FACE_pr:"",
		direccion_ws_FACE_de:"",
		
		direccion_base:"https://cf.openpartner.cl/",
		direccion_base_pr:"https://cf.openpartner.cl/",
		direccion_base_de:"https://cf.openpartner.cl/",
		wsUrl:"",
		desarrollo:"no",
		destino:""
	
	
	};
	localStorage.setItem("constantes", JSON.stringify(constantes))
}

