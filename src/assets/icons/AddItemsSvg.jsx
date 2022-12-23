import React from 'react';
//utils
import PropTypes from 'prop-types';

export default function AddItemsSvg({ fill, stroke, opacity }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      x='0px'
      y='0px'
      width='20px'
    >
      <path
        d='M235,87.5h52v78.1h-52V87.5z'
        fill={fill || '#000'}
        stroke={stroke || '#000'}
        opacity={opacity || 1}
      />
      <path
        d='M45,87.5h150.9v39H45V87.5z'
        fill={fill || '#000'}
        stroke={stroke || '#000'}
        opacity={opacity || 1}
      />
        <path
        d='M326.1,87.5H477v39H326.1V87.5z'
        fill={fill || '#000'}
        stroke={stroke || '#000'}
        opacity={opacity || 1}
      />
        <path
        d='M477,428.5V165.6H326.1v39H195.9v-39H45v262.8h432V428.5z'
        fill={fill || '#000'}
        stroke={stroke || '#000'}
        opacity={opacity || 1}
      />
    </svg>
  );
}
AddItemsSvg.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  opacity: PropTypes.number,
  width: PropTypes.number,
};
