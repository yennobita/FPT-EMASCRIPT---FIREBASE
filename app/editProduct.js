import FirebaseConstants from "./constants/FirebaseConstants";
import UrlHelper from "./helpers/UrlHelper";
import Product from "./models/Product";
import CategoryService from "./services/CategoryService";
import ProductService from "./services/ProductService";

$(document).ready(function () {
  const categoryService = new CategoryService(
    FirebaseConstants.RealtimeDB,
    "Token"
  );
  const productService = new ProductService(
    FirebaseConstants.RealtimeDB,
    "Token"
  );
  const categoryIdCrlt = $("#categoryId");
  categoryService.findAllCategories().then((data) => {
    let list = "";
    for (const key in data) {
      const dev = data[key];
      list += `<option selected value='${key}'>${key} + ${dev.categoryName}</option>`;
    }
    categoryIdCrlt.append(list);
  });

  const url = location.href;
  const urlHelper = new UrlHelper();
  const id = urlHelper.readParam(url, "id");

  const productIdCrlt = $("#productId");
  const categoryId = $("#categoryid");
  const productName = $("#productName");
  const productImg = $("#productImg");
  const productPrice = $("#productPrice");
  const productDesc = $("#productDesc");
  productService.findById(id).then((data) => {
    productIdCrlt.val(id);
    categoryId.val(data.categoryId);
    productName.val(data.productName);
    productImg.val(data.productImg);
    productPrice.val(data.productPrice);
    productDesc.val(data.productDesc);
  });

  $("#update").on("click", () => {
    const products = new Product(
      null,
      categoryIdCrlt.val(),
      productName.val(),
      productImg.val(),
      productPrice.val(),
      productDesc.val()
    );
     console.log(products);
    if (
      productName == "" ||
      productImg == "" ||
      productPrice == "" ||
      productDesc == ""
    ) {
      alert("Không Được Để Trống");
    } else {
      try {
        productService.updateProduct(productIdCrlt.val(), products).then((data) => {
          console.log(data);
          alert("Update Thành Công");

          location.href = "/listProduct.html";
        });
      } catch (error) {
        console.log(error);
      }
    }

    console.log(products);
  });
});
