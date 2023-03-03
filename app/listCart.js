const cartItems = JSON.parse(localStorage.getItem("cartItems"));
// Hiển thị thông tin giỏ hàng
console.log(cartItems);
const listCart = $("#cartItems");
let list = "";
let totalPrice = 0;
cartItems.forEach((item) => {
  totalPrice = totalPrice + item.product.productPrice * item.quantity;
});
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
for (const huydev of cartItems) {
  list += `
    <tr class="text-center">
        <td scope="row">${huydev.productId}</td>
        <td><img width="150" src="${huydev.product.productImg}"></td>
        <td>${huydev.product.productName}</td>
        <td>${huydev.quantity}</td>
        <td>${formatNumber(huydev.product.productPrice * huydev.quantity)}</td>
        <td>
          <button class="btn btn-primary removeButton" data-productid="${
            huydev.productId
          }">Delete</a>
        </td>
    </tr>  

`;
}
$("#totalPrice").text("Tổng Tiền :" + " " + formatNumber(totalPrice));
listCart.append(list); // list ra html

$(".removeButton").on("click", function () {
  const productId = $(this).data("productid");
  console.log(productId);
  const index = cartItems.findIndex((item) => item.productId === productId);
  // console.log(index);
  if (index !== -1) {
    cartItems.splice(index, 1); // xóa sản phẩm trên localstorrge
    // console.log(cartItems.splice(index, 1));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    $(this).closest("tr").remove(); // xóa trên trình duyệt người dùng
    totalPrice = totalPrice - cartItems[index].product.productPrice;
    $("#totalPrice").text("Tổng Tiền :" + " " + formatNumber(totalPrice)); // cập nhật lại tổng tiền
  }
});
