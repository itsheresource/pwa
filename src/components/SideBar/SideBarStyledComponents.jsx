import styled from 'styled-components';
import * as C from 'scss/colors';

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
`;

export const Container = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  width: ${(props) => (props.isOpenEditMode ? '100%' : '80%')};
  background: ${C.colorWhite};
  z-index: 2000;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  transition: width 1s;
`;

export const HeaderContainer = styled.div`
  position: relative;
  background: ${C.primaryOrange};
  border-radius: 0 0 3rem 0;
  height: 39%;
  &:after {
    content: '';
    position: absolute;
    bottom: -3.4rem;
    left: 0;
    height: 3.4rem;
    width: 3.3rem;
    border-top-left-radius: 50%;
    background: ${C.colorWhite};
  }
  &:after {
    box-shadow: -0.5rem -1.7rem 0 0 ${C.primaryOrange};
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: flex-start;
  padding: 3rem 0rem 3rem 4rem;
}
`;

export const EditProfileButton = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin-right: 20px;
  color: ${C.colorWhite};
  opacity: 68%;
  h5 {
    font-size: 12px;
    font-weight: 700;
  }
`;

export const MenuItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 19px 29px 6px 39px;
`;

export const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 1px solid ${C.colorGrey3};
  margin-bottom: 10px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 1.1rem;
`;
export const ItemText = styled.h3`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  color: ${C.colorWarmGrey};
`;

export const ItemSubText = styled.h5`
  display: flex;
  font-size: 1.2rem;
  opacity: 0.4;
  white-space: noWrap;
`;

export const Avatar = styled.div`
  border-radius: 20%;
  border: 0.4rem solid ${C.colorWhite};
  width: 51px;
  height: 51px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${C.colorBlack};
`;

export const InputNumber = styled.h3`
  font-size: 1.6rem;
`;

export const Divider = styled.div`
  border: 0.1rem solid ${C.colorGrey1};
  width: 100%;
  margin-bottom: 1rem;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${C.colorWhite};
`;

export const InfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
  h5 {
    font-size: 10px;
    font-weight: 700;
    opacity: 0.4;
  }
  h3 {
    font-size: 12px;
    font-weight: 700;
  }
`;

export const BlackAnimation = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;

export const IconContainer = styled.div`
  border-radius: 12px;
  box-shadow: 0 0 16px 0 rgba(51, 51, 51, 0.16);
  width: 40px;
  height: 40px;
  padding: 6px;
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const NotificationCounter = styled.h5`
  position: absolute;
  background: ${C.colorMarker};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  margin-left: 12px;
  margin-top: -5px;
  padding: 0px 5px 0px 5px;
`;

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow: auto;
`;

export const ItsHereLogo = styled.img`
  align-self: center;
  margin-right: 30px;
  width: 38px;
`;

export const CustomerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const EditAvatarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

export const EditIconContainer = styled.div`
  position: relative;
  top: 63px;
  z-index: 1;
`;

export const AvatarEditInfo = styled.div`
  border-radius: 20%;
  border: 0.4rem solid ${C.colorWhite};
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${C.colorBlack};
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageSelected = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 20%;
`;

export const BackIcon = styled.img`
  width: 8rem;
`;

export const LogoContainer = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 20px;
`;

export const CustomerName = styled.div`
  display: flex;
  flex-direction: column;
  h5 {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-top: 10px;
  }
`;

export const SignOutButton = styled.button`
  width: 74px;
  height: 41px;
  border: 1px solid ${C.colorWarmGrey2};
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  color: ${C.colorWarmGrey2};
`;

export const SideBarProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20%;
`;
