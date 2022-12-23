import React, { useState } from 'react';

import PropTypes from 'prop-types';
import './imageSlider.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Navigation, Pagination]);

function ImageSlider({ imageSliderData, setIsOpenImageSlider }) {
  return (
    <div className='image-slider-container'>
      <Swiper
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={4}
        navigation
        direction='horizontal'
        centeredSlides='true'
        pagination={{
          type: 'fraction',
        }}
        className='fullscreen-slider-swiper'
      >
        {imageSliderData?.map((image, idx) => {
          return (
            <SwiperSlide key={idx} onClick={setIsOpenImageSlider}>
              <img
                src={`${process.env.REACT_APP_CUSTOMER_API_BACKEND_URL_BASE}${image}`}
                className='full-slide'
                alt='vehicles'
                onClick={(e) => e.stopPropagation()}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
ImageSlider.propTypes = {
  imageSliderData: PropTypes.array,
  setIsOpenImageSlider: PropTypes.func,
};

export default ImageSlider;
