import API from "./axios";

export const getProducts = async () => {

  const response = await API.get("/products");

//   console.log(response.data);

  return response.data.data;
};

export const getProductById = async (
  id: string
) => {

  const response =
    await API.get(`/products/${id}`);

  return response.data.data;
};