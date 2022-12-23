import React, { useEffect, useState } from 'react';
//Styled Components
import * as S from './RefundFullModalStyled';

//color
import * as C from 'scss/colors';

//utils
import PropTypes from 'prop-types';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';
import { useDispatch, useSelector } from 'react-redux';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';

//apis
import {
  refundCancelApi,
  refundRouteData,
} from 'apis/routesList/refundRouteData';

//redux
import { push } from 'connected-react-router';
import { createCurrentRoute } from 'components/RouteFlow/_ducks/currentRoute/actions';
import { getCurrentRoute } from 'apis/routeFlow/currentRoute';
import { setSelectedItems } from 'components/RouteFlow/_ducks/selectedItems/actions';

export default function RefundFullModal({ setIsCloseModal }) {
  const dispatch = useDispatch();
  const orderName = useSelector((state) => state.currentRoute.orderName);
  const routeId = useSelector((state) => state.currentRoute._id);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const getRefundRouteData = async () => {
    setIsLoading(true);
    try {
      const res = await refundRouteData(routeId);
      setIsLoading(false);
      setData(res);
    } catch (err) {
      setIsLoading(false);
      console.warn(err);
    }
  };

  useEffect(() => {
    getRefundRouteData(routeId);
  }, [routeId]);

  const handleGetPendingRoute = async () => {
    setIsLoading(true);
    try {
      const res = await getCurrentRoute();
      if (res?.status) {
        dispatch(createCurrentRoute(res.data));
        dispatch(push(AVAILABLE_ROUTES.DASHBOARD));
        dispatch(setSelectedItems([]));
        setIsLoading(false);
      }
    } catch (err) {
      console.warn(err);
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      const res = await refundCancelApi(routeId);
      setIsLoading(false);
      setIsCloseModal();
      handleGetPendingRoute();
    } catch (err) {
      setIsLoading(false);
      console.warn(err);
    }
  };

  return (
    <S.ModalContainer>
      {isLoading && <SpinnerLoading />}
      <S.CardContainer>
        <S.Content>
          <S.InfoText>
            You will receive a refund of {data?.refundAmount}$ ,
          </S.InfoText>
          {data?.refundAmount !== data?.totalAmount && (
            <>
              <S.InfoText>out of {data?.totalAmount}$ because :</S.InfoText>
              <S.InfoText> {data?.explanationForRefundAmount}</S.InfoText>
            </>
          )}
          <S.InfoText>Are you sure you want to continue?</S.InfoText>
          <S.ButtonContainer>
            <S.Button color={C.RedN} onClick={setIsCloseModal}>
              No,take me back
            </S.Button>
            <S.Button color={C.colorGreen} onClick={handleCancel}>
              Yes, give me a refund
            </S.Button>
          </S.ButtonContainer>
        </S.Content>
      </S.CardContainer>
    </S.ModalContainer>
  );
}
RefundFullModal.propTypes = {
  setIsCloseModal: PropTypes.func,
  routeId: PropTypes.string,
};
