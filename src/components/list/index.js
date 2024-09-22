import PropTypes from 'prop-types';
import React from 'react';
import CartItem from '../cart-item';
import Item from '../item';
import './style.css';

function List({ list, isCart = false, buttonLabel, buttonHandler }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {isCart ? (
            <CartItem item={item} buttonLabel={buttonLabel} buttonHandler={buttonHandler} />
          ) : (
            <Item item={item} buttonLabel={buttonLabel} buttonHandler={buttonHandler} />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  buttonHandler: PropTypes.func.isRequired,
  buttonLabel: PropTypes.node.isRequired,
};

export default React.memo(List);
