import styled from 'styled-components';
import * as C from 'scss/colors';

const statusColorHelper = (status) => {
  switch (status) {
    case 'completed':
      return C.buttonGreen;
    case 'failed':
      return '#B7B5B5';
    case 'canceled':
      return '#FE3F3F';
    default:
      return '#ffffff';
  }
};

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
`;

export const Eta = styled.h4`
  color: ${C.primaryOrange};
  font-weight: 700;
  align-self: center;
  flex: 1;
  margin-right: 4px;
`;
export const TimeStatus = styled.h4`
  color: ${(props) => statusColorHelper(props.status)};
  margin-right: 4px;
  font-weight: 700;
  flex: 1;
`;

export const RouteType = styled.div`
  display: flex;
  align-items: center;
  flex: 4;
`;

export const CustomerName = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14;
  font-weight: 700;
  color: ${C.colorGrey1};
  flex-grow: 1;
`;

export const RouteStatus = styled.h4`
  font-size: 1.4rem;
  white-space: nowrap;
  color: ${(props) => statusColorHelper(props.status)};
  font-weight: 700;
  flex: 2;
`;

export const Address = styled.h4`
  font-size: 12px;
  opacity: 0.6;
  margin: -3px 0px 5px -1px;
`;

export const RouteCardHr = styled.hr`
  align-self: flex-end;
  color: #bfbbbb;
  width: 100%;
`;

export const ItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${C.colorGrey4};
  border-radius: 3px;
  margin: 1px;
  padding: 3px;
  width: 50px;
  height: 30px;
`;

export const TimeStatusContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${C.colorWarmGrey2};
  justify-content: flex-end;
  flex: 2;
`;

export const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${(props) => (props.isOpen ? '35rem' : '0')};
  padding: 0px 30px 0px 16px;
  transition: height 1s;
  overflow: auto;
  overflow-x: hidden;
`;

export const AdditionalInfoContainer = styled.div`
  margin: 8px 0px 15px 0px;
`;

export const RowDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 3.5rem;
`;

export const NoteIconContainer = styled.div`
  margin-bottom: 25px;
  align-self: flex-end;
`;

export const Recipient = styled.h3`
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 68px;
  overflow: hidden;
  font-size: 12px;
  font-weight: 700;
  color: ${C.colorWarmGrey};
`;

export const ViewMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 4rem;
`;

export const ViewMoreButton = styled.button`
  background-color: transparent;
`;

export const ViewTextLink = styled.h3`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  font-size: 1.5rem;
  width: 100%;
  color: ${C.primaryOrange};
  align-self: flex-end;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: ${(props) =>
    props?.border ? '0.01px solid rgba(0,0,0, 0.2)' : 'none'};
`;

export const ItemsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
`;

export const Title = styled.h4`
  font-size: 12px;
  opacity: 0.4;
`;

export const UnitTitle = styled.h4`
  font-size: 12px;
  opacity: 0.4;
  width: 81px;
`;

export const RecipientCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 81px;
`;

export const Items = styled.div`
  height: 100%;
  overflow: auto;
`;

export const SubTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${C.colorGrey1};
`;

export const VerticalLine = styled.div`
  border-left: 2px dashed ${C.colorGrey1};
  height: ${(props) => props.height};
  position: relative;
`;

export const Content = styled.div`
  width: 100%;
  padding: 0rem 0rem 0rem 1.8rem;
`;
export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${(props) => props.BackgroundColor};
  color: ${(props) => props.color};
  border-radius: 7px;
  border: 0;
  padding: 2px 5px 2px 5px;
  width: 35%;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  font-size: 1.6rem;
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: ${C.colorBlueMedium};
  }
`;

export const NotesContainer = styled.div`
  width: 100%;
  height: 40%;
  margin-bottom: 50px;
  border-radius: 17px;
  background-color: ${C.colorGrey1};
`;

export const Input = styled.input`
  width: 85%;
  color: #fff;
  font-size: 14px;
  background-color: ${C.colorGrey4};
  border-bottom: ${(props) =>
    props.isValidation
      ? `1px solid ${C.colorRed}`
      : `1px solid ${C.colorGrey1}`};
  &:focus {
    outline: none;
    border-bottom: 1px solid ${C.colorBlack};
    opacity: 1;
  }
`;
export const AdditionalServices = styled.div`
  display: flex;
  h4 {
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 170px;
  }
`;
export const AdditionalServicesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
