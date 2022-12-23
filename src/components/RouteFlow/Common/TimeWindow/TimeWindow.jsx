import React, { useState } from 'react';

// Components
import * as S from './TimeWindowStyledComponents';
import timeWindowTopHeader from 'assets/icons/timeWindowTopHeader.svg';
import ArrowDown from 'assets/icons/ArrowDown';
import ArrowUp from 'assets/icons/ArrowUp';
import dashLine from 'assets/icons/dashLine.svg';
import TimeDropDown from './Components/TimeDropDown/TimeDropDown';

// Constants
import times from './Components/timeConstant';
import DateModal from './Components/DateModal/DateModal';

// Utils
import PropTypes from 'prop-types';
import useTimeWindow from 'customHooks/useTimeWindow';

export default function TimeWindow({
  selectedTimeIndex,
  setSelectedTimesIndex,
  date,
  setDate,
  selectedVehicleCategory,
}) {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const timeWindow = useTimeWindow(selectedVehicleCategory);

  return (
    <div>
      <S.TimeWindowHeaderContainer>
        <S.TimeWindowHeader src={timeWindowTopHeader} alt='' />
        <S.TimeWindowHours>
          {timeWindow >= 2 ? `${timeWindow} Hrs Window` : 'Direct'}
        </S.TimeWindowHours>
      </S.TimeWindowHeaderContainer>
      <S.TimeWindowDetailsContainer>
        <S.DateContainer>
          <S.DateButton onClick={() => setIsDatePickerOpen(true)}>
            <S.MonthContainer>
              <div>
                <S.MonthNameText>{date.format('MMM')}</S.MonthNameText>
              </div>
              <div>
                <S.MonthDayText>{date.format('D')}</S.MonthDayText>
              </div>
            </S.MonthContainer>
            <S.ArrowIcon>
              <ArrowDown opacity='0.6' />
            </S.ArrowIcon>
          </S.DateButton>
          {isDatePickerOpen && (
            <DateModal
              setDate={setDate}
              date={date}
              setIsDatePickerOpen={setIsDatePickerOpen}
            />
          )}
        </S.DateContainer>
        <S.TimeContainer>
          <S.TimeButton onClick={() => setIsTimeModalOpen(true)}>
            <S.TimeDetailsContainer>
              <S.StartTimeText>Start Time</S.StartTimeText>
              <S.StartTimeNumberContainer>
                <div>
                  <S.TimeNumberText>
                    {times[selectedTimeIndex]}
                  </S.TimeNumberText>
                </div>
                <S.DashContainer>
                  <img src={dashLine} alt='' />
                </S.DashContainer>
                <div>
                  <S.TimeNumberText>
                    {[...times, ...times][selectedTimeIndex + timeWindow * 2]}
                  </S.TimeNumberText>
                </div>
              </S.StartTimeNumberContainer>
            </S.TimeDetailsContainer>
            <S.ArrowContainer>
              <S.Arrows>
                <div>
                  <ArrowUp opacity='0.5' />
                </div>
                <div>
                  <ArrowDown opacity='0.5' />
                </div>
              </S.Arrows>
            </S.ArrowContainer>
          </S.TimeButton>
          {isTimeModalOpen && (
            <TimeDropDown
              setSelectedTimesIndex={setSelectedTimesIndex}
              setIsTimeModalOpen={setIsTimeModalOpen}
              selectedTimeIndex={selectedTimeIndex}
            />
          )}
        </S.TimeContainer>
      </S.TimeWindowDetailsContainer>
    </div>
  );
}

TimeWindow.propTypes = {
  selectedTimeIndex: PropTypes.number.isRequired,
  setSelectedTimesIndex: PropTypes.func.isRequired,
  date: PropTypes.shape({
    format: PropTypes.func.isRequired,
  }).isRequired,
  setDate: PropTypes.func.isRequired,
  selectedVehicleCategory: PropTypes.string,
};
