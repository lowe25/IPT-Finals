const http = require('http')
const app = require ('./app')
const db = require('./api/models/db_connection')

const server = http.createServer(app);
const port = 8000;

server.listen(port, ()=>{
console.log(`Listerning to port ${port}`);
})