import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router/immutable';

// Utils
import { NormalizePhoneInput, removeDashes } from 'utils/NormalizePhoneInput';

//components
import FormField from './FormField';
import { handleSendSupportMessage } from 'apis/support/support';
import TicketModal from './TicketModal';

//icon
import backButton from 'assets/icons/backButton.svg';
import HeadphonesSvg from 'assets/icons/HeadphonesSvg';

//Styled components
import * as S from './SupportStyled';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

export default function Support() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const [isLoading, setIsLoading] = useState();
  const [ticketNumber, setTicketNumber] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { phone, firstName, lastName, email } = userInfo;
  const [fieldsForm, setFieldsForm] = useState({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    orderNumber: '',
    email: email,
    message: '',
  });

  const handleChange = (value) => {
    setFieldsForm({ ...fieldsForm, phone: removeDashes(value) });
  };

  const submitSupportData = async () => {
    setIsLoading(true);
    try {
      const res = await handleSendSupportMessage(fieldsForm);
      if (res.status) {
        setTicketNumber(res?.ticketNumber);
        setIsOpenModal(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.warn(err);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitSupportData();
  };

  return (
    <>
      {isLoading && <SpinnerLoading />}
      <S.PageContainer>
        <S.HeaderContainer>
          <S.BackIcon
            src={backButton}
            alt='back'
            onClick={() => dispatch(goBack())}
          />
          <S.TitleContainer>
            <h3 className='mr-4'>Support form</h3>
            <HeadphonesSvg opacity={0.85} fill='#fff' />
          </S.TitleContainer>
        </S.HeaderContainer>
        <S.FormContainer onSubmit={handleSubmit}>
          <FormField
            label='First Name:'
            name='firstName'
            type='text'
            value={fieldsForm.firstName}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, firstName: e.target.value })
            }
          />
          <FormField
            label='Last Name:'
            name='lastName'
            type='text'
            value={fieldsForm.lastName}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, lastName: e.target.value })
            }
          />
          <FormField
            label='Email'
            name='email'
            type='text'
            value={fieldsForm.email}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, email: e.target.value })
            }
          />
          <FormField
            label='Phone number:'
            name='phone'
            type='tel'
            maxLength={12}
            value={NormalizePhoneInput(fieldsForm.phone)}
            onChange={(e) => handleChange(e.target.value)}
          />
          <FormField
            label='Order number:'
            name='orderNumber'
            type='number'
            value={fieldsForm.orderNumber}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, orderNumber: e.target.value })
            }
          />
          <S.Label className='mt-4 mb-2'>How can I help you?</S.Label>
          <S.TextArea
            placeholder='Please describe your issue...'
            value={fieldsForm.message}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, message: e.target.value })
            }
          />
          <S.ErrorMessage>
            {fieldsForm?.message?.length < 5 &&
              'Message is required (minimum 5 characters)'}
          </S.ErrorMessage>
          <S.Button type='submit' disabled={fieldsForm?.message?.length < 5}>
            Send
          </S.Button>
        </S.FormContainer>
      </S.PageContainer>
      <TicketModal
        ticketNumber={ticketNumber}
        isOpenModal={isOpenModal}
        setIsOpenModal={() => setIsOpenModal(false)}
      />
    </>
  );
}
