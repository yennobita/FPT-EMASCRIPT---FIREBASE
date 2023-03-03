import axios from "axios";

class OrderDetailService {
  constructor(realtimeDb, accessToken) {
    this.collectionName = "order_details.json";
    this.realtimeDb = realtimeDb;
    this.accessToken = accessToken;
  }
  // order id 
  insertOrder = async (entity) => {
    const res = await axios.post(this.realtimeDb + this.collectionName, entity);
    const insertedId = await res.data.name;
    return insertedId;
  };


  // select
  findAllOrder = async () => {
    const res = await axios.get(this.realtimeDb + this.collectionName);
    return res.data;
  };

  findById = async (id) => {
    const res = await axios.get(`${this.realtimeDb}products/${id}.json`);
    return res.data;
  };

  // delete
  deleteProduct = async (id) => {
    const res = await axios.delete(`${this.realtimeDb}products/${id}.json`);
    return res.data;
  };

}
export default OrderDetailService;
