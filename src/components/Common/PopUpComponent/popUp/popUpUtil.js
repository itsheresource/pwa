import React from 'react';

// Utils
import { toast } from 'react-toastify';
import * as C from 'scss/colors';

// Components
import * as S from '../PopUpStyledComponents';
import PopUpComponent from 'components/Common/PopUpComponent/PopUpComponent';
import CloseSvg from 'assets/icons/CloseSvg';

export function popUpUtil(
  type,
  message,
  confirmButtonText,
  confirmButtonOnClick,
  autoClose = 3000
) {
  const theCloseButton = ({ closeToast }) => (
    <S.ButtonContainer>
      <button onClick={closeToast}>
        <CloseSvg fill={C.colorWhite} width={32} height={32} />
      </button>
    </S.ButtonContainer>
  );

  const popUpUI = (
    <PopUpComponent
      type={type}
      message={message}
      confirmButtonText={confirmButtonText}
      confirmButtonOnClick={confirmButtonOnClick}
    />
  );

  const popUpConfig = {
    position: 'top-center',
    hideProgressBar: true,
    autoClose,
    closeButton: theCloseButton,
  };

  if (message) {
    switch (type) {
      case 'success':
        toast.success(popUpUI, popUpConfig);
        break;
      case 'info':
        toast.info(popUpUI, popUpConfig);
        break;
      case 'warning':
        toast.warning(popUpUI, popUpConfig);
        break;
      case 'error':
        toast.error(popUpUI, popUpConfig);
        break;
      default:
        toast(popUpUI, popUpConfig);
    }
  }
}
