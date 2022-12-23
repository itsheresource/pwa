import styled from 'styled-components';
import * as C from 'scss/colors';

// Components
import { MainBox } from 'scss/ComponentsUsedFrequently';

export const VehiclesParentContainer = styled(MainBox)`
  height: calc(100vh - 37rem);
  margin: 0 0 0.8rem;
  padding: 1rem;
`;

export const VehiclesBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`;

export const VehicleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.isActive ? '123px' : '100px')};
  width: 96%;
  background-color: ${(props) =>
    props.isActive ? C.selectedGray : C.notSelectedGray};
  border: ${(props) =>
    props.isActive ? `2px solid ${C.primaryOrange}` : 'none'};
  border-radius: 12px;
  margin-top: 1rem;
  box-shadow: ${(props) =>
    props.isActive ? '0px 0px 10px 0px rgba(0, 0, 0, 0.4)' : 'none'};
`;

export const VehicleImage = styled.img`
  border-radius: 1.5rem;
  transition: all 0.2s ease-out;
  transform: ${(props) => (props.isCurrentSlide ? 'scale(0.8)' : 'scale(0.7)')};
  width: 50%;
`;

export const Span = styled.span`
  color: rgb(139, 136, 136);
`;

export const SpanSelected = styled.span`
  font-size: 2.5rem;
  font-weight: bolder;
  color: rgb(139, 136, 136);
`;

export const SubTotal = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  color: rgb(139, 136, 136);
  margin-right: 5px;
`;

export const VehicleName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border-radius: 14px 0px 0px 14px;
  padding: 1rem;
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -1px;
    bottom: 0;
    width: 50%;
    height: 100%;
    border-radius: 12px 0 0 12px;
    pointer-events: none;
    background-color: ${(props) =>
      props.isActive ? C.primaryOrange : C.selectedGray};
  }
  h4 {
    text-align: center;
    align-self: center;
    font-size: 1.6rem;
    font-weight: ${(props) => (props.isActive ? 800 : 600)};
    color: ${(props) => (props.isActive ? ' #fff' : C.colorWarmGrey)};
    z-index: 1;
  }
  h3 {
    text-align: center;
    align-self: center;
    font-size: 1.6rem;
    font-weight: ${(props) => (props.isActive ? 800 : 900)};
    color: ${(props) => (props.isActive ? ' #fff' : C.colorWarmGrey)};
    z-index: 1;
  }
`;
