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
            if (answer.command === "View Products for Sale") {
                viewAll()
            }
            else if (answer.command === "View Low Inventory"){
                viewLow()
            }
            else if (answer.command === "Add to Inventory"){
                addInv()
            }
            else if (answer.command === "Add New Product"){
                addNew()
            }
            // switch(answer) {
            //     case "View Products for Sale":
            //     viewAll();
            //     break;

            //     case "View Low Inventory":
            //     viewLow();
            //     break;

            //     case "Add to Inventory":
            //     addInv();
            //     break;

            //     case "Add New Product":
            //     addNew();
            //     break;
            // }
        })

        function viewAll() {
            for (i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id + "\nName: " + res[i].product_name + "\nPrice: " + res[i].price + "\nInventory: " + res[i].stock_quantity + "\n-----------------------------------------------------------------------------")
            }
        }

        function viewLow() {
            var lowInv;
            for (var i = 0; i < res.length; i++) {
                if (res[i].stock_quantity < 5) {
                    lowInv = res[i];
                    // break
                }
                // console.log("ID: " + lowInv.item_id + "\nName: " + lowInv.product_name + "\nInventory: " + lowInv.stock_quantity + "\n-----------------------------------------------------------------------------")
                console.log(lowInv)
            }
            // for (var i = 0; i < lowInv.length; i++) {
            //     if (lowInv.stock_quantity < 5) {
            //         console.log("ID: " + lowInv.item_id + "\nName: " + lowInv.product_name + "\nInventory: " + lowInv.stock_quantity + "\n-----------------------------------------------------------------------------")
            //     }
            //     else {
            //         console.log("All products have 5 or more SKUs in stock")
            //     }
            // }
        }
        function addInv() {
            for (i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id + "\nName: " + res[i].product_name + "\nPrice: " + res[i].price + "\nInventory: " + res[i].stock_quantity + "\n-----------------------------------------------------------------------------")
            }
    
            inquirer.prompt([
                {
                    name: "purchaseID",
                    type: "input",
                    message: "What is the ID for the product you would like to add to?",
                },
                {
                    name: "purchaseQty",
                    type: "input",
                    message: "How many units would you like to add?",
                },
            ])
            
            .then(function(answer) {
                var chosenProduct;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === parseInt(answer.purchaseID)) {
                        chosenProduct = res[i];
                        break
                    }
                }
                if (chosenProduct.stock_quantity > answer.purchaseQty) {
                    var itemId = chosenProduct.item_id;
                    var newQuantity = parseInt(chosenProduct.stock_quantity) + parseInt(answer.purchaseQty);
                    var sql = `UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${itemId}`;
    
                    connection.query(sql, function (err, result) {
                        if (err) {
                            throw err;
                        }
                    });
                    console.log("Inventory updated" + " Total for the product: " + (parseInt(chosenProduct.stock_quantity) + parseInt(answer.purchaseQty)))
                }
            })
        }

        function addNew() {
            inquirer.prompt([
                {
                    name: "prodName",
                    type: "input",
                    message: "Name of the product you would like to add",
                },
                {
                    name: "prodDep",
                    type: "input",
                    message: "Department this product belong to",
                },
                {
                    name: "prodPrice",
                    type: "input",
                    message: "Price of the product",
                },
                {
                    name: "prodInv",
                    type: "input",
                    message: "Units in stock",
                },
            ])
            connection.query(
            "INSERT INTO products SET ?",
                {
                product_name: prodName.answer,
                department_name: prodDep.answer,
                price: prodPrice.answer,
                stock_quantity: prodInv.answer
                },
            )
        }
    })
}
// for (i = 0; i < res.length; i++) {
//     // console.log(res[i].stock_quantity)
//     if (res[i].stock_quantity < 5) {
//         console.log("ID: " + res[i].item_id + "\nName: " + res[i].product_name + "\nInventory: " + res[i].stock_quantity + "\n-----------------------------------------------------------------------------")
//     }
    
//     else {
//         console.log("All products have 5 or more SKUs in stock")
//     }
// }