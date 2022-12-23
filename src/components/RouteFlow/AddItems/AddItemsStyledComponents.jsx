import styled from 'styled-components';
import * as C from 'scss/colors';

export const AddItemsContainer = styled.div`
  margin: 9rem 0 0;
  padding: 1rem 2rem;
  height: calc(100% - 9rem);
  width: 100%;
  overflow: auto;
  background-color: #f5f5f5;
  padding-bottom: 10rem;
`;

export const AddItemsCategoryBox = styled.div`
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
  margin: 0 0 2rem;
  padding: 0.8rem;
  border-radius: 2rem;
  font-size: 1.8rem;
`;

export const HeaderContainer = styled.div`
  position: relative;
  height: ${(props) => (props.isOpen ? '1rem' : '1rem')};
  padding: 0 0 0 1rem;
  transition: height 0.5s ease-out;
  background: rgba(116, 116, 116, 0.65);
  border-radius: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

export const HeaderTitle = styled.h3`
  color: ${C.colorWhite};
  font-weight: 700;
  margin-left: 10px;
`;

export const Circle = styled.div`
  background: ${C.primaryOrange};
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

export const CollapseContainer = styled.div`
  height: 20rem;
  margin: 1rem;
  overflow: auto;
  background-color: white;
  display: flex;
`;

export const ItemsBox = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0rem 2rem 0rem;
  margin: 20px 0px 22px 0px;
`;

export const ItemsTitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ItemTitle = styled.span`
  color: ${C.primaryOrange};
  opacity: 0.6;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
`;

export const ItemsImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  margin: 1rem 0;
`;

export const ItemsImage = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
  border-radius: 1.5rem;
`;

export const ItemsNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlusMinusBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  margin: 0 2rem;
  border-radius: 50%;
  color: ${C.colorWhite};
  background: ${C.colorDodgerBlue};
`;

export const PlusIcon = styled.div`
  font-size: 2.2rem;

  &:before {
    content: '+';
  }
`;

export const MinusIcon = styled.div`
  font-size: 1.8rem;

  &:before {
    content: '-';
  }
`;

export const ItemsNumber = styled.div`
  color: rgba(112, 112, 112, 0.9);
  font-weight: 700;
`;

export const SliderContainer = styled.div`
  padding: 11px 16px 11px 16px;
`;
