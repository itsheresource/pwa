import styled from 'styled-components';
import { MainBox, RouteFlowContainer } from 'scss/ComponentsUsedFrequently';
import * as C from 'scss/colors';

export const DropDetailsContainer = styled(RouteFlowContainer)`
  padding: 1rem 4rem 3rem;
  padding-bottom: 10rem;
  font-weight: 600;
`;

export const DropDetailsBox = styled(MainBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => (props.chosen ? '#689DDD' : 'white')};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
  margin: 0 0 2rem;
  padding: 2rem;
  border-radius: 2rem;
  font-size: 1.8rem;
  transition: all 0.2s ease-out;
`;

export const IconContainer = styled.div`
  margin-bottom: 1rem;
`;

export const Icon = styled.img`
  height: 6rem;
  width: 6rem;
  filter: ${(props) => (props.chosen ? 'invert(1)' : 'invert(0)')};
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffff;
  border: ${(props) => (props.chosen ? '1px solid' : 'none')};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
  margin: 0 0 2rem;
  padding: 2rem;
  border-radius: 2rem;
  font-size: 1.8rem;
  transition: all 0.2s ease-out;
`;

export const Title = styled.span`
  color: #8b8888;
  font-size: 2.2rem;
`;

export const Description = styled.span`
  color: rgba(139, 136, 136, 0.4);
  font-size: 1.6rem;
`;

export const Text = styled.span`
  color: ${(props) => (props.chosen ? 'white' : '#8b8888')};
  font-size: 2rem;
`;

export const InfoIcon = styled.div`
  align-self: flex-end;
`;

export const InformationText = styled.h4`
  font-size: 14px;
  color: ${C.colorWarmGrey};
  width: 77%;
  margin-left: 15px;
  overflow: auto;
  height: 60px;
  overflow: scroll;
`;

export const GotIt = styled.h4`
  font-size: 16px;
  color: ${C.primaryOrange};
  align-self: flex-end;
  margin-right: 20px;
  margin-top: 10px;
`;

export const InformationBox = styled(MainBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
  padding: 10px;
  border-radius: 2rem;
  position: fixed;
  left: 20px;
  right: 20px;
  z-index: 1000;
`;
export const ExtraHelperContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
