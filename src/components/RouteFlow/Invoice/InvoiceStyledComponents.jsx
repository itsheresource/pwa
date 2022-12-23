import * as C from 'scss/colors';
import styled from 'styled-components';

export const InvoiceContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 9rem 0 0;
  padding: 1rem 2rem;
  width: 100%;
  background-color: #f5f5f5;
  overflow: auto;
`;

export const CardContent = styled.div`
  width: 100%;
  background: ${C.colorWhite};
  border-radius: 16px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
  padding: 18px;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  border-bottom: ${(props) =>
    props?.border ? '0.01px solid rgba(0,0,0, 0.2)' : 'none'};
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  height: ${(props) => (props.isOpenViewMore ? props.heightItems : '32rem')};
  transition: all 0.5s ease-out;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  padding: 3px 0 0 0;
`;

export const Items = styled.div`
  height: 100%;
  overflow: auto;
`;

export const DescriptionContainer = styled.div`
  width: calc(100% - 7.5rem);
`;

export const Description = styled.span`
  font-size: 1.6rem;
  font-weight: 800;
  color: ${C.colorGrey3};
  opacity: 0.7;
`;

export const Title = styled.h5`
  margin-top: 3px;
  font-size: 14px;
  opacity: 0.2;
  margin-bottom: 0.5rem;
  font-weight: 800;
`;

export const SubTitle = styled.h3`
  font-size: 14px;
  font-weight: 800;
  color: ${C.colorGrey3};
  opacity: 0.7;
`;

export const MoreIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: ${C.colorGrey1};
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  opacity: 0.2;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  min-width: 5rem;
  width: 5rem;
`;

export const ReverseIconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TotalCard = styled.div`
  position: relative;
  width: 70%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${C.colorWhite};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 16px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 17px;
    height: 100%;
    border-radius: 16px 0 0 16px;
    pointer-events: none;
    background: ${C.colorBlueMedium};
  }
`;

export const TotalContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  h4 {
    opacity: 70%;
    font-size: 11px;
  }
  h3 {
    color: ${C.colorMarker};
    font-size: 17px;
    font-weight: 800;
  }
`;

export const TextLink = styled.h3`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  width: 100%;
  color: ${C.colorMarker};
`;

export const PayCardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2rem;
  margin-bottom: 15rem;
`;

export const DiscountContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70px;
  margin-left: 1rem;
  flex-direction: column;
  background: ${C.colorWhite};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  padding: 0.9rem;
`;

export const PromoCodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Input = styled.input`
  width: 60%;
  background-color: #ffff;
  color: ${C.colorWarmGrey};
  border-bottom: 1px solid ${C.colorGrey1};
  &:focus {
    outline: none;
  }
`;

export const Total = styled.span`
  position: relative;
  font-weight: 800;
  color: ${C.primaryOrange};
  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background: ${C.primaryOrange};
    position: absolute;
    bottom: 0.7rem;
    left: 0;
    color: ${C.primaryOrange};
  }
`;

export const ViewMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  width: ${(props) => (props.isViewAllItems ? '100%' : '4rem')};
`;

export const ViewMoreButton = styled.button`
  background-color: transparent;
`;

export const ViewTextLink = styled.h3`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  font-size: 1.5rem;
  width: 100%;
  color: ${C.colorMarker};
  align-self: flex-end;
`;

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 20px;
  background-color: ${C.colorBackgroundGrey1};
`;

export const Button = styled.button`
  height: 5rem;
  width: 100%;
  background-color: ${C.primaryOrange};
  border: none;
  border-radius: 3rem;
  color: ${C.colorWhite};
  font-size: 2rem;
  transition: all 0.2s ease-out;
  z-index: 100;
  margin-top: 15px;
  &.disabled {
    background-color: ${C.colorGrey3};
    color: ${C.colorGrey1};
  }
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: ${C.colorBlueMedium};
    color: ${C.colorGrey1};
  }
`;

export const Iframe = styled.iframe`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  height: 95%;
  z-index: 1000;
`;

export const VehicleImg = styled.img`
  width: 9rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const AddressContainer = styled.div`
  height: 5rem;
  width: 100%;
`;

export const AddressSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TimeTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ViewButton = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: ${C.primaryOrange};
  margin-left: 5px;
`;
export const ArrowIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
  width: 1.6rem;
  height: 1.6rem;
`;

export const Promo = styled.h4`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 3px;
  font-size: 1.2rem;
  font-weight: 800;
  color: ${(props) => (props.applyMode ? C.colorGrey2 : C.primaryOrange)};
`;

export const PromoActionButton = styled.button`
  padding: 0px 9px 0px 9px;
  background-color: ${(props) =>
    props.action === 'apply' ? C.colorLightGreen : C.primaryOrange};
  border: none;
  border-radius: 3rem;
  color: ${C.colorWhite};
  font-size: 1.8rem;
  font-weight: 700;
  &.disabled {
    background-color: ${C.colorGrey3};
    color: ${C.colorGrey1};
  }
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: ${C.colorBlueMedium};
    color: ${C.colorGrey1};
  }
`;

export const ItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0.5rem;
`;
export const ItemText = styled.h4`
  width: 168px;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${C.colorBlueToast};
`;
export const QuantityText = styled.h4`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${C.colorBlueToast};
`;
export const Applied = styled.h4`
  font-size: 1.4rem;
  font-weight: 800;
  margin-left: 10px;
  color: ${C.colorLightGreen};
`;

export const DiscountPrice = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: ${C.colorLightGreen};
`;
