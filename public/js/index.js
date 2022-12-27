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

  const mensajesInput = mensajes
    .map(
      (mensaje) =>
      `<p class="mailMensaje boxMensajes">${mensaje.usrMail}</p> <p class="fechaMensaje boxMensajes">[${mensaje.date}]</p> <p class="txtMensaje boxMensajes"> ${mensaje.usrMsg}</p>`
    
    )
    .join("<br>");
  document.getElementById("msg").innerHTML = mensajesInput;
});

function limpiaChat() {  
  document.getElementById("inputChat").value="";
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


async function abrirModal(idProd){

  const prod={}

  axios.get(`/api/productos/prod/${idProd}`)
    .then(function (response) {

      prod.nombre=response.data[0].title
      prod.descripcion=response.data[0].description
      prod.codigo=response.data[0]._id
      prod.foto=response.data[0].thumbnail
      prod.precio=response.data[0].price
      prod.stock=response.data[0].stock
    
      console.log(prod);
      enviarCarrito(prod);
      animarCarro();
    })
    .catch(function (error) {
      console.log(error);
    })

}

function enviarCarrito(producto){
  
  const ui=document.getElementById("abrirModal").value
  
  console.log(`/api/carrito/${ui}`);
  
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
      location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

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