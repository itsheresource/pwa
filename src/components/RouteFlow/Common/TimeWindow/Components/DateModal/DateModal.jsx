import React, { useLayoutEffect, useRef, useState } from 'react';

// Components
import * as S from './DateModalStyledComponents';

// Utils
import useOutsideAlerter from 'customHooks/useOutSideAlerter';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import objectSupport from 'dayjs/plugin/objectSupport';
import arraySupport from 'dayjs/plugin/arraySupport';
import PropTypes from 'prop-types';
import rightArrowTriangle from 'assets/icons/rightArrowTriangle.svg';

//dayjs plugins
dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(arraySupport);

const daysMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const monthMap = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export default function DateModal({ setDate, date, setIsDatePickerOpen }) {
  const [year, setYear] = useState(date.year());
  const [month, setMonth] = useState(date.month());
  const [selectedDay, setSelectedDay] = useState(dayjs().valueOf());

  const datePickerWrapperRef = useRef(null);

  useOutsideAlerter(datePickerWrapperRef, () => setIsDatePickerOpen(false));

  const handleGetNumberOfDays = (theYear, theMonth) => {
    return 40 - new Date(theYear, theMonth, 40).getDate();
  };

  const handleGetDayDetails = ({
    index,
    firstDay,
    numberOfDays,
    theMonth,
    theYear,
  }) => {
    let date = index - firstDay;
    let day = index % 7;
    let prevMonth = theMonth - 1;
    let prevYear = theYear;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    let prevMonthNumberOfDays = handleGetNumberOfDays(prevYear, prevMonth);
    let _date =
      (date < 0 ? prevMonthNumberOfDays + date : date % numberOfDays) + 1;
    let newMonth = date < 0 ? -1 : date >= numberOfDays ? 1 : 0;
    let timestamp = dayjs([theYear, theMonth, _date]).valueOf();
    return {
      date: _date,
      day,
      month: newMonth,
      timestamp,
      dayString: daysMap[day],
    };
  };

  const handleGetMonthDetails = (theYear, theMonth) => {
    let firstDay = dayjs([theYear, theMonth, 1]).day();
    let numberOfDays = handleGetNumberOfDays(theYear, theMonth);
    let monthArray = [];
    let rows = 6;
    let currentDay = null;
    let index = 0;
    let cols = 7;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = handleGetDayDetails({
          index,
          numberOfDays,
          firstDay,
          theYear,
          theMonth,
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  };

  const [monthDetails, setMonthDetails] = useState(
    handleGetMonthDetails(year, month)
  );

  const handleGetMonthStr = (month) =>
    monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

  const handleOnDateClick = (day) => {
    setSelectedDay(day.timestamp);
  };

  const handleSetMonth = (offset) => {
    let theYear = year;
    let theMonth = month + offset;
    if (theMonth === -1) {
      theMonth = 11;
      theYear--;
    } else if (theMonth === 12) {
      theMonth = 0;
      theYear++;
    }
    setYear(theYear);
    setMonth(theMonth);
    setMonthDetails(handleGetMonthDetails(theYear, theMonth));
  };

  const handleSetDate = (e) => {
    e.preventDefault();
    setDate(dayjs(selectedDay));
    setIsDatePickerOpen(false);
  };

  const renderCalendar = () => {
    let days = monthDetails.map((day, index) => {
      return (
        <S.CalenderDayContainer
          key={index}
          onClick={() => handleOnDateClick(day)}
        >
          <S.CalenderDayContainerDay
            selected={
              day.date === Number(dayjs(selectedDay).format('D')) &&
              month === dayjs(selectedDay).month() &&
              year === dayjs(selectedDay).year()
            }
            disabled={
              day.month !== 0 ||
              day.timestamp < dayjs().valueOf() - 24 * 60 * 60 * 1000
            }
          >
            <div>
              <span>{day.date}</span>
            </div>
          </S.CalenderDayContainerDay>
        </S.CalenderDayContainer>
      );
    });

    return (
      <S.CalenderContainer>
        <S.CalenderContainerHead>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => (
            <S.CalenderContainerHeadName key={i}>
              {d}
            </S.CalenderContainerHeadName>
          ))}
        </S.CalenderContainerHead>
        <S.CalenderContainerBody>{days}</S.CalenderContainerBody>
      </S.CalenderContainer>
    );
  };

  useLayoutEffect(() => {
    setSelectedDay(date.valueOf());
  }, [date]);

  return (
    <S.DatePickerContainer>
      <S.DatePickerWrapper ref={datePickerWrapperRef}>
        <S.DatePickerHead>
          <S.DatePickerHeadButton>
            <S.DatePickerHeadButtonInner onClick={() => handleSetMonth(-1)}>
              <S.DatePickerHeadButtonInnerLeftArrow
                src={rightArrowTriangle}
                alt=''
              />
            </S.DatePickerHeadButtonInner>
          </S.DatePickerHeadButton>
          <S.DatePickerHeadContainer>
            <S.DatePickerHeadContainerMonth>
              {handleGetMonthStr(month)}
            </S.DatePickerHeadContainerMonth>
            <S.DatePickerHeadContainerYear>
              {year}
            </S.DatePickerHeadContainerYear>
          </S.DatePickerHeadContainer>
          <S.DatePickerHeadButton>
            <S.DatePickerHeadButtonInner onClick={() => handleSetMonth(1)}>
              <S.DatePickerHeadButtonInnerRightArrow
                src={rightArrowTriangle}
                alt=''
              />
            </S.DatePickerHeadButtonInner>
          </S.DatePickerHeadButton>
        </S.DatePickerHead>
        <S.DatePickerBody>{renderCalendar()}</S.DatePickerBody>
        <S.ButtonsContainer>
          <S.CancelButton onClick={() => setIsDatePickerOpen(false)}>
            Cancel
          </S.CancelButton>
          <S.ApplyButton onClick={handleSetDate}>Apply</S.ApplyButton>
        </S.ButtonsContainer>
      </S.DatePickerWrapper>
    </S.DatePickerContainer>
  );
}

DateModal.propTypes = {
  setDate: PropTypes.func.isRequired,
  setIsDatePickerOpen: PropTypes.func.isRequired,
  date: PropTypes.shape({
    year: PropTypes.func.isRequired,
    month: PropTypes.func.isRequired,
  }),
};
