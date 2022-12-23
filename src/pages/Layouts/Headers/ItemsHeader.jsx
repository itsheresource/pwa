import React from 'react';
import * as S from './HeadersStyled';
import checkMark from 'assets/icons/checkMark.svg';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router/immutable';

export default function ItemsHeader() {
  const dispatch = useDispatch();
  return (
    <S.HeaderContainer>
      <S.CheckMarkContainer>
        <S.Icon src={checkMark} alt='' onClick={() => dispatch(goBack())} />
      </S.CheckMarkContainer>
    </S.HeaderContainer>
  );
}
