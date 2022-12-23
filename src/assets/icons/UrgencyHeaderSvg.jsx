import React from 'react';
//utils
import PropTypes from 'prop-types';

export default function UrgencyHeaderSvg({ fill, stroke, opacity }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      x='0px'
      y='0px'
      width='20px'
    >
      <path
        d='M460.8,51.2h-25.6V25.6C435.2,10.2,425,0,409.6,0C394.2,0,384,10.2,384,25.6v25.6H128V25.6C128,10.2,117.8,0,102.4,0
        S76.8,10.2,76.8,25.6v25.6H25.6C12.8,51.2,0,61.4,0,76.8v358.4c0,15.4,12.8,25.6,25.6,25.6h156.2c-17.9-30.7-28.2-66.6-28.2-102.4
        c0-112.6,92.2-204.8,204.8-204.8c48.6,0,92.2,17.9,128,46.1V76.8C486.4,64,473.6,51.2,460.8,51.2z'
        fill={fill || '#000'}
        stroke={stroke || '#000'}
        opacity={opacity || 1}
      />
      <path
        d='M358.4,204.8c-84.5,0-153.6,69.1-153.6,153.6S273.9,512,358.4,512S512,442.9,512,358.4S442.9,204.8,358.4,204.8z
        M409.6,384h-51.2c-15.4,0-25.6-10.2-25.6-25.6v-76.8c0-15.4,10.2-25.6,25.6-25.6c15.4,0,25.6,10.2,25.6,25.6v51.2h25.6
       c15.4,0,25.6,10.2,25.6,25.6S425,384,409.6,384z'
        fill={fill || '#000'}
        stroke={stroke || '#000'}
        opacity={opacity || 1}
      />
    </svg>
  );
}
UrgencyHeaderSvg.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  opacity: PropTypes.number,
  width: PropTypes.number,
};
