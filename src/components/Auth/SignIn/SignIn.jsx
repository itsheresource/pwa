import React, { useState, useEffect } from 'react';

// Components
import { Link } from 'react-router-dom';
import * as S from '../AuthStyles';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

// Icons and Logos
import backButtonSignup from 'assets/icons/backButtonSignup.svg';

// Utils
import axios from 'axios';
import { SESSION_STORAGE_TOKEN_KEY } from 'fixtures/sessionToken';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { set } from 'idb-keyval';
import { login } from 'apis/Auth/signIn';
import { push } from 'connected-react-router';
import FormField from '../components/FormField';
import useAuthForm from 'customHooks/useAuthForm';
import Password from '../components/Password';
import validationForm from '../components/validationForm';

// Redux
import { useDispatch } from 'react-redux';

//api
import { getCustomerDetails } from 'apis/getCustomerDetails/getCustomerDetails';

const SignIn = () => {
  const { handleChange, inputs, handleSubmit, errors, setFormSubmitted } =
    useAuthForm(validationForm);
  const [loading, setLoading] = useState(false);
  const [signInErr, setSignInErr] = useState('');
  const dispatch = useDispatch();
  //form validation
  const isValidateForm = !errors.email && !errors.password;

  async function handleSignInSubmit() {
    const { email, password } = inputs;
    setLoading(true);

    try {
      const res = await login({ email, password });
      if (res.status === 1) {
        if (res.data.phoneVerified === 0) {
          dispatch(
            push(`${AVAILABLE_ROUTES.VERIFY_CODE}?phone=${res?.data?.phone}`)
          );
        } else {
          axios.defaults.headers.common.token = res.token;
          await set(SESSION_STORAGE_TOKEN_KEY, res.token);
          getCustomerDetails();
          dispatch(push(AVAILABLE_ROUTES.DASHBOARD));
        }
      } else if (res.status === 0) {
        setSignInErr(res.message);
      }
      setLoading(false);
    } catch (err) {
      setSignInErr('There was a server issue, please try again');
      setLoading(false);
    }
  }

  const handleSignInValidation = () => {
    setFormSubmitted(true);
    if (isValidateForm) {
      handleSignInSubmit();
      setSignInErr('');
    } else {
      setSignInErr('Please fill in all the required fields.');
    }
  };

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken?.source();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <S.WebPageContainer>
      {loading && <SpinnerLoading />}
      <S.BackIcon
        src={backButtonSignup}
        alt='back'
        onClick={() => dispatch(push(AVAILABLE_ROUTES.WELCOME))}
      />
      <S.Sign>
        <div className='self-start'>
          <S.Hi>Welcome!</S.Hi>
          <h3>Sign in to Continue</h3>
          <div className='self-start mb-16'>
            {signInErr && (
              <S.SignWrapper>
                <S.SignInfoErr>{signInErr}</S.SignInfoErr>
              </S.SignWrapper>
            )}
          </div>
        </div>
        <S.SignWrapper>
          <S.FormContainer onSubmit={handleSubmit}>
            <FormField
              type='email'
              name='email'
              label='Email:'
              placeholder='email@email.com'
              value={inputs.email}
              validateText={errors.email}
              onChange={handleChange}
              onBlur={handleSubmit}
              autoComplete='off'
            />
            <Password
              label='Password:'
              name='password'
              withoutMeter
              value={inputs.password}
              onChange={handleChange}
              validateText={errors.password}
              onBlur={handleSubmit}
              autoComplete='off'
            />
            <S.Button
              type='submit'
              disabled={!isValidateForm || loading}
              onClick={handleSignInValidation}
            >
              {loading ? 'Please wait...' : 'Login'}
            </S.Button>
          </S.FormContainer>
          <S.SignUpContainer>
            <S.SignInfoWhiteLink className='mb-8'>
              <Link id='forgot-password-link' to='/forgetpassword'>
                <p className='underline'>Forgot password?</p>
              </Link>
            </S.SignInfoWhiteLink>
            <Link to='/signup'>
              <S.SignInfo>
                <S.LoginContainerText>
                  Don’t have any account?
                </S.LoginContainerText>
              </S.SignInfo>
            </Link>
          </S.SignUpContainer>
        </S.SignWrapper>
      </S.Sign>
    </S.WebPageContainer>
  );
};
export default SignIn;
