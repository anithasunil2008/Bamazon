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
        startManagerApp();
    }
});

function startManagerApp() {
    inquirer
        .prompt({
            name: "command",
            type: "list",
            message: "What would you like to do??",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }).then(function(answer) {
            if (answer.command === "View Products for Sale") {
                viewProduct();
            } else if (answer.command === "View Low Inventory") {
                viewLowInventory();
            } else if (answer.command === "Add to Inventory") {
                addToInventory();
            } else if (answer.command === "Add New Product") {
                addNewProduct();
            }
        })
}

function viewProduct() {
    connection.query("Select * FROM products", function(err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        process.exit();
    });
}

function viewLowInventory() {
    connection.query("Select * FROM products WHERE stock_quantity between '0' and '20' ", function(err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        process.exit();
    })
}

function addToInventory() {
    inquirer
        .prompt([{
            type: "input",
            name: "id",
            message: "What is the id of the item you would like to add?"
        }, {
            type: "input",
            name: "quantity",
            message: "How much inventory would you like to add?"
        }]).then(function(answer) {

            var sql = "UPDATE products set stock_quantity =?  WHERE item_id = ?";

            var query = connection.query(sql, [answer.quantity, answer.id], function(err, result) {
                console.log("Updated!!");
                process.exit();
            });
        });
}

function addNewProduct() {
    inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is the name of the product you would like to add?"
        }, {
            type: "input",
            name: "department",
            message: "What is the department?"
        }, {
            type: "input",
            name: "price",
            message: "What is the price?"
        }, {
            type: "input",
            name: "quantity",
            message: "How much quantity would you like to add?"
        }]).then(function(answer) {
            var query = connection.query("INSERT INTO products SET ?", {
                product_name: answer.name,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity

            }, function(err, res) {
                if (err) throw err;
                console.log("\n");
                console.log(res.affectedRows + " Product Inserted \n");
                process.exit();
            });

            console.log(query.sql);
        });

}