const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
	host     : 'localhost',
	port     : 3306,
	user     : 'root',
	password : 'Rc#032090',
	database : 'company_management'
});

connection.connect(function(err) {
	if (err) throw err;
	management();
});

function management() {
	inquirer
		.prompt({
			name    : 'addFeature',
			type    : 'list',
			message : 'Select the type of feature you would like to add:',
			choices : [ 'Department', 'Roles', 'Employee' ]
		})
		.then(function(answer) {
			if (answer.addFeature === 'Department') {
				addDepartment();
			} else if (answer.addFeature === 'Roles') {
				addRoles();
			} else if (answer.addFeature === 'Employee') {
				addEmployee();
			}
		});
}

// this function will add a new department to the database
function addDepartment() {
	inquirer
		.prompt([
			{
				name    : 'departmentName',
				type    : 'input',
				message : 'How would you like to name the new department?'
			}
		])
		.then(function(answer) {
			connection.query(
				'INSERT INTO departments SET ?',
				{
					name : answer.departmentName
				},
				function(err) {
					if (err) throw err;
					console.log(
						`You have created a new department named ${answer.departmentName} successfully`
					);
					management();
				}
			);
		});
}

// this function will add a new role to the database
function addRoles() {
	inquirer
		.prompt([
			{
				name    : 'title',
				type    : 'input',
				message : 'Whats the title of the role you would like to add?'
			},
			{
				name    : 'salary',
				type    : 'input',
				message : 'Whats the salary for this title?'
			},
			{
				name    : 'departmentId',
				type    : 'input',
				message : 'Whats the department ID#?'
			}
		])
		.then(function(answer) {
			connection.query(
				'INSERT INTO role SET ?',
				{
					title         : answer.title,
					salary        : answer.salary,
					department_id : answer.departmentId
				},
				function(err) {
					if (err) throw err;
					console.log(
						`You have created a new role title ${this.title} successfully`
					);
					management();
				}
			);
		});
}
