import axios from 'axios';
import config from '../config';

class Api {
  constructor(baseUrl) {
    this._baseUrl = `${baseUrl}/api/v1`;
  }

  signUp(username, password, email) {
    return axios.post(`${this._baseUrl}/auth/sign-up`, {
      email,
      password,
      profile: { fullName: username }
    });
  }

  signIn(email, password) {
    return axios.post(`${this._baseUrl}/auth/sign-in`, {
      email,
      password
    });
  }

  // signOut() {
  //   console.log(axios.post(`${this._baseUrl}/auth/sign-out`));
  // }
}

const api = new Api(config.api_url);

export default api;
