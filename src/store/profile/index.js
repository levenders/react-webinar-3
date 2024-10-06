import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      user: {},
      token: this.getToken(),
      waiting: true,
      error: '',
      isAuth: false,
    };
  }

  async logIn(login, password) {
    this.setState({ ...this.getState(), waiting: true });
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error.data.issues[0].message);
      }

      this.setState({
        ...this.getState(),
        token: json.result.token,
        waiting: false,
        isAuth: true,
        error: '',
      });
    } catch (error) {
      this.setState({ ...this.getState(), error: error.message, waiting: false });
    }
  }

  async logOut() {
    try {
      this.setState({ ...this.getState(), waiting: true });
      const token = this.getState().token;
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(json.error.data.issues[0].message);
      }

      this.resetToken();
      this.setState(this.initState());
    } catch (error) {
      this.setState({ ...this.getState(), error: error.message, waiting: false });
    }
  }

  async getProfile() {
    try {
      this.setState({ ...this.getState(), waiting: true });
      this.getToken();
      const token = this.getState().token;

      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error.data.issues[0].message);
      }

      this.setState({
        ...this.getState(),
        user: {
          email: json.result.email,
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          username: json.result.username,
        },
        waiting: false,
        error: '',
        isAuth: true,
      });
    } catch (error) {
      this.setState({ ...this.getState(), waiting: false });
    }
  }

  // Получение токена из cookies
  getToken() {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    if (match) {
      return match[2];
    }
    return '';
  }

  // Сброс токена из cookies
  resetToken() {
    document.cookie = 'token=; Max-Age=0; path=/; secure; samesite=strict';
  }
}

export default ProfileState;
