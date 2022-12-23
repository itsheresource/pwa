import React from 'react';
import * as S from './HeadersStyled';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router/immutable';
import CloseSvg from 'assets/icons/CloseSvg';

export default function NotesHeader() {
  const dispatch = useDispatch();
  return (
    <S.HeaderContainer>
      <S.CheckMarkContainer>
        <button onClick={() => dispatch(goBack())}>
          <CloseSvg width={40} height={40} />
        </button>
      </S.CheckMarkContainer>
    </S.HeaderContainer>
  );
}
