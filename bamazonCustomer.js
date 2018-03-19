var mysql = require('mysql');
var inquirer = require("inquirer");
var consoletable = require("console.table");
var selectedItem;
var oldStock;
var productSale;
var totalCost;
var updateProductSale;


var connection = mysql.createConnection({
    host: "localhost",
    post: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

function startApp() {
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
            console.table(res);
            resolve(res);
        });
    });
}

startApp().then(function(data) {
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
                    console.table(res);
                    res.forEach(element => {
                        selectedItem = element.item_id;
                        oldStock = element.stock_quantity;
                    });
                    resolve();
                }
            );
        });
    }).then(function() {
        inquireSecondQuestion();
    });
}

function inquireSecondQuestion(product) {

    inquirer.prompt({
            name: "quantity",
            type: "input",
            message: "How many units of the product you would like to buy?"
        })
        .then(function(answer) {
            if (answer.quantity > oldStock) {
                console.log("\n");
                console.log("I'm sorry, we are out of stock.");
                console.log("\n");
                process.exit();
            } else {
                var units = answer.quantity;

                var newStock = oldStock - units;

                var sql = "UPDATE products set stock_quantity = ?  WHERE item_id = ?";

                var query = connection.query(sql, [newStock, selectedItem], function(err, res) {
                    console.log("\nThank you for placing an order with us.");
                    console.log("\n");
                    process.exit();
                });

                connection.query('Select * FROM products WHERE item_id = ?', [selectedItem], function(err, res) {
                    if (err) throw err;

                    for (var i = 0; i < res.length; i++) {
                        totalCost = units * res[i].price;
                        productSale = res[i].product_sales;

                        // console.log("product_sales:" + productSale);
                        console.log("Your total cost: $" + totalCost);
                    }
                    updateProductSale = (productSale + totalCost);
                    connection.query("UPDATE products set product_sales =?  WHERE item_id = ?", [updateProductSale, selectedItem], function(err, result) {});
                });
            }
        });
}