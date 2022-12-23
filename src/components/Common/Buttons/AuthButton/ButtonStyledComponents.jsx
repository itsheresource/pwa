import styled from 'styled-components';

import * as color from 'scss/colors';

export const ButtonComponent = styled.button`
  background-color: ${color.colorPrimary};
  border: 0;
  color: ${color.colorWhite};
  font-size: 3.5rem;
  padding: 1.2rem 0;
  width: 100%;

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
