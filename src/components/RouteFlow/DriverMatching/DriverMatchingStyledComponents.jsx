import styled from 'styled-components';
import * as C from 'scss/colors';
import { MainBox, RouteFlowContainer } from 'scss/ComponentsUsedFrequently';

export const SearchingContainer = styled(RouteFlowContainer)``;

export const Searching = styled(MainBox)`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  transition: all 0.2s ease-out;
  height: ${(props) =>
    props.isOrderInPool && props.isEditingInfo
      ? '36rem'
      : !props.isEditingInfo
      ? '100%'
      : '50rem'};
`;

export const GifContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Gif = styled.img`
  transition: width 0.2s ease-out;
  width: ${(props) => (props.isEditingInfo ? '20rem' : '100%')};
`;

export const TitleContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 6rem;
`;

export const FindingTitle = styled.span`
  color: rgba(90, 86, 86, 0.5);
  font-size: 2.5rem;
`;

export const NotFoundTitle = styled.span`
  color: rgba(90, 86, 86, 0.5);
  font-size: 1.7rem;
`;

export const TryAgainButtonContainer = styled.div`
  margin-bottom: 2rem;
`;

export const TryAgainButton = styled.button`
  height: 4.5rem;
  width: 20rem;
  background-color: ${C.buttonGreen};
  border-radius: 4rem;
`;

export const TryAgainButtonText = styled.span`
  color: white;
  font-size: 2rem;
`;

export const EditAdditionalInfoButtonContainer = styled.div`
  margin-bottom: 2rem;
`;

export const EditAdditionalInfoButton = styled.button`
  background-color: transparent;
  border: none;
`;

export const EditAdditionalInfoButtonText = styled.span`
  color: rgb(10, 217, 121);
  font-weight: bold;
`;

export const CancelRouteButtonContainer = styled.div`
  margin-top: 0rem;
`;

export const CancelRouteButton = styled.button`
  background-color: transparent;
  border: none;
`;

export const CancelRouteButtonText = styled.span`
  color: rgb(116, 116, 116);
  text-decoration: underline;
`;

export const ChangeDateButtonContainer = styled.div`
  margin: 2rem 0;
`;

export const ChangeDateButton = styled.button`
  background-color: transparent;
  border: 2px solid ${C.colorBlueMedium};
  border-radius: 4rem;
  padding: 0.5rem 3rem;
`;

export const ChangeDateButtonText = styled.span`
  color: ${C.colorBlueMedium};
  font-weight: 700;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const Button = styled.button`
  background-color: ${(props) => props.color};
  color: ${C.colorWhite};
  border-radius: 2.4rem;
  border: 0;
  padding: 0.8rem;
  width: 90%;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  font-size: 1.9rem;
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: ${C.colorBlueMedium};
  }
`;

export const iconHeader = styled.img`
  width: 20px;
  stroke: red;
`;

export const InfoContainer = styled(MainBox)``;
