import styled, { css } from "styled-components";
import * as color from "scss/colors";

const colorGrey2 = color.colorGrey2;

export const modernScrollBar = css`
  &::-webkit-scrollbar {
    background-color: rgba((${colorGrey2}, 0.4));
    width: 8px;
    min-height: 10px;
    max-height: 10px;
  }

  /* background of the scrollbar except button or resizer */
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-track:hover {
    background-color: transparent;
  }

  /* scrollbar itself */
  &::-webkit-scrollbar-thumb {
    background-color: ${colorGrey2};
    border-radius: 16px;
    border: 1px solid transparentize(${color.colorWhite}, 0.5);
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${colorGrey2};
    border: 0;
  }

  /* set button(top and bottom of the scrollbar) */
  &::-webkit-scrollbar-button {
    display: none;
  }
`;
