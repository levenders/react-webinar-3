import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/language-context';
import { numberFormat, plural, translate } from '../../utils';
import './style.css';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const { language } = useLanguage();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/">
        {translate(language, 'link')}
      </Link>
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
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
