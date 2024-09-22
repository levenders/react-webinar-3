/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addToCart(code) {
    const { cart, list } = this.state;
    const existingItem = cart.find(item => item.code === code);
    const item = list.find(item => item.code === code);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice = item.price * existingItem.quantity;
      this.setState({ ...this.state, cart });
      return;
    }

    if (item) {
      this.setState({
        ...this.state,
        cart: [...cart, { ...item, quantity: 1, totalPrice: item.price }],
      });
    }
  }

  removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }
}

export default Store;
