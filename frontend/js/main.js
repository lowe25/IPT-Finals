//const { response } = require("express")
//const { response } = require("express")
//const { response } = require("express")
//const { isNullOrUndefined } = require("util")

var quant;
var display;
var total;
var out;

//Quantity Counter
function qty() {
    var Price = document.getElementById("prod-price").innerHTML;
    quant = document.getElementById("quantity");
    display = quant.options[quant.selectedIndex].text;
    total = display * parseInt(Price);
    out = document.getElementById("tot").value = total;
}

//Add to Transation
function addTransaction() {
    console.log(tite);
    var insertValue = {
        Product: Product,
        Price: total,
        Quantity: display
    }
    var url = "http://localhost:8000/api/orders/create"
    var content = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(insertValue)
    }
    api_client(url, content, (response) => {
        console.log("Response from API" + JSON.stringify(response))
        if (response.successful == true) {
            document.getElementById("outputJSON").innerHTML = JSON.stringify
                (response.message)
        } else {
            var errorMessage = isNullOrUndefined(response.message) ? "" : response.message
            document.getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
        }
    })
}

//View Transaction History
function viewTransaction() {
    var tbl = document.getElementById("tableId").style.display = "";
    var url = "http://localhost:8000/api/orderList"
    var content = {
        method: 'GET'
    }
    api_client(url, content, (response, status) => {
        console.log("Response from api" + JSON.stringify(response))
        if (response.successful == true) {
            var tableString = ""
            for (var index in response.data) {
                tableString +=
                    `
                <div class="scroll">
                <table id="tableId">
                <tr>
                <th>OrderID</th>
                <th>Product</th>
                <th>Price</td>
                <th>Quantity</th>
                </tr>
                <tr>
                <td>${response.data[index].OrderID}</td>
                <td>${response.data[index].Product}</td>
                <td>${response.data[index].Price}</td>
                <td>${response.data[index].Quantity}</td>
                </tr>
              </table>
              </div>
                `
            }
            document.getElementById("tableId").innerHTML = tableString
        } else {
            document.getElementById("outputJSON").innerHTML = `Error ${status}
            ${response.error.message}`
        }
    })
}

//Hide Transaction
function hideTransact() {
    //var tbl = document.getElementById("tableId").style.display = "none";
    var td = document.getElementById("tableId").style.display = "none";
}

//View Cart List
function viewCart() {
    var tbl = document.getElementById("outputJSON").style.display = "";
    var url = "http://localhost:8000/api/cartList"
    var content = {
        method: 'GET'
    }
    api_client(url, content, (response, status) => {
        console.log("Response from api" + JSON.stringify(response))
        if (response.successful == true) {
            var tableString = ""
            for (var index in response.data) {
                tableString +=
                    `
                <div class="scroll">
                <table id="table">
                <tr>
                <th>CardID</th>
                <th>Product</th>
                <th>Price</td>
                <th>Quantity</th>
                </tr>
                <tr>
                <td>${response.data[index].CartID}</td>
                <td>${response.data[index].Product}</td>
                <td>${response.data[index].Price}</td>
                <td>${response.data[index].Quantity}</td>
                </tr>
              </table>
              </div>
                `
            }
            var tite = document.getElementById("outputJSON").innerHTML = tableString
            var table = document.getElementById('table');
            for (var i = 1; i < table.rows.length; i++) {
                table.rows[i].onclick = function () {
                    //rIndex = this.rowIndex;
                    document.getElementById("txt-id").value = this.cells[0].innerHTML;
                    document.getElementById("txt-product").value = this.cells[1].innerHTML;
                    document.getElementById("txt-price").value = this.cells[2].innerHTML;
                    document.getElementById("txt-quantity").value = this.cells[3].innerHTML;
                };
            }

        } else {
            document.getElementById("outputJSON").innerHTML = `Error ${status}
            ${response.error.message}`
        }
    })
}


//Add To Cart
function addCart() {
    var Product = document.getElementById("prod-name").innerHTML;
    var insertValue = {
        Product: Product,
        Price: total,
        Quantity: display
    }
    var url = "http://localhost:8000/api/cart/create"
    var content = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(insertValue)
    }
    api_client(url, content, (response) => {
        console.log("Response from API" + JSON.stringify(response))
        if (response.successful == true) {
            document.getElementById("outputJSON").innerHTML = JSON.stringify
                (response.message)
        } else {
            var errorMessage = isNullOrUndefined(response.message) ? "" : response.message
            document.getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
        }
    })
}

//Update Cart
function updateCart() {
}

//Delete Cart
function deleteCart() {
    var cID = document.getElementById("txt-id").value;
    var url = `http://localhost:8000/api/cart/delete'${cID}'`

    var deleteValue = {
        CartID : cID
    }
    var content = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteValue)
    }
    api_client(url, content, (response) => {
        console.log("Response from API" + JSON.stringify(response))
        if (response.successful == true) {
            document.getElementById("outputJSON").innerHTML = JSON.stringify
                (response.message)
        } else {
            var errorMessage = isNullOrUndefined(response.message) ? "" : response.message
            document.getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
        }
    })
}

//Hide Cart
function hideCart() {
    var td = document.getElementById("table").style.display = "none";
}
var title;
var price

//TITE TITE
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    addItemToCart(title, price)
    updateCartTotal()
}

function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn-remove btn-danger" type="button">Remove</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    //prod = document.getElementsByClassName("cart-item-title");
}

//
var priceElement;
var quantityElement;
var quantity
var total;
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
      total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

//Add To Transaction
function addTransaction() {
    //Quantity Shits
    var insertValue = {
        Product: title,
        Price: total,
        Quantity: quantity
    }
    var url = "http://localhost:8000/api/orders/create"
    var content = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(insertValue)
    }
    api_client(url, content, (response) => {
        console.log("Response from API" + JSON.stringify(response))
        if (response.successful == true) {
            var final = document.getElementById("ordered-complete").innerHTML = "Ordered Complete";
            document.getElementById("outputJSON").innerHTML = JSON.stringify
                (response.message)
        } else {
            var errorMessage = isNullOrUndefined(response.message) ? "" : response.message
            document.getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
        }
    })
}

//Check If Input is Null
function isNullOrUndefined(data) {
    return (data == null || data == "null" || data == "" || (typeof data == "undefined"));
}
