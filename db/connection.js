const mysql = require('mysql2');


const db = mysql.createConnection({
    host: '127.0.0.1', // set port of the database connection
    user: 'root', // set username of the user using the database
    port: 3306,  // set port it can also be ommitted 
    password: 'Kim@2023', // set password of the user using the database
    database: 'employeetracker' // database name
}).promise();

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the employeetracker database.');
});

module.exports = db;
