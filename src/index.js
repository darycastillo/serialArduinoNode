//lectura de puerto serial
const { parser } = require("./serialPort");

parser.on('data', function(data){
    data = data.toString().split(":");
    let humidityValue = data[1]
    console.log("Humedad del suelo: ", humidityValue);
  })