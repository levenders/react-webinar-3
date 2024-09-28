import { cn as bem } from '@bem-react/classname';
import { default as propTypes, default as PropTypes } from 'prop-types';
import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store';
import { numberFormat, translate } from '../../utils';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const store = useStore();

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    closeModal: useCallback(() => {
      store.actions.modals.close();
      store.actions.product.load(props.item._id);
    }, [store]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link className={cn('title')} to={`/${props.item._id}`} onClick={callbacks.closeModal}>
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
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
