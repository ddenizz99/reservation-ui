import axiosInstance from "./aixos/AxiosInstance";

const getAll = async () => {
  try {
    const response = await axiosInstance.get('/customer/getAll');
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('API Hata:', error.message);
    throw error;
  }
};

const getByRestaurantId = async () => {
    try {
      const response = await axiosInstance.get('/customer/getByRestaurantId');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('API Hata:', error.message);
      throw error;
    }
};

const getById = async (itemId) => {
  try {
    const response = await axiosInstance.get(`/customer/getById/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('API Hata:', error.message);
    throw error;
  }
};

const getByIdCustomerDetail = async (itemId) => {
  try {
    const response = await axiosInstance.get(`/customer/getByIdCustomerDetail/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('API Hata:', error.message);
    throw error;
  }
};

const updateCustomer = async (customerData) => {
  try {
    const response = await axiosInstance.post('/customer/updateCustomer', customerData);
    return response.data;
  } catch (error) {
    console.error('Kayıt Hata:', error.message);
    throw error;
  }
}

export { getAll, getByRestaurantId, getById, updateCustomer, getByIdCustomerDetail };


