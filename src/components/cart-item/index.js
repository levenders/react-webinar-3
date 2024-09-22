import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import { getPriceRu } from '../../utils';
import './style.css';

function CartItem({ item, buttonHandler, buttonLabel }) {
  const cn = bem('CartItem');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('content')}>
        <div className={cn('title')}>{item.title}</div>
        <div>{getPriceRu(item.price)}</div>
        <div>{item.quantity} шт.</div>
      </div>
      <div className={cn('actions')}>
        <button onClick={() => buttonHandler(item.code)}>{buttonLabel}</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  buttonHandler: PropTypes.func,
  buttonLabel: PropTypes.node,
};

export default React.memo(CartItem);
