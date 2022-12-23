import React from 'react';

//utils
import PropTypes from 'prop-types';

export default function NoticeSvg({ fill, stroke, opacity, width }) {
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
      <circle
        cx='142.2'
        cy='140'
        r='127.2'
        fill='none'
        stroke={stroke || '#ff6700'}
        strokeWidth='21.4391px'
        strokeMiterlimit='10px'
      />
      <text
        transform='matrix(1 0 0 1 118.063 219.8887)'
        fill={stroke || '#ff6700'}
        fontSize='241.3135px'
      >
        i
      </text>
    </svg>
  );
}
NoticeSvg.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  opacity: PropTypes.number,
  width: PropTypes.number,
};
