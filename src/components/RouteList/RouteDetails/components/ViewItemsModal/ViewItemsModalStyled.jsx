import * as C from 'scss/colors';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9000;
  backdrop-filter: blur(4px);
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${C.primaryOrange};
  border-radius: 17px 17px 0px 0px;
  padding: 0.4rem;
  h4 {
    color: ${C.colorWhite};
    font-size: 1.8rem;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  background: ${C.colorWhite};
  border-radius: 17px;
  height: 40%;
  overflow: auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
  overflow: auto;
  justify-content: flex-start;
  flex: 1;
`;

export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${C.colorWarmGrey};
`;

export const Subtitle = styled.h5`
  color: ${C.colorGrey1};
  font-size: 1.2rem;
`;

export const ItemName = styled.div`
  width: 40%;
`;
export const Hr = styled.div`
  border: 0.5px solid #000;
  width: 100%;
  opacity: 0.2;
`;
export const Quantity = styled.h4`
  color: ${C.primaryOrange};
  font-weight: 700;
`;

export const Close = styled.h4`
  color: ${C.primaryOrange};
  font-weight: 700;
  align-self: center;
  margin-bottom: 10px;
`;
export const ImageContainer = styled.div`
  width: 25%; 
`;
export const ItemBox = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
