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
            console.log("ID: " + res[i].item_id + "\nName: " + res[i].product_name + "\nPrice: " + res[i].price + "\n-----------------------------------------------------------------------------")
        }

        inquirer.prompt([
            {
                name: "purchaseID",
                type: "input",
                message: "What is the ID for the product you would like to purchase?",
            },
            {
                name: "purchaseQty",
                type: "input",
                message: "How many units would you like to purchase?",
            },
        ])
        
        .then(function(answer) {
            // console.log(answer)
            // console.log(res)
            var chosenProduct;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(answer.purchaseID)) {
                    chosenProduct = res[i];
                    break
                }
            }
            if (chosenProduct.stock_quantity > answer.purchaseQty) {
                var itemId = chosenProduct.item_id;
                var newQuantity = chosenProduct.stock_quantity - answer.purchaseQty;
                var sql = `UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${itemId}`;

                connection.query(sql, function (err, result) {
                    if (err) {
                        throw err;
                    }
                });
                console.log("Order Successfully Placed!" + " Your total is: " + "$" + parseInt(answer.purchaseQty) * res[i].price)
            }
            else {
                console.log("We are sorry, your order could not be placed due to insufficient quantity in stock")
            }
        })
    })
}