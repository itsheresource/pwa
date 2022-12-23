import React from 'react';
import { useHistory } from 'react-router-dom';

//Components
import * as S from '../AuthStyles';

// icons
import itshere from 'assets/icons/itshere.svg';
import login from 'assets/icons/login.svg';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';

const Welcome = () => {
  const history = useHistory();
  return (
    <S.WelcomeContainer>
      <S.Logo src={itshere} alt='back' />
      <S.Welcome>
        <img src={login} alt='' width={350} />
        <S.Hi className='mb-4 mt-4'>Hello</S.Hi>
        <S.LoginButton onClick={() => history.push(AVAILABLE_ROUTES.SIGNIN)}>
          Login
        </S.LoginButton>
        <S.SignUpButton onClick={() => history.push(AVAILABLE_ROUTES.SIGNUP)}>
          Sign up
        </S.SignUpButton>
      </S.Welcome>
    </S.WelcomeContainer>
  );
};

export default Welcome;
