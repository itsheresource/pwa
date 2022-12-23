import React, { useState } from 'react';
import * as S from './HeadersStyled';
import RemoveRouteModal from 'components/RouteFlow/Common/RemoveRouteModal/RemoveRouteModal';
import refresh from 'assets/icons/refresh.svg';

export default function AddAddressHeader() {
  const [openRefreshModal, setOpenRefreshModal] = useState(false);
  return (
    <>
      <S.HeaderContainer>
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
