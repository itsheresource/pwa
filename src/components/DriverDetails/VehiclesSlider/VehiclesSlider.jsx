import React, { useState } from 'react';

// Utils
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.min.css';

import './vehicle.scss';

SwiperCore.use([Navigation, Pagination]);

export default function Vehicles({ galleryImages }) {
  const [isOpenFullScreen, setIsOpenFullScreen] = useState(false);
  return (
    <div className='vehicle-container'>
      <Swiper
        slidesPerView={isOpenFullScreen ? 1 : 3}
        slidesPerGroup={1}
        spaceBetween={4}
        navigation
        direction='horizontal'
        centeredSlides='true'
        pagination={
          isOpenFullScreen && {
            type: 'fraction',
          }
        }
        className={isOpenFullScreen ? 'fullscreen-swiper' : ''}
      >
        {galleryImages?.map((arr, idx) => {
          return (
            <SwiperSlide
              key={idx}
              onClick={() => setIsOpenFullScreen(!isOpenFullScreen)}
            >
              <img
                src={`${process.env.REACT_APP_DRIVER_API_BACKEND_URL_BASE}/${arr?.path}`}
                className={isOpenFullScreen ? 'full-slide' : 'slide-image'}
                alt='vehicles'
                onClick={(e) => isOpenFullScreen && e.stopPropagation()}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
Vehicles.propTypes = {
  galleryImages: PropTypes.array,
};
