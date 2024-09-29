import PropTypes from 'prop-types';
import { memo } from 'react';
import RedirectLink from '../redirect-link';
import './style.css';

function Menu({ language }) {
  return (
    <div className="menu">
      <RedirectLink language={language} translateTitle="link.home" to="/" />
    </div>
  );
}

Menu.propTypes = {
  language: PropTypes.string,
};

export default memo(Menu);
