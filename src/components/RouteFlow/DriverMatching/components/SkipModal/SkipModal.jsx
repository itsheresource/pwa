import React from 'react';

//components
import * as S from './SkipModalStyledComponents';

//utils
import PropTypes from 'prop-types';

export default function SkipModal({ setIsSkipModalOpen, handleSkip }) {
  return (
    <S.SkipModalContainer>
      <div className='mb-10'>
        <S.Title>Use my information as receiver & Sender</S.Title>
      </div>
      <div className='mb-5'>
        <S.ConfirmButton onClick={handleSkip}>
          <S.ButtonText>Confirm</S.ButtonText>
        </S.ConfirmButton>
      </div>
      <div>
        <S.CancelButton onClick={() => setIsSkipModalOpen(false)}>
          <S.ButtonText>Never mind</S.ButtonText>
        </S.CancelButton>
      </div>
    </S.SkipModalContainer>
  );
}

SkipModal.propTypes = {
  setIsSkipModalOpen: PropTypes.func.isRequired,
  handleSkip: PropTypes.func.isRequired,
};
