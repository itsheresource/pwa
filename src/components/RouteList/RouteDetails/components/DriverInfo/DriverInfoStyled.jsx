import styled from 'styled-components';
import * as C from 'scss/colors';

export const DriverInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem 1rem 1rem 2rem ;
  z-index: 103;
`;

export const DriverImage = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 1rem;
`;

export const Driver = styled.div`
  display: flex;
  align-items: flex-start;
  color: ${C.colorGrey3};
  align-self: center;

  h4 {
    width: 100px;
    font-size: 16px;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #fff;
  }
`;

export const Rate = styled.div`
  display: flex;
  align-items: flex-start;

  h4 {
    font-size: 1.2rem;
    opacity: 0.8;
    white-space: nowrap;
    color: #fff;
  }
`;

export const CarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Vehicle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${C.colorGrey3};
  h3 {
    margin-top: 2px;
    align-self: center;
    font-size: 10px;
    opacity: 80%;
    white-space: nowrap;
    color: ${C.colorWhite};
    font-weight: 700;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  h3 {
    font-size: 12px;
    color: ${C.colorBlueMedium};
    font-weight: 600;
    white-space: nowrap;
  }
`;

export const PhoneIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${C.colorLightGreen};
  width: 34px;
  height: 34px;
  border-radius: 7px;
  margin-left: 5px;
`;

export const ViewDriver = styled.h5`
  font-size: 16px;
  color: ${C.primaryOrange};
`;
export const BackIcon = styled.img`
  width: 7rem;
  align-self: flex-start;
  margin-left: -13px;
`;
export const TopActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #fff;
  margin-bottom: 4px;
  h4{
    font-weight: 800;
    font-size: 1.6rem;
  }
`;
