var fs = require('fs')

module.exports = {
  individualItemPrice,
  findMatches
}

function findMatches(cart, base) {
  for (i = 0; i <cart.length; i++) {
    const matches = base.filter((stock, index) => {
      if (stock['product-type'] === cart[i]['product-type']) {
        if (stock['product-type'] === "hoodie" && (stock.options.colour == cart[i].options.colour)){
          if (stock.options.size[i] == cart[i].options.size) {
            individualItemPrice(stock, cart[i])
          }
        } else if (stock['product-type'] != "hoodie"){
          if (stock.options.size == cart[i].options.size){
            individualItemPrice(stock, cart[i])
          }
        }
      }
    })
  }
}


function individualItemPrice (base, cart) {
      let basePrice = base['base-price'];
      let artistMarkup = cart['artist-markup'];
      let quantity = cart.quantity;
      let total = Math.round((basePrice / 100 * artistMarkup + basePrice) * quantity);
      return console.log(cart.quantity + " " + base['product-type'] + " = " + total)
}