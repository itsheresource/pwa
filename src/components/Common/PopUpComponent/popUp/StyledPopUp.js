// Utils
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import * as C from 'scss/colors';

const StyledPopUp = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})`
  color: ${C.colorWhite};
  margin-top: 2.5rem;

  .Toastify__close-button {
    color: ${C.colorWhite};
    opacity: 1;
  }

  .Toastify__toast-body {
    color: ${C.colorWhite};
  }

  .Toastify__toast-body > div {
    width: 100%;
  }

  .Toastify__toast {
    width: 90%;
    margin-left: 5%;
    box-shadow: none;
    border-radius: 2rem;
    padding: 1rem;
    margin: 1rem;
    width: calc(100% - 2rem);
  }
  // yoyo

  .Toastify__toast--success {
    background-color: ${C.buttonGreen};
  }

  .Toastify__toast--warning {
    background-color: ${C.colorYellowToast};
  }

  .Toastify__toast--error {
    background-color: ${C.colorRedToast};
  }

  .Toastify__toast--info {
    background-color: ${C.colorBlueToast};
  }

  .Toastify__toast--default {
    background-color: ${C.colorBlueToast};
  }
`;

export default StyledPopUp;
