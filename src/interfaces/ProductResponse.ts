export default interface ProductResponse {
  _id: string;
  name: string;
  price: number;
  image?: string;
  upc?: string;
  countInStock: number;
}
