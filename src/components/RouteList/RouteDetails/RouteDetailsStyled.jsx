import styled from 'styled-components';
import * as C from 'scss/colors';

export const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 3.5rem;
  height: ${(props) => (props.isOpenHeight ? '80%' : '50%')};
  z-index: 102;
  transition: all 0.3s ease-out;
  width: ${(props) => (props.isOpenWidth ? '96%' : '4%')};
  background: ${C.colorWarmGrey};
  color: white;
  border-radius: 0px 16px 16px 0px;
  justify-content: flex-end;
  display: flex;

  &::after {
    position: absolute;
    content: '';
    background: rgb(0 0 0 / 0%);
    bottom: -4rem;
    height: 4rem;
    width: ${(props) => (props.isOpenWidth ? '96%' : '4%')};
    left: -0.6rem;
    border-radius: 4rem 0 0 0;
  }

  &::after {
    box-shadow: -1.1rem -2rem 0 0 #8a8989;
  }
  &::before {
    position: absolute;
    content: '';
    background: rgb(0 0 0 / 0%);
    bottom: 100%;
    height: 4rem;
    width: ${(props) => (props.isOpenWidth ? '96%' : '4%')};
    left: -0.6rem;
    border-radius: 0 0 0 4rem;
  }
  &::before {
    box-shadow: -0.1rem 2rem 0 0 #8a8989;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 7px 0px 7px;
  overflow: hidden;
  flex-grow: 1;
  justify-content: space-between;
  width: ${(props) => (props.isOpenWidth ? '96%' : '4%')};

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 125px;
    border-radius: 0px 16px 0px 0px;
    background: #8a8989;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: ${(props) => !props.isDelivered && '0'};
    right: ${(props) => props.isDelivered && '0'};
    bottom: 0;
    width: ${(props) => (props.isDelivered ? '50%' : '100%')};
    height: 48px;
    border-radius: 0px 0px 16px 0px;
    background: ${(props) =>
      props.isDelivered ? 'rgba(190, 194, 204, 0.4)' : '#8a8989'};
    z-index: 1;
  }
`;
export const DetailsContent = styled.div`
  padding: 1rem;
  flex: 1;
  overflow: auto;
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    border-radius: 0px 0px 16px 0px;
    background: #8a8989;
    z-index: 1;
  }
`;

export const RouteCardHr = styled.hr`
  color: #bfbbbb;
  width: 100%;
  opacity: 0.3;
`;
export const RouteCardHrBottom = styled.hr`
  color: #bfbbbb;
  width: 90%;
`;

export const RouteDetailsButton = styled.button`
  color: ${(props) =>
    props.status === 'Ongoing' || props.status === 'Schedule'
      ? C.colorWhite
      : C.colorLightGreen};
  font-size: 15px;
  padding: 0rem 1.5rem 0rem 0rem;
  font-weight: 700;
  display: flex;
  justify-content: flex-end;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 0rem 0rem 4rem;
  width: 100%;
  z-index: 2;
  h2 {
    background-color: ${(props) =>
      !props.isDelivered && 'rgba(190, 194, 204, 0.4)'};
    padding: ${(props) =>
      props.isDelivered ? '2.5px 40px 2.5px 14px' : '2.5px 14px 2.5px 14px'};
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    font-size: 14px;
    opacity: 40%;
  }
`;

export const PhoneIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${C.colorLightGreen};
  width: 34px;
  height: 34px;
  border-radius: 7px;
  margin-bottom: 20px;
`;

export const Container = styled.div`
  color: white;
  background-color: ${C.colorWarmGrey};
  box-sizing: border-box;
  border-radius: 0 2rem 2rem 0;
  height: 100%;

  &::after {
    position: absolute;
    content: '';
    background: rgb(0 0 0 / 0%);
    bottom: -4rem;
    height: 4rem;
    width: ${(props) => (props.isOpenWidth ? '96%' : '4%')};
    left: -0.6rem;
    border-radius: 4rem 0 0 0;
    transition: all 0.8s ease-out;
  }
  &::after {
    box-shadow: -1.1rem -2rem 0 0 #8a8989;
    width: 100%;
  }
  &::before {
    position: absolute;
    content: '';
    background: rgb(0 0 0 / 0%);
    bottom: 100%;
    height: 4rem;
    width: ${(props) => (props.isOpenWidth ? '96%' : '4%')};
    left: -0.6rem;
    border-radius: 0 0 0 4rem;
    transition: bottom 0.8s ease-out;
  }
  &::before {
    box-shadow: -0.1rem 2rem 0 0 #8a8989;
  }
`;
export const SliderButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: ${C.colorGrey1};
  height: 100%;
  box-sizing: border-box;
  border-radius: 0 2rem 2rem 0;
  bottom: 0;
  margin-right: 7px;
`;
export const Dot = styled.h1`
  font-size: 1.6rem;
  font-weight: 900;
`;
export const RefreshBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 17px;
  background: ${(props) =>
    props.isUpdateLoading ? C.colorGrey4 : C.colorWhite};
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
  width: 90%;
  height: 5%;
  top: 75px;
  right: 20px;
  position: fixed;
`;
