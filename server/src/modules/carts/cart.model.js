// cart.model.js
export default class CartModel {
  constructor(userId, items = []) {
    this.userId = userId;
    this.items = items; // arrray of item { productId, productName, quantity, total}
    this.cartTotal = 0;
  }
}

// cart schema
// {
//   "_id": "cartId123",
//   "userId": "user123",
//   "items": [
//     {
//       "productId": "prod456",
//       "name": "Wireless Mouse",
//       "price": 599,
//       "quantity": 2,
//       "total": 1198
//     },
//     {
//       "productId": "prod789",
//       "name": "Mechanical Keyboard",
//       "price": 2499,
//       "quantity": 1,
//       "total": 2499
//     }
//   ],
//   "cartTotal": 3697
// }