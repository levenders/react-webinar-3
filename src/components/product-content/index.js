import { cn as bem } from '@bem-react/classname';
import { memo } from 'react';
import { numberFormat } from '../../utils';

import './style.css';

function ProductContent({ content, onAdd }) {
  const cn = bem('ProductContent');
  const { description, price, edition, madeIn, category } = content;

  return (
    <div className={cn()}>
      <div className={cn('description')}>{description}</div>
      <div className={cn('madeIn')}>
        Страна производитель: <b>{madeIn}</b>
      </div>
      <div className={cn('category')}>
        Категория: <b>{category}</b>
      </div>
      <div className={cn('edition')}>
        Год выпуска: <b>{edition}</b>
      </div>
      <div className={cn('price')}>Цена: {numberFormat(price)}</div>
      <button className={cn('button')} onClick={onAdd}>
        Добавить
      </button>
    </div>
  );
}

export default memo(ProductContent);
