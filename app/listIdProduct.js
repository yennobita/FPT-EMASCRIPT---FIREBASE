import FirebaseConstants from "./constants/FirebaseConstants";
import UrlHelper from "./helpers/UrlHelper";
import ProductService from "./services/ProductService";
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
$(document).ready(function () {
  const productService = new ProductService(
    FirebaseConstants.RealtimeDB,
    "Token"
  );
  const url = location.href;
  const urlHelper = new UrlHelper();
  const id = urlHelper.readParam(url, "id");
  try {
    const listIdProduct = $("#listIdProduct");
    productService.findById(id).then((data) => {
      console.log(data);
      let list = "";
      list += `
                        <tr class="text-center">
                            <td scope="row">${id}</td>
                            <td>${data.categoryId}</td>   
                            <td>${data.productName}</td>
                            <td><img src="${data.productImg}" width="150"></td>
                            <td>${formatNumber(data.productPrice)}</td>
                            <td>${data.productDesc}</td>
                        </tr>  
        `;
        listIdProduct.append(list); // list ra html
    });
  } catch (error) {
    console.log(error);
  }
});
