import * as C from 'scss/colors';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9000;
  backdrop-filter: blur(4px);
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${C.primaryOrange};
  border-radius: 17px 17px 0px 0px;
  padding: 0.4rem;
  h4 {
    color: ${C.colorWhite};
    font-size: 1.8rem;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  background: ${C.colorWhite};
  border-radius: 17px;
  overflow: auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 100%;
  overflow: auto;
  justify-content: flex-start;
  flex: 1;
`;

export const Hr = styled.hr`
  border-bottom: 0.2px solid #000;
  width: 90%;
  opacity: 0.2;
  align-self: center;
`;

export const Close = styled.h4`
  color: ${C.primaryOrange};
  font-weight: 700;
  align-self: center;
  margin-bottom: 10px;
`;

export const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const Chips = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  background: ${C.selectedGray};
  border-radius: 18px;
  margin: 4px;
`;

export const Item = styled.h4`
  margin: 0px 13px 0px 13px;
  font-size: 16px;
  font-weight: 700;
  color: ${C.colorWarmGrey};
`;
