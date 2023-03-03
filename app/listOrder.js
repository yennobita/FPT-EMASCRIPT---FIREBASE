import FirebaseConstants from "./constants/FirebaseConstants";
import OrderDetailService from "./services/OrderDetailService";
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
$(document).ready(function () {
  const orderDetailService = new OrderDetailService(
    FirebaseConstants.RealtimeDB,
    "Token"
  );
  try {
    const listOrder = $("#listOrder");
    orderDetailService.findAllOrder().then((data) => {
      console.log(data);
      let list = "";
      for (const id in data) {
        const dev = data[id];
        list += `
                        <tr class="text-center">
                            <td scope="row">${id}</td>
                            <td>
                                <a class="btn btn-primary" href="listIdOrder.html?id=${
                                  dev.order_id
                                }">Khách Hàng</a>
                            </td>   
                            <td>
                                <a class="btn btn-success" href="listIdProduct.html?id=${
                                  dev.product_id
                                }">Sản Phẩm</a>
                            </td>
                            <td>${dev.quantity}</td>
                            <td>${formatNumber(dev.unit_price)}</td>
                        </tr>  
        `;
      }
      listOrder.append(list); // list ra html
    });
  } catch (error) {
    console.log(error);
  }
});
