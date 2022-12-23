// Utils
import styled, { keyframes } from 'styled-components';
import { colorBlueMedium, primaryOrange } from 'scss/colors';

const addressBoxShrinkAnimation = keyframes`
0% { width: calc(100% - 2rem); }
100% { width: 80%;}
`;

const addressBoxExpandAnimation = keyframes`
0% { width: 80%; }
100% { width: calc(100% - 2rem);}
`;

const NextButtonShrinkAnimation = keyframes`
0% { left: calc(100% - 2rem); }
100% { left: calc(70% + 1rem);}
`;

const NextButtonExpandAnimation = keyframes`
0% { left: calc(70% + 1rem); }
100% { left: calc(100% - 2rem);}
`;

export const TheAddAddress = styled.div`
  position: absolute;
  left: 0;
  top: ${(props) => (props.focus ? '12.1rem' : 'none')};
  bottom: 3.5rem;
  height: 13.8rem;
  width: ${(props) => (props.filled ? '80%' : 'calc(100% - 2rem)')};
  color: white;
  background-color: ${colorBlueMedium};
  box-sizing: border-box;
  border-radius: 0 2rem 2rem 0;
  animation-name: ${(props) =>
    props.filled ? addressBoxShrinkAnimation : addressBoxExpandAnimation};
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
  z-index: 102;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 4rem;
    bottom: 0;
    width: calc(100% - 4rem);
    height: 13.8rem;
    border-radius: 0 2rem 2rem 0;
    pointer-events: none;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  }
`;

export const TheAddAddressWrapper = styled.div`
  position: relative;
  height: 100%;
`;

export const ShadowBox = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: ${colorBlueMedium};
  box-sizing: border-box;
  border-radius: 0 2rem 2rem 0;
  padding: 1rem 2rem 1rem 1.5rem;
  z-index: 103;
`;

export const NextButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: calc(70% + 1rem);
  transform: translateY(-50%);
  height: 85%;
  width: 30%;
  background-color: ${primaryOrange};
  border-radius: 0 2rem 2rem 0;
  animation-name: ${(props) =>
    props.filled ? NextButtonExpandAnimation : NextButtonShrinkAnimation};
  animation-delay: ${(props) => (props.filled ? '0.4s' : '0')};
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
`;

export const NextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-left: 1rem;
  font-size: 1.3rem;
`;

export const ReplacingButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  width: 5rem;
`;

export const ReplacingButton = styled.button`
  width: 2rem;
`;

export const SVGContainer = styled.div`
  position: absolute;
  left: -0.1rem;
  bottom: 2rem;
  width: 3rem;
  z-index: 101;
  filter: drop-shadow(0px 0px 1rem rgba(0, 0, 0, 0.5));
  top: ${(props) => (props.focus ? '10.5rem' : 'none')};
`;
