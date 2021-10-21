var SerialPort = require('serialport');
var Delimiter = require('@serialport/parser-delimiter');

var port = new SerialPort('/dev/cu.usbmodem14201');

var parser = port.pipe(new Delimiter({ delimiter: '\n' }));

module.exports = { parser };
