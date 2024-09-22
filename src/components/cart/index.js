import PropTypes from 'prop-types';
import React from 'react';
import List from '../list';
import ModalLayout from '../modal-layout';
import './style.css';

function Cart({ cart, removeFromCart, closeModal, totalPrice }) {
  return (
    <ModalLayout titleModal={'Корзина'} closeModal={closeModal}>
      {cart.length ? (
        <div>
          <List list={cart} isCart buttonLabel={'Удалить'} buttonHandler={removeFromCart} />
          <div className="Cart-total">
            <strong>Итого: {totalPrice}</strong>
          </div>
        </div>
      ) : (
        <div className="Cart-empty">Корзина пока пустая</div>
      )}
    </ModalLayout>
  );
}

Cart.propTypes = {
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

export default React.memo(Cart);
