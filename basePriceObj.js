const fs = require('fs')

module.exports = {
  priceObject,
  fillObjects,
  simplifyingObjects,
  combineTwo,
  combineOne,
  combineWithNoOptions
}


function priceObject(data) {
  let typesWithPrices
  const output = data
  .reduce((typesWithPrices, base) => {
    typesWithPrices[base['product-type']] = typesWithPrices[base['product-type']] || [];
    return typesWithPrices
  }, {})
  fillObjects(data, output)
  simplifyingObjects(output)
  return output
}


function fillObjects(data, object) {
  let options = data['options']
  let obj = object

  data.forEach((item) => {
    let size = item.options.size
    let colour = item.options.colour
    let price = item['base-price']

    if (Object.keys(item.options).length === 2){
      let arr = combineTwo(data, price, size, colour)
      obj[item['product-type']].push(arr)
    } else if (Object.keys(item.options).length === 1){
      let arr = combineOne(data, price, size)
      obj[item['product-type']].push(arr)
    } else {
      let arr = combineWithNoOptions(data, price)
      obj[item['product-type']].push(arr)
    }
  })
return obj
}

function simplifyingObjects(output) {
  var name = ['hoodie', 'sticker', 'leggings']
  name.forEach((item, i) => {
    output[item] = output[item].reduce((object, value) => {
      return {...object, ...value}
    },{})
  })
}
function combineTwo(data, basePrice, array1, array2) {
  let obj = {}
    array1.forEach((element1) => {
      array2.forEach((element2) => {
        obj[element1 + element2] = basePrice
      })
    })
    return obj
}

function combineOne(data, basePrice, array1) {
  let obj = {}
    array1.forEach((element1) => {
        obj[element1] = basePrice;
      })
    return obj
}

function combineWithNoOptions(data, basePrice) {
  let obj = {}
        obj[""] = basePrice;
    return obj
}
