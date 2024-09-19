import PropTypes from 'prop-types';
import React from 'react';
import Head from '../head';
import List from '../list';
import PageLayout from '../page-layout';
import './style.css';

function CartModal({ cart, removeFromCart, closeModal }) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="CartModal">
      <PageLayout>
        <Head title="Корзина">
          <button className="CartModal-close" onClick={closeModal}>
            Закрыть
          </button>
        </Head>
        {cart.length ? (
          <div className="CartModal-content">
            <List list={cart} buttonLabel={'Удалить'} buttonHandler={removeFromCart} />
            <div className="CartModal-total">
              <strong>Итого: {totalPrice} ₽</strong>
            </div>
          </div>
        ) : (
          <div className="CartModal-empty">Корзина пока пустая</div>
        )}
      </PageLayout>
    </div>
  );
}

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default React.memo(CartModal);
