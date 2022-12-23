import styled from 'styled-components';

import * as color from 'scss/colors';

export const WebPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${color.registrationBackground};
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

export const BackIcon = styled.img`
  width: 10rem;
  opacity: 0.8;
  align-self: flex-start;
`;

export const Sign = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 4rem 6rem;
`;

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${color.registrationBackground};
`;
export const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 30px;
`;

export const LoginButton = styled.button`
  font-size: 100%;
  font-weight: 800;
  padding: 0.5rem;
  background-color: ${color.primaryOrange};
  border-radius: 3rem;
  width: 100%;
  color: ${color.colorWhite};
  margin-bottom: 13px;
`;
export const SignUpButton = styled.button`
  border: 1px solid ${color.colorWarmGrey2};
  font-size: 100%;
  font-weight: 700;
  padding: 0.5rem;
  border-radius: 3rem;
  border-color: ${color.colorWarmGrey2};
  width: 100%;
  color: ${color.colorWarmGrey2};
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
  margin: 20px;
`;
export const SignUpSubmitButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  button {
    border: 2px solid ${color.colorWarmGrey};
    font-size: 100%;
    font-weight: 800;
    padding: 0.5rem;
    background-color: ${color.colorWhite};
    border-radius: 3rem;
    border-color: ${color.colorWarmGrey};
    width: 100%;
    color: ${color.colorWarmGrey};
  }
`;

export const Hi = styled.h1`
  color: ${color.colorWarmGrey};
  font-weight: 800;
`;

export const InputWrapper = styled.div`
  margin-bottom: 2rem;
  background-color: ${color.colorWhite};
  border-radius: 5px;

  input {
    color: black;

    &::placeholder {
      color: ${color.colorPrimary};
      opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${color.colorPrimary};
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: ${color.colorPrimary};
    }
  }
`;

export const ErrorContainer = styled.div`
  align-items: center;
  background: ${color.colorRedLight};
  border-radius: 3px;
  color: ${color.colorRed};
  display: flex;
  font-weight: bold;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 0.5rem;
  width: 100%;
`;
export const SignInfo = styled.div`
  font-size: 1.6rem;
  color: ${color.colorBlueMedium};
  &#forgot-password-link {
    display: block;
    padding: 1.2rem;
    padding-right: 0;
    margin-bottom: 0.5rem;
  }
`;

export const SignInfoWhite = styled(SignInfo)`
  display: flex;
  align-items: center;
  color: ${color.colorWhite};
  cursor: pointer;
  &:hover,
  &:visited {
    color: ${color.colorWhite};
  }
`;

export const SignInfoWhiteLink = styled(SignInfo)`
  align-self: center;
  a {
    align-self: center;
    color: ${color.colorWarmGrey2};
    cursor: pointer;
    font-weight: 700;
    font-size: 19px;
  }
`;

export const SignInfoBold = styled(SignInfo)`
  font-weight: bold;
`;

export const SignInfo2 = styled(SignInfo)`
  margin: 2rem;
`;

export const SignSubmitButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 2rem;

  button {
    border: 0;
    font-size: 100%;
    font-weight: 700;
    padding: 0.5rem;
    background-color: ${color.colorMarker};
    border-radius: 3rem;
    width: 100%;
    color: ${color.colorWhite};
  }
`;

export const LoginContainerText = styled.span`
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0rem 1rem;
  color: ${color.primaryOrange};
  text-decoration: underline;
`;

export const SignUpContainerText = styled.div`
  font-size: 2rem;
  color: ${color.colorMarker};
  cursor: pointer;
  padding: 0rem 1rem;
`;

export const SignInputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  border: 1px solid ${color.colorGrey1};
  border-radius: 5px;
  padding: 1rem 0 1rem 0;
  padding: 0.5rem;
`;

export const SignTextContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 2rem 0.5rem 2rem 0.5rem;
`;

export const SignAgreeTerms = styled.input`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
`;

export const SignKey = styled.input`
  border: 0;
  outline: 0;
  padding-left: 1rem;
`;

export const SignInputContainerIcon = styled.div`
  svg {
    color: ${color.colorGrey2};
    padding-right: 0.5rem;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const SignAgreeTermsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  vertical-align: middle;
  background-color: transparent;
`;

export const SignLabel = styled.div`
  font-size: 1.8rem;
  padding-left: 5px;

  & > a {
    color: ${color.colorMarker};
    text-decoration: underline;
    font-size: 17px;
  }
`;

export const SignUpContainer = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 0.5rem;
`;

export const SignWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const SignInfoErr = styled(SignInfo)`
  font-weight: 700;
  color: ${color.colorRed};
`;

export const Button = styled.button`
  margin-top: 28px;
  height: 39px;
  width: 100%;
  background-color: ${color.primaryOrange};
  border: none;
  border-radius: 22px;
  color: ${color.colorWhite};
  font-size: 19px;
  margin-bottom: 15px;
  &:disabled {
    cursor: no-drop;
    background-color: ${color.colorGrey2};
    color: ${color.colorGrey1};
  }
`;

export const VerifySubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 4rem 0rem;
  align-items: center;
`;
export const VerifyForgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const SignInfoResend = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${color.colorMarker};
  cursor: pointer;
`;
export const VerifyInfo = styled.h4`
  font-size: 15px;
  font-weight: bold;
  opacity: 80%;
  color: ${color.colorWarmGrey};
  margin-top: 10px;
  margin-bottom: 15px;
  align-items: flex-start;
`;

export const SignForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`;

export const SignHeader = styled.div`
  font-size: 1.8rem;
  text-align: flex-start;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  color: ${color.primaryOrange};
  font-weight: 700;
`;
export const InputCode = styled.input`
  background-color: transparent;
  text-align: center;
  height: 60px;
  width: 40px;
  color: ${color.colorWarmGrey};
  border-bottom: 2px solid ${color.colorWarmGrey};
  font-size: 38px;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${color.colorBlack};
    opacity: 1;
  }
`;

export const CodeInputContainer = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
  justify-content: space-evenly;
  margin: 0px 0px 24px 0px;
`;
