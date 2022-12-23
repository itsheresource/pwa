import styled from 'styled-components';
import * as C from 'scss/colors';

export const OverlayViewContentContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 2rem;
  width: 100%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
`;

export const Content = styled.div`
  max-width: 25rem;
  padding: 1rem 2rem;
`;
export const ContentOngoing = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 8rem;
  height: 2.5rem;
  padding: 1rem;
`;
export const ColoredSectionOngoing = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  background-color: ${(props) =>
    props.isCompleted === 1 && props.type === 'drop'
      ? C.colorLightGreen
      : props.type === 'pickup'
      ? 'rgb(104, 157, 221)'
      : 'rgb(255, 103, 0)'};
  border-radius: 0 2rem 2rem 0;
  color: ${C.colorWhite};
  font-weight: 700;
`;

export const ColoredSection = styled.div`
  width: 6rem;
  background-color: ${(props) =>
    props.type === 'pickup' ? 'rgb(104, 157, 221)' : 'rgb(255, 103, 0)'};
  border-radius: 0 2rem 2rem 0;
`;

export const Span = styled.span`
  font-size: 1.6rem;
  color: ${C.colorBlueMedium};
  text-overflow: ellipsis;
`;
