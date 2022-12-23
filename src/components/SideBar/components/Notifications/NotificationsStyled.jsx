// Utils
import * as C from 'scss/colors';
import styled from 'styled-components';
import { notificationColors } from 'utils/notificationColors';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 4000;
`;
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  h4 {
    color: #fff;
    font-size: 23px;
  }
`;
export const BackIcon = styled.img`
  width: 8rem;
  margin-left: 40px;
`;
export const NotificationIcon = styled.div`
  margin-right: 60px;
`;
export const HeaderContainer = styled.div`
  position: relative;
  background: ${C.colorBlueMedium};
  border-radius: 0 0 3rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  height: 8rem;
  &:after {
    content: '';
    position: absolute;
    bottom: -3.4rem;
    left: 0;
    height: 3.4rem;
    width: 3.3rem;
    border-top-left-radius: 50%;
    background: #f5f5f5;
  }
  &:after {
    box-shadow: -0.5rem -1.7rem 0 0 ${C.colorBlueMedium};
  }
`;
export const ContentContainer = styled.div`
  padding: 1rem 3rem 1rem 3rem;
  display: flex;
  flex-direction: column;
`;
export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  h4 {
    display: flex;
    align-items: center;
    color: ${C.colorWarmGrey};
    opacity: 77%;
    font-weight: 700;
    font-size: 14px;
  }
`;
export const MarkAll = styled.h4`
  color: ${C.colorWarmGrey};
  opacity: 77%;
  font-weight: 700;
  font-size: 14px;
`;

export const Divider = styled.hr`
  border: 1px solid rgb(191, 187, 187);
  width: 100%;
  opacity: 0.6;
`;
export const NotificationsContainer = styled.div`
  overflow: auto;
  height: 51rem;
  margin-top: 10px;
`;

//NoticeBox
export const NoticeBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px 12px 0px 12px;
`;
export const Status = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => notificationColors(props.type)};
`;
export const Description = styled.h4`
  font-size: 11px;
  opacity: 77%;
  font-weight: 700;
  padding: 8px 1rem 1rem 0rem;
  color: ${C.colorGrey3};
`;
export const Date = styled.h4`
  color: ${C.colorWarmGrey};
  font-weight: 700;
  font-size: 10px;
  white-space: nowrap;
`;
export const NoticeContent = styled.div`
  border-bottom: 1px solid rgb(232, 232, 232);
  width: 100%;
`;

export const Footer = styled.div`
  background: rgb(232 230 230);
  width: 100%;
  display: flex;
  justify-content: center;
  height: 14rem;
`;
export const UnreadNumber = styled.span`
  color: ${C.primaryOrange};
  font-size: 20px;
  margin-left: 8px;
`;
