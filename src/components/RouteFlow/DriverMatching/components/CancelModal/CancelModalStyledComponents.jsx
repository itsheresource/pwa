// Utils
import styled from 'styled-components';
import { primaryOrange } from 'scss/colors';

// Components
import { BottomModalContainer } from 'scss/ComponentsUsedFrequently';

export const CancelModalContainer = styled(BottomModalContainer)``;

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
  width: 28rem;
  height: 4rem;
  background-color: ${primaryOrange};
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
