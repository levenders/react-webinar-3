import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { translate } from '../../utils';
import './style.css';

function RedirectLink({ language, translateTitle, to }) {
  return (
    <Link className="link" to={to}>
      {translate(language, translateTitle)}
    </Link>
  );
}

RedirectLink.propTypes = {
  language: PropTypes.string,
  translateTitle: PropTypes.string,
  to: PropTypes.string,
};

export default memo(RedirectLink);
