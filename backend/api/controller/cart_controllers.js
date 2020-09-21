const db = require('../models/db_connection');
const { param } = require('../routers/cart_router');

//View Cart Table
exports.cartList = (req, res, next) => {

    var CartID = req.body.CartID;
    var Product = req.body.Product;
    var Price = req.body.Price;
    var Quantity = req.body.Quantity;

    if (CartID == "" || CartID == undefined || Product == "" || Product == undefined || Price == "" || Price == undefined || Quantity == "" || Quantity == undefined) {
        res.status(500).json({
            successful: false,
            message: "Invalid Credentials",
            error: "No Data"
        })
    } else {
        let searchUserSQL = `SELECT * FROM cart_tbl WHERE CartID = '${CartID}'`
        db.query(searchUserSQL, (err, rows, result) => {
            if (err) {
                console.log("Error in Selecting CartID = " + err)
                res.status(500).json({
                    successful: false,
                    message: err.message
                })
            } else {
                if (rows.length == 0) {
                    res.status(404).json({
                        successful: false,
                        message: "CartID Doesnt Exist"
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

//Create Cartlist
exports.createCart = (req, res, next) => {
    var Product = isNullOrUndefined(req.body.Product) ? "" : req.body.Product;
    var Price = isNullOrUndefined(req.body.Price) ? "" : req.body.Price;
    var Quantity = isNullOrUndefined(req.body.Quantity) ? "" : req.body.Quantity;

    console.log("Product backend" + Product);
    console.log(Price);
    console.log(Quantity);

    if (Product == "" || Price == "" || Quantity == "") {
        res.status(500).json({
            successful: false,
            message: "All fields must be inputted"
        })
    } else {
        let insert_sql = `INSERT INTO cart_tbl SET ?`
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

//Update Cartlist
exports.updateCartlist = (req, res, next)=>{
var CartID = isNullOrUndefined(req.params.Cart_ID) ? "" : req.params.Cart_ID;
var Product = isNullOrUndefined(req, body,Product) ? "" : req.body.Product;
var Price = isNullOrUndefined(req, body,Price) ? "" : req.body.Price;
var Quantity = isNullOrUndefined(req,body,Quantity) ? "" : req.body.Quantity;

if(OrderID == ""){
    res.status(500).json({
        successful: false,
        message: "Please Include an ID"
    })
}else{
    var updateSQL = `UPDATE cart_tbl SET Product = '${Product}', Price = '${Price}',  Quantity = '${Quantity}' 
    WHERE CartID = '${CartID}'`
    db.query(updateSQL, (err,rows,result)=>{
        if(err){
            res.status(500).json({
                successful:false,
                message:err
            })
        }else{
            if(rows.afftectedRows == 0){
             res.status(404).json({
                 successful:false,
                 message:"ID Doesnt Exist"
             })
            }else{
                res.status(200).json({
                    successful:false,
                    message:"Update Successful"
                })
            }
        }
    })
}

}

//Delete Cartlist
exports.deleteCartlist = (req,res,next)=>{

    var CartID = isNullOrUndefined(req.query.CartID) ? "" : req.query.CartID
    if(CartID == ""){
     res.status(500).json({
         successful: false,
         message: "Please Enter Valid CartID"
     })
    }else{
        let deleteSQL = `DELETE FROM cart_tbl WHERE CartID = '${CartID}'`;
        db.query(deleteSQL, (err, rows, result)=>{
            if(err){
                 res.status(500).json({
                     successful:false,
                     message:err
                 })
            }else{
                if(rows.afftectedRows == 0){
                    res.status(404).json({
                        successful: false,
                        message: "CartID Doesnt Exist"
                    })
                }else{
                    res.status(200).json({
                        successful: true,
                        message:`Succesfully Deleted ${CartID}`
                    })
                }
            }
        })
    }
}

//ViewAll
exports.cartList = (req, res, next) => {
    var searchAllSQL = `SELECT * FROM cart_tbl`
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

