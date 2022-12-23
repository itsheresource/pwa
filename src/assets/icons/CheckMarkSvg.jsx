import React from 'react';

//utils
import PropTypes from 'prop-types';

export default function CheckMarkSvg({
  fill,
  stroke,
  opacity,
  width,
  strokeWidth,
}) {
  return (
    <svg
      version='1.0'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 246 214.7'
      width={width || '20px'}
    >
      <path
        d='M32.6,96.7c5.4,0.1,11.6,2.4,16.6,7.4c13.2,13.2,26.5,26.4,39.7,39.7c1.5,1.5,2.1,2,3.7,0
        c13.4-16.9,26.9-33.7,40.3-50.5c12.6-15.8,25.3-31.5,37.9-47.3c8.9-11.1,17.7-22.4,26.9-33.4c6.7-8,15.5-10.9,25.7-8.5
        c9.9,2.3,16.2,8.7,18.9,18.3c2.9,10.1-0.8,18.5-7.2,26.3c-11.6,14.1-22.9,28.4-34.3,42.6c-12.6,15.8-25.3,31.5-37.9,47.3
        c-12.6,15.7-25.1,31.4-37.7,47.1c-4.4,5.5-8.5,11.4-13.3,16.6c-8.5,9.1-22.4,11.4-33.8,3.5c-3-2.1-5.3-4.8-7.9-7.4
        c-19-19-38.1-38-57.1-57.1c-4.4-4.4-7.2-9.5-8-15.8c-0.9-7.4,1.1-13.9,5.7-19.6C16.1,99.7,22.9,96.7,32.6,96.7z'
        transform='translate(1 1)'
        fill={fill || '#fff'}
        stroke={stroke || '#fff'}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth || '10'}
        opacity={opacity || 1}
      />
    </svg>
  );
}
CheckMarkSvg.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  opacity: PropTypes.number,
  width: PropTypes.number,
  strokeWidth: PropTypes.string,
};
