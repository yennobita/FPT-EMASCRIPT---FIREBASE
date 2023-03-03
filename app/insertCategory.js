import FirebaseConstants from "./constants/FirebaseConstants";
import Category from "./models/Category";
import CategoryService from "./services/CategoryService";

$(document).ready(function () {
  $("#save").on("click", () => {
    const categoryIdCrlt = $("#categoryid");
    const categoryName = $("#categoryname").val();
    const cate = new Category(null, categoryName);
    const categoryService = new CategoryService(
      FirebaseConstants.RealtimeDB,
      "Token"
    );
    if (categoryName == "") {
      alert("Không Được Để Trống");
    } else {
      try {
        categoryService.insertCategory(cate).then((data) => {
          categoryIdCrlt.val(data);
        });
        alert("Thêm Danh Mục Thành Công");
        location.href = "/listCategory.html";
      } catch (error) {
        console.log(error);
      }
    }

    console.log(cate);
  });
});
