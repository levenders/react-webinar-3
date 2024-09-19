import PropTypes from 'prop-types';
import React from 'react';
import Item from '../item';
import './style.css';

function List({ list, buttonHandler, buttonLabel }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} buttonLabel={buttonLabel} buttonHandler={buttonHandler} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  buttonHandler: PropTypes.func.isRequired,
  buttonLabel: PropTypes.node.isRequired,
};

export default React.memo(List);
