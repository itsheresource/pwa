import React from 'react';
//utils
import PropTypes from 'prop-types';

export default function SendSvg({ fill, stroke, opacity, width }) {
  return (
    <svg
      viewBox='0 0 19.231 18.899'
      x='0px'
      y='0px'
      width={width || '20px'}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g transform='matrix(0, 1, -1, 0, 600.401, -281.089)'>
        <path
          d='M0,0,8.952,19.231,0,14.374Z'
          fill={fill || '#ffffff'}
          opacity={opacity || 1}
          transform='translate(291.036 581.171)'
        />
        <path
          d='M0,19.231,8.952,0,0,4.857Z'
          fill={fill || '#ffffff'}
          opacity={opacity || 1}
          transform='translate(290.041 600.401) rotate(180)'
        />
      </g>
    </svg>
  );
}
SendSvg.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  opacity: PropTypes.number,
  width: PropTypes.number,
};
