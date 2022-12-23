import styled from 'styled-components';
import { primaryOrange, buttonGreen } from 'scss/colors';
import * as C from 'scss/colors';

const colorHelper = (status) => {
  switch (status) {
    case 'Delivered':
      return buttonGreen;
    case 'Schedule':
      return '#8EB7FF';
    case 'Ongoing':
      return primaryOrange;
    case 'Failed':
      return '#B7B5B5';
    case 'Canceled':
      return '#FE3F3F';
    default:
      return '#8EB7FF';
  }
};

const statusColorHelper = (status) => {
  switch (status) {
    case 'completed':
      return buttonGreen;
    case 'failed':
      return '#B7B5B5';
    case 'canceled':
      return '#FE3F3F';
    default:
      return '#8EB7FF';
  }
};

export const RouteCardContainer = styled.div`
  border-radius: 2rem;
  margin: 0.5rem 0;
  color: grey;
  background-color: white;
  box-shadow: 0 0.2rem 1.5rem 0.1rem rgba(0, 0, 0, 0.16);
  transition: height 1s ease-in;
`;

export const RouteCardHeader = styled.div`
  border-radius: 2rem 2rem 0 0;
  color: white;
  background-color: ${(props) => colorHelper(props.status)};
  font-size: 1.7rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.3rem 2rem;
`;

export const RouteCardFlexRowContainer = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RouteCardIconContainer = styled.img`
  height: 2rem;
`;

export const RouteCardAddressesContainer = styled.div`
  padding: 1rem 1rem 0 1rem;
  display: flex;
  flex-direction: column;
`;

export const RouteCardAddresses = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RouteCardAddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  padding: 0.5rem 0 0.5rem 0;
`;

export const RouteCardAddress = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const RouteCardAddressText = styled.h6`
  width: 18rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  opacity: 0.6;
`;

export const RouteCardAddressStatus = styled.div`
  font-size: 1.4rem;
  color: ${(props) => statusColorHelper(props.status)};
`;

export const RouteCardHr = styled.hr`
  align-self: flex-end;
  color: #bfbbbb;
  width: 97%;
`;

export const RouteCardDetailsButton = styled.button`
  color: ${primaryOrange};
  font-size: 1.5rem;
  padding: 0.5rem 0;
  font-weight: 700;
`;

export const StatusText = styled.h4`
  margin-right: 5px;
`;

export const RouteDetailsButton = styled.button`
  color: ${(props) =>
    props.status === 'Ongoing' || props.status === 'Schedule'
      ? C.colorGrey3
      : C.colorLightGreen};
  font-size: 15px;
  padding: 0.5rem 0 0.5rem;
  font-weight: 700;
`;

export const VerticalLine = styled.hr`
  border-left: 1px solid gray;
  height: 35px;
  opacity: 0.2;
`;

export const BottomActionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding: 0.5rem 0 0.5rem;
`;

export const CustomerName = styled.div`
  width: 18rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
`;
export const ViewButton = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: ${C.primaryOrange};
  margin-left: 5px;
`;
export const ArrowIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
  width: 1.6rem;
  height: 1.6rem;
`;
