import React from 'react';
import styles from './Pagination.module.css'

const Pagination = ({ vacantionPerPage, totalVacancies, paginate }) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalVacancies/vacantionPerPage);i++){
    pageNumbers.push(i)
  }
  return (
    <div>
        <ul className={styles.pagination}>
        {
            pageNumbers.map(number => (
                <li className={styles.pageItem} key={number}>
                <a href='!#' className={styles.pageLink}  onClick={(e) => { e.preventDefault(); paginate(number); }}>
                    {number}
                </a>
                </li>
            ))
        }
        </ul>
    </div>
  );
};

export default Pagination;