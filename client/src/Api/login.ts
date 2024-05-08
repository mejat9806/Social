import axios, { AxiosError } from "axios";

export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const data = await axios.post("user/login", { email, password });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      } else {
        throw axiosError.message;
      }
    } else {
      throw error;
    }
  }
};
