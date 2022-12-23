import React from 'react';

//utils
import PropTypes from 'prop-types';

export default function PaginationArrowDoubleSvg({ stroke, opacity, width }) {
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
        d='M151.4,29l102.3,102.3c5.8,5.8,5.8,15.1,0,20.9L151.4,254.4'
        fill='none'
        stroke={stroke || '#000'}
        strokeWidth={30}
        strokeLinecap='round'
        strokeMiterlimit={5}
        opacity={opacity || 1}
      />
      <path
        d='M60.2,29l102.3,102.3c5.8,5.8,5.8,15.1,0,20.9L60.2,254.4'
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
PaginationArrowDoubleSvg.propTypes = {
  stroke: PropTypes.string,
  opacity: PropTypes.number,
  width: PropTypes.number,
};
