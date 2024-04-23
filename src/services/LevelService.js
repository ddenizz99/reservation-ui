import axiosInstance from "./aixos/AxiosInstance";

const getAll = async () => {
  try {
    const response = await axiosInstance.get('/level/getAll');
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

export { getAll };


