const db = require('../models/db_connection')

//View Orderlist
exports.orderList = (req, res, next) => {

    var OrderID = req.body.OrderID;
    var Product = req.body.Product;
    var Price = req.body.Price;
    var Quantity = req.body.Quantity;

    if (OrderID == "" || OrderID == undefined || Product == "" || Product == undefined || Price == "" || Price == undefined || Quantity == "" || Quantity == undefined) {
        res.status(500).json({
            successful: false,
            message: "Invalid Credentials",
            error: "No Data"
        })
    } else {
        let searchUserSQL = `SELECT * FROM order_tbl WHERE OrderID = '${OrderID}'`
        db.query(searchUserSQL, (err, rows, result) => {
            if (err) {
                console.log("Error in Selecting OrderID = " + err)
                res.status(500).json({
                    successful: false,
                    message: err.message
                })
            } else {
                if (rows.length == 0) {
                    res.status(404).json({
                        successful: false,
                        message: "Data Doesnt Exist"
                    })
                } else {
                    console.log("Rows Result =" + JSON.stringify(rows))
                    if (rows[0].OrderID == OrderID) {
                        res.status(200).json({
                            successful: true,
                            message: "Successful"
                        })
                    } else {
                        res.status(500).json({
                            successful: false,
                            message: "Incorrect"
                        })
                    }
                }
            }
        })
    }
}

//Crate Orderlist
exports.createOrder = (req, res, next) => {
    //var OrderID = isNullOrUndefined(req.body.OrderID) ? "" : req.body.OrderID;
    var Product = isNullOrUndefined(req.body.Product) ? "" : req.body.Product;
    var Price = isNullOrUndefined(req.body.Price) ? "" : req.body.Price;
    var Quantity = isNullOrUndefined(req.body.Quantity) ? "" : req.body.Quantity;

    console.log("Product backend"+Product);
    console.log(Price);
    console.log(Quantity);

    if (Product == "" || Price == "" || Quantity == "") {
        res.status(500).json({
            successful: false,
            message: "All fields must be inputted"
        })
    } else {
        let insert_sql = `INSERT INTO order_tbl SET ?`
        console.log("Insert SQL =" + insert_sql);

        var insertValue = {
            Product: Product,
            Price: Price,
            Quantity: Quantity
        }
        db.query(insert_sql, insertValue, (err, result) => {
            if (err) {
                console.log("Error in Creating Order " + err);
                throw err
            } else {
                res.status(200).json({
                    successful: true,
                    message: "Successfully Ordered"
                })
            }
        })
    }
}

//ViewAll
exports.orderList = (req, res, next) => {
    var searchAllSQL = `SELECT * FROM order_tbl`
    db.query(searchAllSQL, (err, rows, result) => {
        if (err) throw err
        res.status(200).json({
            successful: true,
            message: `Found Results (${rows.length})`,
            data: rows
        })
    })
}

//Check for NULL inputs
function isNullOrUndefined(data) {
    return (data == null || data == "null" || data == "" || (typeof data == "undefined"));
}


