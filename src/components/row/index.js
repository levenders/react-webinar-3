import PropTypes from 'prop-types';
import { memo } from 'react';

import './style.css';

function Row({ children }) {
  return <div className="row">{children}</div>;
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Row);
