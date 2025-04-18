export function yandexEcommerceArray(action, products) {
  let ecomItems = ref([]);
  for (let i = 0; i < products.length; i++) {
    ecomItems.value.push({
      "category": products[i].brand,
      "brand": products[i].model ? products[i].model : null,
      "name": products[i].id,

      "id": products[i].id,
      "price": products[i].sale ? products[i].price - products[i].sale : products[i].price,
      "discount": products[i].sale ? products[i].sale : 0,
      "quantity": 1,
      "variant": products[i].color ? products[i].color : null
    })
  }

  if (process.client) {
    window.dataLayer.push({
      "ecommerce": {
        "currencyCode": "RUB",
        [`${action}`]: {
          "products": [
            ecomItems.value
          ]
        }
      }
    })
  }
}