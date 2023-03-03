import FirebaseConstants from "./constants/FirebaseConstants";
import OrderService from "./services/OrderService";
import OrderDetailService from "./services/OrderDetailService";
import Orders from "./models/Orders";
import OrderDetails from "./models/OrderDetails";

const cartItems = JSON.parse(localStorage.getItem("cartItems"));
// Hiển thị thông tin giỏ hàng
console.log(cartItems);
const listCart = $(".listCart");
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
  <div class="d-flex align-items-center pb-2 border-bottom">
    <a class="d-block flex-shrink-0 mr-2" href="#"
      ><img
        class="rounded-1"
        src="${huydev.product.productImg}"
        width="64"
        alt="${huydev.product.productName}"
    /></a>
    <div class="ps-1">
      <h6 class="widget-product-title">
        <a href="#">${huydev.product.productName}</a>
      </h6>
      <div
        class="d-flex justify-content-between align-items-center"
      >
        <span class="text-accent border-end pr-2 mr-2"
          >${formatNumber(huydev.product.productPrice * huydev.quantity)}</span
        ><span class="text-end">${huydev.quantity}</span>
      </div>
    </div>
  </div>
`;
}
$("#totalPrice").text("Tổng Tiền :" + " " + formatNumber(totalPrice));
listCart.append(list); // list ra html

// lấy tt người dùng và sản phẩm
$("#addOrder").on("click", () => {
  const orderService = new OrderService(FirebaseConstants.RealtimeDB, "Token");
  const orderDetailService = new OrderDetailService(
    FirebaseConstants.RealtimeDB,
    "Token"
  );
  const idOrder = $("#idOrder");
  const name = $("#name").val();
  const phone = $("#phone").val();
  const email = $("#email").val();
  const address = $("#address").val();
  const date = new Date().toISOString();

  //   Lấy thông tin khách hàng
  const orders = new Orders(
    null,
    name,
    address,
    email,
    phone,
    date,
    "Thành Công"
  );
  if (name == "" || phone == "" || email == "" || address == "") {
    alert("Không Được Để Trống");
  } else {
    try {
      orderService.insertUsers(orders).then((data) => {
        idOrder.val(data);
        for (const product of cartItems) {
          const orderDetail = new OrderDetails(
            data, // data idOrder
            product.productId,
            product.quantity,
            product.product.productPrice
          );
          orderDetailService.insertOrder(orderDetail).then((data) => {
            console.log(data);
          });
        }
        alert("Thanh Toán Thành Công");
        location.href = "/success.html";
      });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(orders);
});
