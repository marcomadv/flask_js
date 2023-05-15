let peticion_movimientos = new XMLHttpRequest() //creo un objeto de tipo XMLHttpRequest
let peticion_alta = new XMLHttpRequest() // creo objeto para peticion alta

//funcion que recibe la respuesta del servidor 
function peticion_movimientos_handler(){
    if(this.readyState == 4 ){
        if(this.status == 200){
            const datajson = JSON.parse(this.responseText);

            const tabla = document.getElementById("movements_table");

            const movimientos = datajson.data

            for (let i = 0; i < movimientos.length; i++) {
                console.log(movimientos[i]);
                const fila = document.createElement("tr");

                const celda_date = document.createElement("td")
                celda_date.innerHTML = movimientos[i].date;
                fila.appendChild(celda_date);

                const celda_concept = document.createElement("td")
                celda_concept.innerHTML = movimientos[i].concept;
                fila.appendChild(celda_concept);

                const celda_quantity= document.createElement("td")
                celda_quantity.innerHTML = movimientos[i].quantity;
                fila.appendChild(celda_quantity);

                tabla.appendChild(fila);
            }
  
            alert(datajson[1].date)
        }else{
            alert("se ha producido un error en la consulta");
        }
    }
}

function peticion_alta_handler(){
    if(this.readyState === 4){
        if(this.status === 200){
            
        }
    }
}

function altaMovimiento(event){
    event.preventDefault();
    //capturar los valores del imput

    const date = document.getElementById("date").value;
    const concept = document.getElementById("concept").value;
    const quantity = document.getElementById("quantity").value;

    //capturar la fecha actual en formato yyyy-mm-dd
    const hoy = new Date().toISOString().split('T')[0];

    if(!date || date > hoy){
        alert("Debe agregar una fecha menor o igual a hoy");
        return
    }

    if(concept === ""){
        alert("Debe agregar el concepto")
    }
    if(quantity === '0' || quantity === ""){
        alert("Debes agregar un monto positivo o negativo")
    }
    //aqui el codigo para registro
    peticion_alta.open("POST","http://127.0.0.1:5000/api/v1.0/new", true);
    peticion_alta.onload = peticion_alta_handler
    peticion_alta.onerror = function(){alert("No se ha podido completar la peticion de registro")}
    peticion_alta.setRequestHeader("Content-Type","application/json");

    //definir la estructura json a enviar 
    const data_json = JSON.stringify(
        {   
            date: date,
            concept: concept,
            quantity: quantity
        }
    )

    peticion_alta.send(data_json); 

}


//funcion para mostrar formulario con el boton nuevo
function mostrarForm(event){
    document.getElementById("movements_detail").style.display="block"
}
//funcion para ocultar formulario con el boton de cerrar 
function ocultarForm(event){
    document.getElementById("movements_detail").style.display="none"
}

window.onload=function(){
    let boton_nuevo = document.getElementById('btn_nuevo');
    boton_nuevo.addEventListener("click",mostrarForm)

    let boton_cerrar = document.getElementById('btn_cerrar');
    boton_cerrar.addEventListener("click",ocultarForm)

    let boton_guardar = document.getElementById("btn_guardar")
    boton_guardar.addEventListener("click",altaMovimiento)

    //definicion de metodo get y ruta para devoluvion de datos
    peticion_movimientos.open("GET","http://127.0.0.1:5000/api/v1.0/all",true);
    //llamada a la funcion peticion_movimientos_handler para capturar respuesta
    peticion_movimientos.onload = peticion_movimientos_handler;
    //mostrar un error si es que lo hay al realizar la consulta
    peticion_movimientos.onerror = function(){alert("No se ha podido completar la peticion de movimientos")};
    //enviar la consulta como tal 
    peticion_movimientos.send();
}