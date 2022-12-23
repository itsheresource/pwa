import React, { useState } from 'react';

// Router
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

// Components
import * as S from '../AuthStyles';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

// Icons
import backButtonSignup from 'assets/icons/backButtonSignup.svg';

// Utils
import { phoneResendRegistration } from 'apis/Auth/signUp';
import FormField from '../components/FormField';
import { removeDashes } from 'utils/NormalizePhoneInput';
import useAuthForm from 'customHooks/useAuthForm';
import validationForm from '../components/validationForm';

const ResendCode = () => {
  const {
    handleChange,
    inputs,
    handleSubmit,
    errors,
    setFormSubmitted,
    setKey,
  } = useAuthForm(validationForm);
  const [loading, setLoading] = useState(false);
  const [resendErr, setResendErr] = useState(false);

  const dispatch = useDispatch();

  const handleSend = async () => {
    const phonWithoutDashes = removeDashes(inputs.phone);
    try {
      const res = await phoneResendRegistration({ phone: phonWithoutDashes });
      if (res.status === 1) {
        dispatch(
          push(`${AVAILABLE_ROUTES.VERIFY_CODE}?phone=${phonWithoutDashes}`)
        );
        setResendErr('');
      } else {
        setResendErr(res.message);
      }
      setLoading(false);
    } catch (err) {
      setResendErr('There was a server issue, please try again');
      setLoading(false);
    }
  };

  return (
    <S.WebPageContainer>
      {loading && <SpinnerLoading />}
      <S.BackIcon
        src={backButtonSignup}
        alt='back'
        onClick={() => dispatch(push(AVAILABLE_ROUTES.WELCOME))}
      />

      <S.Sign>
        <S.SignWrapper>
          <S.SignHeader className='mb-8'>
            Resend account verification code
          </S.SignHeader>
          {resendErr && (
            <S.SignWrapper className='mb-8'>
              <S.SignInfoErr>{resendErr}</S.SignInfoErr>
            </S.SignWrapper>
          )}
          <S.VerifyInfo>Enter the Phone you signed up with us.</S.VerifyInfo>

          <S.FormContainer onSubmit={handleSubmit}>
            <FormField
              label='Phone number:'
              name='phone'
              type='tel'
              maxLength={12}
              placeholder='000-000-0000'
              validateText={errors.phone}
              value={inputs.phone}
              onChange={handleChange}
              onBlur={handleSubmit}
              onKeyDown={(e) => setKey(e.key)}
              autoComplete='off'
            />
            <S.Button disabled={loading} onClick={handleSend}>
              Resend Code
            </S.Button>
          </S.FormContainer>
        </S.SignWrapper>
      </S.Sign>
    </S.WebPageContainer>
  );
};

export default ResendCode;
