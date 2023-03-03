export default class Product {
  constructor(
    productId,
    categoryId,
    productName,
    productImg,
    productPrice,
    productDesc
  ) {
    this.productId = productId;
    this.categoryId = categoryId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productImg = productImg;
    this.productDesc = productDesc;
  }
}
