import * as C from 'scss/colors';
import styled from 'styled-components';

export const Input = styled.input`
  background: none;
  font-size: 16px;
  color: ${C.colorWarmGrey};
  border-bottom: 1px solid ${C.colorWarmGrey2};
  font-weight: 700;
  width: 100%;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${C.colorBlack};
    opacity: 1;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

export const Label = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${C.colorWarmGrey2};
`;
export const ValidationErr = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${C.colorRed};
`;

