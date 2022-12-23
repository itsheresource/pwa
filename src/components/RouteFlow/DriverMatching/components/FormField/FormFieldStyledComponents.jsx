import styled from 'styled-components';
import * as C from 'scss/colors';

export const Field = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 10px;
  width: 100%;
`;

export const Label = styled.h4`
  font-size: 12px;
  opacity: 0.5;
  font-weight: 700;
  margin-right: 4px;
  width: 35%;
`;

export const Input = styled.input`
  color: ${C.colorGrey3};
  font-weight: 700;
  opacity: 63%;
  border-bottom: ${(props) =>
    props.isValidation
      ? `1px solid ${C.colorRed}`
      : `1px solid ${C.colorGrey1}`};
  &:focus {
    outline: none;
    border-bottom: 1px solid ${C.colorBlack};
    opacity: 1;
  }
  width: 65%;
`;

export const StarSpan = styled.span`
  color: ${C.colorMarker};
`;
