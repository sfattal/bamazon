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
        console.log(res)

        inquirer.prompt([
            {
                name: "purchaseID",
                type: "input",
                message: "What is the ID for the product you would like to purchase?",
            },
            {
                name: "purchaseQty",
                type: "input",
                message: "How many units would like to purchase?",
            }
        ])
    })
}