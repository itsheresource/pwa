import React, { useState, useRef } from 'react';

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
import PropTypes from 'prop-types';
import axios from 'axios';
import { SESSION_STORAGE_TOKEN_KEY } from 'fixtures/sessionToken';
import { set } from 'idb-keyval';
import { phoneOtpMatch } from 'apis/Auth/signUp';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import queryString from 'query-string';

export default function VerifyCode() {
  const [code, setCode] = useState([...Array(4)].map(() => ''));
  const inputs = useRef([]);
  const [key, setKey] = useState();

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot < 3 && key !== 8) {
      inputs.current[slot + 1].focus();
    }
  };

  const onKeyUp = (e, slot) => {
    setKey(e.keyCode);
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      inputs.current[slot - 1].focus();
    }
    if (slot === 0) {
      setKey('');
    }
  };

  const [loading, setLoading] = useState(false);
  const [codeErr, setCodeErr] = useState(false);
  const dispatch = useDispatch();

  //for get phone from query
  const parsedData = queryString.parse(location.search);
  const phone = parsedData?.phone;

  const handleVerifySubmit = async () => {
    setLoading(true);
    const newOptCode = code.join('');
    try {
      const res = await phoneOtpMatch({ phone, phoneOtp: newOptCode });
      if (res.status === 1) {
        popUpUtil('success', 'phone code verified successfully');
        axios.defaults.headers.common.token = res.token;
        await set(SESSION_STORAGE_TOKEN_KEY, res.token);
        dispatch(push(AVAILABLE_ROUTES.DASHBOARD));
      } else {
        setCodeErr(res.message);
      }
      setLoading(false);
    } catch (err) {
      setCodeErr('There was a server issue, please try again');
      setLoading(false);
    }
  };

  return (
    <S.WebPageContainer>
      {loading && <SpinnerLoading />}
      <S.VerifySubmitContainer>
        <S.SignHeader>Enter The Code!</S.SignHeader>
        {codeErr && (
          <S.SignWrapper className='mb-4 mt-4'>
            <S.SignInfoErr>{codeErr}</S.SignInfoErr>
          </S.SignWrapper>
        )}
        <S.VerifyInfo>
          Verification code sent to your email! <br /> This code is valid for 24
          hours. Verify your Phone by entering the verification here
        </S.VerifyInfo>

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
                ref={(ref) => inputs.current.push(ref)}
                onKeyUp={(e) => onKeyUp(e, idx)}
              />
            );
          })}
        </S.CodeInputContainer>

        <S.Button
          disabled={loading || !code[3].length}
          onClick={handleVerifySubmit}
        >
          {loading ? 'Please wait...' : 'Verify'}
        </S.Button>

        <S.VerifyInfo>
          Didn&rsquo;t receive the code?&nbsp;
          <S.SignInfoResend
            role='button'
            tabIndex={0}
            onClick={() => {
              dispatch(push(AVAILABLE_ROUTES.RESEND_CODE));
            }}
            className='underline'
          >
            Send again
          </S.SignInfoResend>
        </S.VerifyInfo>
      </S.VerifySubmitContainer>
    </S.WebPageContainer>
  );
}
VerifyCode.PropTypes = {
  phone: PropTypes.string.isRequired,
};
