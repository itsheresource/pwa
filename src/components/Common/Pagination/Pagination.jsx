import React from 'react';

//utils
import PropTypes from 'prop-types';
import * as S from './PaginationStyled';
import * as C from 'scss/colors';

//icons
import PaginationArrowSvg from 'assets/icons/PaginationArrowSvg';
import PaginationArrowDoubleSvg from 'assets/icons/PaginationArrowDoubleSvg';
import PaginationArrowDoubleLeftSvg from 'assets/icons/PaginationArrowDoubleLeftSvg';
import ArrowLeftSvg from 'assets/icons/ArrowLeftSvg';

//pagination number items
const getRange = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((v, i) => i + start);
};

const paginationItems = (currentPage, pageCount) => {
  let delta;
  if (pageCount <= 5) {
    delta = 5;
  } else {
    delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4;
  }

  const range = {
    start: Math.round(currentPage - delta / 2),
    end: Math.round(currentPage + delta / 2),
  };

  if (range.start - 1 === 1 || range.end + 1 === pageCount) {
    range.start += 1;
    range.end += 1;
  }

  let pages =
    currentPage > delta
      ? getRange(
          Math.min(range.start, pageCount - delta),
          Math.min(range.end, pageCount)
        )
      : getRange(1, Math.min(pageCount, delta + 1));

  const withDots = (value, pair) =>
    pages.length + 1 !== pageCount ? pair : [value];

  if (pages[0] !== 1) {
    pages = withDots(1, [1, '...']).concat(pages);
  }

  if (pages[pages.length - 1] < pageCount) {
    pages = pages.concat(withDots(pageCount, ['...', pageCount]));
  }

  return pages;
};

export default function Pagination({ currentPage, jump, maxPage, prev, next }) {
  return (
    <S.PaginationContainer>
      <S.ItemsContainer>
        {paginationItems(currentPage, maxPage)?.map((item, idx) => (
          <S.ActiveItem
            isActive={item === currentPage}
            key={idx}
            onClick={() => item !== '...' && jump(item)}
          >
            {item}
          </S.ActiveItem>
        ))}
      </S.ItemsContainer>
      <S.ActionsContainer>
        <div className='flex'>
          <button className='mr-8' onClick={() => jump(1)}>
            <PaginationArrowDoubleLeftSvg
              width={15}
              stroke={currentPage === 1 ? C.colorGrey2 : null}
            />
          </button>
          <button onClick={() => prev()}>
            <ArrowLeftSvg
              stroke={currentPage === 1 ? C.colorGrey2 : null}
              width={15}
            />
          </button>
        </div>
        <div className='flex'>
          <button className='mr-8' onClick={() => next()}>
            <PaginationArrowSvg
              width={15}
              stroke={currentPage === maxPage ? C.colorGrey2 : null}
            />
          </button>
          <button className='mr-8' onClick={() => jump(maxPage)}>
            <PaginationArrowDoubleSvg
              width={15}
              stroke={currentPage === maxPage ? C.colorGrey2 : null}
            />
          </button>
        </div>
      </S.ActionsContainer>
    </S.PaginationContainer>
  );
}
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  jump: PropTypes.func.isRequired,
  maxPage: PropTypes.number.isRequired,
};
