import React from 'react';

//utils
import PropTypes from 'prop-types';

export default function PaginationArrowSvg({ stroke, opacity, width }) {
  return (
    <svg
      version='1.0'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 283.5 283.5'
      width={width || '18px'}
    >
      <path
        d='M192.5,254.4L90.2,152.1c-5.8-5.8-5.8-15.1,0-20.9L192.5,29'
        fill='none'
        stroke={stroke || '#000'}
        strokeWidth={30}
        strokeLinecap='round'
        strokeMiterlimit={5}
        opacity={opacity || 1}
      />
    </svg>
  );
}
PaginationArrowSvg.propTypes = {
  stroke: PropTypes.string,
  opacity: PropTypes.number,
  width: PropTypes.number,
};
