import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { numberFormat, plural, translate } from '../../utils';
import './style.css';

function BasketTool({ language, sum, amount, onOpen }) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate(language, 'label')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, translate(language, 'plural'))} / ${numberFormat(sum)} ₽`
          : translate(language, 'empty')}
      </span>
      <button onClick={onOpen}>{translate(language, 'button.open')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  language: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
