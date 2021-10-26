const { parser } = require("./libs/serialPort"); //lectura de puerto serial
const { httpServer } = require("./libs/server"); //crear server http
const { createSocket } = require("./libs/socket"); //crear socket.io

//creacion del socket a partir del http server
const io = createSocket(httpServer);

//lectura de puerto serial en arduino
parser.on("data", function (data) {
  data = data.toString().split(":");
  let humidityValue = data[1];
  console.log("Humedad del suelo: ", humidityValue);
  //se obtiene la humedad del suelo y se envia el valor por el socket hacia todos los clientes
  io.sockets.emit("humidityValue", { value: humidityValue });
});

//conexion del cliente
io.sockets.on("connection", function (socket) {
  console.log("Se ha establecido la conexion al socket");
  let lightvalue = 0;
  socket.on("light", function (data) {
    lightvalue = data;
    if (lightvalue) {
      console.log("socket", lightvalue);
    }
  });
});

//se levanta el servidor en el puerto 8080
httpServer.listen(8080, () => console.log("Servidor corriendo en puerto 8080"));
