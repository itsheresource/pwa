import * as C from 'scss/colors';
import styled from 'styled-components';

const changeColors = (dataStrength) => {
  switch (dataStrength) {
    case 0:
      return 'darkred';
    case 1:
      return 'orangered';
    case 2:
      return 'orange';
    case 3:
      return 'yellowgreen';
    case 4:
      return '#0cd5fe';
    default:
      break;
  }
};

export const Status = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => changeColors(props.status)};
`;

export const ValidationErr = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${C.colorRed};
  margin-top: -10px;
  margin-bottom: 8px;
`;
