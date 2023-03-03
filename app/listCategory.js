import FirebaseConstants from "./constants/FirebaseConstants";
import CategoryService from "./services/CategoryService";

$(document).ready(function () {
  const categoryService = new CategoryService(
    FirebaseConstants.RealtimeDB,
    "Token"
  );
  try {
    const listCategory = $("#listCategory");
    categoryService.findAllCategories().then((data) => {
      console.log(data);
      let list = "";
      for (const id in data) {
        const dev = data[id];
        list += `
                        <tr class="text-center">
                            <td scope="row">${id}</td>
                            <td>${dev.categoryName}</td>
                            <td>
                              <a class="btn btn-success" href="editCategory.html?id=${id}">Edit</a>
                              <a class="btn btn-primary" href="deleteCategory.html?id=${id}">Delete</a>
                            </td>
                        </tr>  
        `;
      }
      listCategory.append(list); // list ra html
    });
  } catch (error) {
    console.log(error);
  }
});
