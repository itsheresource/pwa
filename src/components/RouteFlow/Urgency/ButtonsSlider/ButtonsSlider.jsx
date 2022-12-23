import React, { useEffect, useMemo, useState } from 'react';

// Components
import * as S from './ButtonSliderStyledComponents';

// Utils
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

// Redux
import { useSelector } from 'react-redux';

// Styles
import './urgencySwiperStyle.scss';

// install Swiper modules
SwiperCore.use([Navigation]);

export default function ButtonsSlider({
  selectedVehicleCategory,
  setSelectedVehicleCategory,
  vehicleCategories,
}) {
  const currentRoute = useSelector((state) => state.currentRoute);

  const [swiper, setSwiper] = useState(0);

  const slideTo = (index) => swiper?.slideTo(index);

  const handleOnSlide = (e) => {
    const selectedUrgency = vehicleCategories[e.realIndex];
    setSelectedVehicleCategory(selectedUrgency);
  };

  useEffect(() => {
    if (
      currentRoute._id &&
      currentRoute.urgencyName &&
      swiper &&
      vehicleCategories.length
    ) {
      const selectedButtonIndex = vehicleCategories.findIndex(
        (vc) => vc.urgencyInfo.name === currentRoute.urgencyName
      );
      slideTo(selectedButtonIndex);
    }
  }, [currentRoute._id, swiper]);

  return (
    <S.SliderContainer>
      {vehicleCategories?.length > 0 &&
      selectedVehicleCategory?.urgencyInfo?.name ? (
        <Swiper
          navigation={true}
          slidesPerView={3}
          slidesPerGroup={1}
          spaceBetween={10}
          slideToClickedSlide={true}
          centeredSlides={true}
          className='urgency-button-slider'
          onSwiper={setSwiper}
          onBeforeTransitionStart={handleOnSlide}
        >
          {vehicleCategories.map((vc, i) => {
            return (
              <SwiperSlide
                key={vc.urgencyInfo.urgencyId}
                onClick={() => setSelectedVehicleCategory(vc)}
              >
                <S.SlideButton
                  key={vc.urgencyInfo.name}
                  selected={
                    vc.urgencyInfo.name ===
                    selectedVehicleCategory?.urgencyInfo?.name
                  }
                >
                  <span> {vc.urgencyInfo.name}</span>
                </S.SlideButton>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <S.EmptyCategories></S.EmptyCategories>
      )}
    </S.SliderContainer>
  );
}

ButtonsSlider.defaultProps = {
  vehicleCategories: [{}],
};

ButtonsSlider.propTypes = {
  setSelectedVehicleCategory: PropTypes.func.isRequired,
  vehicleCategories: PropTypes.arrayOf(PropTypes.shape({})),
  selectedVehicleCategory: PropTypes.shape({
    urgencyInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
};
