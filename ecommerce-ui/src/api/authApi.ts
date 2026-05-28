import API from "./axios";

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (
  data: LoginData
) => {

  const response =
    await API.post(
      "/auth/login",
      data
    );

  return response.data;
};