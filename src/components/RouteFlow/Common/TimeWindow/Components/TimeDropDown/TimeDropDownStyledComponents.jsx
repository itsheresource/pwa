import styled from 'styled-components';

// Components
import { MainBox } from 'scss/ComponentsUsedFrequently';

export const TimeDropDownContainer = styled(MainBox)`
  position: absolute;
  bottom: -22rem;
  left: 0;
  display: flex;
  align-items: center;
  height: 20rem;
  width: 15rem;
  padding: 2rem 1rem;
  z-index: 20;
  overflow: hidden;
`;

export const TimeDropDownHours = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const TimeDropDownArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  height: 1.5rem;
  width: 1.5rem;
  z-index: 101;

  img{
    filter: invert(0.4);
  }
`;

export const Time = styled.div`
  color: ${props => props.selected ? 'rgb(116, 116, 116)' : 'rgb(139, 136, 136)'};
  font-size: ${props => props.selected ? '2.5rem' : '2rem'};
  transition: all 0.2s ease-out;
`;