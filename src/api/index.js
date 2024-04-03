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
export const mfaCheck = async (payload) => {
  try {
    const response = await postApi(`api/auth/auth`, payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const ContactForm = async (payload) => {
    try {
      const response = await postApi(`general/contact`, payload);
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

export const CreateOrder = async (payload) => {
    try {
      const response = await postApi(`general/order`, payload);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

export const FetchProduct = async (payload) => {
    try {
      const response = await getApi(`general/product`, payload);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

export const forgotPassword = async (email) => {
    try {
      const response = await getApi(`general/reset?email=${email}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

export const resetPassword = async (payload) => {
    try {
      const response = await postApi(`general/reset`,payload);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};