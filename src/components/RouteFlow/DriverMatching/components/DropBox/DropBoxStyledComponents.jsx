import styled from 'styled-components';
import * as C from 'scss/colors';

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 17px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
  background-color: ${C.colorWhite};
  margin-bottom: 7px;
  height: ${(props) => (props.isOpen ? '28rem' : '69px')};
  transition: height 0.8s ease-out;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.background};
  border-radius: 20px;
  padding: 12px 24px 12px 13px;
  h4 {
    color: ${C.colorWhite};
    font-size: 15px;
    font-weight: 700;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChipsContainer = styled.div`
  width: 118px;
`;

export const Chips = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
  border: ${(props) =>
    props.isChipsClicked
      ? `1px solid ${C.colorLightAquamarine}`
      : `1px solid ${C.colorGrey4}`};
  box-shadow: ${(props) =>
    props.isChipsClicked && `0px 0px 3px 0px rgba(158,252,208)`};
  background-color: ${(props) =>
    props.isChipsClicked ? `${C.colorLightGreen}` : `${C.colorGrey4}`};
  color: ${C.colorWhite};
  width: 118px;
  margin-top: 6px;
  h5 {
    font-size: 13px;
    font-weight: 700;
  }
`;

export const IconSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 2px;
  margin-left: 6px;
  opacity: ${(props) => (props.isChipsClicked ? 1 : 0.66)};
  box-shadow: ${(props) =>
    props.isChipsClicked && `0px 0px 3px 0px rgba(158,252,208)`};
  border: ${(props) =>
    props.isChipsClicked && `1px solid ${C.colorLightAquamarine}`};
  background-color: ${(props) =>
    props.isChipsClicked ? `${C.colorLightGreen}` : `${C.colorWhite}`};
  width: 11px;
  height: 11px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 36px 0px 21px;
  overflow: hidden;
  height: 100%;
`;

export const InputButtonLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 7px;
  width: 65px;
  height: 28px;
`;