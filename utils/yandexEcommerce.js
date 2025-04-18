export function yandexEcommerce(action, product) {
  if (process.client) {
    window.dataLayer.push({
      "ecommerce": {
        "currencyCode": "RUB",
        [`${action}`]: {
          "products": [
            {
              "category": product.brand ? product.brand : null,
              "brand": product.model ? product.model : null,
              "name": product.id,

              "id": product.id,
              "price": product.sale ? product.price - product.sale : product.price,
              "discount": product.sale ? product.sale : 0,
              "quantity": 1,
              "variant": product.color ? product.color : null
            },
          ]
        }
      }
    })
  }
}