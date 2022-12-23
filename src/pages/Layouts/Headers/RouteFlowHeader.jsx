import React, { useState } from 'react';
import * as S from './HeadersStyled';
import * as C from 'scss/colors';
//components
import RemoveRouteModal from 'components/RouteFlow/Common/RemoveRouteModal/RemoveRouteModal';
// Icons
import AddAddressSvg from 'assets/icons/AddAddressSvg';
import AddItemsSvg from 'assets/icons/AddItemsSvg';
import DropDetailsSvg from 'assets/icons/DropDetailsSvg';
import UrgencyHeaderSvg from 'assets/icons/UrgencyHeaderSvg';
import refresh from 'assets/icons/refresh.svg';
//utils
import { ROUTE_PHASE } from 'fixtures/routePhases';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
//redux
import { useDispatch, useSelector } from 'react-redux';
//apis
import { setCurrentRoutePhase } from 'apis/routeFlow/currentRoute';
import { updateCurrentRoute } from 'components/RouteFlow/_ducks/currentRoute/actions';
import { push } from 'connected-react-router';

export default function RouteFlowHeader() {
  const dispatch = useDispatch();
  const currentRoute = useSelector((state) => state.currentRoute);
  const [openRefreshModal, setOpenRefreshModal] = useState(false);

  //returns boolean for show the current page condition
  const isPhaseAddItems = currentRoute.routePhase === ROUTE_PHASE.ADD_ITEMS;
  const isPhaseDropDetails =
    currentRoute.routePhase === ROUTE_PHASE.DROP_DETAILS;
  const isPhaseUrgency = currentRoute.routePhase === ROUTE_PHASE.URGENCY;
  const isPhaseInvoice = currentRoute.routePhase === ROUTE_PHASE.INVOICE;

  const handleGoToAddAddress = async () => {
    if (
      isPhaseAddItems ||
      isPhaseDropDetails ||
      isPhaseUrgency ||
      isPhaseInvoice
    ) {
      const body = {
        id: currentRoute._id,
        routePhase: ROUTE_PHASE.ADD_ADDRESSES,
      };
      const response = await setCurrentRoutePhase(body);
      if (response?.status) {
        dispatch(updateCurrentRoute(response.data));
        dispatch(push(AVAILABLE_ROUTES.DASHBOARD));
      }
    }
  };

  const handleGoToAddItems = async () => {
    if (
      isPhaseAddItems ||
      isPhaseDropDetails ||
      isPhaseUrgency ||
      isPhaseInvoice
    ) {
      const body = {
        id: currentRoute._id,
        routePhase: ROUTE_PHASE.ADD_ITEMS,
      };
      const response = await setCurrentRoutePhase(body);
      if (response?.status) {
        dispatch(updateCurrentRoute(response.data));
        dispatch(push(AVAILABLE_ROUTES.ADD_ITEMS));
      }
    }
  };

  const handleGoToDropDetails = async () => {
    if (isPhaseDropDetails || isPhaseUrgency || isPhaseInvoice) {
      const body = {
        id: currentRoute._id,
        routePhase: ROUTE_PHASE.DROP_DETAILS,
      };
      const response = await setCurrentRoutePhase(body);
      if (response?.status) {
        dispatch(updateCurrentRoute(response.data));
        dispatch(push(AVAILABLE_ROUTES.DROP_DETAILS));
      }
    }
  };

  const handleGoToUrgency = async () => {
    if (isPhaseUrgency || isPhaseInvoice) {
      const body = {
        id: currentRoute._id,
        routePhase: ROUTE_PHASE.URGENCY,
      };
      const response = await setCurrentRoutePhase(body);
      if (response?.status) {
        dispatch(updateCurrentRoute(response.data));
        dispatch(push(AVAILABLE_ROUTES.URGENCY));
      }
    }
  };

  return (
    <>
      <S.HeaderContainer>
        <S.RouteStepsContainer>
          <S.RouteStep>
            <S.RouteStepIconButton onClick={handleGoToAddAddress}>
              <AddAddressSvg />
            </S.RouteStepIconButton>
          </S.RouteStep>
          <S.RouteStep>
            <div className='flex items-center'>
              {Array.from(Array(5), (_, i) => (
                <S.dot key={i} className='mt-4' />
              ))}
            </div>
            <S.RouteStepIconButton onClick={handleGoToAddItems}>
              <AddItemsSvg
                fill={isPhaseAddItems ? C.primaryOrange : C.colorBlack}
              />
            </S.RouteStepIconButton>
          </S.RouteStep>
          <S.RouteStep>
            <div className='flex items-center'>
              {Array.from(Array(5), (_, i) => (
                <S.dot
                  key={i}
                  className='mt-4'
                  opacity={
                    isPhaseDropDetails
                      ? 1
                      : isPhaseUrgency || isPhaseInvoice
                      ? 1
                      : 0.5
                  }
                />
              ))}
            </div>
            <S.RouteStepIconButton onClick={handleGoToDropDetails}>
              <DropDetailsSvg
                fill={
                  isPhaseDropDetails
                    ? C.primaryOrange
                    : isPhaseUrgency || isPhaseInvoice
                    ? C.colorBlack
                    : C.colorGrey1
                }
              />
            </S.RouteStepIconButton>
          </S.RouteStep>
          <S.RouteStep>
            <div className='flex items-center'>
              {Array.from(Array(5), (_, i) => (
                <S.dot
                  key={i}
                  className='mt-4'
                  opacity={isPhaseUrgency || isPhaseInvoice ? 1 : 0.5}
                />
              ))}
            </div>
            <S.RouteStepIconButton onClick={handleGoToUrgency}>
              <UrgencyHeaderSvg
                fill={
                  isPhaseUrgency
                    ? C.primaryOrange
                    : isPhaseInvoice
                    ? C.colorBlack
                    : C.colorGrey1
                }
              />
            </S.RouteStepIconButton>
          </S.RouteStep>
        </S.RouteStepsContainer>
        <S.CleanRouteIcon onClick={() => setOpenRefreshModal(true)}>
          <img src={refresh} alt='' width={20} />
        </S.CleanRouteIcon>
      </S.HeaderContainer>
      <RemoveRouteModal
        isOpen={openRefreshModal}
        setIsCloseModal={() => setOpenRefreshModal(false)}
      />
    </>
  );
}
