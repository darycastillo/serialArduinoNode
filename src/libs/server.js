const { createServer } = require("http");
const fs = require("fs");
const path = require("path");

const file_path = path.join(__dirname, "../public/index.html");
const httpServer = createServer(handler);
//disponibilizar pagina html
function handler(req, res) {
  fs.readFile(file_path, function (err, data) {
    //leer html del directorio public
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" }); //lanzar error 404 si no hay contenido
      return res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" }); //Escribir el html
    res.write(data); //escribir data desde index.html
    return res.end();
  });
}

module.exports = {
  httpServer,
};