class AuthApi {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getLoginData(token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this._sendRequest('/users/me', 'GET', null, headers);
  }

  signUpUser(userData) {
    return this._sendRequest('/signup', 'POST', userData);
  }

  signInUser(userData) {
    return this._sendRequest('/signin', 'POST', userData);
  }

  _sendRequest(path, method, body, headers = this._headers ) {
    const options = {
      method,
      headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}${path}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
    });
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authApi;
