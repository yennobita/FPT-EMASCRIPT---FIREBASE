export default class Orders {
  constructor(
    id,
    customer_name,
    customer_address,
    customer_email,
    customer_phone_number,
    created_date,
    status
  ) {
    this.id = id;
    this.customer_name = customer_name;
    this.customer_address = customer_address;
    this.customer_email = customer_email;
    this.customer_phone_number = customer_phone_number;
    this.created_date = created_date;
    this.status = status;
  }
}
