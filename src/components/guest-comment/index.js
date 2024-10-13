import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

function GuestComment({ text, onCancel, buttonText, t }) {
  const cn = bem('GuestComment');

  const location = useLocation();

  const hasButton = Boolean(buttonText);

  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/login" state={{ back: location.pathname }}>
        {t('comments.login')}
      </Link>
      <span>{text}</span>
      {hasButton && (
        <button className={cn('button')} onClick={onCancel}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

GuestComment.propTypes = {
  text: PropTypes.string,
  onCancel: PropTypes.func,
  buttonText: PropTypes.string,
  t: PropTypes.func,
};

export default memo(GuestComment);
