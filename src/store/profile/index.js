import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    const token = this.getToken();
    token && this.getProfile();

    return {
      user: {},
      waiting: false,
      error: '',
    };
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
        },
        'Профиль получен',
      );
    } catch (error) {
      this.setState({ ...this.getState(), waiting: false }, 'Профиль не получен');
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
}

export default ProfileState;
