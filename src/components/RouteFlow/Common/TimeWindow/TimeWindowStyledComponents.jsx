import styled from 'styled-components';

// Components
import { MainBox } from 'scss/ComponentsUsedFrequently';

export const TimeWindowHeaderContainer = styled.div`
  position: relative;
  height: 2.6rem;
  z-index: 1;
`;

export const TimeWindowHeader = styled.img`
  position: relative;
  transform: translateX(1rem);
  z-index: 1;
`;

export const TimeWindowHours = styled.div`
  position: absolute;
  top: 0;
  left: 5rem;
  color: white;
  z-index: 2;
`;

export const TimeWindowDetailsContainer = styled(MainBox)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 10;
  padding: 1.2rem;
  margin: 0 0 0.7rem;
  height: 9.3rem;
`;

export const DateContainer = styled.div`
  position: relative;
  border-right: rgba(112, 112, 112, 0.5) 1px solid;
  width: 25%;
`;

export const DateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 100%;
`;

export const TimeContainer = styled.div`
  position: relative;
  width: 75%;
`;

export const TimeButton = styled.button`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background-color: transparent;
  width: 100%;
`;

export const MonthNameText = styled.span`
  font-size: 1.4rem;
`;

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 1rem;
`;

export const ArrowIcon = styled.div`
  height: 100%;
  padding-top: 3rem;
`;

export const MonthDayText = styled.span`
  font-size: 2.8rem;
  color: #689ddd;
  font-weight: 600;
`;

export const TimeDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 2rem;
  width: 100%;
  padding-right: 1rem;
`;

export const StartTimeText = styled.span`
  color: rgba(139, 136, 136, 0.6);
  font-size: 1.4rem;
`;

export const StartTimeNumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TimeNumberText = styled.span`
  font-size: 2.8rem;
  color: rgb(139, 136, 136);
  font-weight: 600;

  @media (max-width: 350px) {
    font-size: 2.3rem;
  }
`;

export const DashContainer = styled.div`
  margin: 0 0.5rem;
`;

export const ArrowContainer = styled.div`
  padding-top: 1rem;
`;

export const Arrows = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  width: 2rem;
  padding: 0.5rem;
  border-radius: 2rem;
  background-color: rgba(116, 116, 116, 0.05);
`;
