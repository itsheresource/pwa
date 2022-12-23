import React, { useEffect, useRef, useState } from 'react';

//components
import * as S from './DriverMatchingStyledComponents';
import * as C from 'scss/colors';
import DropBox from './components/DropBox/DropBox';
import OrderAccepted from './components/OrderAccepted/OrderAccepted';
import SkipModal from './components/SkipModal/SkipModal';
import CancelModal from './components/CancelModal/CancelModal';
import ChangeDateModal from './components/ChangeDateModal/ChangeDateModal';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

//icons
import findingDriverAnimation from 'assets/gifs/findingDriverAnimation.gif';
import driverNotFoundAnimation from 'assets/gifs/driverNotFoundAnimation.gif';
import pickupIcon from 'assets/icons/pickupIcon.svg';
import dropOffIcon from 'assets/icons/dropOffIcon.svg';

// Apis
import {
  cancelPlaceInOrderPool,
  cancelRoute,
  checkIfRouteComplete,
  placeCurrentRouteInPool,
  setAdditionalInfos,
  setSkip,
} from 'apis/routeFlow/driverMatching';
import { getDriverInfo } from 'apis/driver';
import { getCurrentRoute } from 'apis/routeFlow/currentRoute';
import { getRoute } from 'apis/route';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  createCurrentRoute,
  updateCurrentRoute,
  updateRouteStatus,
} from '../_ducks/currentRoute/actions';
import { setSelectedItems } from '../_ducks/selectedItems/actions';
import { push } from 'connected-react-router';

// Utils
import io from 'socket.io-client';
import { SESSION_STORAGE_TOKEN_KEY } from 'fixtures/sessionToken';
import { get } from 'idb-keyval';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { ROUTE_PHASE } from 'fixtures/routePhases';
import redirect from '../utils/redirect';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import { removeDashes } from 'utils/NormalizePhoneInput';
import handleSeparateName from '../utils/handleSeparateName';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { timeWindowApi } from 'apis/timeWindowApi';
import times from '../Common/TimeWindow/Components/timeConstant';

export default function DriverMatching() {
  dayjs.extend(timezone);
  const currentRoute = useSelector((state) => state.currentRoute);
  const userInfo = useSelector((state) => state.userInfo);
  const pathname = useSelector((state) => state.router.location.pathname);
  const status = currentRoute.orderStatus;

  const dispatch = useDispatch(null);

  const [loading, setLoading] = useState(false);
  const [isFormOpenSender, setIsFormOpenSender] = useState(false);
  const [isFormOpenReceiver, setIsFormOpenReceiver] = useState(false);
  const [driverInfo, setDriverInfo] = useState(null);
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isChangeDateModalOpen, setIsChangeDateModalOpen] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(true);
  const [isOrderInPool, setIsOrderInPool] = useState(true);
  const [isDriverNotFound, setIsDriverNotFound] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [pickupForm, setPickupForm] = useState({
    fullName: '',
    phone: '',
    unitNo: '',
    buzzer: '',
  });
  const [dropOffForm, setDropOffForm] = useState({
    fullName: '',
    phone: '',
    unitNo: '',
    buzzer: '',
  });

  const socket = useRef(null);
  const initialized = useRef(null);

  const timeSpanWithDate = ({ isStartTime }) => {
    const urgencyName = currentRoute?.urgencyName;
    let timeIndexAddition;
    const startTimeIndex = times.findIndex(
      (time) => time === currentRoute?.time
    );
    if (urgencyName === 'Economy') timeIndexAddition = 12;
    else if (urgencyName === 'Regular') timeIndexAddition = 8;
    else if (urgencyName === 'Rush') timeIndexAddition = 4;
    else if (urgencyName === 'Direct') timeIndexAddition = 0;
    const endTime = [...times, ...times][startTimeIndex + timeIndexAddition];

    const scheduledTime = isStartTime ? currentRoute.time : endTime;
    const [hour, minute] = scheduledTime.split(':');

    let scheduledDate = dayjs(currentRoute.dates.orderDateTime).set({
      minutes: minute,
      hours: hour,
    });

    return scheduledDate.format('YYYY-MM-DDTHH:mm:ssZ');
  };

  const handleSetTimeWindow = async () => {
    const addresses = [
      {
        addressId: currentRoute.suborder.pickup[0]?.addressId,
        startTime: timeSpanWithDate({ isStartTime: true }),
        endTime: timeSpanWithDate({ isStartTime: false }),
      },
      {
        addressId: currentRoute.suborder.drop_location[0]?.addressId,
        startTime: timeSpanWithDate({ isStartTime: true }),
        endTime: timeSpanWithDate({ isStartTime: false }),
      },
    ];
    try {
      const res = await timeWindowApi(currentRoute._id, addresses);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetAdditionalInfo = async () => {
    setLoading(true);
    const addresses = [
      {
        addressId: currentRoute.suborder.pickup[0]?.addressId,
        firstName: pickupForm.fullName
          ? handleSeparateName(pickupForm.fullName).firstName
          : '',
        lastName: pickupForm.fullName
          ? handleSeparateName(pickupForm.fullName).lastName
          : '',
        phone: removeDashes(pickupForm.phone),
        unitNo: pickupForm.unitNo,
        buzzNo: pickupForm.buzzer,
      },
      {
        addressId: currentRoute.suborder.drop_location[0]?.addressId,
        firstName: dropOffForm.fullName
          ? handleSeparateName(dropOffForm.fullName).firstName
          : '',
        lastName: dropOffForm.fullName
          ? handleSeparateName(dropOffForm.fullName).lastName
          : '',
        phone: removeDashes(dropOffForm.phone),
        unitNo: dropOffForm.unitNo,
        buzzNo: dropOffForm.buzzer,
      },
    ];
    const body = {
      routeId: currentRoute._id,
      addresses,
    };
    try {
      const res = await setAdditionalInfos(body);
      if (res?.status) {
        dispatch(updateCurrentRoute(res.data));
        setLoading(false);
      } else {
        popUpUtil('error', res?.error_code);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      popUpUtil('error', err);
    }
  };

  const handleFillInitialInfo = async () => {
    const { pickup, drop_location: dropLocation } = currentRoute.suborder;
    const pickupCustomer = pickup[0]?.customer?.customer;
    const pickupInfo = pickup[0]?.additionalInfo;
    const dropOffCustomer = dropLocation[0]?.customer?.customer;
    const dropOffInfo = dropLocation[0]?.additionalInfo;

    setPickupForm({
      fullName:
        `${pickupCustomer?.firstName} ${pickupCustomer?.lastName}`.trim(),
      phone: removeDashes(pickupCustomer?.phone),
      unitNo: pickupInfo?.unitNo,
      buzzer: pickupInfo?.buzzNo,
    });
    setDropOffForm({
      fullName:
        `${dropOffCustomer?.firstName} ${dropOffCustomer?.lastName}`.trim(),
      phone: removeDashes(dropOffCustomer?.phone),
      unitNo: dropOffInfo?.unitNo,
      buzzer: dropOffInfo?.buzzNo,
    });
  };

  const handleGetDriverInfo = async (id) => {
    try {
      const res = await getDriverInfo(id);
      if (res?.status) {
        setDriverInfo(res.driverInfo);
      } else {
        popUpUtil('error', res?.error_code);
      }
    } catch (err) {
      console.error(err);
      popUpUtil('error', err);
    }
  };

  // INFO: This function gets called to set the new Route
  const handleGetPendingRoute = async () => {
    setLoading(true);
    try {
      const res = await getCurrentRoute();
      if (res?.status) {
        dispatch(createCurrentRoute(res.data));
        dispatch(push(AVAILABLE_ROUTES.DASHBOARD));
        dispatch(setSelectedItems([]));
        setLoading(false);
      }
    } catch (err) {
      console.warn(err);
      setLoading(false);
    }
  };

  // INFO: This function gets called to get the Route
  const handleGetCurrentRoute = async () => {
    setLoading(true);
    try {
      const res = await getRoute(currentRoute._id);
      if (res?.status) {
        dispatch(updateCurrentRoute(res.data));
        if (res.data.driverInfo) handleGetDriverInfo(res.data.driverInfo.id);
        setLoading(false);
        return res.data;
      }
    } catch (err) {
      console.warn(err);
      setLoading(false);
    }
  };

  const handleGetRoute = async () => {
    setLoading(true);
    try {
      if (currentRoute.orderStatus === 'Schedule') {
        await handleGetPendingRoute();
      } else {
        await handleGetCurrentRoute();
      }
    } catch (err) {
      console.warn(err);
      setLoading(false);
    }
  };

  const initSocket = async () => {
    let coords = { lat: 49.2578263, lng: -123.1939434 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      });
    }
    const { lat, lng } = coords;
    const userId = userInfo._id;
    let deliveryRadius;
    const radius = 5000;
    const userType = 'consumer';
    const date = currentRoute?.date;
    const time = currentRoute?.time;
    const extraHelper = currentRoute?.extraHelper;
    const urgencyId = currentRoute?.urgencyId;

    if (!userId)
      throw new Error(
        'You did not pass a userId to driversDataSocketMiddleware!'
      );
    if (!userType)
      throw new Error(
        'You did not pass a userType to driversDataSocketMiddleware!'
      );
    if (!lat || !lng)
      throw new Error(
        'You did not pass coordinates to driversDataSocketMiddleware!'
      );

    const deliveryRadiusValue = deliveryRadius ? '1' : '0';
    const token = await get(SESSION_STORAGE_TOKEN_KEY);
    let query = `token=${token}&lat=${lat}&lng=${lng}&delivery_radius=${deliveryRadiusValue}`;
    if (date) query += `&date=${date}`;
    if (time) query += `&time=${time}`;
    if (urgencyId) query += `&urgency=${urgencyId}`;
    if (extraHelper) query += `&extra_helper=${extraHelper}`;
    if (radius) query += `&radius=${radius}`;

    // Regarding Unexpected response error: 400...
    // https://github.com/socketio/socket.io/issues/1942
    // tldr; Likely server configuration problem
    socket.current = io.connect(process.env.REACT_APP_DRIVER_TRACKING_API, {
      query,
    });

    socket.current.on('connect', () => console.log('Socket is connected!'));

    socket.current.on('order-accepted', ({ driverInfo, orderInfo }) => {
      const { id, orderStatus: theOrderStatus } = orderInfo;
      dispatch(updateRouteStatus(theOrderStatus));
      handleGetCurrentRoute();
      setIsDriverNotFound(false);
      socket.current.disconnect();
      popUpUtil('success', 'Order accepted!');
    });

    socket.current.on('order-rejected', ({ driverInfo, orderInfo }) => {
      const { id, orderStatus } = orderInfo;
      console.error('Order rejected');
      popUpUtil('warning', 'Order rejected.');
      setIsDriverNotFound(true);
    });
  };

  const handlePlaceCurrentRouteInPool = async () => {
    setLoading(true);
    try {
      const res = await placeCurrentRouteInPool(currentRoute._id);
      if (res?.status) {
        setLoading(false);
        setIsDriverNotFound(false);
        setIsOrderInPool(true);

        setTimeout(() => {
          setIsOrderInPool(false);
          setIsDriverNotFound(true);
        }, res?.data?.activePoolRemainingTime);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handleChangeDate = async () => {
    try {
      setIsChangeDateModalOpen(false);
      if (isOrderInPool) handlePlaceCurrentRouteInPool();
    } catch (err) {
      console.error(err);
      popUpUtil('error', err);
    }
  };

  const handleSubmitInfo = async () => {
    setLoading(true);
    try {
      const res = await checkIfRouteComplete(currentRoute._id);

      if (res?.status && res?.data?.isComplete) {
        await handleGetRoute();
        setIsEditingInfo(false);
        setLoading(false);
      } else {
        popUpUtil('warning', 'Information is incomplete.');
        setLoading(false);
      }
    } catch (err) {
      popUpUtil('error', err);
      setLoading(false);
    }
  };

  //Validation submit form
  const validationForms = () => {
    //validations

    const isPickupValidation =
      !pickupForm.fullName || removeDashes(pickupForm.phone)?.length < 10;

    const isDropOffValidation =
      !dropOffForm.fullName || removeDashes(dropOffForm.phone)?.length < 10;

    isPickupValidation ? setIsFormOpenSender(true) : setIsFormOpenSender(false);
    isDropOffValidation
      ? setIsFormOpenReceiver(true)
      : setIsFormOpenReceiver(false);

    if (isPickupValidation || isDropOffValidation) {
      popUpUtil('error', 'Please fill in the required fields.');
    } else {
      handleSubmitInfo();
    }
  };

  const handleSkip = async () => {
    try {
      await setSkip(currentRoute._id);
      await handleGetRoute();
      popUpUtil('success', 'Successfully skipped additional info!');
      setIsSkipModalOpen(false);
      setIsEditingInfo(false);
    } catch (err) {
      console.error(err);
      popUpUtil('error', err);
    }
  };

  const handleOpenChangeDateModal = async () => {
    setIsChangeDateModalOpen(true);
  };

  const handleOpenCancelModal = async () => {
    setIsCancelModalOpen(true);
  };

  const handleCancel = async () => {
    setLoading(true);
    await cancelPlaceInOrderPool(currentRoute._id);
    const res = await cancelRoute(currentRoute._id);
    if (res?.status) {
      popUpUtil('success', 'Successfully cancelled route!');
      dispatch(updateCurrentRoute(res.data));
      dispatch(push(AVAILABLE_ROUTES.DASHBOARD));
    } else {
      popUpUtil('error', res?.error_code);
      setLoading(false);
    }
  };

  const handleInitializationBeforeScheduled = async () => {
    const res = await handleGetCurrentRoute();
    if (res?.activePoolRemainingTime || res?.activePoolRemainingTime === 0) {
      if (res?.activePoolRemainingTime > 0) {
        setIsOrderInPool(true);
        setIsDriverNotFound(false);

        setTimeout(() => {
          setIsOrderInPool(false);
          setIsDriverNotFound(true);
        }, res?.activePoolRemainingTime);
      } else if (res?.activePoolRemainingTime === 0) {
        setIsOrderInPool(false);
        setIsDriverNotFound(true);
      }
    }
  };

  const handleInitialization = async () => {
    if (currentRoute.orderStatus !== 'Schedule') {
      await handleInitializationBeforeScheduled();
      setIsInitialized(true);
    } else if (
      currentRoute.orderStatus === 'Schedule' &&
      currentRoute?.driverInfo
    ) {
      await handleGetDriverInfo(currentRoute?.driverInfo?.id);
      setIsInitialized(true);
    }
    setIsEditingInfo(!currentRoute?.additionalInfoIsFinal);
    handleFillInitialInfo();
    initialized.current = true;
  };

  useEffect(() => {
    if (
      currentRoute._id &&
      !initialized.current &&
      (currentRoute.routePhase === ROUTE_PHASE.SELECT_DRIVER ||
        currentRoute.routePhase === ROUTE_PHASE.ORDER_ACCEPTED)
    )
      handleSetTimeWindow();
    handleInitialization();
  }, [currentRoute._id]);

  useEffect(() => {
    if (
      currentRoute._id &&
      currentRoute.routePhase !== ROUTE_PHASE.SELECT_DRIVER &&
      currentRoute.routePhase !== ROUTE_PHASE.ORDER_ACCEPTED &&
      pathname === AVAILABLE_ROUTES.DRIVER_MATCHING
    )
      redirect(currentRoute.routePhase, dispatch);
  }, [pathname]);

  useEffect(() => {
    if (isEditingInfo) handleFillInitialInfo();
  }, [isEditingInfo]);

  useEffect(() => {
    if (isOrderInPool) {
      initSocket();
    }
    return () => {
      if (socket.current && socket.current.connected) {
        socket.current.disconnect();
      }
    };
  }, [isOrderInPool]);

  return (
    <S.SearchingContainer>
      {loading && <SpinnerLoading />}
      {status === 'Pending' || status === 'Available' ? (
        <S.Searching
          isEditingInfo={isEditingInfo}
          isOrderInPool={isOrderInPool}
        >
          <S.GifContainer>
            {isInitialized && (
              <S.Gif
                src={
                  isDriverNotFound
                    ? driverNotFoundAnimation
                    : findingDriverAnimation
                }
                alt='finding'
                isEditingInfo={isEditingInfo}
              />
            )}
          </S.GifContainer>
          {!isOrderInPool && isInitialized && (
            <S.NotFoundTitle className={`${!isEditingInfo ? 'mt-10' : ''}`}>
              No Driver has accepted your order
            </S.NotFoundTitle>
          )}
          {!isOrderInPool && (
            <S.TryAgainButtonContainer
              className={`${!isEditingInfo ? 'mt-20' : 'mt-10'}`}
            >
              <S.TryAgainButton onClick={handlePlaceCurrentRouteInPool}>
                <S.TryAgainButtonText>Try again</S.TryAgainButtonText>
              </S.TryAgainButton>
            </S.TryAgainButtonContainer>
          )}
          {!isEditingInfo && isOrderInPool && (
            <S.TitleContainer>
              <S.FindingTitle>Finding driver</S.FindingTitle>
            </S.TitleContainer>
          )}
          <S.ChangeDateButtonContainer>
            <S.ChangeDateButton onClick={handleOpenChangeDateModal}>
              <S.ChangeDateButtonText>
                Change time & Date
              </S.ChangeDateButtonText>
            </S.ChangeDateButton>
          </S.ChangeDateButtonContainer>
          {!isEditingInfo && (
            <S.EditAdditionalInfoButtonContainer>
              <S.EditAdditionalInfoButton
                onClick={() => setIsEditingInfo(true)}
              >
                <S.EditAdditionalInfoButtonText>
                  Edit the additional information
                </S.EditAdditionalInfoButtonText>
              </S.EditAdditionalInfoButton>
            </S.EditAdditionalInfoButtonContainer>
          )}
          <S.CancelRouteButtonContainer>
            <S.CancelRouteButton onClick={handleOpenCancelModal}>
              <S.CancelRouteButtonText>
                Cancel the route
              </S.CancelRouteButtonText>
            </S.CancelRouteButton>
          </S.CancelRouteButtonContainer>
        </S.Searching>
      ) : (
        status === 'Schedule' && (
          <OrderAccepted
            driverInfo={driverInfo}
            isEditingInfo={isEditingInfo}
            setIsEditingInfo={setIsEditingInfo}
          />
        )
      )}
      {isEditingInfo && (
        <S.InfoContainer>
          <DropBox
            isOpen={isFormOpenSender}
            onClick={() => setIsFormOpenSender(!isFormOpenSender)}
            backgroundColor={C.colorBlueMedium}
            icon={pickupIcon}
            status='sender'
            order='pickup'
            form={pickupForm}
            setForm={setPickupForm}
            handleSetAdditionalInfo={handleSetAdditionalInfo}
          />
          <DropBox
            isOpen={isFormOpenReceiver}
            onClick={() => setIsFormOpenReceiver(!isFormOpenReceiver)}
            backgroundColor={C.primaryOrange}
            icon={dropOffIcon}
            status='receiver'
            order='drop_location'
            form={dropOffForm}
            setForm={setDropOffForm}
            handleSetAdditionalInfo={handleSetAdditionalInfo}
          />
          <S.ButtonsContainer>
            <S.Button
              type='submit'
              color={C.buttonGreen}
              className='mr-2'
              onClick={validationForms}
            >
              Submit
            </S.Button>
            <S.Button
              color={C.colorPrimary}
              onClick={() => setIsSkipModalOpen(true)}
            >
              Skip
            </S.Button>
          </S.ButtonsContainer>
        </S.InfoContainer>
      )}
      {isSkipModalOpen && (
        <SkipModal
          setIsSkipModalOpen={setIsSkipModalOpen}
          handleSkip={handleSkip}
        />
      )}
      {isCancelModalOpen && (
        <CancelModal
          setIsCancelModalOpen={setIsCancelModalOpen}
          handleCancel={() => handleCancel()}
          price={currentRoute.totalCharge}
        />
      )}
      {isChangeDateModalOpen && (
        <ChangeDateModal
          setIsChangeDateModalOpen={setIsChangeDateModalOpen}
          callBackFnc={() => handleChangeDate()}
          isOrderInPool={isOrderInPool}
        />
      )}
    </S.SearchingContainer>
  );
}
