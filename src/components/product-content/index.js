import { cn as bem } from '@bem-react/classname';
import { memo } from 'react';
import { numberFormat, translate } from '../../utils';
import './style.css';

function ProductContent({ language, content, onAdd }) {
  const cn = bem('ProductContent');
  const { description, price, edition, madeIn, category } = content;

  return (
    <div className={cn()}>
      <div className={cn('description')}>{description}</div>
      <div className={cn('madeIn')}>
        {translate(language, 'madeIn')}: <b>{madeIn}</b>
      </div>
      <div className={cn('category')}>
        {translate(language, 'category')}: <b>{category}</b>
      </div>
      <div className={cn('edition')}>
        {translate(language, 'edition')}: <b>{edition}</b>
      </div>
      <div className={cn('price')}>
        {translate(language, 'price')}: {numberFormat(price)}
      </div>
      <button className={cn('button')} onClick={onAdd}>
        {translate(language, 'button.add')}
      </button>
    </div>
  );
}

export default memo(ProductContent);
