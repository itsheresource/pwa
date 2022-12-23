import React from 'react';
import * as S from './HeadersStyled';
import { routePhaseRedirect } from 'utils/routePhaseRedirect';
import home from 'assets/icons/home.svg';
import { useSelector } from 'react-redux';

export default function RoutesOnMapHeader() {
  const currentRoute = useSelector((state) => state.currentRoute);
  return (
    <S.HeaderContainer>
      <div onClick={() => routePhaseRedirect(currentRoute?.routePhase)}>
        <S.HomeIcon src={home} alt='' />
      </div>
    </S.HeaderContainer>
  );
}
