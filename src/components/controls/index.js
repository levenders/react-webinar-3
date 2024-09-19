import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

function Controls({ onAdd, buttonLabel, title }) {
  return (
    <div className="Controls">
      <div>{title}</div>
      <button onClick={() => onAdd()}>{buttonLabel}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  titleButton: PropTypes.node,
  titleLabel: PropTypes.node,
};

export default React.memo(Controls);
