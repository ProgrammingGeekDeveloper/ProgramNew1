
const connection = require("./connection.js");

module.exports = {
  viewAllDepartments: function () {
    return connection.query("SELECT * FROM department");
  },
  viewAllRoles: function () {
    return connection.query(
      "SELECT role.id, role.title, department.name AS department_name, role.salary FROM role JOIN department ON role.department_id = department.id"
    );
  },
  viewAllEmployees: function () {
    return connection.query(
      'SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS employee_name, role.title, department.name AS department_name, COALESCE(CONCAT(m.first_name, " ", m.last_name), "none") AS manager_name, role.salary ' +
        "FROM employee e " +
        "LEFT JOIN role ON e.role_id = role.id " +
        "LEFT JOIN department ON role.department_id = department.id " +
        "LEFT JOIN employee m ON e.manager_id = m.id"
    );
  },
  addDepartment: function (departmentName) {
    return connection.query(
      "INSERT INTO department (name) VALUES (?)",
      departmentName
    );
  },
  addRole: function (role) {
    return connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [role.title, role.salary, role.department_id]
    );
  },
  addEmployee: function (employee) {
    return connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [
        employee.first_name,
        employee.last_name,
        employee.role_id,
        employee.manager_id,
      ]
    );
  },
  updateEmployeeRole: function (updatedEmployee) {
    return connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
      updatedEmployee.role_id,
      updatedEmployee.id,
    ]);
  },
  getAllRoles: function () {
    return connection.query("SELECT * FROM role");
  },
  getAllEmployees: function () {
    return connection.query("SELECT * FROM employee");
  },
};
