const fs = require('fs');
const path = require('path');
const db = require('../db/connection.js');

function seedTable(tableName, fileName) {
    const filePath = path.resolve(__dirname, fileName);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Promise.all(data.map(row => {
        const columns = Object.keys(row).join(', ');
        const values = Object.values(row).map(value => db.escape(value)).join(', ');
        const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
        return db.query(sql);
    }));
}
//  generate data
seedTable('department', 'departments.json')
    .then(() => seedTable('role', 'roles.json'))
    .then(() => seedTable('employee', 'employees.json'))
    .then(() => {
        console.log('Database seeded successfully!');
        db.end();
    })
    .catch(error => {
        console.error(`An error occurred: ${error.message}`);
        db.end();
    });