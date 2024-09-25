import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import { createPages } from '../../utils';
import './style.css';

function Pagination({ pagesCount, currentPage, setCurrentPage }) {
  const cn = bem('Pagination');
  const pages = [];

  const setPagination = page => {
    setCurrentPage(page);
  };

  createPages(pages, pagesCount, currentPage);

  return (
    <div className={cn()}>
      <ul className={cn('wrapper')}>
        {pages.map(({ id, number, disabled }) => (
          <li className={cn('item')} key={id}>
            {disabled ? (
              <span className={cn('ellipsis')}>{number}</span>
            ) : (
              <button
                className={currentPage === id ? cn('active') : cn('page')}
                onClick={() => setPagination(number)}
              >
                {number}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
  quantityProducts: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func,
  addPageItem: PropTypes.func.isRequired,
};

export default Pagination;
