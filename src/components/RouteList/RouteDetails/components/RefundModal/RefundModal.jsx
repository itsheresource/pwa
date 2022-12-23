import React, { useEffect, useState } from 'react';
//Styled Components
import * as S from './RefundModalStyled';

//color
import * as C from 'scss/colors';

//utils
import PropTypes from 'prop-types';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';
import { useDispatch, useSelector } from 'react-redux';
import { goBack } from 'connected-react-router/immutable';

//apis
import {
  refundCancelApi,
  refundRouteData,
} from 'apis/routesList/refundRouteData';

export default function RefundModal({ setIsCloseModal, routeId, status }) {
  const dispatch = useDispatch();
  const pathname = useSelector((state) => state.router.location.pathname);
  const orderName = useSelector((state) => state.currentRoute.orderName);
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

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await refundCancelApi(routeId);
      setIsLoading(false);
      setIsCloseModal();
      if (pathname.includes('route-details')) {
        dispatch(goBack());
      } else {
        window.location.reload(false);
      }
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
            You will receive a refund of {data?.refundAmount}$
          </S.InfoText>
          {data?.refundAmount !== data?.totalAmount && (
            <>
              <S.InfoText>out of {data?.totalAmount}$ because :</S.InfoText>
              <S.InfoText> {data?.explanationForRefundAmount}</S.InfoText>
            </>
          )}
          <S.InfoText>
            The route &lsquo;{orderName}&rsquo; will be canceled.
          </S.InfoText>
          <S.InfoText>Are you sure you want to continue?</S.InfoText>
          <S.ButtonContainer>
            <S.Button color={C.RedN} onClick={setIsCloseModal}>
              No,take me back
            </S.Button>
            <S.Button color={C.colorGreen} onClick={handleCancel}>
              {status === 'Ongoing'
                ? 'Yes, cancel this route'
                : 'Yes, give me a refund'}
            </S.Button>
          </S.ButtonContainer>
        </S.Content>
      </S.CardContainer>
    </S.ModalContainer>
  );
}
RefundModal.propTypes = {
  setIsCloseModal: PropTypes.func,
  routeId: PropTypes.string,
  status: PropTypes.string,
};
