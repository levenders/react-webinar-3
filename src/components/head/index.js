import PropTypes from 'prop-types';
import { memo } from 'react';
import LanguageSwitcher from '../language-switch';
import './style.css';

function Head({ title }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <LanguageSwitcher />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
