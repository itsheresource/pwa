import React from 'react';
import * as S from './NotificationPopupStyled';
// Utils
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
// Icons
import infoToastIcon from 'assets/icons/infoToastIcon.svg';

const popUpConfig = {
  position: 'top-center',
  hideProgressBar: true,
  autoClose: 4000,
};
const textContent = (title, body) => {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <S.IconContainer>
          <img src={infoToastIcon} alt='Icon' />
        </S.IconContainer>
        <div className='w-full'>
          <h4>{title}</h4>
          <hr />
          <S.Body>{body}</S.Body>
        </div>
      </div>
      <S.Button>
        <Link to={AVAILABLE_ROUTES.NOTIFICATIONS}>View more</Link>
      </S.Button>
    </div>
  );
};
function NotificationPopup(title, body) {
  return toast.info(textContent(title, body), popUpConfig);
}
NotificationPopup.propTypes = {
  body: PropTypes.string,
  title: PropTypes.string,
};

export default NotificationPopup;
