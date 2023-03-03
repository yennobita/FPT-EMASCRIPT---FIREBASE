import FirebaseConstants from "./constants/FirebaseConstants";
import ProductService from "./services/ProductService";

$(document).ready(function () {
  const productService = new ProductService(
    FirebaseConstants.RealtimeDB,
    "Token"
  );
  try {
    const listProduct = $("#listProduct");
    productService.findAllProducts().then((data) => {
      console.log(data);
      let list = "";
      for (const id in data) {
        console.log(data)
        const dev = data[id];
        list += `
                        <tr class="text-center">
                            <td scope="row">${id}</td>
                            <td>${dev.categoryId}</td>
                            <td>${dev.productName}</td>
                            <td><img src="${dev.productImg}" width="150"></td>
                            <td>${dev.productPrice}</td>
                            <td>${dev.productDesc}</td>
                            <td>
                              <a class="btn btn-success" href="editProduct.html?id=${id}">Edit</a>
                              <a class="btn btn-primary" href="deleteProduct.html?id=${id}">Delete</a>
                            </td>
                        </tr>  
        `;
      }
      listProduct.append(list); // list ra html
    });
  } catch (error) {
    console.log(error);
  }
});
