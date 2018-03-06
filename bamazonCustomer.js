var mysql = require('mysql');
var inquirer = require("inquirer");
var selectedItem;
var oldStock;

var connection = mysql.createConnection({
    host: "localhost",
    post: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

function StartApp() {
    console.log("\n");
    console.log("                                                                       ********************                     ");
    console.log("                                                                        Welcome to Bamazon                       ");
    console.log("                                                                       ********************                      ");
    console.log("\n");
    console.log("Choose the product you would like to buy");
    console.log("\n");

    return new Promise(function(resolve, reject) {
        connection.query("Select * FROM products", function(err, res) {
            if (err) reject(err);
            for (var i = 0; i < res.length; i++) {
                console.log("ID : " + res[i].item_id + " | " + "Name : " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " +
                    "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
                console.log("\n");
            }
            resolve(res);
        });
    });
}


StartApp().then(function(data) {

    inquireQuestions();
});

function inquireQuestions() {
    inquirer.prompt({
        name: "product_name",
        type: "input",
        message: "What is the ID of the product you would like to buy?"
    }).then(function(answer) {

        return new Promise(function(resolve, reject) {

            connection.query(
                'Select * FROM products WHERE item_id = ?', [answer.product_name],
                function(err, res) {
                    if (err) reject(err);
                    console.log("\n");
                    console.log("Your selected product details:");
                    console.log("\n");

                    res.forEach(element => {
                        selectedItem = element.item_id;
                        oldStock = element.stock_quantity;

                        console.log("ID : " + element.item_id + " | " + "Name : " + element.product_name + " | " + "Department Name: " + element.department_name + " | " +
                            "Price: " + element.price + " | " + "Quantity: " + element.stock_quantity);
                        console.log("\n");
                    });
                    resolve();
                }

            );

        });

    }).then(function() {
        inquireSecondQuestion();
    });
}

function inquireSecondQuestion() {
    if (oldStock == 0) {

        console.log("I'm sorry, we are out of stock.");
    } else {
        inquirer.prompt({
                name: "quantity",
                type: "input",
                message: "How many units of the product you would like to buy?"
            })
            .then(function(answer) {
                var units = answer.quantity;

                var newStock = oldStock - units;

                var sql = "UPDATE products set stock_quantity = ?  WHERE item_id = ?";

                var query = connection.query(sql, [newStock, selectedItem], function(err, res) {
                    console.log("\nThank you for placing an order with us.");
                });

            });
    }
}