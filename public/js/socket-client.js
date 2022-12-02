// Cliente
// Esto conecta al socket
const socket = io();

const txtMensaje = document.querySelector("#txt-mensaje");
const btnSubmit = document.querySelector("#btn-submit");

socket.on("connect", () => {
  console.log("conectado");
});

socket.on("disconnect", () => {
  console.log("desconectado ");
});

btnSubmit.addEventListener("click", () => {
  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id: "1876fsf",
    fecha: new Date().getTime()
  };

  // Id para enviar al id del destino, esto esta bueno
  socket.emit("enviar-mensaje", payload, (id) => {
    console.log("desde el server", id);
  });

  const payTest = {
    test: "test"
  };

  socket.emit("enviar-mensaje", payTest, (id) => {
    console.log("otro emites", payTest);
  });
});

// Esto permite que el cliente reciba el emit del server.
socket.on("enviar-mensaje", (payload) => {
  console.log(payload);
});

socket.on("send-delivery-petition", (payload) => {
  console.log(payload);
});
