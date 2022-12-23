import React, { useState } from 'react';
// import './Form.css';
import * as S from '../AuthStyles';
import { useDispatch } from 'react-redux';

//components
import useAuthForm from 'customHooks/useAuthForm';
import validationForm from '../components/validationForm';
import FormField from '../components/FormField';
import Password from '../components/Password';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

//icons
import backButtonSignup from 'assets/icons/backButtonSignup.svg';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { removeDashes } from 'utils/NormalizePhoneInput';
import { signUp } from 'apis/Auth/signUp';

function SignUp() {
  const {
    handleChange,
    inputs,
    handleSubmit,
    errors,
    setFormSubmitted,
    setKey,
  } = useAuthForm(validationForm);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [signUpErr, setSignUpErr] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //form validation
  const isValidateForm =
    !errors.email &&
    inputs.email.length > 0 &&
    !errors.phone &&
    inputs.phone.length > 0 &&
    !errors.password &&
    inputs.password.length > 0 &&
    !errors.password2 &&
    inputs.password2.length > 0 &&
    isAgreementChecked;

  const handleSignUpSubmit = async () => {
    const { email, phone, password } = inputs;
    setLoading(true);
    const phonWithoutDashes = removeDashes(phone);
    try {
      const res = await signUp({ email, phone: phonWithoutDashes, password });
      if (res.status === 1) {
        dispatch(
          push(`${AVAILABLE_ROUTES.VERIFY_CODE}?phone=${phonWithoutDashes}`)
        );
      } else {
        setSignUpErr(res.message);
      }
      setLoading(false);
    } catch (err) {
      setSignUpErr('There was a server issue, please try again.');
      setLoading(false);
    }
  };

  const handleSignUpValidation = () => {
    setFormSubmitted(true);
    if (isValidateForm) {
      handleSignUpSubmit();
      setSignUpErr('');
    } else {
      setSignUpErr('Please fill in all the required fields.');
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
        <div className='self-start mb-16'>
          <S.Hi>Hi!</S.Hi>
          <h3>Create a new account</h3>
          {signUpErr && (
            <S.SignWrapper>
              <S.SignInfoErr>{signUpErr}</S.SignInfoErr>
            </S.SignWrapper>
          )}
        </div>
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
            name='password'
            label='Password:'
            validateText={errors.password}
            value={inputs.password}
            passwordScore={inputs.passwordScore}
            onChange={handleChange}
            onBlur={handleSubmit}
            autoComplete='off'
          />
          <Password
            label='Confirm password:'
            name='password2'
            withoutMeter
            value={inputs.password2}
            onChange={handleChange}
            validateText={errors.password2}
            onBlur={handleSubmit}
            autoComplete='off'
          />
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
          <S.Button
            type='submit'
            disabled={!isValidateForm || loading}
            onClick={handleSignUpValidation}
          >
            {loading ? 'Please wait...' : 'SignUp'}
          </S.Button>
        </S.FormContainer>
        <div className='flex items-center flex-col'>
          <S.SignAgreeTermsContainer>
            <S.SignAgreeTerms
              type='checkbox'
              checked={isAgreementChecked}
              onChange={() => setIsAgreementChecked(!isAgreementChecked)}
            />
            <S.SignLabel htmlFor='termsChecker'>
              I agree &nbsp;
              <a
                href='http://itshere.com/terms-of-service'
                target='_blank'
                rel='noopener noreferrer'
              >
                Terms & Conditions
              </a>
            </S.SignLabel>
          </S.SignAgreeTermsContainer>
          <S.SignUpContainer>
            <Link to='/signin'>
              <S.SignInfo>
                <span className='underline'>have already an account?</span>
              </S.SignInfo>
            </Link>
          </S.SignUpContainer>
        </div>
      </S.Sign>
    </S.WebPageContainer>
  );
}
export default SignUp;
