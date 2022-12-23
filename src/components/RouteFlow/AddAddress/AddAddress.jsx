import React, { useEffect, useRef, useState } from 'react';

// Icons
import pickupIcon from 'assets/icons/pickupIcon.svg';
import dropOffIcon from 'assets/icons/dropOffIcon.svg';
import parallelIcon from 'assets/icons/parallel.svg';
import inputContainer from 'assets/icons/inputContainer.svg';

// Components
import * as S from './AddAddressStyledComponents';
import AddressInput from './components/AddressInput';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

//Map
import Map from 'components/Map/Map';

// Utils
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { ROUTE_PHASE } from 'fixtures/routePhases';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { changeSingleOrder } from 'apis/routeFlow/address/functions';
import Geocode from 'react-geocode';
import redirect from '../utils/redirect';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import { isArraysEquals } from 'utils/isArraysEquals';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { updateCurrentRoute } from '../_ducks/currentRoute/actions';
import { setSelectedItems } from '../_ducks/selectedItems/actions';
import { setSelectedCoordinates } from '../_ducks/selectedCoordinates/actions';

// Apis
import { finalizeAddress, updateAddress } from 'apis/routeFlow/address/address';
import { setCurrentRoutePhase } from 'apis/routeFlow/currentRoute';

Geocode.setApiKey('AIzaSyDEksCzAbC0kAihR6yBLfllyQSzboiadR0');

export default function AddAddress() {
  const [onFocus, setOnFocus] = useState(false);
  const { ADD_ITEMS } = AVAILABLE_ROUTES;
  const [loading, setLoading] = useState(false);

  const currentRoute = useSelector((state) => state.currentRoute);
  const pathname = useSelector((state) => state.router.location.pathname);

  const [pickup, setPickup] = useState('');
  const [dropOff, setDropOff] = useState('');
  const [isAddressesValid, setIsAddressesValid] = useState(false);

  const geometry = useSelector((state) => state?.selectedCoordinates);

  useEffect(() => {
    if (!pickup && !dropOff) {
      setIsAddressesValid(false);
    }
  }, [pickup, dropOff]);

  const suggestionsRef = useRef(null);

  const dispatch = useDispatch();

  const handleUpdateAddress = async (route) => {
    try {
      const body = {
        addresses: [
          changeSingleOrder(route.suborder.pickup[0]),
          changeSingleOrder(route.suborder.drop_location[0]),
        ],
        routeId: route._id,
      };
      const res = await updateAddress(body);
      if (res?.status) {
        dispatch(updateCurrentRoute(route));
        setIsAddressesValid(res.data.isValid);
      } else {
        popUpUtil('error', res?.error_code);
      }
    } catch (err) {
      console.warn(err);
      popUpUtil('error', err);
    }
  };

  const handleSetRouteAddress = async ({
    theNewRoute,
    fullAddress,
    type,
    userCurrentLat,
    userCurrentLng,
  }) => {
    const results = await geocodeByAddress(fullAddress);
    let lng, lat;
    //INFO: If the user selects his current location he will have the lat and lng, so theres no need for fetching them
    if (userCurrentLat && userCurrentLng) {
      lat = userCurrentLat;
      lng = userCurrentLng;
    } else {
      const res = await getLatLng(results[0]);
      lat = res.lat;
      lng = res.lng;
    }

    let streetAddress = '';
    let city, state, country, zipCode;

    for (let i = 0; i < results[0].address_components.length; i++) {
      for (let j = 0; j < results[0].address_components[i].types.length; j++) {
        switch (results[0].address_components[i].types[j]) {
          case 'locality':
            city = results[0].address_components[i].long_name;
            break;
          case 'administrative_area_level_1':
            state = results[0].address_components[i].long_name;
            break;
          case 'country':
            country = results[0].address_components[i].long_name;
            break;
          case 'street_number':
            streetAddress = streetAddress?.concat(
              `${results[0].address_components[i].long_name} `
            );
            break;
          case 'route':
            streetAddress = streetAddress?.concat(
              results[0].address_components[i].long_name
            );
            break;
          case 'postal_code':
            zipCode = results[0].address_components[i].long_name;
            break;

          default:
            break;
        }
      }
    }

    theNewRoute.suborder[type][0] = {
      ...theNewRoute.suborder[type][0],
      address: fullAddress,
      addressComponents: {
        ...theNewRoute.suborder[type][0].addressComponents,
        city,
        state,
        country,
        streetAddress,
        zipCode,
      },
    };
    if (type === 'pickup')
      theNewRoute.suborder[type][0].pickup_geometry.coordinates = [lng, lat];
    else if (type === 'drop_location')
      theNewRoute.suborder[type][0].drop_geometry.coordinates = [lng, lat];
    return theNewRoute;
  };

  const handleSetRouteAddressToNull = ({ theNewRoute, type }) => {
    theNewRoute.suborder[type][0] = {
      ...theNewRoute.suborder[type][0],
      address: null,
      addressComponents: {
        ...theNewRoute.suborder[type][0].addressComponents,
        city: null,
        state: null,
        country: null,
      },
    };
    if (type === 'pickup')
      theNewRoute.suborder[type][0].pickup_geometry.coordinates = [null, null];
    else if (type === 'drop_location')
      theNewRoute.suborder[type][0].drop_geometry.coordinates = [null, null];
    return theNewRoute;
  };

  // INFO: This functions using two libraries, converts address to lat, lng, city, state and country and then calls the update addresses api
  // and then dispatches it to Redux
  const handleSetAddress = async ({
    fullAddress,
    type,
    userCurrentLat,
    userCurrentLng,
  }) => {
    let theNewRoute = JSON.parse(JSON.stringify(currentRoute));
    if (fullAddress) {
      const body = {
        theNewRoute,
        fullAddress,
        type,
        userCurrentLat,
        userCurrentLng,
      };
      theNewRoute = await handleSetRouteAddress(body);
      handleUpdateAddress(theNewRoute);
    } else {
      const body = { theNewRoute, type };
      theNewRoute = handleSetRouteAddressToNull(body);
      handleUpdateAddress(theNewRoute);
    }
  };

  const handleChangePickup = async (fullAddress) => {
    setPickup(fullAddress);
    if (isAddressesValid) setIsAddressesValid(false);
    if (!fullAddress) handleSetAddress({ fullAddress, type: 'pickup' });
  };

  const handleChangeDropOff = async (fullAddress) => {
    setDropOff(fullAddress);
    if (isAddressesValid) setIsAddressesValid(false);
    if (!fullAddress) handleSetAddress({ fullAddress, type: 'drop_location' });
  };

  const handleSelectPickup = async ({
    fullAddress,
    userCurrentLat,
    userCurrentLng,
  }) => {
    setPickup(fullAddress);
    handleSetAddress({
      fullAddress,
      type: 'pickup',
      userCurrentLat,
      userCurrentLng,
    });
  };

  const handleSelectDropOff = async ({
    fullAddress,
    userCurrentLat,
    userCurrentLng,
  }) => {
    setDropOff(fullAddress);
    handleSetAddress({
      fullAddress,
      type: 'drop_location',
      userCurrentLat,
      userCurrentLng,
    });
  };

  const handleContinue = async () => {
    setLoading(true);
    let wipePendingOrderData = false;
    const pickup_current_geo =
      currentRoute?.suborder?.pickup[0]?.pickup_geometry?.coordinates;
    const drop_current_geo =
      currentRoute?.suborder?.drop_location[0]?.drop_geometry?.coordinates;
    if (
      geometry.pickup_coordinates?.length &&
      geometry.drop_coordinates?.length &&
      !isArraysEquals(pickup_current_geo, geometry.pickup_coordinates) &&
      !isArraysEquals(drop_current_geo, geometry.drop_coordinates)
    ) {
      wipePendingOrderData = true;
    }

    try {
      const body = {
        addresses: [
          changeSingleOrder(currentRoute.suborder.pickup[0]),
          changeSingleOrder(currentRoute.suborder.drop_location[0]),
        ],
        routeId: currentRoute._id,
        wipePendingOrderData,
      };
      const res = await finalizeAddress(body);
      if (res?.status) {
        dispatch(
          setSelectedCoordinates({
            pickup_coordinates:
              currentRoute?.suborder?.pickup[0].pickup_geometry.coordinates,
            drop_coordinates:
              currentRoute?.suborder?.drop_location[0]?.drop_geometry
                ?.coordinates,
          })
        );
        dispatch(updateCurrentRoute(res.data));
        const routePhaseRes = await setCurrentRoutePhase({
          id: currentRoute._id,
          routePhase: ROUTE_PHASE.ADD_ITEMS,
        });
        if (routePhaseRes?.status) {
          dispatch(updateCurrentRoute(routePhaseRes.data));
          dispatch(push(ADD_ITEMS));
          if (wipePendingOrderData) {
            dispatch(setSelectedItems([]));
          }
        } else {
          popUpUtil('error', routePhaseRes?.error_code);
        }
      } else {
        popUpUtil('error', res?.error_code);
      }
    } catch (err) {
      console.error(err);
      popUpUtil('error', err);
      setLoading(false);
    }
  };

  const handleReplaceAddresses = async () => {
    setPickup(dropOff);
    setDropOff(pickup);
    let theNewRoute = JSON.parse(JSON.stringify(currentRoute));
    if (dropOff)
      theNewRoute = await handleSetRouteAddress({
        theNewRoute,
        fullAddress: dropOff,
        type: 'pickup',
      });
    else
      theNewRoute = handleSetRouteAddressToNull({
        theNewRoute,
        type: 'pickup',
      });
    if (pickup)
      theNewRoute = await handleSetRouteAddress({
        theNewRoute,
        fullAddress: pickup,
        type: 'drop_location',
      });
    else
      theNewRoute = handleSetRouteAddressToNull({
        theNewRoute,
        type: 'drop_location',
      });
    handleUpdateAddress(theNewRoute);
  };

  // INFO: This function gets called initially to set the inputs addresses and the maps locations
  const handleSetAddressInitially = () => {
    const { suborder } = currentRoute;
    setPickup(suborder.pickup[0].address);
    setDropOff(suborder.drop_location[0].address);
    if (suborder.pickup[0].address && suborder.drop_location[0].address) {
      handleSetAddress({
        fullAddress: suborder.pickup[0].address,
        type: 'pickup',
      });
    }
  };

  useEffect(() => {
    if (
      currentRoute._id &&
      currentRoute.routePhase === ROUTE_PHASE.ADD_ADDRESSES
    )
      handleSetAddressInitially();
  }, [currentRoute._id]);

  useEffect(() => {
    if (
      currentRoute._id &&
      currentRoute.routePhase !== ROUTE_PHASE.ADD_ADDRESSES &&
      pathname === AVAILABLE_ROUTES.DASHBOARD
    )
      redirect(currentRoute.routePhase, dispatch);
  }, [pathname]);

  useEffect(() => {
    //backdrop blur with touch input fields
    if (onFocus) {
      document.getElementById('map').style.filter = 'blur(4px)';
    } else document.getElementById('map').style.filter = '';
  }, [onFocus]);

  return (
    <>
      <Map
        pickupData={currentRoute?.suborder?.pickup}
        dropOffData={currentRoute?.suborder?.drop_location}
      />
      {loading && <SpinnerLoading />}
      <div>
        <S.SVGContainer focus={onFocus}>
          <img src={inputContainer} alt='' />
        </S.SVGContainer>
        <S.TheAddAddress filled={isAddressesValid} focus={onFocus}>
          <S.TheAddAddressWrapper>
            <S.ShadowBox>
              <AddressInput
                address={pickup || ''}
                handleChange={handleChangePickup}
                handleSelect={handleSelectPickup}
                icon={pickupIcon}
                type='pickup'
                suggestionsEl={suggestionsRef}
                isShowNextButton={isAddressesValid}
                borderBottom
                setOnFocus={setOnFocus}
                onFocus={onFocus}
              />
              {(dropOff || pickup) && (
                <S.ReplacingButtonContainer>
                  <S.ReplacingButton onClick={handleReplaceAddresses}>
                    <img src={parallelIcon} alt='parallel' />
                  </S.ReplacingButton>
                </S.ReplacingButtonContainer>
              )}
              <AddressInput
                address={dropOff || ''}
                handleChange={handleChangeDropOff}
                handleSelect={handleSelectDropOff}
                icon={dropOffIcon}
                type='drop'
                suggestionsEl={suggestionsRef}
                isShowNextButton={isAddressesValid}
                setOnFocus={setOnFocus}
                onFocus={onFocus}
              />
            </S.ShadowBox>
            <S.NextButtonContainer filled={isAddressesValid}>
              <S.NextButton
                onClick={() => isAddressesValid && handleContinue()}
              >
                Next
              </S.NextButton>
            </S.NextButtonContainer>
          </S.TheAddAddressWrapper>
        </S.TheAddAddress>
        <div ref={suggestionsRef}></div>
      </div>
    </>
  );
}
