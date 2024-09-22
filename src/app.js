import React, { useCallback, useState } from 'react';
import Cart from './components/cart';
import Controls from './components/controls';
import Head from './components/head';
import List from './components/list';
import PageLayout from './components/page-layout';
import { getPriceRu } from './utils';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cart = store.getState().cart;
  const list = store.getState().list;
  const totalItems = cart.length;
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        buttonLabel={'Перейти'}
        totalItems={totalItems}
        totalPrice={getPriceRu(totalPrice)}
        buttonHandler={callbacks.toggleCartVisible}
      />
      <List list={list} buttonLabel={'Добавить'} buttonHandler={callbacks.addToCart} />
      {isCartOpen && (
        <Cart
          cart={cart}
          removeFromCart={callbacks.removeFromCart}
          closeModal={callbacks.toggleCartVisible}
          totalPrice={getPriceRu(totalPrice)}
        />
      )}
    </PageLayout>
  );
}

export default App;
