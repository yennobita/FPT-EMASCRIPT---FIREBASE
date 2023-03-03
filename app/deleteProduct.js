import FirebaseConstants from "./constants/FirebaseConstants";
import UrlHelper from "./helpers/UrlHelper";
import ProductService from "./services/ProductService";


$(document).ready(function () {
  const productService = new ProductService(
    FirebaseConstants.RealtimeDB,
    "Token"
  );
  const url = location.href;
  const urlHelper = new UrlHelper();
  const id = urlHelper.readParam(url, "id");

  productService.deleteProduct(id).then((data) => {
    alert("Delete Thành Công");
    location.href = "/listProduct.html";
  });
});
