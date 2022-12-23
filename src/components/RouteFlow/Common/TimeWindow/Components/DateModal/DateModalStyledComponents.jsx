import { colorMarker } from 'scss/colors';
import styled from 'styled-components';

export const DatePickerContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;  
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;           /* Non-prefixed version, currently */  
`;

export const DatePickerWrapper = styled.div`
  position: absolute;
  top: -9.2rem;
  left: -2rem;
  display: flex;
  flex-direction: column;
  width: calc(100vw - 4rem);
  min-height: 50rem;
  background: #fff;
  box-shadow: 10px 10px 40px rgba(0,0,0,0.2);
  border-radius: 20px;
  overflow: hidden;
  padding: 25px 30px;
  z-index: 30;
`;

export const DatePickerHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 53px;
`;

export const DatePickerHeadButton = styled.div`
  width: 45px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
`;

export const DatePickerHeadButtonInner = styled.div`
  position: absolute;
  top:50%;
  left: 50%;
  height: 2rem;
  width: 2rem;
  margin-left: -17px;
  margin-top: -17px;
`;

export const DatePickerHeadButtonInnerArrow = styled.img`
  display: block;
  width: 2rem;
  height: 2rem;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: 2rem;
  margin-top: -4px;
  filter: invert(0.4);
`;

export const DatePickerHeadButtonInnerLeftArrow = styled(DatePickerHeadButtonInnerArrow)`
  transform: rotate(180deg);
`;

export const DatePickerHeadButtonInnerRightArrow = styled(DatePickerHeadButtonInnerArrow)`
  margin-left: -2rem;
`;

export const DatePickerBody = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const DatePickerHeadContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const DatePickerHeadContainerYear = styled.div`
  width: 100%;
  font-size: 2.5rem;
  color: #666;
  font-weight: 200px;
  text-align: center;
`;

export const DatePickerHeadContainerMonth = styled.div`
  width: 100%;
  margin-right: 1rem;
  font-size: 2.5rem;
  color: #666;
  font-weight: 200px;
  text-align: center;
`;

export const Calender = styled.div` 
  position: relative;
  display: block;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

export const CalenderContainer = styled(Calender)` 
  width: 100%;
  height: 100%;
`;

export const CalenderContainerMonth = styled(Calender)` 
  height: 30px;
  width: 100%;
  font-family: Roboto;
  font-size: 16px;
  line-height: 30px;
  color: #666;
`;

export const CalenderContainerHead = styled(Calender)` 
  display: flex;
  height: 30px;
  width: 100%;
  margin-top: 10px;
`;

export const CalenderContainerHeadName = styled(Calender)` 
  width: 14.285%;
  height: 30px;
  line-height: 30px;
  font-weight: 700;
  color: #666;
  font-size: 9px;
  text-align: center;
`;

export const CalenderContainerBody = styled(Calender)` 
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 270px;
  width: 100%;
`;

export const CalenderDayContainer = styled(Calender)` 
  display: flex;  
  align-items: center;
  justify-content: center;
  width: 14.285%;
  height: 16.6666%;
  pointer-events: ${props => props.disabled ? 'none' : 'default'};
`;

export const CalenderDayContainerDay = styled(Calender)` 
  display: flex;  
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  font-size: 12px;
  font-weight: 300;
  color: #444;
  text-align: center;

  & > div{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    font-weight: 400;
    border-radius: 100%;
    font-size: 12px;
    color: ${props => (props.selected && !props.disabled) ? 'white' : props.disabled ? '#ddd' : '#444'};
    background-color: ${props => (props.selected && !props.disabled) ? colorMarker : 'white'}
  }
`;

export const ButtonsContainer = styled.div` 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;


export const Button = styled.button`
  height: 4rem;
  width: 50%;
  border: none;
  font-size: 2rem;
  border-radius: 2rem;
`;

export const CancelButton = styled(Button)`
  color: rgb(116, 116, 116);
  background-color: transparent;
`;

export const ApplyButton = styled(Button)`
  color: white;
  background-color: ${colorMarker};
`;