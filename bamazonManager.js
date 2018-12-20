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

        inquirer.prompt({
            name: "command",
            type: "rawlist",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            message: "Select an option",
        })
        .then(function(answer) {
            switch(answer) {
                case "View Products for Sale":
                viewAll();
                break;

                case "View Low Inventory":
                viewLow();
                break;

                case "Add to Inventory":
                addInv();
                break;

                case "Add New Product":
                addNew();
                break;
            }
        })

    })
}

function viewAll() {
    for (i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].item_id + " | Name: " + res[i].product_name + " | Price: " + res[i].price + " | Inventory: " + res[i].stock_quantity)
    }
}