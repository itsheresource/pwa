// Utils
import styled from 'styled-components';

// Components
import { BottomModalContainer } from 'scss/ComponentsUsedFrequently';

export const SkipModalContainer = styled(BottomModalContainer)``;

export const Title = styled.div`
  color: rgba(90, 86, 86, 0.78);
`;

export const ConfirmButton = styled.button`
  width: 28rem;
  height: 4rem;
  background-color: rgb(5, 207, 113);
  border-radius: 2rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
`;

export const CancelButton = styled.button`
  width: 28rem;
  height: 4rem;
  background-color: rgb(57, 108, 179);
  border-radius: 2rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
`;

export const ButtonText = styled.span`
  color: white;
`;
