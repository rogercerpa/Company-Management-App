const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
	host     : 'localhost',
	port     : 3306,
	user     : 'root',
	password : 'root',
	database : 'company_management'
});

connection.connect(function(err) {
	if (err) throw err;
	startApp();
});

function startApp() {
	inquirer
		.prompt({
			name    : 'start',
			type    : 'rawlist',
			message : 'What would you like to do?',
			choices : [
				'View all Employees',
				'View all Employees by department',
				'View all Employees by Manager',
				'Add New Employee',
				'Add New Department',
				'Add New Role',
				'Remove Employee',
				'Update Employee Role',
				'Update Employee Manager',
				'Quit'
			]
		})
		.then((answer) => {
			switch (answer.start) {
				case 'View all Employees':
					employeesList();
					break;
				case 'View all Employees by department':
					employeeDepart();
					break;
				case 'View all Employees by Manager':
					employeeManager();
					break;
				case 'Add New Employee':
					addEmployee();
					break;
				case 'Add New Department':
					addDepartment();
					break;
				case 'Add New Role':
					addRoles();
					break;
				case 'Remove Employee':
					removeEmp();
					break;
				case 'Update Employee Role':
					updateRole();
					break;
				case 'Update Employee Manager':
					updateMananger();
					break;
				case 'Quit':
					connection.end();
					break;
			}
		});
}
// view the list of all the employees
function employeesList() {
	const queryString = 'SELECT * FROM employee;';
	const query = connection.query(queryString, (err, res) => {
		if (err) throw err;
		res.forEach((dataRow) =>
			console.log(
				`Employee id: ${dataRow.id} || first name: ${dataRow.first_name} || last name: ${dataRow.last_name}`
			)
		);
		console.log('\nStart Over');
		startApp();
	});
}

// view the list of all the employees and departments
function employeeDepart() {
	inquirer
		.prompt({
			name    : 'selectDepart',
			type    : 'list',
			message :
				'Select the department you would like to see the list of employee:',
			choices : [ 'Sales', 'Engineering', 'Finance' ]
		})
		.then(function(answer) {
			switch (answer.selectDepart) {
				case 'Sales':
					salesEmp();
					break;
				case 'Engineering':
					engineeringEmp();
					break;
				case 'Finance':
					financeEmp();
					break;
			}
		});

	function salesEmp() {
		const queryString = 'SELECT * FROM employee WHERE role_id = 1;';
		const query = connection.query(queryString, (err, res) => {
			if (err) throw err;
			res.forEach((dataRow) =>
				console.log(
					`Employee id: ${dataRow.id} || first name: ${dataRow.first_name} || last name: ${dataRow.last_name}`
				)
			);
			console.log('\nStart Over');
			startApp();
		});
	}
	function engineeringEmp() {
		const queryString = 'SELECT * FROM employee WHERE role_id = 2;';
		const query = connection.query(queryString, (err, res) => {
			if (err) throw err;
			res.forEach((dataRow) =>
				console.log(
					`Employee id: ${dataRow.id} || first name: ${dataRow.first_name} || last name: ${dataRow.last_name}`
				)
			);
			console.log('\nStart Over');
			startApp();
		});
	}
	function financeEmp() {
		const queryString = 'SELECT * FROM employee WHERE role_id = 3;';
		const query = connection.query(queryString, (err, res) => {
			if (err) throw err;
			res.forEach((dataRow) =>
				console.log(
					`Employee id: ${dataRow.id} || first name: ${dataRow.first_name} || last name: ${dataRow.last_name}`
				)
			);
			console.log('\nStart Over');
			startApp();
		});
	}
}

// this function will add a new department to the database
function addDepartment() {
	inquirer
		.prompt([
			{
				name    : 'departmentName',
				type    : 'input',
				message : 'What the name of the new department?'
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
					console.log('\nStart Over');
					startApp();
				}
			);
		});
}

// this function will add a new role to the company database
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
				type    : 'list',
				message :
					'Select the department: 1. Sales || 2. Engineering || 3. Finance',
				choices : [ 1, 2, 3 ]
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
					console.log(`You have created a new role successfully`);
					console.log('\nStart Over');
					startApp();
				}
			);
		});
}

// this function will add a new employee to the company database
function addEmployee() {
	inquirer
		.prompt([
			{
				name    : 'firstName',
				type    : 'input',
				message : 'Whats the employee first name?'
			},
			{
				name    : 'lastName',
				type    : 'input',
				message : 'Whats the employee last name?'
			},
			{
				name    : 'role',
				type    : 'list',
				message :
					'Whats the employee role id? 1. Sales Manager || 2. Account Manager || 3. Application Engineer ',
				choices : [ 1, 2, 3 ]
			}
		])
		.then(function(answer) {
			connection.query(
				'INSERT INTO employee SET ?',
				{
					first_name : answer.firstName,
					last_name  : answer.lastName,
					role_id    : answer.role
				},
				function(err) {
					if (err) throw err;
					console.log(`You have added a new employee successfully`);
					console.log('\nStart Over');
					startApp();
				}
			);
		});
}

// this function will delete an employee from the company database
function removeEmp() {
	console.log('This option is under construction, come back later!!');
	console.log('\nStart Over');
	startApp();

	// inquirer.prompt([
	// 	{
	// 		name    : 'removeEmp',
	// 		type    : 'list',
	// 		message : 'Which Employee you would like to remove?',
	// 		choices : []
	// 	}
	// ]);
}

function updateRole() {
	console.log('This option is under construction, come back later!!');
	console.log('\nStart Over');
	startApp();

	// inquirer.prompt([
	// 	{
	// 		name    : 'updateRole',
	// 		type    : 'list',
	// 		message : 'Which Employee you would like to update the role to?',
	// 		choices : []
	// 	}
	// ]);
}

function updateMananger() {
	console.log('This option is under construction, come back later!!');
	console.log('\nStart Over');
	startApp();
	// inquirer.prompt([
	// 	{
	// 		name    : 'updateManager',
	// 		type    : 'list',
	// 		message : 'Which Employee you would like to update the Manager?',
	// 		choices : []
	// 	}
	// ])
}
