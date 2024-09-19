import React, { useCallback, useState } from 'react';
import CartModal from './components/cart-modal';
import Controls from './components/controls';
import Head from './components/head';
import List from './components/list';
import PageLayout from './components/page-layout';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cart = store.getState().cart;
  const list = store.getState().list;

  const callbacks = {
    addToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    removeFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),

    toggleCartVisible: useCallback(() => {
      setIsCartOpen(state => !state);
    }, []),
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        buttonLabel={'Перейти'}
        totalItems={totalItems}
        totalPrice={totalPrice}
        buttonHandler={callbacks.toggleCartVisible}
      />
      <List list={list} buttonLabel={'Добавить'} buttonHandler={callbacks.addToCart} />
      {isCartOpen && (
        <CartModal
          cart={cart}
          removeFromCart={callbacks.removeFromCart}
          closeModal={callbacks.toggleCartVisible}
        />
      )}
    </PageLayout>
  );
}

export default App;
