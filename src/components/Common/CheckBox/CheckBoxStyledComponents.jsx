import styled from 'styled-components';

import * as C from 'scss/colors';

export const CheckBoxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const CheckMarkIcon = styled.svg`
  fill: none;
  stroke: ${C.DarkGreenN};
  stroke-width: 3px;
`;

export const StyledCheckbox = styled.div`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  border: ${(props) =>
    props.checked ? `2px solid ${C.DarkGreenN}` : '1px solid'};
  border-radius: 0.8rem;
  transition: all 150ms;

  ${CheckMarkIcon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;
