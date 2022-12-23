import React, { useEffect, useState } from 'react';

// Components
import ButtonsSlider from './ButtonsSlider/ButtonsSlider';
import TimeWindow from 'components/RouteFlow/Common/TimeWindow/TimeWindow';
import Vehicles from './Vehicles/Vehicles';
import * as S from './UrgencyStyledComponents';
import RouteFlowButton from 'components/RouteFlow/Common/RouteFlowButton/RouteFlowButton';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

// Utils
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { ROUTE_PHASE } from 'fixtures/routePhases';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import objectSupport from 'dayjs/plugin/objectSupport';
import arraySupport from 'dayjs/plugin/arraySupport';
import redirect from '../utils/redirect';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

// Apis
import {
  setRouteUrgency,
  setVehicleCalculations,
} from 'apis/routeFlow/urgency';
import { updateCurrentRoute } from '../_ducks/currentRoute/actions';
import { setCurrentRoutePhase } from 'apis/routeFlow/currentRoute';

// Constant
import times from 'components/RouteFlow/Common/TimeWindow/Components/timeConstant';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';

//dayjs plugins
dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(arraySupport);

const handleTimeWindow = () => {
  switch (true) {
    case dayjs().minute() < 16:
      return dayjs().set('minutes', 30).format('HH:mm');
    case dayjs().minute() < 46:
      return dayjs()
        .set({ minutes: 0, hours: dayjs().hour() + 1 })
        .format('HH:mm');
    default:
      return dayjs()
        .set({ minutes: 30, hours: dayjs().hour() + 1 })
        .format('HH:mm');
  }
};
export default function Urgency() {
  const [loading, setLoading] = useState(false);
  const currentRoute = useSelector((state) => state.currentRoute);
  const pathname = useSelector((state) => state.router.location.pathname);

  const [selectedTimeIndex, setSelectedTimesIndex] = useState(0);
  const [date, setDate] = useState(dayjs());
  const [vehicleCategories, setVehicleCategories] = useState(null);
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState({});

  const dispatch = useDispatch();

  const handleSetVehicleCalculations = async () => {
    if (currentRoute.time) {
      setSelectedTimesIndex(
        times.findIndex((time) => time === currentRoute.time)
      );
    } else {
      setSelectedTimesIndex(
        times.findIndex((time) => time === handleTimeWindow())
      );
    }
    if (currentRoute.date) setDate(dayjs(currentRoute.date));
    try {
      const body = {
        date:
          dayjs(currentRoute.date).format('MMM-DD-YYYY') ||
          date.format('MMM-DD-YYYY'),
        routeId: currentRoute._id,
        time: currentRoute.time || times[selectedTimeIndex],
      };
      const res = await setVehicleCalculations(body);
      if (res?.status) {
        setVehicleCategories(res.data);
        return res.data;
      } else {
        popUpUtil('error', res?.error_code);
      }
    } catch (err) {
      console.error(err);
      popUpUtil('error', err);
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      const scheduledTime = times[selectedTimeIndex];
      const [hour, minute] = scheduledTime.split(':');
      let scheduledDate = dayjs(date).set({
        minutes: minute,
        hours: hour,
      });

      if (scheduledDate.isBefore()) {
        setLoading(false);
        return popUpUtil('warning', 'Please select future date and time');
      }
      if (!selectedVehicle) {
        setLoading(false);
        return popUpUtil('warning', 'Please select vehicle');
      }

      const body = {
        date: scheduledDate,
        timeZone: dayjs.tz.guess(),
        routeId: currentRoute._id,
        time: scheduledTime,
        urgencyId: selectedVehicleCategory.urgencyInfo.id,
        vehicleId: selectedVehicle,
      };

      const res = await setRouteUrgency(body);
      if (res?.status) {
        dispatch(updateCurrentRoute(res.data));

        const body = {
          id: currentRoute._id,
          routePhase: ROUTE_PHASE.INVOICE,
        };
        const routePhaseRes = await setCurrentRoutePhase(body);
        if (routePhaseRes?.status) {
          dispatch(updateCurrentRoute(routePhaseRes.data));
          dispatch(push(AVAILABLE_ROUTES.INVOICE));
        } else {
          popUpUtil('error', routePhaseRes?.error_code);
          setLoading(false);
        }
      } else {
        popUpUtil('error', res?.error_code);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      popUpUtil('error', err);
      setLoading(false);
    }
  };

  const handleInitialization = async () => {
    setLoading(true);
    try {
      const res = await handleSetVehicleCalculations();
      let theSelectedVehicleCategory;
      if (currentRoute.urgencyNum) {
        setLoading(false);
        theSelectedVehicleCategory = res.find(
          (category) => category.urgencyInfo.id === currentRoute.urgencyNum
        );
      } else {
        theSelectedVehicleCategory = res.find(
          (category) => category.urgencyInfo.name === 'Economy'
        );
      }
      setSelectedVehicleCategory(theSelectedVehicleCategory);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentRoute._id && currentRoute.routePhase === ROUTE_PHASE.URGENCY)
      handleInitialization();
  }, [currentRoute._id]);

  useEffect(() => {
    if (
      currentRoute._id &&
      currentRoute.routePhase !== ROUTE_PHASE.URGENCY &&
      pathname === AVAILABLE_ROUTES.URGENCY
    )
      redirect(currentRoute.routePhase, dispatch);
  }, [pathname]);

  return (
    <S.UrgencyContainer>
      {loading && <SpinnerLoading />}
      <ButtonsSlider
        setSelectedVehicleCategory={setSelectedVehicleCategory}
        vehicleCategories={vehicleCategories}
        selectedVehicleCategory={selectedVehicleCategory}
      />
      <TimeWindow
        selectedTimeIndex={selectedTimeIndex}
        setSelectedTimesIndex={setSelectedTimesIndex}
        date={date}
        setDate={setDate}
        selectedVehicleCategory={selectedVehicleCategory?.urgencyInfo?.name}
      />
      <Vehicles
        selectedVehicleCategory={selectedVehicleCategory}
        setSelectedVehicle={setSelectedVehicle}
      />
      <RouteFlowButton onClick={handleContinue}>Set</RouteFlowButton>
    </S.UrgencyContainer>
  );
}
