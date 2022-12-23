import React from 'react';
import SearchingHeader from 'components/RouteFlow/DriverMatching/components/SearchingHeader/SearchingHeader';
import * as S from './HeadersStyled';

export default function DriverMatchingHeader() {

  return (
    <S.HeaderContainer>
      <SearchingHeader />
    </S.HeaderContainer>
  );
}
