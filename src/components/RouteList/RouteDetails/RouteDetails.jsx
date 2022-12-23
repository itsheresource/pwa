import React, { useState, useEffect, useRef } from 'react';

//utils
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import { SESSION_STORAGE_TOKEN_KEY } from 'fixtures/sessionToken';
import { get } from 'idb-keyval';
import { io } from 'socket.io-client';

//components
import * as C from 'scss/colors';
import * as S from './RouteDetailsStyled';
import DriverInfo from './components/DriverInfo/DriverInfo';
import RouteData from './components/RouteData/RouteData';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';
import RefundModal from './components/RefundModal/RefundModal';
import ViewAdditionalServices from './components/ViewAdditionalServices/ViewAdditionalServices';
import ImageSlider from './components/Notes/ImageSlider';
import InvoiceMenu from './components/InvoiceMenu/InvoiceMenu';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRouteDetailsData } from 'components/SelectedRoute/_ducks/RouteDetailsData/actions';

// Router
import { useParams, useLocation } from 'react-router';

//api
import { getRouteId } from 'apis/routesList/getRouteId';
import { getDriverRating } from 'apis/driver';
//map
import Map from 'components/Map/Map';
import ViewItemsModal from './components/ViewItemsModal/ViewItemsModal';

//icons
import refresh from 'assets/icons/refresh.svg';

const handleTextButton = (status) => {
  switch (status) {
    case 'Schedule':
      return 'Cancel route';
    case 'Ongoing':
      return 'Cancel route';
    default:
      return null;
  }
};

export default function RouteDetails() {
  const routeDetailsData = useSelector((state) => state.selectedRouteDetails);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState();
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [driverData, setDriverData] = useState(null);
  const [isViewMoreOpen, setIsViewMoreOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState();
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isViewAdditionalServicesOpen, setIsViewAdditionalServicesOpen] =
    useState(false);
  const [isOpenImageSlider, setIsOpenImageSlider] = useState(false);
  const [imageSliderData, setImageSliderData] = useState(false);
  const [avgRating, setAverageRating] = useState();

  const location = useLocation();
  const { status } = useParams();
  const dispatch = useDispatch();
  //condition for Map component
  const isOngoingRoute = routeData?.orderStatus === 'Ongoing';
  const routeId = routeData?._id;

  //---------SOCKET------------
  const socket = useRef(null);
  const [socketIsConnected, setSocketIsConnected] = useState(false);
  const [inRealTime, setInRealTime] = useState(false);

  const initSocket = async () => {
    let coords = { lat: 49.2578263, lng: -123.1939434 };
    const { lat, lng } = coords;
    const deliveryRadiusValue = '0';

    if (!lat || !lng)
      throw new Error(
        'You did not pass coordinates to driversDataSocketMiddleware!'
      );

    const token = await get(SESSION_STORAGE_TOKEN_KEY);
    let query = `token=${token}&lat=${lat}&lng=${lng}&delivery_radius=${deliveryRadiusValue}`;
    socket.current = io(process.env.REACT_APP_DRIVER_TRACKING_API, {
      query,
    });

    socket.current.on('connect', () =>
      setTimeout(() => {
        setSocketIsConnected(true);
      }, 1000)
    );
    //matching-off
    socket.current.emit('track-ongoing-route', { routeId });

    socket.current.on('connect', () => console.log('Socket connected'));

    socket.current.on('disconnect', () => setSocketIsConnected(false));

    socket.current.on('driver-location-response', (driversDataArray) => {
      setDriverData(driversDataArray.data[0]);
      setInRealTime(driversDataArray.inRealTime);
      // inRealTime -> if true, show vehicles on the map
      //               if false -> use data.length to show of drivers
    });

    socket.current.on('driver-movement', ({ data: movedDriverData }) =>
      setDriverData(movedDriverData)
    );

    socket.current.on('driver-disconnected', ({ driverId }) => {
      if (driverId === routeData?.driverInfo?.id) {
        setDriverData();
      }
    });

    socket.current.on('driver-inside-radius', ({ data: newDriverData }) => {
      setDriverData(newDriverData);
    });

    socket.current.on('driver-outside-radius', ({ data: newDriverData }) => {
      if (!newDriverData) setDriverData();
    });
  };

  //Update driver location
  const updateDriverLocation = async () => {
    setIsUpdateLoading(true);
    try {
      const res = await getRouteId(routeId);
      if (res.status) {
        dispatch(setRouteDetailsData(res?.data));
        setIsUpdateLoading(false);
        if (
          !res?.data?.nextLocationInfo?.current &&
          res?.data?.orderStatus === 'Ongoing'
        ) {
          popUpUtil('warning', 'Driver has not started the route yet.');
        }
        if (res?.data?.nextLocationInfo?.driverLocationUpdate === 'OLD') {
          popUpUtil(
            'warning',
            'Driver has not sent his location for more than 30 minutes.'
          );
        } else if (
          res?.data?.nextLocationInfo?.driverLocationUpdate === 'DISCONNECTED'
        ) {
          popUpUtil('warning', 'Driver is not online.');
        }
      }
    } catch (err) {
      console.warn(err);
      setIsUpdateLoading(false);
    }
  };

  const handleGetDriverRating = async (id) => {
    try {
      const res = await getDriverRating(id);
      setAverageRating(res);
    } catch (err) {
      console.log(err);
    }
  };

  //get all route data with id
  const getRouteData = async () => {
    setLoading(true);
    const id = location?.query?.id;
    try {
      const res = await getRouteId(id);
      if (res.status) {
        setLoading(false);
        setRouteData(res?.data);
        handleGetDriverRating(res?.data?.driverInfo?.id);
        dispatch(setRouteDetailsData(res?.data));
      }
    } catch (err) {
      console.warn(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRouteData();
    //just for Ongoing orders connect SOCKET
    if (routeData?.orderStatus === 'Ongoing') {
      initSocket();
      updateDriverLocation();
    }
    return () => {
      if (socket.current && socket.current.connected) {
        socket.current.disconnect();
      }
    };
  }, []);

  const pickupTypeArray = routeDetailsData?.suborder?.pickup;
  const dropTypeArray = routeDetailsData?.suborder?.drop_location;
  const allTypeOfRoutes = pickupTypeArray?.concat(dropTypeArray);

  return loading ? (
    <SpinnerLoading />
  ) : (
    <>
      {routeDetailsData && pickupTypeArray && (
        <Map
          pickupData={pickupTypeArray}
          dropOffData={dropTypeArray}
          isOngoingRoute={isOngoingRoute}
          socketIsConnected={socketIsConnected}
          inRealTime={inRealTime}
          driverData={driverData}
          routeBounds={{ bottom: 400, right: 20, left: 20, top: 20 }}
        />
      )}

      <S.Wrapper
        isOpenHeight={activeIndex !== null}
        isOpenWidth={isOpenDetails}
      >
        <S.SliderButton
          onClick={() => {
            setIsOpenDetails(!isOpenDetails);
            setActiveIndex(null);
          }}
        >
          <S.Dot>.</S.Dot>
          <S.Dot>.</S.Dot>
          <S.Dot>.</S.Dot>
        </S.SliderButton>
        {isOpenDetails && (
          <S.DetailsContainer isDelivered={status !== 'Schedule'}>
            <DriverInfo
              status={status}
              data={routeData?.driverInfo}
              avgRating={avgRating}
              closeSidebar={() => {
                setIsOpenDetails(false);
                setActiveIndex(null);
              }}
            />
            <S.DetailsContent>
              {allTypeOfRoutes?.map((item, idx, row) => (
                <div key={idx}>
                  <RouteData
                    deliveryName={routeData?.deliveryName}
                    setIsViewMoreOpen={setIsViewMoreOpen}
                    setViewModalData={setViewModalData}
                    setOpen={() => setActiveIndex(idx)}
                    setClose={() => {
                      setActiveIndex(null);
                    }}
                    isOpen={idx === activeIndex}
                    type={item.type}
                    data={item}
                    routeId={routeId}
                    setIsViewAdditionalServicesOpen={
                      setIsViewAdditionalServicesOpen
                    }
                    setImageSliderData={setImageSliderData}
                    setIsOpenImageSlider={setIsOpenImageSlider}
                  />
                  {idx + 1 !== row.length && <S.RouteCardHr />}
                </div>
              ))}
            </S.DetailsContent>
            <S.PriceRow isDelivered={status !== 'Schedule'}>
              <InvoiceMenu routeId={routeId} status={status} />
              <h2 style={{ color: C.colorWhite }}>
                ${routeData?.totalCharge || 0}
              </h2>
            </S.PriceRow>
          </S.DetailsContainer>
        )}
      </S.Wrapper>
      {refundModalOpen && (
        <RefundModal
          status={status}
          setIsCloseModal={() => setRefundModalOpen(false)}
          routeId={routeId}
        />
      )}
      {isViewMoreOpen && (
        <ViewItemsModal
          isOpen={isViewMoreOpen}
          setIsCloseModal={() => setIsViewMoreOpen(false)}
          viewModalData={viewModalData}
        />
      )}
      {isViewAdditionalServicesOpen && (
        <ViewAdditionalServices
          isOpen={isViewAdditionalServicesOpen}
          setIsCloseModal={() => setIsViewAdditionalServicesOpen(false)}
          viewModalData={viewModalData}
        />
      )}
      {isOngoingRoute && (
        <S.RefreshBox
          isUpdateLoading={isUpdateLoading}
          onClick={updateDriverLocation}
        >
          <h6 className='mr-2'>Update driver next location ETA </h6>
          <img src={refresh} alt='' width={16} />
        </S.RefreshBox>
      )}
      {isOpenImageSlider && (
        <ImageSlider
          setIsOpenImageSlider={() => setIsOpenImageSlider(false)}
          imageSliderData={imageSliderData}
        />
      )}
    </>
  );
}
