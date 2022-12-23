// Utils
import * as C from 'scss/colors';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`;

export const TopInformation = styled.div`
  height: 24rem;
`;

export const BackIcon = styled.img`
  width: 10rem;
  opacity: 0.4;
  margin-bottom: 3rem;
  left: 0;
`;

export const DriverContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 50px;
  background: ${C.colorBlueMedium};
  border-radius: 0 2.5rem 2.5rem 0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  left: 0;
  height: 120px;
  padding: 2rem;
  margin-top: 3.5rem;
  width: 90%;

  &::after {
    position: absolute;
    content: '';
    background: rgb(0 0 0 / 0%);
    bottom: -4rem;
    height: 4rem;
    width: 11rem;
    left: -0.6rem;
    border-radius: 4rem 0 0 0;
  }
  &::after {
    box-shadow: -0.1rem -2rem 0 0 ${C.colorBlueMedium};
  }

  &::before {
    position: absolute;
    content: '';
    background: rgb(0 0 0 / 0%);
    bottom: 12rem;
    height: 4rem;
    width: 11rem;
    left: -0.6rem;
    border-radius: 0 0 0 4rem;
  }
  &::before {
    box-shadow: -0.1rem 2rem 0 0 ${C.colorBlueMedium};
  }
`;

export const Content = styled.div`
  overflow: auto;
  height: calc(100% - 24rem);
  padding: 0px 23px 0px 23px;
`;

export const DriverImage = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 1rem;
`;

export const Driver = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${C.colorWhite};
  align-self: center;
`;

export const Rate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 8px;
  h4 {
    font-size: 1.2rem;
  }
`;

export const Vehicle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  color: ${C.colorWhite};
  h3 {
    font-size: 12px;
  }
`;

export const Name = styled.h3`
  width: 100px;
  font-size: 16px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  color: ${C.colorGrey2};
  font-size: 14px;
  margin: 8px 0px 8px 5px;
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
  background: ${(props) => props.color};
  border-radius: 18px;
  margin: 4px;
  h4 {
    margin: 0px 13px 0px 13px;
    font-size: 13px;
    font-weight: 700;
    color: ${C.colorWhite};
  }
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Divider = styled.hr`
  border-bottom: 1px solid ${C.colorGrey2};
  margin: 12px 0px 12px 0px;
`;

export const ReviewBox = styled.div`
  margin-bottom: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${C.colorWhite};
  border-radius: 1.8rem;
  width: 100%;
  padding: 13px;
  color: ${C.colorGrey2};
  h4 {
    font-size: 1.2rem;
    font-weight: 700;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: -2.8rem;
    left: 1px;
    height: 2.8rem;
    width: 1.4rem;
    border-top-left-radius: 50%;
    background: rgb(0 0 0 / 0%);
    filter: drop-shadow(-8px 11px 9px rgba(0, 0, 0, 0.16));
  }
  &:before {
    box-shadow: -0.1rem -1.9rem 0 0 #ffff;
    border-top-left-radius: 33%;
  }
`;

export const CarModel = styled.div`
  position: fixed;
  top: 214px;
  right: 52px;
  display: flex;
  justify-content: flex-end;
  h5 {
    font-size: 10px;
    color: ${C.colorGrey2};
  }
`;

export const OrdersImages = styled.img`
  margin-right: 5px;
  width: 44px;
  height: 34px;
`;

export const StarBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-bottom: 5px;
  h3 {
    font-size: 16px;
    color: ${C.colorGrey2};
    font-weight: 800;
    margin: 0px 8px 0px 12px;
  }
`;
export const AboutMe = styled.div`
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  align-items: center;
  background-color: ${C.colorWhite};
  border-radius: 1.8rem;
  width: 100%;
  padding: 13px;
  color: ${C.colorGrey2};
  h4 {
    font-size: 1.5rem;
    font-weight: 700;
    word-break: break-all;
  }
`;
