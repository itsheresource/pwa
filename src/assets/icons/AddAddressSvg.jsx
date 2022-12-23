import React from 'react';
//utils
import PropTypes from 'prop-types';

export default function AddAddressSvg({ fill, stroke, opacity }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      x='0px'
      y='0px'
      width='20px'
    >
      <path
        d='M345.6,227c0-51.6-42-93.6-93.6-93.6s-93.6,42-93.6,93.6s42,93.6,93.6,93.6S345.6,278.6,345.6,227L345.6,227z M199.6,242
		v-30H237v-37.4h30V212h37.4v30H267v37.4h-30V242H199.6z'
        fill={fill || '#000'}
        stroke={stroke || '#000'}
        opacity={opacity || 1}
      />
      <path
        d='M424.6,226.6C424.6,131.4,347.2,54,252,54S79.4,131.4,79.4,226.6C79.4,335.4,215.2,454,252,484.1
		C288.8,454,424.6,335.4,424.6,226.6L424.6,226.6z M128.4,227c0-68.2,55.4-123.6,123.6-123.6S375.6,158.8,375.6,227
		S320.2,350.6,252,350.6S128.4,295.1,128.4,227L128.4,227z'
        fill={fill || '#000'}
        stroke={stroke || '#000'}
        opacity={opacity || 1}
      />
    </svg>
  );
}
AddAddressSvg.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  opacity: PropTypes.number,
  width: PropTypes.number,
};
