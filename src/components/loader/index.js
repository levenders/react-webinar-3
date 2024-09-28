import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

function Loader({ when, children }) {
  return when ? <div className="loader">Загрузка...</div> : <>{children}</>;
}

Loader.propTypes = {
  when: PropTypes.bool,
  children: PropTypes.node,
};

export default memo(Loader);
