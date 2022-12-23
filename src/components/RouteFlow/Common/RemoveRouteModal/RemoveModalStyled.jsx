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
  background: ${C.colorGrey1};
  border-radius: 1.4rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 800;
  color: ${C.colorBlack};
  text-align: center;
`;

export const Subtitle = styled.h5`
  color: ${C.colorBlack};
  font-size: 1.2rem;
  opacity: 0.8;
  text-align: center;
`;

export const Button = styled.button`
  background-color: ${(props) => props.color};
  color: ${C.colorWhite};
  border-radius: 2.4rem;
  border: 0;
  padding: 0.4rem;
  width: 100%;
  box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.3);
  font-size: 1.7rem;
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
  width: 90%;
  justify-content: space-between;
  margin-top: 2rem;
`;
