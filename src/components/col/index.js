import PropTypes from 'prop-types';
import { memo } from 'react';

import './style.css';

function Col({ children }) {
  return <div className="col">{children}</div>;
}

Col.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Col);
