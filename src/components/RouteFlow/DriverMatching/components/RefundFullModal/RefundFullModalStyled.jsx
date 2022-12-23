import * as C from 'scss/colors';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  background: ${C.colorWhite};
  border-radius: 1.4rem;
  box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5rem;
`;

export const InfoText = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${C.colorBlack};
`;

export const Button = styled.button`
  background-color: ${(props) => props.color};
  color: ${C.colorWhite};
  border-radius: 2.4rem;
  border: 0;
  padding: 0.2rem;
  width: 100%;
  box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.3);
  font-size: 1.3rem;
  margin: 6px;
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: ${C.colorBlueMedium};
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 2rem;
`;
