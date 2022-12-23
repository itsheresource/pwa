import React, { useState, useRef } from 'react';

// Router
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';

// Components
import * as S from '../AuthStyles';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

// Logos
import backButtonSignup from 'assets/icons/backButtonSignup.svg';

// Utils
import axios from 'axios';
import FormField from '../components/FormField';
import useAuthForm from 'customHooks/useAuthForm';
import validationForm from '../components/validationForm';

// Apis
import {
  forgotPassword,
  otpMatch,
  resetPassword,
} from 'apis/Auth/forgetpassword';

// Redux
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import Password from '../components/Password';

const ForgetPassword = () => {
  const { handleChange, inputs, handleSubmit, errors, setFormSubmitted } =
    useAuthForm(validationForm);

  const [loading, setLoading] = useState(false);
  const [forgetPasswordStage, setForgetPasswordStage] = useState(0);
  const [codeErr, setCodeErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [resetErr, setResetErr] = useState('');
  const [key, setKey] = useState();

  const dispatch = useDispatch(null);
  const source = axios.CancelToken.source();

  //for verify code
  const [code, setCode] = useState([...Array(4)].map(() => ''));
  const inputsElement = useRef([]);

  //validate button
  const isValidateEmailForm = !errors.email;
  const isValidatePasswordForm = !errors.password;

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== 3 && key !== 8) {
      inputsElement.current[slot + 1].focus();
    }
  };

  const onKeyUp = (e, slot) => {
    setKey(e.keyCode);
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      inputsElement.current[slot - 1].focus();
    }
    if (slot === 0) {
      setKey('');
    }
  };

  //-------------- VERIFY CODE ------------//
  const handleVerifySubmit = async () => {
    setLoading(true);
    const { email } = inputs;
    const newOptCode = code.join('');

    try {
      const res = await otpMatch({ email, code: newOptCode, source });
      if (res.status === 1) {
        popUpUtil('success', 'Verification successful.');
        setForgetPasswordStage(2);
      } else if (res.status === 0) setCodeErr(res.message);
      setLoading(false);
    } catch (err) {
      setCodeErr('There was a server issue, please try again');
      setLoading(false);
    }
  };

  //-------------- SEND EMAIL ------------//
  const handleSend = async () => {
    const { email } = inputs;
    setLoading(true);
    try {
      const res = await forgotPassword({ email, source });
      if (res.status === 1) {
        setForgetPasswordStage(1);
      } else if (res.status === 0) {
        setEmailErr(res.message);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setEmailErr('There was a server issue, please try again');
      setLoading(false);
    }
  };
  const handleSubmitEmailValidation = () => {
    setFormSubmitted(true);
    if (isValidateEmailForm) {
      handleSend();
    }
  };

  //-------------- RESET PASSWORD ------------//
  const handleReset = async () => {
    setLoading(true);
    const { password, email } = inputs;
    const newOptCode = code.join('');
    try {
      const res = await resetPassword({
        email,
        password,
        otp: newOptCode,
        source,
      });
      if (res.status === 1) {
        popUpUtil('success', 'Verification successful.');
        setTimeout(() => {
          dispatch(push(AVAILABLE_ROUTES.SIGNIN));
        }, 3000);
      } else if (res.status === 0) {
        setResetErr(res.message);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setResetErr('There was a server issue, please try again');
      setLoading(false);
    }
  };

  const handleSubmitPassValidation = () => {
    setFormSubmitted(true);
    if (isValidatePasswordForm) {
      handleReset();
    }
  };
  return (
    <S.WebPageContainer>
      {loading && <SpinnerLoading />}
      <S.BackIcon
        src={backButtonSignup}
        alt='back'
        onClick={() => dispatch(push(AVAILABLE_ROUTES.SIGNIN))}
      />
      <S.Sign>
        {forgetPasswordStage === 0 && (
          <S.SignWrapper>
            {emailErr && (
              <S.SignWrapper className='mb-8'>
                <S.SignInfoErr>{emailErr}</S.SignInfoErr>
              </S.SignWrapper>
            )}
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
              <S.Button
                type='submit'
                disabled={!isValidateEmailForm || loading || !inputs.email}
                onClick={handleSubmitEmailValidation}
              >
                {loading ? 'Please wait...' : ' Send Code'}
              </S.Button>
            </S.FormContainer>
          </S.SignWrapper>
        )}
        {forgetPasswordStage === 1 && (
          <S.VerifyForgetContainer>
            <S.SignHeader>Enter The Code!</S.SignHeader>
            {codeErr && (
              <S.SignWrapper className='mb-4 mt-4'>
                <S.SignInfoErr>{codeErr}</S.SignInfoErr>
              </S.SignWrapper>
            )}
            <S.VerifyInfo>
              Verification code sent to your email! <br /> This code is valid
              for 24 hours. Verify your Phone by entering the verification here
            </S.VerifyInfo>
            <S.SignForm
              onSubmit={(e) => {
                e.preventDefault();
                handleVerifySubmit();
              }}
            >
              <S.CodeInputContainer>
                {code.map((num, idx) => {
                  return (
                    <S.InputCode
                      key={idx}
                      type='text'
                      inputMode='numeric'
                      maxLength={1}
                      value={num}
                      autoFocus={!code[0].length && idx === 0}
                      onChange={(e) => processInput(e, idx)}
                      ref={(ref) => inputsElement.current.push(ref)}
                      onKeyUp={(e) => onKeyUp(e, idx)}
                    />
                  );
                })}
              </S.CodeInputContainer>
              <S.SignSubmitButton>
                <S.Button
                  disabled={loading || !code[3].length}
                  onClick={() => handleVerifySubmit()}
                >
                  {loading ? 'Please wait...' : 'Verify'}
                </S.Button>
              </S.SignSubmitButton>
            </S.SignForm>
          </S.VerifyForgetContainer>
        )}
        {forgetPasswordStage === 2 && (
          <S.VerifyForgetContainer>
            <S.SignHeader className='mb-16'>Reset Password</S.SignHeader>
            {resetErr && (
              <S.SignWrapper>
                <S.SignInfoErr>{resetErr}</S.SignInfoErr>
              </S.SignWrapper>
            )}
            <S.FormContainer onSubmit={handleSubmit}>
              <Password
                name='password'
                label='Password:'
                validateText={errors.password}
                value={inputs.password}
                onChange={handleChange}
                onBlur={handleSubmit}
                autoComplete='off'
                passwordScore={inputs.passwordScore}
              />
              <S.Button
                disabled={
                  !isValidatePasswordForm || loading || !inputs.password
                }
                onClick={handleSubmitPassValidation}
              >
                {loading ? 'Please wait...' : 'Reset Password'}
              </S.Button>
            </S.FormContainer>
          </S.VerifyForgetContainer>
        )}
      </S.Sign>
    </S.WebPageContainer>
  );
};

export default ForgetPassword;
