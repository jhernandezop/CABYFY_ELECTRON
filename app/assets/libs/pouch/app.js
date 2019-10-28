(function() {

  'use strict';

  var ENTER_KEY = 13;
  var newTodoDom = document.getElementById('new-todo');
  var syncDom = document.getElementById('sync-wrapper');

  //LA EDICIÓN COMIENZA AQUÍ (no es necesario editar nada sobre esta línea)

  var db = new PouchDB('todos');

 //Reemplazar con una instancia remota, esto simplemente se replica en otra instancia local.
  var remoteCouch = 'http://127.0.0.1:5984/todos_remote/';

  db.changes({
    since: 'now',
    live: true
  }).on('change', showTodos);

  // Tenemos que crear un nuevo documento de tareas pendientes e introducirlo en la base de datos.
  function addTodo(text) {
    var todo = {
      _id: new Date().toISOString(),
      title: text,
	  data:[{
		  		"@timestamp": "2019-04-01T00:00:00.000-03:00",
				BILLING_PERIOD: "",
				CATEGORIA: "",
				CENTRO_COSTO: "NO",
				CHARGE_CODE_FORMAT: "",
				CHARGE_CODE_REQUIRED: "",
				CITY: "",
				CIUDAD_FAC: "SANTIAGO",
				CLIENT_ADDRESS: "Av. Irarrazaval 2401, Oficina 1123",
				CLIENT_CITY: "Ñuñoa",
				CLIENT_ID: "32790d74d88c5ffe01863070da0b400f",
				CLIENT_ID_MADRE: "32790d74d88c5ffe01863070da0b400f",
				CLIENT_KIND: "",
				CLIENT_NAME: "2080 SISTEMAS Y SERVICIOS LTDA",
				CLIENT_TAX_CODE: "76078544-K",
				CLIENT_TYPE: "",
				CORREOS_FAC: "dte@2080.cl",
				CORREO_ADMIN: "Rodrigo.correa@2080.cl",
				CORREO_COB: "Loreto.morales@2080.cl",
				COUNTRY: "",
				COUNTY: "",
				DEAL_VALUE: "",
				DESGLOSE: "NO",
				DETALLE_CC_FACTURACION: "",
				ESPECIAL: "NO",
				ES_idCli: "0NbE3mkBXirRpfocT3Zb",
				FECHA_ACTUALIZACION: "2019-04-01 00:00:00",
				F_CREACION_BS: "2019-04-01 00:00:00",
				GIRO: "EMPRESA DE SERVICIOS INTEGRALES DE INFORMATICA",
				GRUPO_ECONOMICO: "2080",
				HES: "NO",
				LAST_EVENT_TYPE: "farmer",
				METODO_PAGO: "Transferencia",
				NOMBRE_ADMIN: "Rodrigo Correa Zenteno",
				NOMBRE_COB: "Loreto Morales Padilla",
				ORDEN_COMPRA: "NO",
				PAYMENT_TERMS: "billing_period_plus_15",
				POTENTIAL_USERS: "",
				REGISTERED_USERS: "",
				SALES_REP: "Jose Domingo Jaramillo",
				SECTOR: "",
				SIZE: "",
				SOPORTE: "",
				STARRED: "",
				TELEFONO_ADMIN: "56983608784",
				TELEFONO_ADMIN2: "",
				TELEFONO_COB: "227602126",
				TELEFONO_COB2: "",
				USING_LABELS: "",
				USUARIO_ACTUALIZACION: "op",
				USUARIO_CREACION_BS: "op",
		  
		 }],
      completed: false
    };
    db.put(todo, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      }
    });
	console.log(db)
  }

  // Muestra la lista actual de todos al leerlos de la base de datos.
  function showTodos() {
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
      redrawTodosUI(doc.rows);
    });
  }

  function checkboxChanged(todo, event) {
    todo.completed = event.target.checked;
    db.put(todo);
  }

  // El usuario presionó el botón de eliminar para un todo, eliminarlo
  function deleteButtonPressed(todo) {
	  console.log(todo)
    db.remove(todo);
  }

  // El cuadro de entrada al editar una tarea se ha difuminado, debemos guardar
  // el nuevo título o eliminar el todo si el título está vacío
  function todoBlurred(todo, event) {
	  console.log(todo)
    var trimmedText = event.target.value.trim();
    if (!trimmedText) {
      db.remove(todo);
    } else {
      todo.title = trimmedText;
      db.put(todo);
    }
  }

  // Inicializa una sincronización con el servidor remoto
  function sync() {
    syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = {live: true};
    db.replicate.to(remoteCouch, opts, syncError);
    db.replicate.from(remoteCouch, opts, syncError);
  }

  // LA EDICIÓN COMIENZA AQUÍ (no necesita editar nada debajo de esta línea)

  // Hubo alguna forma o error de sincronización
  function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
  }

  //El usuario ha hecho doble clic en una tarea pendiente, muestra una entrada para que pueda editar el título
  function todoDblClicked(todo) {
	  console.log(todo)
    var div = document.getElementById('li_' + todo._id);
    var inputEditTodo = document.getElementById('input_' + todo._id);
    div.className = 'editing';
    inputEditTodo.focus();
  }

  // Si presionan Intro mientras editan una entrada, difumínela para activar guardar
   // (o eliminar)
  function todoKeyPressed(todo, event) {
	  console.log(todo)
    if (event.keyCode === ENTER_KEY) {
      var inputEditTodo = document.getElementById('input_' + todo._id);
      inputEditTodo.blur();
    }
  }

  // Dado un objeto que representa una tarea pendiente, esto creará un elemento de lista
   // para mostrarlo.
  function createTodoListItem(todo) {
    var checkbox = document.createElement('input');
    checkbox.className = 'toggle';
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', checkboxChanged.bind(this, todo));

    var label = document.createElement('label');
    label.appendChild( document.createTextNode(todo.title));
    label.addEventListener('dblclick', todoDblClicked.bind(this, todo));

    var deleteLink = document.createElement('button');
    deleteLink.className = 'destroy';
    deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, todo));

    var divDisplay = document.createElement('div');
    divDisplay.className = 'view';
    divDisplay.appendChild(checkbox);
    divDisplay.appendChild(label);
    divDisplay.appendChild(deleteLink);

    var inputEditTodo = document.createElement('input');
    inputEditTodo.id = 'input_' + todo._id;
    inputEditTodo.className = 'edit';
    inputEditTodo.value = todo.title;
    inputEditTodo.addEventListener('keypress', todoKeyPressed.bind(this, todo));
    inputEditTodo.addEventListener('blur', todoBlurred.bind(this, todo));

    var li = document.createElement('li');
    li.id = 'li_' + todo._id;
    li.appendChild(divDisplay);
    li.appendChild(inputEditTodo);

    if (todo.completed) {
      li.className += 'complete';
      checkbox.checked = true;
    }

    return li;
  }

  function redrawTodosUI(todos) {
    var ul = document.getElementById('todo-list');
    ul.innerHTML = '';
    todos.forEach(function(todo) {
      ul.appendChild(createTodoListItem(todo.doc));
    });
  }

  function newTodoKeyPressHandler( event ) {
    if (event.keyCode === ENTER_KEY) {
      addTodo(newTodoDom.value);
      newTodoDom.value = '';
    }
  }

  function addEventListeners() {
    newTodoDom.addEventListener('keypress', newTodoKeyPressHandler, false);
  }

  addEventListeners();
  showTodos();

  if (remoteCouch) {
    sync();
  }

})();





