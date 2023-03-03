export default class OrderDetails {
  constructor(order_id, product_id, quantity, unit_price) {
    this.order_id = order_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.unit_price = unit_price;
  }
}
