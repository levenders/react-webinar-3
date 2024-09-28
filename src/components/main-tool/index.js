import PropTypes from 'prop-types';
import { memo } from 'react';
import RedirectLink from '../redirect-link';
import './style.css';

function MainTool({ language, children }) {
  return (
    <div className="MainTool">
      <RedirectLink language={language} translateTitle="link.home" to="/" />
      {children}
    </div>
  );
}

MainTool.propTypes = {
  language: PropTypes.string,
  children: PropTypes.node,
};

export default memo(MainTool);
