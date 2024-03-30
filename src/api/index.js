import { getApi, postApi } from "../utils/reqClient";
import handleError from "../utils/handleError";

export const RegisterUser = async (payload) => {
  try {
    const response = await postApi(`api/user/register`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await postApi(`api/auth`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const CreateProduct = async (payload) => {
    try {
      const response = await postApi(`api/product`, payload);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};