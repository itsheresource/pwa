// Utils
import styled from 'styled-components';
import { MainBox } from 'scss/ComponentsUsedFrequently';
import * as C from 'scss/colors';

export const FindLocationButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const FindLocationButton = styled.button`
  padding: 0 1rem;
  background-color: transparent;
`;

export const SuggestionsContainer = styled(MainBox)`
  position: absolute;
  top: 24rem;
  left: 0;
  height: 28rem;
  width: ${(props) =>
    props.isShowNextButton ? 'calc(80%)' : 'calc(100% - 2rem)'};
  box-sizing: border-box;
  padding: 0;
  background-color: white;
  z-index: 1;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
`;

export const Icon = styled.img`
  width: 3rem;
`;

export const Input = styled.input`
  background-color: transparent;
  width: 100%;
  padding: 0.6rem;
  -webkit-appearance: searchfield;
  &:focus {
    outline: 1px solid #1775e1;
    border-radius: 8px;
  }
  ::placeholder {
    color: white;
    opacity: 0.4;
  }

  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 25px;
    width: 25px;
    margin-right: 0.1rem;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");
    cursor: pointer;
    fill: white;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 5rem);
`;

export const InputSection = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  height: 100%;
`;

export const LocationContainer = styled.div`
  display: flex;
  height: 50%;
`;

export const Suggestions = styled.div`
  height: 100%;
  margin: 2rem 0 3rem 6rem;
  padding-right: 2rem;
  max-height: 20rem;
  overflow: auto;
`;

export const SuggestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  color: #8a8787;
  border-bottom: 1px solid #d2d0d0;
  padding: 1rem 0;
`;

export const ArrowRight = styled.img`
  height: 1rem;
`;

export const Arrow = styled.img`
  height: 100%;
  width: 1.5rem;
`;

export const MainText = styled.p`
  font-size: 1.3rem;
  color: rgba(138, 135, 135, 0.5);
`;

export const SecondaryText = styled.p`
  font-size: 1.5rem;
  color: ${C.colorWarmGrey};
`;
