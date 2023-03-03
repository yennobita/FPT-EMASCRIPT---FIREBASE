import axios from "axios";

class CategoryService {
  constructor(realtimeDb, accessToken) {
    this.collectionName = "categories.json";
    this.realtimeDb = realtimeDb;
    this.accessToken = accessToken;
  }
  // add
  insertCategory = async (entity) => {
    const res = await axios.post(this.realtimeDb + this.collectionName, entity);
    const insertedId = await res.data.categoryName;
    return insertedId;
  };
  // select
  findAllCategories = async () => {
    const res = await axios.get(this.realtimeDb + this.collectionName);
    return res.data;
  };
  // update
  updateCategory = async (id, entity) => {
    const res = await axios.put(
      `${this.realtimeDb}categories/${id}.json`,
      entity
    );
    return res.data;
  };
  findById = async (id) => {
    const res = await axios.get(`${this.realtimeDb}categories/${id}.json`);
    return res.data;
  };

  findCategoryById = async (categoryId) => {
    const res = await axios.get(`${this.realtimeDb}categories/${categoryId}.json`);
    return res.data;
  };

  // delete
  deleteCategory = async (id) => {
    const res = await axios.delete(`${this.realtimeDb}categories/${id}.json`);
    return res.data;
  };
}
export default CategoryService;
