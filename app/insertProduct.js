import FirebaseConstants from "./constants/FirebaseConstants";
import Category from "./models/Category";
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

      list += `<option value='${key}'>${key} + ${dev.categoryName}</option>`;
    }
    categoryIdCrlt.append(list);
  });

  $("#save").on("click", () => {
    const productId = $("#productId").val();
    const productName = $("#productName").val();
    const productImg = $("#productImg").val();
    const productPrice = $("#productPrice").val();
    const productDesc = $("#productDesc").val();
    const product = new Product(
      null,
      categoryIdCrlt.val(),
      productName,
      productImg,
      productPrice,
      productDesc
    );

    if (productName == "") {
      insertProduct.js;
      alert("Không Được Để Trống");
    } else {
      try {
        productService.insertProduct(product).then((data) => {
          productId.val(data);
        });
        alert("Thêm Sản Phẩm Thành Công");
        location.href = "/listProduct.html";
      } catch (error) {
        console.log(error);
      }
    }

    console.log(product);
  });
});
