import * as C from 'scss/colors';
import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 4000;
`;

export const BackIcon = styled.img`
  width: 8rem;
  margin-bottom: 3rem;
  left: 0;
  align-self: flex-start;
  margin-top: auto;
  margin-left: 22px;
`;

export const HeaderContainer = styled.div`
  position: relative;
  background: ${C.colorBlueMedium};
  border-radius: 0 0 3rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  height: 20vh;
  &:after {
    content: '';
    position: absolute;
    bottom: -3.4rem;
    left: 0;
    height: 3.4rem;
    width: 3.3rem;
    border-top-left-radius: 50%;
    background: ${C.colorBackgroundGrey1};
  }
  &:after {
    box-shadow: -0.5rem -1.7rem 0 0 ${C.colorBlueMedium};
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  h3 {
    color: ${C.colorWhite};
    font-size: 23px;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 54px;
  height: calc(100% - 14vh);
  background: ${C.colorBackgroundGrey1};
`;

export const Input = styled.input`
  background: ${C.colorBackgroundGrey1};
  font-size: 14px;
  color: ${C.colorGrey3};
  border-bottom: 1px solid ${C.colorGrey1};
  font-weight: 700;
  opacity: 63%;
  width: 100%;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${C.colorBlack};
    opacity: 1;
  }
`;

export const StarSpan = styled.span`
  color: ${C.colorMarker};
`;

export const Field = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  width: 100%;
  margin-bottom: 20px;
`;

export const Label = styled.h4`
  font-size: 12px;
  opacity: 0.71;
  font-weight: 500;
  margin-right: 4px;
  color: ${C.greyishBrown};
  white-space: nowrap;
`;

export const TextArea = styled.textarea`
  font-size: 12px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.34);
  resize: none;
  width: 100%;
  height: 140px;
  border-radius: 11px;
  padding: 1rem;
  &::placeholder {
    color: ${C.colorGrey3};
    opacity: 0.4;
    font-size: 12px;
  }
  &:focus {
    outline: 0;
  }
`;

export const ErrorMessage = styled.h4`
  font-size: 12px;
  opacity: 0.78;
  font-weight: 700;
  margin-top: 11px;
  color: ${C.primaryOrange};
  white-space: nowrap;
`;

export const Button = styled.button`
  margin-top: 28px;
  height: 39px;
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? `rgb(116,116,116,0.36)` : C.primaryOrange};
  border: none;
  border-radius: 22px;
  color: ${C.colorWhite};
  font-size: 19px;
  &.disabled {
    background-color: ${C.colorGrey3};
    color: ${C.colorGrey1};
  }
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: ${C.colorBlueMedium};
    color: ${C.colorGrey1};
  }
`;

export const CardContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  background-color: ${C.colorWhite};
  border-radius: 1.5rem;
  z-index: 4000;
  transform: translate(-50%, -50%);
  height: auto;
  left: 50%;
  top: 50%;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
`;
export const HeaderModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${C.buttonGreen};
  width: 100%;
  border-radius: 1.5rem 1.5rem 0px 0px;
  padding: 0.5rem; ;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  color: ${C.colorWhite};
  font-weight: 700;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.4rem;
`;
export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  opacity: 80%;
  color: ${C.colorBlack};
`;
export const SubTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  opacity: 70%;
  color: ${C.colorBlack};
`;

export const CloseButton = styled.button`
  background-color: ${C.buttonGreen};
  color: ${C.colorWhite};
  border-radius: 2.4rem;
  border: 0;
  padding: 0.3rem;
  width: 80%;
  font-size: 1.9rem;
  margin-top: 1.5rem;
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: ${C.colorBlueMedium};
  }
`;
export const Ticket = styled.h3`
  color: ${C.primaryOrange};
  font-weight: 800;
  opacity: 1;
  font-size: 1.6rem;
  margin-left: 8px;
`;
