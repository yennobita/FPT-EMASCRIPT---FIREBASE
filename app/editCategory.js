import FirebaseConstants from "./constants/FirebaseConstants";
import UrlHelper from "./helpers/UrlHelper";
import Category from "./models/Category";
import CategoryService from "./services/CategoryService";

$(document).ready(function () {
  const categoryService = new CategoryService(
    FirebaseConstants.RealtimeDB,
    "Token"
  );
  const url = location.href;
  const urlHelper = new UrlHelper();
  const id = urlHelper.readParam(url, "id");

  const categoryIdCrlt = $("#categoryid");
  const nameCrlt = $("#categoryname");
  categoryService.findById(id).then((data) => {
    categoryIdCrlt.val(id);
    nameCrlt.val(data.categoryName);
  });

  $("#update").on("click", () => {
    const cate = new Category(null, nameCrlt.val());
    if (nameCrlt == "") {
      alert("Không Được Để Trống");
    } else {
      try {
        categoryService
          .updateCategory(categoryIdCrlt.val(), cate)
          .then((data) => {
            // categoryIdCrlt.val(data);
            alert("Update Thành Công");
         
              location.href = "/listCategory.html";

          });
      } catch (error) {
        console.log(error);
      }
    }

    console.log(cate);
  });
});
