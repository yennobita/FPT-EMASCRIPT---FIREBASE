import FirebaseConstants from "./constants/FirebaseConstants";
import UrlHelper from "./helpers/UrlHelper";
import OrderService from "./services/OrderService";

$(document).ready(function () {
  const orderService = new OrderService(FirebaseConstants.RealtimeDB, "Token");
  const url = location.href;
  const urlHelper = new UrlHelper();
  const id = urlHelper.readParam(url, "id");
  try {
    const listIdOrder = $("#listIdOrder");
    orderService.findById(id).then((data) => {
      console.log(data);
      let list = "";
      list += `
                        <tr class="text-center">
                            <td scope="row">${id}</td>
                            <td>${data.customer_name}</td>   
                            <td>${data.customer_email}</td>
                            <td>${data.customer_address}</td>
                            <td>${data.customer_phone_number}</td>
                            <td>${data.status}</td>
                        </tr>  
        `;
      listIdOrder.append(list); // list ra html
    });
  } catch (error) {
    console.log(error);
  }
});
