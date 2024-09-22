import PropTypes from 'prop-types';
import React from 'react';
import { getPriceRu } from '../../utils';
import './style.css';

function Item({ item, buttonHandler, buttonLabel }) {
  return (
    <div className={'Item'}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-content">
        <div className="Item-title">{item.title}</div>
        <div className="Item-price">{getPriceRu(item.price)}</div>
        {item.quantity && <div className="Item-price">{item.quantity} шт.</div>}
      </div>
      <div className="Item-actions">
        <button onClick={() => buttonHandler(item.code)}>{buttonLabel}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  buttonHandler: PropTypes.func,
  buttonLabel: PropTypes.node,
};

export default React.memo(Item);
