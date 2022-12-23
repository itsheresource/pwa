// Utils
import * as C from 'scss/colors';
import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`;
export const ActiveItem = styled.div`
  background: ${(props) => (props.isActive ? '#cecece' : '')};
  padding: 1.5rem;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 4px 0px 4px;
`;
export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin: 12px 0px 12px;
`;
