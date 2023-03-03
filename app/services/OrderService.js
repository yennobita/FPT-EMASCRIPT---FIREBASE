import axios from "axios";

class OrderService {
  constructor(realtimeDb, accessToken) {
    this.collectionName = "orders.json";
    this.realtimeDb = realtimeDb;
    this.accessToken = accessToken;
  }
  // thêm khách hàng vào
  insertUsers = async (entity) => {
    const res = await axios.post(this.realtimeDb + this.collectionName, entity);
    const insertedId = await res.data.name;
    return insertedId;
  };
  // select
  findAllUsers = async () => {
    const res = await axios.get(this.realtimeDb + this.collectionName);
    return res.data;
  };

  findById = async (id) => {
    const res = await axios.get(`${this.realtimeDb}orders/${id}.json`);
    return res.data;
  };

  // delete
  deleteProduct = async (id) => {
    const res = await axios.delete(`${this.realtimeDb}orders/${id}.json`);
    return res.data;
  };
}
export default OrderService;
