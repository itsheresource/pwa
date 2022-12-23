import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router/immutable';

//Components
import * as S from './NotificationsStyled';
import * as C from 'scss/colors';
import NoticeBox from './NoticeBox';

//api
import {
  loadAllNotificationsApi,
  setAllNotificationsToReadApi,
} from 'apis/notifications/notifications';
import { getCustomerDetails } from 'apis/getCustomerDetails/getCustomerDetails';

// Utils
import PropTypes from 'prop-types';
import { dateStringGenerator } from 'utils/dateStringGenerator';

//icons
import backButton from 'assets/icons/backButton.svg';
import NotificationSvg from 'assets/icons/NotificationSvg';

// Redux
import Pagination from 'components/Common/Pagination/Pagination';

//hook
import usePagination from 'customHooks/usePagination';

export default function Notifications() {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const [notificationData, setNotificationData] = useState([]);
  const [unreadCount, setUnreadCount] = useState(
    userInfo?.unreadNotificationCount
  );

  //Hook for pagination
  const { next, prev, jump, currentData, currentPage, maxPage } = usePagination(
    notificationData,
    10
  );

  useEffect(() => {
    loadAllNotificationsApi()
      .then((res) => setNotificationData(res))
      .catch((err) => console.warn(err));
  }, []);

  const setAllRead = () => {
    setAllNotificationsToReadApi()
      .then(
        (res) => res?.data?.status && setUnreadCount(0),
        getCustomerDetails()
      )
      .catch((err) => console.warn(err));
  };

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.TitleContainer>
          <S.BackIcon
            src={backButton}
            alt='back'
            onClick={() => dispatch(goBack())}
          />
          <h4>Notifications</h4>
          <S.NotificationIcon>
            <NotificationSvg fill='#fff' width={32} />
          </S.NotificationIcon>
        </S.TitleContainer>
      </S.HeaderContainer>
      <S.ContentContainer>
        <S.HeaderBox>
          <h4>
            Latest:
            <S.UnreadNumber>{unreadCount}</S.UnreadNumber>
          </h4>
          <S.MarkAll onClick={() => setAllRead()}>Mark all as read</S.MarkAll>
        </S.HeaderBox>
        <S.Divider />
        <S.NotificationsContainer>
          {currentData()?.map((item, idx) => (
            <NoticeBox
              key={idx}
              title={item?.title}
              date={dateStringGenerator(item?.createdAt)}
              message={item?.message}
              status={item?.status}
              type={item?.type}
            />
          ))}
        </S.NotificationsContainer>
      </S.ContentContainer>
      <S.Footer>
        <Pagination
          currentPage={currentPage}
          maxPage={maxPage}
          next={next}
          prev={prev}
          jump={jump}
        />
      </S.Footer>
    </S.Container>
  );
}
Notifications.propTypes = {
  setClose: PropTypes.func,
  notificationData: PropTypes.array,
};
