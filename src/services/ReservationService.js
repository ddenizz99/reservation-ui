import axiosInstance from "./aixos/AxiosInstance";

const addReservation = async (reservationData) => {
    try {
      const response = await axiosInstance.post('/reservation/add', reservationData);
      if (response.data.success) {
        return response.data;  // Başarılı bir kayıttan sonra dönen veri
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Kayıt Hata:', error.message);
      throw error;
    }
};

const getByRestaurantId = async () => {
    try {
      const response = await axiosInstance.get('/reservation/getByRestaurantId');
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

export { addReservation, getByRestaurantId };


