import styled from 'styled-components';

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 4rem;
  min-width: 4rem;
  padding: 0.8rem;
  border: 1px solid white;
  border-radius: 50%;
  box-shadow: 0 0 10px white;
  margin-right: 8px;
`;
export const Button = styled.button`
  align-self: flex-end;
  background-color: green;
  padding: 0rem 0.9rem 0rem 0.9rem;
  border-radius: 10px;
  margin-top: 8px;
  font-size: 14px;
`;
export const Body = styled.h6`
  width: 250px;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
