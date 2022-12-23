import React from 'react';
//Styled Components
import * as S from './ViewAdditionalServicesStyled';

//utils
import PropTypes from 'prop-types';

const DELIVERY_NAME_FLAT = 'Flat Rate';
const DELIVERY_NAME_RADIUS = 'Radius Delivery';
export default function ViewAdditionalServices({
  isOpen,
  setIsCloseModal,
  viewModalData,
}) {
  return (
    isOpen && (
      <S.ModalContainer>
        <S.CardContainer>
          <S.Header>
            <h4>Additional Services</h4>
          </S.Header>
          <S.Content>
            <S.ChipsContainer>
              {viewModalData?.data?.map((item, idx) =>
                viewModalData?.deliveryName === DELIVERY_NAME_FLAT ||
                viewModalData?.deliveryName === DELIVERY_NAME_RADIUS ? (
                  item?.required && (
                    <S.Chips key={idx}>
                      <S.Item> {item?.buttonText}</S.Item>
                    </S.Chips>
                  )
                ) : (
                  <S.Chips key={idx}>
                    <S.Item> {item}</S.Item>
                  </S.Chips>
                )
              )}
            </S.ChipsContainer>
          </S.Content>
          <S.Hr />
          <S.Close onClick={setIsCloseModal}>Close</S.Close>
        </S.CardContainer>
      </S.ModalContainer>
    )
  );
}
ViewAdditionalServices.propTypes = {
  isOpen: PropTypes.bool,
  setIsCloseModal: PropTypes.func,
  itemsData: PropTypes.array,
  viewModalData: PropTypes.object,
};
