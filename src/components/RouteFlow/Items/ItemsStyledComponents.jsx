import styled from 'styled-components';
import * as C from 'scss/colors';

// Components
import { MainBox, RouteFlowContainer } from 'scss/ComponentsUsedFrequently';

export const ItemsContainer = styled(RouteFlowContainer)``;

export const ItemsMainBox = styled(MainBox)`
  overflow-x: hidden;
`;

export const ItemContainer = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ItemBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const ItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 30%;
`;

export const Title = styled.h4`
  color: #8b8888;
  font-size: 1.5rem;
`;

export const NumberAndButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const Number = styled.div`
  font-size: 1.8rem;
  color: #8b8888;
`;

export const PlusMinusBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  background: ${C.colorDodgerBlue};
  color: ${C.colorWhite};
`;

export const Detail = styled.div`
  color: rgba(139, 136, 136, 0.3);
  font-size: 1.4rem;
`;
