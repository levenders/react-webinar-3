import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    const token = this.getToken();
    token && this.getProfile();

    return {
      user: {},
      isAuth: false,
      waiting: false,
      error: '',
    };
  }

  async logIn(login, password) {
    this.setState({ ...this.getState(), waiting: true }, 'Попытка авторизации');
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.data.issues[0].message);
      }

      this.setState(
        {
          ...this.getState(),
          waiting: false,
          isAuth: true,
          error: '',
        },
        'Пользователь авторизован',
      );
    } catch (error) {
      this.setState(
        { ...this.getState(), error: error.message, waiting: false },
        'Авторизация прошла с ошибкой',
      );
    }
  }

  async logOut() {
    this.setState({ ...this.getState(), waiting: true }, 'Выход из системы');
    try {
      const token = this.getToken();
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
      this.setState(this.initState(), 'Пользователь вышел из системы');
    } catch (error) {
      this.setState(
        { ...this.getState(), error: error.message, waiting: false },
        'Выход из системы произошел с ошибкой',
      );
    }
  }

  async getProfile() {
    this.setState({ ...this.getState(), waiting: true }, 'Получение профиля');
    try {
      const token = this.getToken();
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

      this.setState(
        {
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
        },
        'Профиль получен',
      );
    } catch (error) {
      this.setState({ ...this.getState(), waiting: false }, 'Профиль не получен');
    }
  }

  // Сброс ошибки авторизации
  resetError() {
    this.setState(
      {
        ...this.getState(),
        error: '',
      },
      'Ошибки авторизации сброшены',
    );
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
