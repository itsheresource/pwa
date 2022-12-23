import styled from 'styled-components';
import * as C from 'scss/colors';

export const RouteListContainer = styled.div`
  background-color: #f1f1f1;
  color: blue;
  display: flex;
  flex-direction: column;
  margin: 9rem 0 0;
  overflow: auto;
  padding: 0 2.5rem;
  width: 100%;
`;

export const ExitButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const RouteListEmptyView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bolder;
  color: grey;
`;

export const Button = styled.button`
  background-color: ${(props) => props.background};
  color: ${C.colorWhite};
  border-radius: 2.4rem;
  border: 0;
  padding: 0.4rem;
  width: 35%;
  align-self: center;
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  &:focus {
    outline: 0;
  }
`;
