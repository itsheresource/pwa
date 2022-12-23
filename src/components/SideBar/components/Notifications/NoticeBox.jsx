import React from 'react';

//styled Components
import * as S from './NotificationsStyled';

// Utils
import PropTypes from 'prop-types';

export default function NoticeBox({
  status,
  date,
  message,
  title,
  type,
}) {
  return (
    <S.NoticeBoxContainer>
      <S.NoticeContent>
        <S.Status status={status} type={type}>
          {title}
        </S.Status>
        <S.Description>{message}</S.Description>
      </S.NoticeContent>
      <S.Date>{date}</S.Date>
    </S.NoticeBoxContainer>
  );
}
NoticeBox.propTypes = {
  date: PropTypes.string.isRequired,
  message: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
};
