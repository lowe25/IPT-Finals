const mysql = require('mysql')

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"order_db"
})

db.connect((error)=>{
    if(error){
        console.log("error connecting to database")
        throw error;
    }else{
        console.log("Succesfully Connected to database")
    }
})

module.exports = db;