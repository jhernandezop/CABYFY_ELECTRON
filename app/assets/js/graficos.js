// JavaScript Document
generar_graficos =  function(grafico, origen_del_dato, filtro_origen, lugar, color, origen_de_reporte, tipode_reporte){
//alert(grafico+" "+origen_del_dato+" "+lugar+" "+tamanio)
	//alert(filtro_origen)
	bucar_dato(grafico, origen_del_dato, filtro_origen, lugar, $("#desde").val(), $("#hasta").val(), color, origen_de_reporte, tipode_reporte)
	
	//$("#"+lugar).attr("data-origen", JSON.stringify({"grafico":grafico, "origen_del_dato":origen_del_dato, "lugar":lugar , "color":color, "origen_de_reporte":origen_de_reporte, "tipode_reporte":tipode_reporte}))
		//new_filtro_origen=JSON.parse(filtro_origen);
	//alert(filtro_origen.parametro_1)																//'fanel', "http://node.openpartner.cl:"+puerto+"/seelmann/boton_cotizacion/estadistica_visitas", '{"parametro_1":"NA", "parametro_2":"B"}', 'fanel' , color_a, '', '' 						
	$("#"+lugar).parents(".panel").attr("data-origen", JSON.stringify({'grafico':grafico, 'origen_del_dato':origen_del_dato, 'filtro': filtro_origen, 'lugar':lugar , 'color':color, 'origen_de_reporte':origen_de_reporte, 'tipode_reporte':tipode_reporte}))
	
	
	
	
};


bucar_dato = function(grafico, origen_del_dato, filtro_origen, lugar, desde, hasta, color, origen_de_reporte, tipode_reporte){
	
	dato={ 'fecha_desde':desde, 'fecha_hasta':hasta, 'filtro':filtro_origen }
	
	$.ajax({
		 	data:dato,
            url : origen_del_dato,
            type : "POST",           
            dataType: 'json',
			beforeSend: function () {
				//$("#spiner").show();
				$( "#"+lugar ).html("<div class='loader'></div>");
			},
			success: function(data){
				$(".modal-body").html("")
					$(".modal-body").html("<div id='carga'><div><div id='reporte_grafico'></div>");
				
				//$("#spiner").hide();
				creo_grafico(grafico, data, filtro_origen , lugar, color, origen_de_reporte, tipode_reporte);
				//$( "#"+lugar ).append(data)
				//alert(data)
				//console.log(data)
			
			},
            error: function (xhr, ajaxOptions, thrownError) {
				//$("#boton").hide();
                /*errorConexion(xhr,ajaxOptions);*/
            }

        });
	
	
}


buscar_reporte = function(filtro_origen, origen_de_reporte, filtro, tipode_reporte, color){
	//alert(filtro.parametro_2)
	seleccion_base=filtro.parametro_2
	filtro=JSON.stringify(filtro)
	
	dato={ 'fecha_desde':$("#desde").val(), 'fecha_hasta':$("#hasta").val(), 'filtro': filtro}
	
	 
	if (tipode_reporte=="tabla"){
			$("#registros, #registros_wrapper").show();
			$("#reporte_grafico").hide();
			new_contenido=[];
			$.ajax({
				url: origen_de_reporte,
				data: dato,
				type: "POST",
				timeout: 30000,
				dataType: "json", 
				success: function(logs) {
					
					$(".modal-body").html("")
					$(".modal-body").html("<div id='carga'><div><div id='reporte_grafico'></div>");
					$("#carga").html("");
					$("#carga").html("<table id='registros' class='registros' width='100%'>"+
										"<thead>"+
											"<tr id='thead' class='thead' >"+
												
											"</tr>"+
										"</thead>"+
									"</table>");
									titulo=filtro.parametro_2;
									generar_tabla("#registros", logs.data)
					
					
				},
				error: function(jqXHR, textStatus, ex) {
					//alert(textStatus + "," + ex + "," + jqXHR.responseText);
				}
			});
	
	
	}else if (tipode_reporte!="tabla"){
		$("#registros, #registros_wrapper").hide();
		$("#reporte_grafico").show();
		 
		 
		 
		//grafico, origen_del_dato, filtro de origen, lugar, color, origen_de_reporte, tipo_grafico_de_reporte
		/*new_filter=[]
		new_filter.push(filtro_origen)
		new_filter.push(filtro)
		filtro_origen=new_filter.toString()*/ 
		//console.log(filtro)  
		filtro_origen=filtro
		bucar_dato(tipode_reporte, origen_de_reporte, filtro_origen, "reporte_grafico", $("#desde").val(), $("#hasta").val(), color,'', '' )
		
		
	}
		
	
}

creo_grafico = function(grafico, data, filtro_origen,  lugar , color, origen_de_reporte, tipode_reporte){
	
	//console.log(data)
	//alert(grafico+" "+data+" "+lugar)
	// FANEL
	
	if(data==""){
				
				$("#"+lugar).html("<div class='negativo' style='padding: 20px;'><div class='alert alert-danger' role='alert' style='margin: 0px;'>Sin registros para mostrar</div></div>");
				
				
	}else if(data!=""){
	
	
	
	if(grafico=='fanel'){
		
		//INSERTA RESUMEN DE TITULO
		if (data.resumen!=""){$("#"+lugar).parents(".panel").find('.resumen').html(data.resumen)
		} else if(!data.resumen || data.resumen=="") {$("#"+lugar).parents(".panel").find('.resumen').hide()}
		
		//INSERTA GRAFICO
		Highcharts.chart(lugar, {
			chart: {
				backgroundColor: '#FFF',
				type: 'funnel'
			},
			title:false,
			colors: color, 
			plotOptions: {
				series: {
					animation: false,
					dataLabels: {
						enabled: true,
						format: '<b>({point.y:,.0f}) {point.name}</b> ',
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
						softConnector: true,
						distance: 5
					},
					center: ['40%', '50%'],
					neckWidth: '30%',
					neckHeight: '25%',
					width: '80%',
					point: { events: 
								{ click: function() {
									if(origen_de_reporte!=""){
										//console.log()
										$("#myModal").modal('show'); 
										$(".modal-title").html(this.name);
										$(".modal-body").html(""); 
									}
								} 
							} 
					}
				}
				
				
			},
			legend: {
				enabled: true
			},
			navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			credits:{enabled:false},
			series: [{
				name: 'Usuarios',
				data: data.data
			}]
		});
		
		
	}else if(grafico=='torta'){
			//console.log(color)
			//INSERTA RESUMEN DE TITULO
			if (data.resumen!=""){$("#"+lugar).parents(".panel").find('.resumen').html(data.resumen)
			} else if(!data.resumen || data.resumen=="") {$("#"+lugar).parents(".panel").find('.resumen').hide()}
			
			//INSERTA GRAFICO
			Highcharts.chart(lugar, {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
				marginRight: 0,
				marginTop: 0,
				marginBottom: 50,
				//backgroundColor:'rgba(255, 255, 255, 0.0)'
				
			},
			title:false,
			colors: color,
			credits:{enabled:false},
			navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			legend: {
				padding: 0,
				itemMarginTop: 0,
        		itemMarginBottom: -5
				/*align: 'right',
				verticalAlign: 'top',
				layout: 'vertical',
				marginRight: 10*/

			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}% ({point.y})</b>'
			},
			plotOptions: {
				pie: {
					
					animation: false,
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f}% ({point.y})',
						distance: 5
					},
					showInLegend: true,
					point: { events: 
								{ click: function() {
									if(origen_de_reporte!=""){
										
										new_filtro_origen=JSON.parse(filtro_origen);
										//alert(new_filtro_origen.parametro_1)
										buscar_reporte(filtro_origen, origen_de_reporte, {"parametro_1":new_filtro_origen.parametro_1,"parametro_2":this.name,"parametro_3":this.name}, tipode_reporte, color)
										$("#myModal").modal('show'); 
										$(".modal-title").html(this.name);
										//$(".modal-body").html(""); 
									}
								} 
							} 
					}
				},
				
				
			},
			series: [{
				name: 'Total',
				colorByPoint: true,
				data: data.data
			}]
		});
		
	} else if(grafico=='barra'){
		//alert(JSON.stringify(data.data[0]))
		
		//INSERTA RESUMEN DE TITULO
		if (data.resumen!=""){$("#"+lugar).parents(".panel").find('.resumen').html(data.resumen)
		} else if(!data.resumen || data.resumen=="") {$("#"+lugar).parents(".panel").find('.resumen').hide()}
		
		//INSERTA GRAFICO
		Highcharts.chart(lugar, {
			chart: {
				type: 'column',
				marginTop: 0,
				marginBottom: 50,
				
			},
			colors: color,
			title:false,
			navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			xAxis: {
				categories: data.etiquetas
			},
			yAxis: {
        		visible: false
    		},
			credits: {
				enabled: false
			},
			legend: {
				padding: 0,
				itemMarginTop: 0,
        		itemMarginBottom: -10

			},
			plotOptions: {
				series: {
					animation: false,
					dataLabels: {
						enabled: true
					},
					point: { events: 
								{ click: function() {
									if(origen_de_reporte!=""){
										
										new_filtro_origen=JSON.parse(filtro_origen)
										//p_a
										buscar_reporte(filtro_origen, origen_de_reporte, {"parametro_1":new_filtro_origen.parametro_1,"parametro_2":this.series.name, "parametro_3":this.category , "parametro_4":new_filtro_origen.parametro_2, "parametro_5":new_filtro_origen.parametro_3} , tipode_reporte, color)
										$("#myModal").modal('show'); 
										$(".modal-title").html(this.series.name);
										//$(".modal-body").html("");
									}
								} 
							} 
					}
				}
			},
				series: data.data
		});
		
	}else if(grafico=='semi'){
		
		//INSERTA RESUMEN DE TITULO
		if (data.resumen!=""){$("#"+lugar).parents(".panel").find('.resumen').html(data.resumen)
		} else if(!data.resumen || data.resumen=="") {$("#"+lugar).parents(".panel").find('.resumen').hide()}
		
		//INSERTA GRAFICO
		Highcharts.chart(lugar, {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: 0,
				plotShadow: false,
				margin: [0, 0, 0, 0]
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			title:false,
			colors: color,
			credits:{enabled:false},
			navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			legend: {
				
				itemMarginTop: 0,
				itemMarginBottom: 0,
				align: 'center',
				verticalAlign: 'bottom',
				y: 0,
				padding: 0
    		},
       
			plotOptions: {
				pie: {
					animation: false,
					showInLegend: true,
					dataLabels: {
						enabled: true,
						distance: -50,
						format: '{point.percentage:.1f}%  ({point.y})',
						style: {
							fontWeight: 'bold',
							color: 'white',
							
						}
					},
					startAngle: -90,
					endAngle: 90,
					center: ['50%', '75%'],
					point: { events: 
								{ click: function() { 
									if(origen_de_reporte!=""){
										buscar_reporte(filtro_origen, origen_de_reporte, this.name, tipode_reporte, color)
										$("#myModal").modal('show'); 
										$(".modal-title").html("Visitas "+this.name);
										//$(".modal-body").html("");
									}
								} 
							} 
					}
				}
			},
			series: [{
				type: 'pie',
				name: 'Total',
				innerSize: '50%',
				data: data.data
			}]
	});
	
	
	
		
	}else if(grafico=='mapa_chile'){
	
		//INSERTA RESUMEN DE TITULO
		if (data.resumen!=""){$("#"+lugar).parents(".panel").find('.resumen').html(data.resumen)
		} else if(!data.resumen || data.resumen=="") {$("#"+lugar).parents(".panel").find('.resumen').hide()}
		
		//INSERTA GRAFICO
		Highcharts.mapChart(lugar, {
			chart: {
				map: 'countries/cl/cl-all'
				
			},
		
			title: {
				text: ''
			},
		
			
		
			mapNavigation: {
				enabled: true,
				
				buttonOptions: {
					verticalAlign: 'bottom'
				}
			},
		
			/*colorAxis: {
				min: 0
			},*/
			//title:false,
			
			colorAxis: {
				min: 0,
				minColor: '#6f82ab',
				maxColor: '#90bf01',
			},
			
			colors: color,
			credits:{enabled:false},
			navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			
			
		
			series: [{
				data: data.data,
				name: 'Llamadas:',
				borderWidth: 0,
				states: {
					hover: {
						color: '#BADA55'
					}
				},
				dataLabels: {
					enabled: true,
					format: '{point.name} ({point.value})',
					
				},
				point: { events: 
								{ click: function() { 
									if(origen_de_reporte!=""){
										
										
										filtro_seleccionado=this["hc-key"]
										new_filtro_origen=JSON.parse(filtro_origen)
										
										buscar_reporte(filtro_origen, origen_de_reporte, {"parametro_1":new_filtro_origen.parametro_1,"parametro_2":this.name,"parametro_3":filtro_seleccionado}, tipode_reporte, color)
										$("#myModal").modal('show'); 
										$(".modal-title").html("Visitas "+this.name); 
										//$(".modal-body").html("");
									}
								} 
						} 
				}
			}]
		});
	
	
		
		
	}else if(grafico=='mapa_alemania'){
		//alert(data)
		/*var data = [
			['de-ni', 0],//Niedersachsen
			['de-sh', 1],//Schleswig-Holstein
			['de-be', 2],//Berlin
			['de-mv', 3],//Mecklenburg-Vorpommern
			['de-hb', 4],//Bremen
			['de-sl', 5],//Saarland
			['de-by', 6],//Bayern
			['de-th', 7],//Thüringen
			['de-st', 8],//Sachsen-Anhalt
			['de-sn', 9],//Sachsen
			['de-bb', 10],//Brandenburg
			['de-nw', 11],//Nordrhein-Westfalen
			['de-bw', 12],//Baden-Württemberg
			['de-he', 13],//Hessen
			['de-hh', 14],//Hamburg
			['de-rp', 15]//Rheinland-Pfalz
		];*/
		
		//INSERTA RESUMEN DE TITULO
		if (data.resumen!=""){$("#"+lugar).parents(".panel").find('.resumen').html(data.resumen)
		} else if(!data.resumen || data.resumen=="") {$("#"+lugar).parents(".panel").find('.resumen').hide()}
		
		//INSERTA GRAFICO
		Highcharts.mapChart(lugar, {
			chart: {
				map: 'countries/de/de-all'
			},
		
			title: {
				text: ''
			},
		
			mapNavigation: {
				enabled: true,
				buttonOptions: {
					verticalAlign: 'bottom'
				}
			},
		
			colorAxis: {
				min: 0,
				minColor: '#6f82ab',
				maxColor: '#90bf01',
			},
			credits:{enabled:false},
				navigation: {
					buttonOptions: {
						enabled: false
					}
			},
			series: [{
				data: data.data,
				name: 'Visitas',
				borderWidth: 0,
				states: {
					hover: {
						color: '#BADA55'
					}
				},
				dataLabels: {
					enabled: true,
					format: '{point.name} ({point.value})'
				},
				point: { events: 
								{ click: function() {
									if(origen_de_reporte!=""){
										buscar_reporte(filtro_origen, origen_de_reporte, this.name, tipode_reporte, color) 
										$("#myModal").modal('show'); 
										$(".modal-title").html("Visitas "+this.name); 
										//$(".modal-body").html(""); 
									}
								} 
						} 
				}
			}]
		});
	
	
		
		
	}else if(grafico=='barra_tiempo'){
	
	//INSERTA RESUMEN DE TITULO
		if (data.resumen!=""){$("#"+lugar).parents(".panel").find('.resumen').html(data.resumen)
		} else if(!data.resumen || data.resumen=="") {$("#"+lugar).parents(".panel").find('.resumen').hide()}
		
		//INSERTA GRAFICO	
	Highcharts.chart(lugar, {
			chart: {
				type: 'column',
				marginTop: 0,
				marginBottom: 50,
				
			},
			colors: color,
			title:false,
			navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			xAxis: {
				categories: data.etiquetas
			},
			yAxis: {
        		visible: false
    		},
			credits: {
				enabled: false
			},
			legend: {
				padding: 0,
				itemMarginTop: 0,
        		itemMarginBottom: -10

			},
			tooltip: {
					formatter: function () {
						return '' +
							"" +
							'Tiempo: ' + Highcharts.dateFormat('%H:%M:%S', this.y);
					}
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: true,
							
						}
					}
				},
			plotOptions: {
				column: {
					stacking: 'normal'
				},
				series: {
					animation: false,
					dataLabels: {
						enabled: true,
						formatter: function() {
								var date = Highcharts.dateFormat('%H:%M:%S', this.y);
								if(date!="00:00") return date;
								else return "";
							}
					},
					point: { events: 
								{ click: function() {
									if(origen_de_reporte!=""){
										//console.log(this.series.name)
										//this.series.name
										new_filtro_origen=JSON.parse(filtro_origen);
										buscar_reporte(filtro_origen, origen_de_reporte, {"parametro_1":new_filtro_origen.parametro_1,"parametro_2":this.category,"parametro_3":this.category}, tipode_reporte, color)
										$("#myModal").modal('show'); 
										$(".modal-title").html(this.series.name);
										//$(".modal-body").html("");
									}
								} 
							} 
					}
				}
			},
				series: data.data
		});
	
	
	
	
	
	
	}else if(grafico=='barra_horizontal'){
		
	//INSERTA RESUMEN DE TITULO
		if (data.resumen!=""){$("#"+lugar).parents(".panel").find('.resumen').html(data.resumen)
		} else if(!data.resumen || data.resumen=="") {$("#"+lugar).parents(".panel").find('.resumen').hide()}
		
		//INSERTA GRAFICO
	Highcharts.chart(lugar, {
			chart: {
				type: 'column',
				inverted: true
			},
			colors: color,
			title:false,
			navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			xAxis: {
				categories: data.etiquetas,
				title: {
					text: null
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: '',
					align: 'high'
				},
				labels: {
					overflow: 'justify'
				}
			},
			plotOptions: {
				bar: {
					dataLabels: {
						enabled: true
					}
				}
			},
			legend: {
				padding: 0,
				itemMarginTop: 0,
        		itemMarginBottom: -10

			},
			/*legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -40,
				y: 80,
				floating: true,
				borderWidth: 1,
				backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
				shadow: true
			},*/
			credits: {
				enabled: false
			},
			series: data.data
		});
	
	
	
	
	
	
	}else if (grafico=='barra_linea'){
		/*data.data=[ 
			{
				"data":[506820492,
				505042401,
				467794977,
				396589424,
				532125016,
				491085637,
				522435586,
				0,
				233996137,
				0],
				"name":"Pagados $",
				"tooltip": {
					"valueSuffix": " "
				}
				,
				"valueSuffix":" ",
				"type":"column",
				"yAxis":1,
				"stacking":"normal"
			}
			
			,
			{
				"data":[14281534,
				9306308,
				8656812,
				139373102,
				32628544,
				8332572,
				9476621,
				548295129,
				299615148,
				534123845],
				"name":"No Pagados $",
				"tooltip": {
					"valueSuffix": " "
				}
				,
				"valueSuffix":" ",
				"type":"column",
				"yAxis":1,
				"stacking":"normal"
			}
			
			,
			{
				"data":[667997,
				2139296,
				2087437,
				73167,
				1444555,
				1875913,
				4302772,
				0,
				407890,
				0],
				"name":"Rechazados $",
				"tooltip": {
					"valueSuffix": " "
				}
				,
				"valueSuffix":" ",
				"type":"column",
				"yAxis":1,
				"stacking":"normal"
			}
			
			,
			{
				"data":[4418,
				4529,
				4631,
				4845,
				5171,
				4810,
				4896,
				4892,
				4860,
				4860],
				"name":"Conductores",
				"tooltip": {
					"valueSuffix": " "
				}
				,
				"valueSuffix":" ",
				"type":"spline",
				"yAxis":0
			}

		]*/
		
		//INSERTA RESUMEN DE TITULO
		if (data.resumen!=""){$("#"+lugar).parents(".panel").find('.resumen').html(data.resumen)
		} else if(data.resumen=="") {$("#"+lugar).parents(".panel").find('.resumen').hide()}
		//INSERTO TITULO SI EXISTE
		if(data.titulo!=""){titulo= {text: data.titulo} }else if(data.titulo==""){titulo=false}
		
		//INSERTA GRAFICO
		Highcharts.chart(lugar, {
			chart: {
				zoomType: 'xy'
			},
			title: titulo,
			colors: color,
			credits: {
				enabled: false
			},
			navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			legend: false/*{
				padding: 0,
				itemMarginTop: 0,
        		itemMarginBottom: -10

			}*/,
			
			xAxis: [{
				categories: data.etiquetas,
				crosshair: true
			}],
			yAxis: [{ // Primary yAxis
				labels: {
					format: '{value}'+data.data[1].tooltip.valueSuffix,
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					text: data.data[1].name,
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				}
			}, { // Secondary yAxis
				title: {
					text: data.data[0].name,
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				labels: {
					format: '{value}'+data.data[0].tooltip.valueSuffix,
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				opposite: true
			}],
			tooltip: {
				shared: true
			},
			/*plotOptions: {
				series: {
					animation: false
				}
			},*/
			plotOptions: {
				series: {
					animation: false,
					point: { events: 
								{ click: function() {
									if(origen_de_reporte!=""){
										console.log(this.series.name)
										console.log(filtro_origen)
										
										//this.series.name
										if(filtro_origen!=""){
											new_filtro_origen=JSON.parse(filtro_origen);
										}else{
											new_filtro_origen="";
										}
										buscar_reporte(filtro_origen, origen_de_reporte, {"parametro_1":new_filtro_origen.parametro_1,"parametro_2":this.category,"parametro_3":this.category}, tipode_reporte, color)
										$("#myModal").modal('show'); 
										$(".modal-title").html(this.series.name);
										//$(".modal-body").html("");
									}
								} 
							} 
					}
				}
			},
			series: data.data
		});
		
		
	}else if (grafico=='barra_linea_un_eje'){
		
		//INSERTA RESUMEN DE TITULO
		if (data.resumen!=""){$("#"+lugar).parents(".panel").find('.resumen').html(data.resumen)
		} else if(data.resumen=="") {$("#"+lugar).parents(".panel").find('.resumen').hide()}
		//INSERTO TITULO SI EXISTE
		if(data.titulo!=""){titulo= {text: data.titulo} }else if(data.titulo==""){titulo=false}
		
		Highcharts.chart(lugar, {
			title: titulo,
			xAxis: {
				categories: data.etiquetas
			},
			credits: {
				enabled: false
			},
			navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			labels: {
				items: [{
					html: 'Total fruit consumption',
					style: {
						left: '50px',
						top: '18px',
						color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
					}
				}]
			},
			series: [{
				type: 'column',
				name: 'Jane',
				data: [3, 2, 1, 3, 4]
			}, {
				type: 'spline',
				name: 'Average',
				data: ['','',5,'',''],
				marker: {
					lineWidth: 2,
					lineColor: Highcharts.getOptions().colors[3],
					fillColor: 'white'
				}
			}]
		});
		
		
	}else if (grafico=='dispercion'){
		
		//INSERTA RESUMEN DE TITULO
		if (data.resumen!=""){$("#"+lugar).parents(".panel").find('.resumen').html(data.resumen)
		} else if(data.resumen=="") {$("#"+lugar).parents(".panel").find('.resumen').hide()}
		
		
		Highcharts.chart(lugar, {
			chart: {
				type: 'scatter',
				zoomType: 'xy'
			},
			credits: {
				enabled: false
			},
			navigation: {
				buttonOptions: {
					enabled: false
				}
			},
			title: {
				text: data.titulo
			},
			
			xAxis: {
				title: {
					enabled: true,
					text: data.titulo_x
				},
				startOnTick: true,
				endOnTick: true,
				showLastLabel: true
			},
			yAxis: {
				title: {
					text: data.titulo_y
				}
			},
			legend:false,
			/*legend: {
				layout: 'vertical',
				align: 'left',
				verticalAlign: 'top',
				x: 100,
				y: 70,
				floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
				borderWidth: 1
			},*/
			plotOptions: {
				scatter: {
					marker: {
						radius: 5,
						states: {
							hover: {
								enabled: true,
								lineColor: 'rgb(100,100,100)'
							}
						}
					},
					states: {
						hover: {
							marker: {
								enabled: false
							}
						}
					},
					tooltip: {
						headerFormat: '<b>{series.name}</b><br>',
						pointFormat: '{point.y} '+data.titulo_y+'<br>{point.x} '+data.titulo_x
					}
				}
			},
			series: data.data
		});
		
		
		
	}
   
   /*[{
                name: 'Reservas',
                type: 'column',
                yAxis: 1,
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                tooltip: {
                    valueSuffix: ' Rvs'
                }
        
            }, {
                name: 'Montos',
                type: 'spline',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                tooltip: {
                    valueSuffix: '$'
                }
            }]*/

	}
	
}

function generar_tabla(lugar, datos, ordenamiento){
console.log(datos)

filtro_ordering=true
filtro_order=[[ 0, "desc" ]]
if(ordenamiento){
	if(ordenamiento=="no"){
		filtro_ordering=false
		filtro_order=[]
	}
}else{
	
}


					//FORMA A
					/*if(datos.length>0){
						$('thead > tr').html("");
						$(lugar+' tbody').html("");

						
						for(i in datos[0]){
							console.log(i)
							texto=i.replace("_", "&nbsp;")
							$('thead > tr').append("<th style='width:100px;'>"+texto.replace("_", "&nbsp;")+"</th>")
						}
						
						for(i in datos){
							$('tbody').append("<tr id='row_"+i+"'></tr>")
							for (b in datos[i]){
								$("#row_"+i).append("<th>"+datos[i][b]+"</th>")	
							}
						}
						$(lugar).DataTable({});
						$(lugar).wrap('<div class="dataTables_scroll" />'); 
						
						
					}*/
					
					
					//FORMA B
					
					
					
					if(datos.length>0){
						if(datos[0].seleccion || datos[0].Editar){
							paging=false;
							scrollY=false;
							scrollX=false;
						}else{
							paging=true;
							scrollY='58vh';
							scrollX=true;
						}
						
						$.fn.dataTable.ext.errMode = 'none';
						$(lugar+ 'thead > tr').html("");
						$(lugar+' tbody').html("");
						/*if(myTable){
							myTable.clear();
						}*/
						
						
						new_contenido=[]
						for(i in datos[0]){
							//alert("")
							texto=i.replace("_", "&nbsp;")
							if(texto=="seleccion"){
								texto='<input class="masterseleccionbox" type="checkbox">'
							}
							console.log(lugar)
							console.log(texto.replace("_", "&nbsp;"))
							$(lugar+'  thead > tr').append("<th class='sorting_disabled sorting'>"+texto.replace("_", "&nbsp;")+"</th>")
							
							new_contenido.push({'data':i})
						}
						
						var myTable = $(lugar).DataTable({
							"lengthChange": true,
							"searching": true,
							"ordering": filtro_ordering,
							"order": filtro_order,
							"info": true,
							"autoWidth": true, 
							"paging": paging, 
							"deferRender":true,  
							"scrollY": scrollY,
							"scrollX": scrollX,
							/*"fixedHeader": {
								header: true,
								footer: true
							  },*/
							/*"scrollCollapse": true,
							"dom": '<"top">frt<"bottom"ilp><"clear">',*/
							"data": [],
							"dom": 'Bfrtip',
							"buttons": [{extend: 'excel',title: titulo,filename: titulo}],
							"columns": new_contenido,
							"language": {
									processing:     "Porcesando...",
									search:         "",
									searchPlaceholder: "Buscar...",
									lengthMenu:     "_MENU_ ",
									info:           "viendo del _START_ al _END_, de un total de _MAX_",
									//infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
									infoFiltered:   "",
									infoPostFix:    "",
									loadingRecords: "<div class='loader'></div>",
									zeroRecords:    "No hay datos para mostrar",
									emptyTable:     "Aucune donnée disponible dans le tableau",
									paginate: {
										first:      "Premier",
										previous:   "-",
										next:       "+",
										last:       "Dernier"
									},
									aria: {
										sortAscending:  ": activer pour trier la colonne par ordre croissant",
										sortDescending: ": activer pour trier la colonne par ordre décroissant"
									}
							   }
							});
						
							//myTable.clear();
							
							$.each(datos, function(index, value) {
								//alert(JSON.stringify(value))
								myTable.row.add(value);
								
								
							});
							
							myTable.draw();
							
							$(lugar).wrap('<div class="dataTables_scroll" />'); 
							
							//$('#tipo').click();
							//$('#thead').css( 'display', 'block' );
							
							
							
					
						} else{
							$(lugar).html("<div class='negativo' style='padding: 20px;'><div class='alert alert-info' role='alert' style='margin: 0px;'>Sin registros para mostrar</div></div>");
							$("#myModal").find(".modal-dialog").removeClass("modal-lg");
							$("#myModal").find(".table-striped").removeClass("table-bordered")
							$("#myModal").find(".table-striped").removeClass(" table")
						}
					

}



function generar_tabla_anidada(lugar, datos, padre,titulo, sumarizar, mantener, datos_operar){
	
	//DEFINO LAS COLUMNAS EN BASE AL PRIMER REGSITRO
	
	//console.log(Object.keys(datos[0]))
	new_heder=Object.keys(datos[0])
	new_heder_fin=[]
	new_heder_fin.push({
							title: padre.replace(/\_/g, " ").toUpperCase() ,
							field: padre,
							width: 200,
							responsive: 0,
							headerFilter:"input"}
						    )
	
	for(i in new_heder){
		if(new_heder[i]!=padre){
			new_heder_fin.push({
							title: new_heder[i].replace(/\_/g, " ").toUpperCase() ,
							field: new_heder[i],
							width: 200,
							responsive: 0,
							headerFilter:"input"}
						    )
		}
		
	}
	
	
	
	
	
	//console.log(new_heder_fin)
	
	 let result = datos.reduce((prev, current, index, arr) => {
	  // Compruebo si ya existe el elemento
	  let exists = prev.find(x => x[padre] === current[padre]);
	  // Si no existe lo creo con un array vacío en VALOR
	  if (!exists) {
	   exists = {
		[padre]: current[padre],
		//_children: [{[sumarizar]:current[sumarizar]}, current ]
		_children: []
	   };
	   prev.push(exists);
	  }
	  // elemento existente
	  exists._children.push(current)
	 /* if(sumarizar){
		  for (i in sumarizar){
			  exists.[sumarizar][i]=exists.[sumarizar][i]+current[sumarizar][i]
		  }
	  }*/
	  //exists._children[0][sumarizar]=exists._children[0][sumarizar] + current[sumarizar]
	  // Devuelvo el array resultado para la nueva iteración
	  return prev;
	 }, []);
	 resgistros_tabla = result
	 //console.log(result);
	//SI EXISTEN SUMARIDOS
	if(sumarizar){
		
		
		for (a in resgistros_tabla) {
			if(resgistros_tabla[a]._children){
				
				
				for(b in resgistros_tabla[a]._children){
					
					for (c in sumarizar){
							//console.log(resgistros_tabla[a][sumarizar[c]])
						if(resgistros_tabla[a][sumarizar[c]]=="undefined" ||  resgistros_tabla[a][sumarizar[c]]==null){
							resgistros_tabla[a][sumarizar[c]]=resgistros_tabla[a]._children[b][sumarizar[c]]
						}else{
							resgistros_tabla[a][sumarizar[c]]=resgistros_tabla[a][sumarizar[c]]+resgistros_tabla[a]._children[b][sumarizar[c]]
						}
						
						//resgistros_tabla[a].[sumarizar[b]]=resgistros_tabla[a].[sumarizar[b]]+resgistros_tabla[a]._children[b].[sumarizar[b]]
							
					}
				
				}
				
				
				
			}
			
		}
	
	}
	//SI EXISTEN FIJOS
	if(mantener){
		for (a in resgistros_tabla) {
			if(resgistros_tabla[a]._children){
				for (c in mantener){
					resgistros_tabla[a][mantener[c]]=resgistros_tabla[a]._children[0][mantener[c]]
				}
			}
		}
	}
	//SI EXISTEN DATOS A OPERAR  {"COLUMNA":"DIFERENCIA", "OPERACION":"RESTAR","COLUMNAS":["MONTO_TOTAL", "totalAmount"]}
	if(datos_operar){
		for(i in datos_operar){
			if(datos_operar[i].OPERACION=="RESTAR"){
				
				for (a in resgistros_tabla) {
					//console.log(resgistros_tabla[a])
					//console.log(resgistros_tabla[a][datos_operar[i].COLUMNAS[0]])
					//console.log(resgistros_tabla[a][datos_operar[i].COLUMNAS[1]])
					resgistros_tabla[a][datos_operar[i].COLUMNA]=resgistros_tabla[a][datos_operar[i].COLUMNAS[0]]-resgistros_tabla[a][datos_operar[i].COLUMNAS[1]]
					
					if(resgistros_tabla[a][datos_operar[i].COLUMNA]==0){
						resgistros_tabla[a]="";
					}
					
				}
				
			
			}
			
		}
		
		
	}
	
	
	 //console.log(resgistros_tabla)
	$("#barra_ubicacion").html(`<h1>${titulo}</h1><div class="table-controls">
						  <button class="buttons-excel" id="download-csv">CSV</button>
					</div>`)
	 $(lugar).html(`<div id="example-table"></div>`)
	
	 var table = new Tabulator("#example-table", {
	  height: "500px",
	  data: resgistros_tabla,
	  dataTree: true,
	  dataTreeStartExpanded: false,
	  pagination:"local",
      paginationSize:15,
	  columns: new_heder_fin
	 });
	 
	 //trigger download of data.csv file
	$("#download-csv").click(function(){
		table.download("csv", "data.csv");
	});
	
	
}


