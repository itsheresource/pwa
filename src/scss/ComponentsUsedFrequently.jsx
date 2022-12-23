import styled, { keyframes } from 'styled-components';

const MountAnimation = keyframes`
  0% { bottom: -40rem; }
  100% { bottom: 0;}
`;

export const MainBox = styled.div`
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
  margin: 0 0 2rem;
  padding: 2rem;
  border-radius: 2rem;
  font-size: 1.8rem;
`;

export const RouteFlowContainer = styled.div`
  margin: 9rem 0 0;  
  padding: 1rem 2rem;
  height: calc(100% - 9rem);
  width: 100%;
  overflow: auto;
  background-color: #f5f5f5;
`;

export const BottomModalContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.16);
  padding: 4rem 2rem;
  animation: ${MountAnimation} 0.5s ease-out forwards;
`;
