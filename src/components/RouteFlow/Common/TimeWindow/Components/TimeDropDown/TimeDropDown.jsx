import React, { useRef } from 'react';

// Utils
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import './timeSwiper.scss';
import rightArrowTriangle from 'assets/icons/rightArrowTriangle.svg';
import PropTypes from 'prop-types';

// Components
import * as S from './TimeDropDownStyledComponents';

// Hooks
import useOutsideAlerter from 'customHooks/useOutSideAlerter';

// Constants
import times from '../timeConstant';

SwiperCore.use([Mousewheel]);

export default function TimeDropDown({
  setSelectedTimesIndex,
  setIsTimeModalOpen,
  selectedTimeIndex,
}) {
  const wrapper = useRef(null);
  useOutsideAlerter(wrapper, () => setIsTimeModalOpen(false));

  return (
    <S.TimeDropDownContainer ref={wrapper}>
      <S.TimeDropDownHours>
        <Swiper
          slidesPerView={3}
          slidesPerGroup={1}
          loop={true}
          mousewheel={true}
          direction='vertical'
          centeredSlides='true'
          onBeforeTransitionStart={(e) => setSelectedTimesIndex(e.realIndex)}
          initialSlide={selectedTimeIndex}
          className='time-swiper'
        >
          {times.map((time, index) => {
            return (
              <SwiperSlide key={time}>
                <S.Time
                  selected={selectedTimeIndex === index}
                  onClick={() =>
                    selectedTimeIndex === index && setIsTimeModalOpen(false)
                  }
                >
                  {time}
                </S.Time>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <S.TimeDropDownArrow>
          <img src={rightArrowTriangle} alt='' />
        </S.TimeDropDownArrow>
      </S.TimeDropDownHours>
    </S.TimeDropDownContainer>
  );
}

TimeDropDown.propTypes = {
  setSelectedTimesIndex: PropTypes.func.isRequired,
  setIsTimeModalOpen: PropTypes.func.isRequired,
  selectedTimeIndex: PropTypes.number.isRequired,
};
