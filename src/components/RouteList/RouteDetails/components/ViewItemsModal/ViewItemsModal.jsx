import React from 'react';
//Styled Components
import * as S from './ViewItemsModalStyled';

//color
import * as C from 'scss/colors';

//utils
import PropTypes from 'prop-types';

export default function ViewItemsModal({
  isOpen,
  setIsCloseModal,
  viewModalData,
}) {
  return (
    isOpen && (
      <S.ModalContainer>
        <S.CardContainer>
          <S.Header>
            <h4>Your Items</h4>
          </S.Header>
          <S.Content>
            {viewModalData?.map((item, idx) => (
              <div key={idx} className='w-full'>
                <S.ItemBox>
                  <S.ItemName>
                    <S.Title>{item?.name}</S.Title>
                    <S.Subtitle>{item?.description}</S.Subtitle>
                  </S.ItemName>
                  <S.ImageContainer>
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}${item.imagePath}`}
                      alt=''
                    />
                  </S.ImageContainer>
                  <S.Quantity color={C.primaryOrange}>
                    {item?.quantity}
                  </S.Quantity>
                </S.ItemBox>
                <S.Hr />
              </div>
            ))}
          </S.Content>
          <S.Close onClick={setIsCloseModal}>Close</S.Close>
        </S.CardContainer>
      </S.ModalContainer>
    )
  );
}
ViewItemsModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsCloseModal: PropTypes.func,
  itemsData: PropTypes.array,
  viewModalData: PropTypes.array,
};
