import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//components
import * as S from './DropBoxStyledComponents';
import * as C from 'scss/colors';
import FormField from '../FormField/FormField';

//utils
import PropTypes from 'prop-types';
import { NormalizePhoneInput, removeDashes } from 'utils/NormalizePhoneInput';
import { push } from 'connected-react-router';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import handleSeparateName from 'components/RouteFlow/utils/handleSeparateName';

//icons
import CheckMarkSvg from 'assets/icons/CheckMarkSvg';
import ArrowUp from 'assets/icons/ArrowUp';
import ArrowDown from 'assets/icons/ArrowDown';
import NoteSvg from 'assets/icons/NoteSvg';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';
import { setAdditionalInfos } from 'apis/routeFlow/driverMatching';
import { updateCurrentRoute } from 'components/RouteFlow/_ducks/currentRoute/actions';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';

export default function DropBox({
  backgroundColor,
  icon,
  status,
  isOpen,
  onClick,
  order,
  form,
  setForm,
  handleSetAdditionalInfo,
}) {
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const currentRoute = useSelector((state) => state.currentRoute);
  const dispatch = useDispatch();
  const [isChipsClicked, setIsChipsClicked] = useState(false);
  const { ownerName, phone, unitNo } = userInfo;

  //For phone number format
  const [key, setKey] = useState('');
  const formatPhone = (e) => {
    const element = e.target;
    let caret = element.selectionStart;
    let value = element.value.split('');
    if (
      (caret === 4 || caret === 8) &&
      key !== 'Delete' &&
      key !== 'Backspace'
    ) {
      caret++;
    } else if ((caret === 3 || caret === 7) && key === 'Backspace') {
      value.splice(caret - 1, 1);
      caret--;
    } else if ((caret === 3 || caret === 7) && key === 'Delete') {
      value.splice(caret, 1);
    }
    // update caret for non-digits
    if (key.length === 1 && /[^0-9]/.test(key)) caret--;
    value = value
      .join('')
      // remove everything except digits
      .replace(/[^0-9]+/g, '')
      // limit input to 10 digits
      .replace(/(.{10}).*$/, '$1')
      // insert "-" between groups of digits
      .replace(/^(.?.?.?)(.?.?.?)(.?.?.?.?)$/, '$1-$2-$3')
      // remove  "-" at the end
      .replace(/-*$/, '');

    setForm({ ...form, phone: value });
    // "setTimeout" to update caret after setValue
    window.requestAnimationFrame(() => {
      element.setSelectionRange(caret, caret);
    });
  };

  const setAdditionalInfo = async () => {
    setLoading(true);
    const addresses = [
      {
        addressId: currentRoute.suborder.pickup[0]?.addressId,
        firstName: isChipsClicked
          ? handleSeparateName(ownerName).firstName
          : '',
        lastName: isChipsClicked ? handleSeparateName(ownerName).lastName : '',
        phone: isChipsClicked ? removeDashes(phone) : '',
        unitNo: isChipsClicked ? unitNo : '',
        buzzNo: '',
      },
      {
        addressId: currentRoute.suborder.drop_location[0]?.addressId,
        firstName: isChipsClicked
          ? handleSeparateName(ownerName).firstName
          : '',
        lastName: isChipsClicked ? handleSeparateName(ownerName).lastName : '',
        phone: isChipsClicked ? removeDashes(phone) : '',
        unitNo: isChipsClicked ? unitNo : '',
        buzzNo: '',
      },
    ];

    const body = {
      routeId: currentRoute._id,
      addresses,
    };
    try {
      const res = await setAdditionalInfos(body);
      if (res?.status) {
        dispatch(updateCurrentRoute(res.data));
        setLoading(false);
      } else {
        popUpUtil('error', res?.error_code);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      popUpUtil('error', err);
    }
  };

  useEffect(() => {
    if (isChipsClicked) {
      const { ownerName, phone, unitNo } = userInfo;
      setForm({
        ...form,
        fullName: ownerName,
        phone: removeDashes(phone),
        unitNo,
      });
      setAdditionalInfo();
    } else {
      setForm({});
    }
  }, [isChipsClicked]);

  return (
    <S.BoxContainer isOpen={isOpen} onClick={onClick}>
      {loading && <SpinnerLoading />}
      <S.Header background={backgroundColor}>
        <S.TitleContainer>
          <img src={icon} alt='' />
          <div>
            <h4>Add {status} information</h4>
            <S.ChipsContainer onClick={(e) => e.stopPropagation()}>
              <S.Chips
                isChipsClicked={isChipsClicked}
                onClick={() => setIsChipsClicked(!isChipsClicked)}
              >
                <h5>Im the {status}</h5>
                <S.IconSpan isChipsClicked={isChipsClicked}>
                  <CheckMarkSvg
                    fill={isChipsClicked ? C.colorWhite : C.colorGrey1}
                    width={50}
                  />
                </S.IconSpan>
              </S.Chips>
            </S.ChipsContainer>
          </div>
        </S.TitleContainer>
        <div>
          {isOpen ? (
            <ArrowUp stroke={C.colorWhite} opacity='1' />
          ) : (
            <ArrowDown stroke={C.colorWhite} opacity='1' />
          )}
        </div>
      </S.Header>
      <S.FormContainer onClick={(e) => e.stopPropagation()}>
        <FormField
          label='Full Name:'
          name='fullName'
          type='text'
          required
          value={form.fullName || ''}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          isValidation={!form.fullName}
          onBlur={handleSetAdditionalInfo}
        />
        <FormField
          label='Phone number:'
          name='phone'
          type='tel'
          maxLength={12}
          required
          value={NormalizePhoneInput(form.phone) || ''}
          onKeyDown={(e) => setKey(e.key)}
          onChange={(e) => formatPhone(e)}
          isValidation={
            !form.phone || NormalizePhoneInput(form?.phone)?.length < 12
          }
          onBlur={handleSetAdditionalInfo}
        />
        <FormField
          label='Unit number:'
          name='unitNo'
          type='number'
          value={form.unitNo || ''}
          onChange={(e) => setForm({ ...form, unitNo: e.target.value })}
          onBlur={handleSetAdditionalInfo}
        />
        <FormField
          label='Buzzer number:'
          name='buzzer'
          type='number'
          value={form.buzzer || ''}
          onChange={(e) => setForm({ ...form, buzzer: e.target.value })}
          onBlur={handleSetAdditionalInfo}
        />
        <S.InputButtonLabel
          onClick={() =>
            dispatch(
              push({
                pathname: `${AVAILABLE_ROUTES.DRIVER_MATCHING}${AVAILABLE_ROUTES.NOTES}`,
                search: `${currentRoute.suborder[order][0]._id}`,
              })
            )
          }
        >
          <NoteSvg fill={C.colorGrey3} />
        </S.InputButtonLabel>
      </S.FormContainer>
    </S.BoxContainer>
  );
}

DropBox.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  order: PropTypes.string.isRequired,
  form: PropTypes.shape({
    fullName: PropTypes.string,
    phone: PropTypes.string,
    unitNo: PropTypes.string,
    buzzer: PropTypes.string,
  }),
  setForm: PropTypes.func.isRequired,
  handleSetAdditionalInfo: PropTypes.func,
};
