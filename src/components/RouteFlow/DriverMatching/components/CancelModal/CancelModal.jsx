import React from 'react';

//components
import * as S from './CancelModalStyledComponents';

//utils
import PropTypes from 'prop-types';

export default function CancelModal({
  setIsCancelModalOpen,
  handleCancel,
  price,
}) {
  return (
    <S.CancelModalContainer>
      <div className='mb-10'>
        <S.Title>Amount of refund</S.Title>
      </div>
      <S.PriceTextContainer>
        <S.PriceText>${price}</S.PriceText>
      </S.PriceTextContainer>
      <div className='mb-5'>
        <S.ConfirmButton onClick={handleCancel}>
          <S.ConfirmButtonText>Refund</S.ConfirmButtonText>
        </S.ConfirmButton>
      </div>
      <div>
        <S.CancelButton onClick={() => setIsCancelModalOpen(false)}>
          <S.CancelButtonText>Never mind</S.CancelButtonText>
        </S.CancelButton>
      </div>
    </S.CancelModalContainer>
  );
}

CancelModal.propTypes = {
  setIsCancelModalOpen: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
};
