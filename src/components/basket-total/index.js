import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { numberFormat, translate } from '../../utils';
import './style.css';

function BasketTotal({ language, sum }) {
  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translate(language, 'summary')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  language: PropTypes.string,
  sum: PropTypes.number.isRequired,
};

export default memo(BasketTotal);
