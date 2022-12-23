import React from 'react';

// Components
import * as S from './PopUpStyledComponents';

// Utils
import PropTypes from 'prop-types';

// Icons
import infoToastIcon from 'assets/icons/infoToastIcon.svg';
import errorToastIcon from 'assets/icons/errorToastIcon.svg';
import successfulToastIcon from 'assets/icons/successfulToastIcon.svg';
import warningToastIcon from 'assets/icons/warningToastIcon.svg';

const PopUpComponent = ({
  type,
  message,
  title,
  confirmButtonText,
  confirmButtonOnClick,
}) => {
  const renderIcon = () => {
    if (type === 'success') {
      return <img src={successfulToastIcon} alt='Icon' />;
    } else if (type === 'info') {
      return <img src={infoToastIcon} alt='Icon' />;
    } else if (type === 'warning') {
      return <img src={warningToastIcon} alt='Icon' />;
    } else if (type === 'error') {
      return <img src={errorToastIcon} alt='Icon' />;
    }
  };

  return (
    <S.PopUpContainer type={type}>
      <S.IconContainer>{renderIcon()}</S.IconContainer>
      <S.MessageContainer>
        {title && (
          <div>
            <S.Title>{title}</S.Title>
          </div>
        )}
        <div>
          <p>{message}</p>
        </div>
        {confirmButtonText ? (
          <S.ConfirmButton onClick={confirmButtonOnClick}>
            {confirmButtonText}
          </S.ConfirmButton>
        ) : null}
      </S.MessageContainer>
    </S.PopUpContainer>
  );
};

PopUpComponent.defaultProps = {
  title: undefined,
  buttonText: undefined,
  confirmButtonOnClick: undefined,
};

PopUpComponent.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
  confirmButtonText: PropTypes.string,
  confirmButtonOnClick: PropTypes.func,
};

export default PopUpComponent;
