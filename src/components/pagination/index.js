import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import { createPages } from '../../utils';
import './style.css';

function Pagination({ pagesCount, page, setPage }) {
  const cn = bem('Pagination');
  const pages = [];

  const setPagination = page => {
    setPage(page);
  };

  createPages(pages, pagesCount, page);

  return (
    <div className={cn()}>
      <ul className={cn('wrapper')}>
        {pages.map(({ id, number, disabled }) => (
          <li className={cn('item')} key={id}>
            {disabled ? (
              <span className={cn('ellipsis')}>{number}</span>
            ) : (
              <button
                className={page === id ? cn('active') : cn('page')}
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
  page: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
  setPage: PropTypes.func,
};

export default Pagination;
