// Utils
import styled, { keyframes } from 'styled-components';

// Components
import { MainBox } from 'scss/ComponentsUsedFrequently';
import { buttonGreen, primaryOrange } from 'scss/colors';

const ShowAnimation = keyframes`
  0% { 
  background-color: transparent;
  backdrop-filter: blur(0);
  }
  100% { 
  background-color: rgba(256, 256, 256, 0.5);
  backdrop-filter: blur(4px);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  z-index: 1000;
  animation: ${ShowAnimation} 0.1s ease-out forwards;
`;

export const ChangeDateModalContainer = styled(MainBox)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  z-index: 10000;
`;

export const Title = styled.span`
  color: rgba(90, 86, 86, 0.78);
`;

export const PriceTextContainer = styled.div`
  margin-bottom: 2rem;
  background-color: rgb(235, 235, 235);
  padding: 0.5rem 4rem;
`;

export const PriceText = styled.span`
  font-size: 3rem;
  color: ${primaryOrange};
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 4rem;
  background-color: ${buttonGreen};
  border-radius: 2rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
`;

export const CancelButton = styled.button`
  width: 28rem;
  height: 4rem;
  border-radius: 2rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
`;

export const ConfirmButtonText = styled.span`
  color: white;
`;

export const CancelButtonText = styled.span`
  color: rgba(90, 86, 86, 0.78);
`;

export const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
`;
