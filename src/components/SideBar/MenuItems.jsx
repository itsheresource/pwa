import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Components
import * as S from './SideBarStyledComponents';
import * as C from 'scss/colors';

// Redux
import { push } from 'connected-react-router/immutable';

// Router
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';

//icons
import NotificationSvg from 'assets/icons/NotificationSvg';
import HeadphonesSvg from 'assets/icons/HeadphonesSvg';
import PaginationArrowSvg from 'assets/icons/PaginationArrowSvg.jsx';

// Utils
import PropTypes from 'prop-types';
import { signOut } from 'utils/signOutFunctions';
import { routePhaseRedirect } from 'utils/routePhaseRedirect';

export default function MenuItems({ setClose, menuCounterItems, unreadCount }) {
  const dispatch = useDispatch();
  const currentRoute = useSelector((state) => state.currentRoute);

  const counter = (menu) => {
    const routeStatus = menuCounterItems?.filter((item) =>
      item?.status === menu ? item?.count : null
    );
    return routeStatus[0]?.count;
  };

  return (
    <>
      <S.MenuContent>
        <S.MenuItems>
          <S.Item
            onClick={() => {
              routePhaseRedirect(currentRoute.routePhase);
              setClose();
            }}
          >
            <S.Title>
              <div className='w-30'>
                <S.ItemText>Home</S.ItemText>
              </div>
            </S.Title>
          </S.Item>
          <S.Item
            onClick={() => {
              dispatch(push(`${AVAILABLE_ROUTES.ROUTE_LIST}/Schedule`));
              setClose();
            }}
          >
            <S.Title>
              <div className='w-28'>
                <S.ItemText>Scheduled</S.ItemText>
                {/* TODO:should be used the proper text. */}
                {/* <S.ItemSubText>Lorem ipsum</S.ItemSubText> */}
              </div>
              <span className='ml-4'>
                <PaginationArrowSvg stroke={C.colorGrey2} width={15} />
              </span>
            </S.Title>
            <S.InputNumber>{counter('Schedule')}</S.InputNumber>
          </S.Item>
          <S.Item
            onClick={() => {
              dispatch(push(`${AVAILABLE_ROUTES.ROUTE_LIST}/Ongoing`));
              setClose();
            }}
          >
            <S.Title>
              <div className='w-28'>
                <S.ItemText>Ongoing</S.ItemText>
                {/* <S.ItemSubText>Lorem ipsum</S.ItemSubText> */}
              </div>
              <span className='ml-4'>
                <PaginationArrowSvg stroke={C.colorGrey2} width={15} />
              </span>
            </S.Title>
            <S.InputNumber>{counter('Ongoing')}</S.InputNumber>
          </S.Item>
          <S.Item
            onClick={() => {
              dispatch(push(`${AVAILABLE_ROUTES.ROUTE_LIST}/Delivered`));
              setClose();
            }}
          >
            <S.Title>
              <div className='w-28'>
                <S.ItemText>Delivered</S.ItemText>
                {/* <S.ItemSubText>Lorem ipsum</S.ItemSubText> */}
              </div>
              <span className='ml-4'>
                <PaginationArrowSvg stroke={C.colorGrey2} width={15} />
              </span>
            </S.Title>
            <S.InputNumber>{counter('Delivered')}</S.InputNumber>
          </S.Item>
          <S.Item
            onClick={() => {
              dispatch(push(`${AVAILABLE_ROUTES.ROUTE_LIST}/Canceled`));
              setClose();
            }}
          >
            <S.Title>
              <div className='w-28'>
                <S.ItemText>Canceled</S.ItemText>
                {/* <S.ItemSubText>Lorem ipsum</S.ItemSubText> */}
              </div>
              <span className='ml-4'>
                <PaginationArrowSvg stroke={C.colorGrey2} width={15} />
              </span>
            </S.Title>
            <S.InputNumber>{counter('Canceled')}</S.InputNumber>
          </S.Item>
          <S.Item
            onClick={() => {
              dispatch(push(`${AVAILABLE_ROUTES.ROUTE_LIST}/Failed`));
              setClose();
            }}
          >
            <S.Title>
              <div className='w-28'>
                <S.ItemText>Failed</S.ItemText>
                {/* <S.ItemSubText>Lorem ipsum</S.ItemSubText> */}
              </div>
              <span className='ml-4'>
                <PaginationArrowSvg stroke={C.colorGrey2} width={15} />
              </span>
            </S.Title>
            <S.InputNumber>{counter('Failed')}</S.InputNumber>
          </S.Item>
        </S.MenuItems>
        <S.ButtonContainer>
          <S.SignOutButton onClick={() => signOut(dispatch)} className='mr-6'>
            Sign Out
          </S.SignOutButton>
          <S.IconContainer
            className='mr-6'
            onClick={() => {
              dispatch(push(AVAILABLE_ROUTES.SUPPORT));
              setClose();
            }}
          >
            <HeadphonesSvg fill={C.colorWarmGrey} />
          </S.IconContainer>
          <S.IconContainer
            onClick={() => {
              dispatch(push(AVAILABLE_ROUTES.NOTIFICATIONS));
              setClose();
            }}
          >
            {unreadCount > 0 && (
              <S.NotificationCounter>
                {unreadCount >= 100 ? '+99' : unreadCount}
              </S.NotificationCounter>
            )}
            <NotificationSvg fill={C.colorWarmGrey} />
          </S.IconContainer>
        </S.ButtonContainer>
      </S.MenuContent>
    </>
  );
}

MenuItems.propTypes = {
  setClose: PropTypes.func.isRequired,
  menuCounterItems: PropTypes.array,
  unreadCount: PropTypes.number,
};
