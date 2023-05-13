let peticion_movimientos = new XMLHttpRequest() //creo un objeto de tipo XMLHttpRequest

//funcion que recibe la respuesta del servidor 
function peticion_movimientos_handler(){
    if(this.readyState == 4 ){
        if(this.satatus == 200){
            const datajson = JSON.parse(this.responseText);
            alert(datajson)
        }else{
            alert("se ha producido un error en la consulta");
        }
    }

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

    //definicion de metodo get y ruta para devoluvion de datos
    peticion_movimientos.open("GET","http://127.0.0.1:5000/api/v1.0/all",true);
    //llamada a la funcion peticion_movimientos_handler para capturar respuesta
    peticion_movimientos.onload = peticion_movimientos_handler;
    //mostrar un error si es que lo hay al realizar la consulta
    peticion_movimientos.onerror = function(){alert("No se ha podido completar la peticion de movimientos")};
    //enviar la consulta como tal 
    peticion_movimientos.send();
}