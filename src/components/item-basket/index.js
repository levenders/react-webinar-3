import { cn as bem } from '@bem-react/classname';
import { default as propTypes, default as PropTypes } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { numberFormat, translate } from '../../utils';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    onNavigate: () => props.onNavigate(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link
        className={cn('title')}
        to={`/product/${props.item._id}`}
        onClick={callbacks.onNavigate}
      >
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {translate(props.language, 'pcs')}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate(props.language, 'button.remove')}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    language: propTypes.string,
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  closeModal: propTypes.func,
};

export default memo(ItemBasket);
