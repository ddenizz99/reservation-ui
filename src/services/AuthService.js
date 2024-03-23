export default class AuthService{

    login(email,password){
        var options = {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        }
        fetch(process.env.REACT_APP_API_URL + 'auth/jwt', options)  
        .then(function(res) {
            console.log(res);
            return res.json();
        })
        .then(function(resJson) {
            console.log(resJson);
            return resJson;
        })
    }

}