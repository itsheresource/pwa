import styled from 'styled-components';
import * as C from 'scss/colors';

export const DriverContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 15px 15px;
  width: 100%;
`;

export const DriverImage = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 1rem;
`;

export const Driver = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 7px;
  align-self: center;
`;

export const Name = styled.h3`
  margin-bottom: 5px;
  font-size: 15px;
  color: ${C.colorWarmGrey};
  font-weight: 600;
`;

export const Rate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  h4 {
    font-size: 9px;
    font-weight: 500;
  }
`;

export const Vehicle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 10px;
    opacity: 80%;
  }
`;

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
  overflow: auto;
  background-color: ${C.colorWhite};
  margin-bottom: 7px;
`;

export const DriverInfo = styled.div`
  display: flex;
  justify-content: center;
`;

export const OrderAcceptedTitle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  h4 {
    font-size: 21px;
    opacity: 78%;
    margin-top: 16px;
    color: ${C.greyishBrown};
    font-weight: 600;
  }
`;

export const HLine = styled.hr`
  border-top: 1px solid #000;
  width: 100%;
`;

export const TimeSheetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border-top: 1px solid ${C.colorGrey1};
  border-bottom: ${props => props.isEditingInfo ? 'none' : `1px solid ${C.colorGrey1}`};
  width: 90%;
`;

export const VLine = styled.hr`
  border-left: 1px solid ${C.colorGrey1};
  height: 28px;
`;

export const CancelLink = styled.h3`
  color: ${C.colorWarmGrey};
  opacity: 90%;
  font-size: 15px;
  font-weight: 600;
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  h3 {
    font-size: 15px;
    color: ${C.colorBlueMedium};
    font-weight: 600;
  }
`;
