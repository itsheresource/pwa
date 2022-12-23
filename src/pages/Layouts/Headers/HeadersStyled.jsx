import styled from 'styled-components';
import * as C from 'scss/colors';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 9rem;
  padding: 2rem;
  z-index: 800;
  background-color: transparent;
`;
export const CleanRouteIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-left: 10px;
  padding: 7px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
`;
export const HomeIcon = styled.img`
  background: white;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
`;

export const RouteStepsContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`;
export const RouteStepIconButton = styled.button`
  background-color: transparent;
  border: none;
  height: 100%;
  width: 100%;
`;
export const RouteStep = styled.div`
  display: flex;
`;
export const dot = styled.div`
  display: inline-block;
  width: 3px;
  height: 3px;
  background-color: ${C.colorBlack};
  border-radius: 50%;
  margin-right: 2.5px;
  margin-left: 2.5px;
  opacity: ${(props) => props.opacity};
`;

export const CheckMarkContainer = styled.div`
  height: 3rem;
  width: 3rem;
`;

export const Icon = styled.img`
  filter: invert(0.4);
`;
