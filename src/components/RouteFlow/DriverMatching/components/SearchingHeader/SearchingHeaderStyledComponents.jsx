import styled from 'styled-components';
import * as C from 'scss/colors';

export const SearchingHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

export const SearchingTitle = styled.h3`
  color: ${C.colorGrey3};
  opacity: 50%;
  font-weight: 600;
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const ItsHereIcon = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${C.colorBlueMedium};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  width: 38px;
`;

export const RoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  h3 {
    opacity: 36%;
    font-size: 18px;
  }
`;

export const dot = styled.div`
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: ${C.colorGrey3};
  border-radius: 100%;
  margin-right: 2px;
  margin-left: 2px;
  opacity: ${(props) => props.opacity};
  transition: opacity 1s ease-out;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
