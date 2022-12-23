import styled from 'styled-components';

export const PopUpContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  width: 100%;
  height: 100%;
  padding-right: 2rem;
`;

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
`;

export const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 2rem;
`;

export const Title = styled.span`
  font-size: 2rem;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const ConfirmButton = styled.span`
  color: white;
  align-self: flex-end;
  background: green;
  padding: 0.5rem;
  border-radius: 1rem;
  font-size: 1.5rem;
`;
