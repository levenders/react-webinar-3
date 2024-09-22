import PropTypes from 'prop-types';
import React from 'react';
import { plural } from '../../utils';
import './style.css';

function Controls({ buttonHandler, totalPrice, totalItems, buttonLabel }) {
  return (
    <div className="Controls">
      <div className="Controls-content">
        В корзине:
        <div className="Controls-content-count">
          {totalItems}{' '}
          {plural(totalItems, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })}
          / {totalPrice}
        </div>
      </div>
      <button onClick={() => buttonHandler()}>{buttonLabel}</button>
    </div>
  );
}

Controls.propTypes = {
  buttonHandler: PropTypes.func,
  totalPrice: PropTypes.string,
  totalCount: PropTypes.number,
  buttonLabel: PropTypes.node,
};

export default React.memo(Controls);
