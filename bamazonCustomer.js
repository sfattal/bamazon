var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        console.log("Found " + res.length + " products")
        for (i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Name: " + res[i].product_name + " | Price: " + res[i].price)
        }

        inquirer.prompt([
            {
                name: "purchaseID",
                type: "input",
                // choices: function() {
                //     var productArray = [];
                //     for (var i = 0; i < res.length; i++) {
                //         productArray.push(res.item_id);
                //     }
                //     return productArray;
                // },
                message: "What is the ID for the product you would like to purchase?",
            },
            {
                name: "purchaseQty",
                type: "input",
                message: "How many units would you like to purchase?",
            },
        ])
        
        .then(function(answer) {
            var chosenProduct;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === answer.purchaseID) {
                    chosenProduct = res[i];
                }
                console.log(res[i])
                if (chosenProduct.stock_quantity > answer.purchaseQty) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (stock_quantity-answer.purchaseQty)
                            }
                        ]
                    )
                    console.log("Order Successfully Placed!" + " Your total is: " + "$" + parseInt(purchaseQty*res[i].price))
                }
                else {
                    console.log("We are sorry, your order could not be placed due to insufficient quantity in stock")
                }
            }
        })
    })
}