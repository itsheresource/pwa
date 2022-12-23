import React from 'react';

//utils
import PropTypes from 'prop-types';

export default function CloseSvg({ fill, opacity, width, height }) {
  return (
    <svg
      version='1.0'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 24 24'
      width={width || '24px'}
      height={height || '24px'}
    >
      <path
        d='M7.05022 7.05028C6.65969 7.4408 6.65969 8.07397 7.05022 8.46449L10.5858 12L7.05023 15.5356C6.6597 15.9261 6.6597 16.5593 7.05023 16.9498C7.44075 17.3403 8.07392 17.3403 8.46444 16.9498L12 13.4142L15.5355 16.9498C15.926 17.3403 16.5592 17.3403 16.9497 16.9498C17.3402 16.5592 17.3402 15.9261 16.9497 15.5356L13.4142 12L16.9497 8.46449C17.3402 8.07397 17.3402 7.4408 16.9497 7.05028C16.5592 6.65976 15.926 6.65976 15.5355 7.05028L12 10.5858L8.46443 7.05028C8.07391 6.65975 7.44074 6.65975 7.05022 7.05028Z'
        fill={fill || '#707070'}
        opacity={opacity || 1}
      />
    </svg>
  );
}
CloseSvg.propTypes = {
  fill: PropTypes.string,
  opacity: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};
