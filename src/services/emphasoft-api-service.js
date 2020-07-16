import axios from 'axios';

class EmphasoftApiService {
    _apiURL = 'http://emphasoft-test-assignment.herokuapp.com/';

    logIn = (username, password) => {
        return axios.post(`${this._apiURL}api-token-auth/`, {
            username,
            password
        })
        .then((response) => {
            this.setToken(response.data.token);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    setToken = (token) =>  {
        localStorage.setItem('emphasoft-auth-token', token);
    }

    getToken = () =>  {
        return localStorage.getItem('emphasoft-auth-token');
    }

    logOut = () => {
        localStorage.removeItem('emphasoft-auth-token');
    }

    isLoggedIn = () => {
        return this.getToken();
    }

    getUsers = async () => {
        const response = await axios.get(`${this._apiURL}api/v1/users/`,{
            headers: {
                Authorization: `Token ${this.getToken()}`
            }
        });
        return response.data;
    }
}

export default EmphasoftApiService;