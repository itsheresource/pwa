import React from 'react';
//utils
import PropTypes from 'prop-types';

export default function DropDetailsSvg({ fill, stroke, opacity }) {
  return (
    <svg
      viewBox='0 0 52.7 52.7'
      x='0px'
      y='0px'
      width='20px'
      xmlns='http://www.w3.org/2000/svg'
   
    >
      <path
        d='M47.5,41.4V2.1h-9.2v0H8.1v0.3H8v41.4c0,3.6,2.9,6.5,6.5,6.5H41c3.6,0,6.5-2.9,6.5-6.5L47.5,41.4
        c-0.1,0-0.1,0-0.1,0v0H47.5z M38.3,31.2H17V28l21.3-0.1V31.2z M38.3,23.4H17v-3.2h21.3V23.4z M38.3,15.6H17v-3.1l21.3,0V15.6z'
        fill={fill || '#000'}
        opacity={opacity || 1}
      />
    </svg>
  );
}
DropDetailsSvg.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  opacity: PropTypes.number,
  width: PropTypes.number,
};
