const socket = io();

const inputChat = document.getElementById("inputChat");

inputChat.addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("enviarChat").click();
  }
}); 

document.getElementById("enviarChat").addEventListener("click", () => {

  if (document.getElementById('inputMail').value!==""){
    
    const date = new Date();
    const output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear() + " " +date.toLocaleTimeString("es-ES");
    
    const mensaje = {
      usrMail: document.getElementById('inputMail').value,
      usrMsg: document.getElementById('inputChat').value,
      date: output
    }
    
    socket.emit("mensaje", mensaje)
    
    limpiaChat()

  }

});


socket.on("mensaje", (mensajes) => {
  const mensajesInput=msg(mensajes);
  document.getElementById("msg").innerHTML = mensajesInput;
});


////// Funciones auxiliares
const msg = function(mensajes){
  let clase="";
  let html="";

  mensajes.forEach(element => {
    if (element.usrMail === document.getElementById('inputMail').value){
      clase="MensajesPropios";
    } else {
      clase="MensajesAjenos";
    }
    html= html + `<div class="boxMensajes ${clase}">
                    <p class="fechaMensaje">[${element.date}]</p>
                    <p class="mailMensaje">${element.usrMail}</p>
                    <p class="txtMensaje"> ${element.usrMsg}</p>
                  </div>`
  });
  
  return html;
};

function limpiaChat() {  
  document.getElementById("inputChat").value="";
}

function colorRandom() {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + color;
}

const inputPw = document.getElementById("password");
const inputPwVer = document.getElementById("passwordVerificar");
const btnRegister = document.getElementById("btnRegister");

btnRegister.addEventListener("click", function(event) {
  event.preventDefault();
  if (inputPw.value === inputPwVer.value && inputPw.value.length >= 5) {
    document.getElementById("formRegister").submit();
  } else {
    alert("Las contraseñas no coinciden o no cumplen con los requisitos");
  }
})

///////////////////// Control del carrito //////////////////
async function abrirModal(idProd){
  console.log(idProd);
  const confirmar=confirm("¿Está seguro que desea agregar el producto al carrito?");
  if (!confirmar) {return}

  const prod={}

  axios.get(`/api/productos/prod/${idProd}`) //obtener producto
    .then(function (response) {

      prod.nombre=response.data[0].title;
      prod.descripcion=response.data[0].description;
      prod.codigo=response.data[0]._id;
      prod.foto=response.data[0].thumbnail;
      prod.precio=response.data[0].price;
      prod.stock=response.data[0].stock;
      prod.cantidad=1;

      enviarCarrito(prod);
      animarCarro();
    })
    .catch(function (error) {
      console.log(error);
    })

}

async function enviarCarrito(producto){
  
  const ui=document.getElementById("abrirModal").value //ui es el id del usuario

  axios.post(`/api/carrito/${ui}`, producto) //enviar id del comprador
    .then(function (response) {
      console.log(`Post de ${producto} al carro de usr: ${ui} hecho`);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function eliminarProdCarrito(idProd){

  const confirmar=confirm("¿Está seguro que desea eliminar el producto del carrito?");
  if (!confirmar) {return}

  const idCarro=document.getElementById("btnEliminaProducto").value
  axios.delete(`/api/carrito/${idCarro}/productos/${idProd}`, idProd) //enviar id del comprador
    .then(function (response) {
      console.log(`Delete de ${idProd} al carro de usr: ${idCarro} hecho`);
      location.reload(); //recarga la página después de eliminar un artículo
    })
    .catch(function (error) {
      console.log(error);
    });
}

function eliminarCarrito(idCarro){ //elimina el carrito completo

  const confirmar=confirm("¿Está seguro que desea cancelar el pedido?");
  if (!confirmar) {return}

  axios.delete(`/api/carrito/${idCarro}`, idCarro)
    .then(function (response) {
      console.log(`Delete de ${idCarro} exitoso`);
      document.getElementById("redirectCatalogo").click();
    })
    .catch(function (error) {
      console.log(error);
    });
} 
////////////////////////// Control del carrito //////////////////////////

///////////////////// Control de productos del catálogo //////////////////

function deleteProduct(idProd){
  
  const confirmar=confirm(`¿Está seguro que desea eliminar el producto del catálogo?`);
  if (!confirmar) {return};

  axios.delete(`/api/productos/${idProd}`, idProd) //enviar id del comprador
    .then(function (response) {
      console.log(`Delete de ${idProd} exitoso`);
      location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

///////////////////// Control de productos del catálogo //////////////////

function cambio(file){
  
  const $seleccionArchivos = document.querySelector("#imgRuta")
  const $imagenPrevisualizacion = document.querySelector("#imgProfile")
  const archivos = $seleccionArchivos.files
  const primerArchivo = archivos[0];
  const objectURL = URL.createObjectURL(primerArchivo);
  
  $imagenPrevisualizacion.src = objectURL;

}

function changeImg(imagen){
  document.getElementById("imgProfile").src=imagen;
}

function doSubmit(){
  const formulario=document.getElementById("formProfileImage")
  formulario.submit()
}

function doClick() {
  const el = document.getElementById("imgRuta");
  if (el) {
    el.click();
  }
}

function animarCarro(){
  document.getElementById("btnCarro").classList.add("animate__animated", "animate__bounce")
  setTimeout(() => {
    document.getElementById("btnCarro").classList.remove("animate__animated", "animate__bounce")
  }, 1000);
}