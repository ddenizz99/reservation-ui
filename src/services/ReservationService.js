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

const getByRestaurantId = async (date) => {
    try {
      const response = await axiosInstance.get('/reservation/getByRestaurantId/' + date);
      return response.data;
    } catch (error) {
      console.error('API Hata:', error.message);
      throw error;
    }
};

const getByInfoCode = async (code) => {
  try {
    const response = await axiosInstance.get('/info/getByInfoCode/' + code);
    return response.data;
  } catch (error) {
    console.error('API Hata:', error.message);
    throw error;
  }
};

const getById = async (itemId) => {
  try {
    const response = await axiosInstance.get(`/reservation/getById/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('API Hata:', error.message);
    throw error;
  }
};

const reservationCanceledCustomer = async (reservationData) => {
  try {
    const response = await axiosInstance.post('/info/reservationCanceledCustomer', reservationData);
    return response.data;
  } catch (error) {
    console.error('Kayıt Hata:', error.message);
    throw error;
  }
}

const reservationCanceled = async (reservationData) => {
  try {
    const response = await axiosInstance.post('/reservation/reservationCanceled', reservationData);
    return response.data;
  } catch (error) {
    console.error('Kayıt Hata:', error.message);
    throw error;
  }
}

const reservationConfirm = async (reservationData) => {
  try {
    const response = await axiosInstance.post('/reservation/reservationConfirm', reservationData);
    return response.data;
  } catch (error) {
    console.error('Kayıt Hata:', error.message);
    throw error;
  }
}

const askForConfirmation = async (reservationData) => {
  try {
    const response = await axiosInstance.post('/reservation/askForConfirmation', reservationData);
    return response.data;
  } catch (error) {
    console.error('Kayıt Hata:', error.message);
    throw error;
  }
}

const bookAgain = async (reservationData) => {
  try {
    const response = await axiosInstance.post('/reservation/bookAgain', reservationData);
    return response.data;
  } catch (error) {
    console.error('Kayıt Hata:', error.message);
    throw error;
  }
}

const changeDateTime = async (reservationData) => {
  try {
    const response = await axiosInstance.post('/reservation/changeDateTime', reservationData);
    return response.data;
  } catch (error) {
    console.error('Kayıt Hata:', error.message);
    throw error;
  }
}

const changeAreaAndTable = async (reservationData) => {
  try {
    const response = await axiosInstance.post('/reservation/changeAreaAndTable', reservationData);
    return response.data;
  } catch (error) {
    console.error('Kayıt Hata:', error.message);
    throw error;
  }
}

const changeNumberOfPeople = async (reservationData) => {
  try {
    const response = await axiosInstance.post('/reservation/changeNumberOfPeople', reservationData);
    return response.data;
  } catch (error) {
    console.error('Kayıt Hata:', error.message);
    throw error;
  }
}

const getByRestaurantIdAreaAndTable = async () => {
  try {
    const response = await axiosInstance.get('/reservation/getByRestaurantIdAreaAndTable');
    return response.data;
  } catch (error) {
    console.error('API Hata:', error.message);
    throw error;
  }
};

export { 
  addReservation, 
  getByRestaurantId, 
  getById, 
  getByInfoCode, 
  reservationCanceledCustomer, 
  reservationCanceled, 
  reservationConfirm, 
  askForConfirmation,
  bookAgain,
  changeDateTime,
  getByRestaurantIdAreaAndTable,
  changeAreaAndTable,
  changeNumberOfPeople
};


