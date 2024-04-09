import axios from "axios";
import LocalStorageService from "./LocalStorageService";
import { setAuthorizationToken } from "../utils/setAuthorizationToken";
import { jwtDecode } from 'jwt-decode';
import { login, logout } from "../store/authStore";

const localStorageService = new LocalStorageService();

export const authLogin = (email, password) => {

    const data = {
        email,
        password
    };

    return axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt`, data).then((response) => {
        // Başarılı login işlemleri
        const token  = response.data.access_token;

        const decodedToken = jwtDecode(token);
        localStorageService.setToken(token);
        localStorageService.setItem("user" , JSON.stringify(decodedToken));
        setAuthorizationToken(token);
        
        return {
            success: true,
            data: response.data,
            decodedToken
        };
    }).catch(error => {
        
        if (error.response) {
            // Server tarafında hata oluştuğunda
            if (error.response.status === 401) {
                const message = error.response.data.messages.error;
                // Mesajı göster veya işle.

                return {
                    success: false,
                    messages: message
                }
            }
            // Server hatası olduğunda bu kısmı işleyebilirsiniz
            if (error.response.status === 500 && error.response.data === "ERR_CONNECTION_REFUSED") {
                const errorMessage = "Sunucuya bağlanırken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.";
                
                return {
                    success: false,
                    messages: errorMessage
                }
            }
        } else if (error.request) {
            // İstek yapılamadığında (örneğin sunucu kapalıysa) buraya düşer
            const errorMessage = "Sunucuya bağlanırken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.";
            
            return {
                success: false,
                messages: errorMessage
            }
        } else {
           
            return {
                success: false,
                messages: "Bir hata oluştu. Lütfen tekrar deneyin."
            }
        }

        return Promise.reject(error);
     });
}

export const authLogout = () => {
    localStorageService.removeItem("user");
    localStorageService.removeToken();
    setAuthorizationToken(false);
}