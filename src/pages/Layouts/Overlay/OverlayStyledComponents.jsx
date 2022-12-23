import styled from 'styled-components';
import { primaryOrange } from 'scss/colors';
import * as C from 'scss/colors';

export const OverlayContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
`;

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: ${(props) =>
    props.showMatchingDriver || props.showDriverMatching
      ? 'center'
      : 'flex-end'};
  align-items: center;
  height: 9rem;
  padding: 2rem;
  z-index: 1000;
  transition: all 1s ease-out;
  background-color: #f5f5f5;
`;

export const SideBarButton = styled.button`
  top: 3%;
  position: fixed;
  left: 0rem;
  width: 50px;
  background-color: ${C.colorBlueMedium};
  z-index: 900;
  border-radius: 0px 16px 16px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  &::after {
    position: absolute;
    content: '';
    background: rgb(192 25 25 / 0%);
    bottom: -1.9rem;
    height: 2rem;
    width: 2rem;
    left: -5px;
    border-radius: 3rem 0 0 0;
  }
  &::after {
    box-shadow: -0.1rem -1rem 0 0 ${C.colorBlueMedium};
  }
  &::before {
    position: absolute;
    content: '';
    background: rgb(0 0 0 / 0%);
    bottom: 4.3rem;
    height: 3rem;
    width: 1rem;
    left: 0rem;
    border-radius: 0 0 0 4rem;
  }
  &::before {
    box-shadow: -0.1rem 2rem 0 0 ${C.colorBlueMedium};
  }
`;

export const ItemsIconContainer = styled.div`
  position: relative;
  height: 4.5rem;
  width: 4.5rem;
  border-radius: 1.2rem;
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
  margin: 18px;
`;

export const NumberOfItemsContainer = styled.div`
  position: absolute;
  top: -0.2rem;
  left: -0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${primaryOrange};
  color: white;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  height: 1.8rem;
  width: 1.8rem;
`;

export const ItemsButton = styled.button`
  height: 100%;
  width: 100%;
`;

export const BodyContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
`;

export const Body = styled.div`
  width: 100vw;
  overflow: hidden;
`;

export const Icon = styled.img`
  filter: invert(0.4);
`;

export const RouteStepDot = styled.span`
  color: ${(props) => (props.isOrange ? primaryOrange : 'rgb(116, 116, 116)')};
`;

export const HomeIcon = styled.img`
  background: white;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
`;

export const BottomContainer = styled.div`
  background: ${C.colorBackgroundGrey1};
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 90px;
  z-index: 1;
`;

export const CheckMarkContainer = styled.div`
  height: 3rem;
  width: 3rem;
`;
