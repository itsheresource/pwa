import React, { useEffect, useState } from 'react';

//components
import * as S from './ChangeDateModalStyledComponents';
import TimeWindow from 'components/RouteFlow/Common/TimeWindow/TimeWindow';
import { updateCurrentRoute } from 'components/RouteFlow/_ducks/currentRoute/actions';

//utils
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import objectSupport from 'dayjs/plugin/objectSupport';
import arraySupport from 'dayjs/plugin/arraySupport';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// constants
import times from 'components/RouteFlow/Common/TimeWindow/Components/timeConstant';

// Apis
import { setRouteUrgency } from 'apis/routeFlow/urgency';
import { cancelPlaceInOrderPool } from 'apis/routeFlow/driverMatching';
import CloseSvg from 'assets/icons/CloseSvg';

export default function ChangeDateModal({
  setIsChangeDateModalOpen,
  callBackFnc,
  isOrderInPool,
}) {
  dayjs.extend(objectSupport);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(arraySupport);
  dayjs.extend(customParseFormat);
  const currentRoute = useSelector((state) => state.currentRoute);

  const [date, setDate] = useState(dayjs(currentRoute.date).utc());
  const [selectedTimeIndex, setSelectedTimesIndex] = useState(0);

  const dispatch = useDispatch(null);

  const handleSetNewDate = async () => {
    try {
      let res;
      if (isOrderInPool) res = await cancelPlaceInOrderPool(currentRoute._id);
      if (res?.status || !isOrderInPool) {
        const scheduledDate = dayjs(date).format('MMM-DD-YYYY');
        const scheduledTime = times[selectedTimeIndex];
        if (dayjs(scheduledDate + ' ' + scheduledTime).isBefore()) {
          return popUpUtil('warning', 'Please select future date and time');
        }
        const body = {
          date: scheduledDate,
          timeZone: dayjs.tz.guess(),
          routeId: currentRoute._id,
          time: scheduledTime,
          onlySetDateTime: true,
        };
        const res = await setRouteUrgency(body);
        if (res?.status) {
          dispatch(updateCurrentRoute(res.data));
          callBackFnc();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (currentRoute?._id) {
      setSelectedTimesIndex(
        times.findIndex((time) => time === currentRoute.time)
      );
      setDate(dayjs(currentRoute.date).utc());
    }
  }, [currentRoute?._id]);

  return (
    <S.Overlay>
      <S.ChangeDateModalContainer>
        <S.CloseButtonContainer>
          <S.CloseButton onClick={() => setIsChangeDateModalOpen(false)}>
            <CloseSvg width={32} height={32} />
          </S.CloseButton>
        </S.CloseButtonContainer>
        <TimeWindow
          selectedTimeIndex={selectedTimeIndex}
          setSelectedTimesIndex={setSelectedTimesIndex}
          date={date}
          setDate={setDate}
          selectedVehicleCategory={currentRoute?.urgencyName}
        />
        <div className='mb-5'>
          <S.ConfirmButton onClick={handleSetNewDate}>
            <S.ConfirmButtonText>Change Date</S.ConfirmButtonText>
          </S.ConfirmButton>
        </div>
      </S.ChangeDateModalContainer>
    </S.Overlay>
  );
}

ChangeDateModal.propTypes = {
  setIsChangeDateModalOpen: PropTypes.func.isRequired,
  callBackFnc: PropTypes.func.isRequired,
  isOrderInPool: PropTypes.bool.isRequired,
};
