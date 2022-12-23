import React, { useState } from 'react';
//Styled Components
import * as S from './RemoveModalStyled';

//color
import * as C from 'scss/colors';

//utils
import PropTypes from 'prop-types';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import { routePhaseRedirect } from 'utils/routePhaseRedirect';

//redux
import {
  cleanUpRoute,
  createCurrentRoute,
} from 'components/RouteFlow/_ducks/currentRoute/actions';
import { push } from 'connected-react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  cleanUpSelectedItems,
  setSelectedItems,
} from 'components/RouteFlow/_ducks/selectedItems/actions';

//apis
import { reCreateRoute } from 'apis/routeFlow/reCreateRoute';
import { getCurrentRoute } from 'apis/routeFlow/currentRoute';
import { setSelectedCoordinates } from 'components/RouteFlow/_ducks/selectedCoordinates/actions';

export default function RemoveRouteModal({ isOpen, setIsCloseModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useSelector((state) => state.router?.location);
  const currentRoute = useSelector((state) => state.currentRoute);
  const dispatch = useDispatch();

  // INFO: This function gets called initially to set the Route
  const handleGetCurrentRoute = async () => {
    try {
      const res = await getCurrentRoute();
      if (res?.status) {
        setIsLoading(false);
        dispatch(createCurrentRoute(res.data));
        const dropOrder = res.data.suborder?.drop_location[0];
        const theSelectedItems = dropOrder.furniture?.map((item) => ({
          quantity: item.quantity,
          _id: item._id,
        }));
        dispatch(setSelectedItems(theSelectedItems));
        if (pathname === AVAILABLE_ROUTES.DASHBOARD) {
          routePhaseRedirect(res.data?.routePhase);
        }
      } else {
        popUpUtil('error', `Unable to load route ${res?.error_code}`);
      }
    } catch (err) {
      console.warn(err);
      popUpUtil('error', err);
    }
  };
  const clearCurrentRoute = async () => {
    setIsLoading(true);
    try {
      const res = await reCreateRoute(currentRoute._id);
      if (res?.status) {
        setIsCloseModal(false);
        handleGetCurrentRoute();
        dispatch(cleanUpRoute());
        dispatch(cleanUpSelectedItems());
        dispatch(push(AVAILABLE_ROUTES.DASHBOARD));
        dispatch(
          setSelectedCoordinates({
            pickup_coordinates: [],
            drop_coordinates: [],
          })
        );
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    isOpen && (
      <S.ModalContainer>
        {isLoading && <SpinnerLoading />}
        <S.CardContainer>
          <S.Content>
            <S.Title className='mb-8'>
              Would you like to delete the current order?
            </S.Title>
            <S.Subtitle>
              The data will be wiped and you will be navigated to Address
              Selection Page
            </S.Subtitle>
            <S.ButtonContainer>
              <S.Button color={C.colorGrey3} onClick={setIsCloseModal}>
                Cancel
              </S.Button>
              <S.Button color={C.RedN} onClick={clearCurrentRoute}>
                Confirm
              </S.Button>
            </S.ButtonContainer>
          </S.Content>
        </S.CardContainer>
      </S.ModalContainer>
    )
  );
}
RemoveRouteModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsCloseModal: PropTypes.func,
};
