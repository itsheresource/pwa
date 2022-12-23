import styled from 'styled-components';

import * as color from 'scss/colors';

export const ButtonComponent = styled.button`
  position: fixed;
  left: 59%;
  bottom: 0;
  transform: translate(-50%, -50%);
  height: 5rem;
  width: 72%;
  background-color: ${color.primaryOrange};
  border: none;
  border-radius: 2rem;
  color: ${color.colorWhite};
  font-size: 2rem;
  transition: all 0.2s ease-out;
  z-index: 2;
  
  &.disabled {
    background-color: ${color.colorGrey2};
    color: ${color.colorGrey1};
  }

  &:focus {
    outline: 0;
  }

  &:active {
    background-color: ${color.colorBlueMedium};
    color: ${color.colorGrey1};
  }
`;
