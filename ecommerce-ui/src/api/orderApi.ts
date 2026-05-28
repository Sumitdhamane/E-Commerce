import API from "./axios";

export const getOrders =
  async () => {

    const response =
      await API.get(
        "/user/orders"
      );                

    return response.data.data;
};