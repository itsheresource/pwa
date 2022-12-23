import React from 'react';

//utils
import PropTypes from 'prop-types';

export default function LocationSvg({ fill, stroke, opacity, width }) {
  return (
    <svg
      version='1.0'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 406 566.9'
      width={width || '20px'}
    >

      <path
        d='M192.9,15.2c7.1,0,14.2,0,21.4,0c5.6,0.7,11.2,1.3,16.8,2.2c58.1,8.7,104.1,37.3,136.7,85.8c34.3,51,41.9,107,25.4,166.2
		c-11,39.5-28.8,76-49.1,111.4c-35,60.8-76.9,116.7-122.5,169.8c-3.8,4.4-9.1,7.6-13.6,11.4c-2.8,0-5.7,0-8.5,0
		c-4.3-3.5-9.4-6.4-12.9-10.6c-46.1-53.5-88.3-109.8-123.5-171C42.7,345.1,25.2,308.7,14,269.4c-12.8-45.3-11.7-90.1,7.4-133
		C51.4,69,103.4,29,176.6,17.3C182.1,16.4,187.5,15.9,192.9,15.2z M203.9,312.9c55.2-0.4,99.8-45.5,99.2-100.3
		c-0.5-55-45.5-99.6-100-99c-55,0.6-99.3,45.3-99,100C104.5,268.5,149.4,313.2,203.9,312.9z'
        fill={fill || '#000'}
        stroke={stroke || '#000'}
        opacity={opacity || 1}
      />
    </svg>
  );
}
LocationSvg.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  opacity: PropTypes.string,
  width: PropTypes.number,
};
