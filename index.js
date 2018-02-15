const enmapi = require('enmapi');

enmapi.server.setConfig({
  Level: process.env.NODE_ENV || 'development',
  Name: process.env.NAME || 'Eviluators Admin Api',
  Host: process.env.HOST || 'http://localhost',
  Port: process.env.PORT || 3333,
  DatabaseName: process.env.DBNAME || 'Eviluators Admin DB',
  DatabaseURI:
    process.env.DB_URI ||
    'mongodb://gJKS4LFEnsSFDg2lx2JQ28XwvSxgi62H:wwDfyiCMQDHCc1b0KGCwGflRCR59Eiyr@ds235778.mlab.com:35778/eviluators-admin-api'
});
enmapi.server.start();

//process.env.JWT_SECRET;
