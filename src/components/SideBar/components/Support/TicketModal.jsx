import React from 'react';
//Styled Components
import * as S from './SupportStyled';

//utils
import PropTypes from 'prop-types';
import { routePhaseRedirect } from 'utils/routePhaseRedirect';
import { useSelector } from 'react-redux';

export default function TicketModal({
  isOpenModal,
  setIsOpenModal,
  ticketNumber,
}) {
  const currentRoute = useSelector((state) => state.currentRoute);

  const handleClose = () => {
    setIsOpenModal();
    routePhaseRedirect(currentRoute.routePhase);
  };

  return (
    isOpenModal && (
      <S.CardContainer>
        <S.HeaderModal>
          <S.Header>Support Form</S.Header>
        </S.HeaderModal>

        <S.Content>
          <S.Title className='mb-8'>Thank you!</S.Title>
          <S.SubTitle> We will get back to you as soon as possible!</S.SubTitle>
          <div className='flex items-center'>
            <S.SubTitle>Ticket number:</S.SubTitle>
            <S.Ticket>{ticketNumber}</S.Ticket>
          </div>
          <S.CloseButton onClick={handleClose}>Close</S.CloseButton>
        </S.Content>
      </S.CardContainer>
    )
  );
}
TicketModal.propTypes = {
  isOpenModal: PropTypes.bool,
  setIsOpenModal: PropTypes.func,
  ticketNumber: PropTypes.string,
};
