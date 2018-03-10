var mysql = require('mysql');
var inquirer = require("inquirer");
var consoletable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
    post: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect((err) => {
    if (err) { throw err; } else {
        console.log("Connected as ID: " + connection.threadId);
        startSupervisorApp();
        // productSale();
    }
});

function startSupervisorApp() {
    inquirer.prompt({
        type: 'list',
        name: 'view',
        message: 'What do you want to do',
        choices: ['View Product Sales by Department', 'Create New Department']
    }).then(function(answer) {
        if (answer.view === 'View Product Sales by Department') {
            viewDepartment();
        } else {
            newDepartment();
        }
    });
}

function newDepartment() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the name of the new department?"
        },
        {
            type: "input",
            name: "overhead",
            message: "What is the overhead cost for this department?"
        }
    ]).then(function(answer) {
        var query = connection.query("INSERT INTO departments SET ?", {
            department_name: answer.name,
            over_head_costs: answer.overhead
        }, function(err, res) {
            if (err) throw err;
            console.log("\n");
            console.log(res.affectedRows + " Product Inserted \n");
        });
    });
}

function viewDepartment() {
    var comboQuery = "select departments.department_id, departments.department_name, departments.over_head_costs, sum(products.product_sales) as total_sales, (  sum(products.product_sales) - departments.over_head_costs ) total_profit from products inner join departments on products.department_name = departments.department_name group by products.department_name, departments.department_id;"
    connection.query(comboQuery, function(err, response) {
        if (err) throw err;
        console.log("\n");
        console.table(response);
    });
}