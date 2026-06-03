import API from "./axios";

// Get All Products
export const getProducts = async () => {
  const response = await API.get("/products");

  return response.data.data || [];
};

// Get Product By ID
export const getProductById = async (id: string) => {
  const response = await API.get(`/products/${id}`);

  return response.data.data;
};
