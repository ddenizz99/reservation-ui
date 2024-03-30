 export default class LocalStorageService{

    setToken(token) {
        localStorage.setItem("authToken", token);
    }

    removeToken(){
        localStorage.removeItem("authToken");
    }

    removeItem(itemName)
    {
        localStorage.removeItem(itemName);
    }

    getToken() {
        return localStorage.getItem("authToken");
    }

    setItem(key, value){
        localStorage.setItem(key, value);
    }

    getItem(key){
        return localStorage.getItem(key);
    }

}