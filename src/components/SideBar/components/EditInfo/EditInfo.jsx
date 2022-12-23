import React, { useEffect, useState } from 'react';

//styled Components
import * as S from './EditInfoStyled';
import * as C from 'scss/colors';
// Utils
import PropTypes from 'prop-types';
import { toForm } from 'utils/toForm';
import { NormalizePhoneInput, removeDashes } from 'utils/NormalizePhoneInput';

//api
import { editUserInfo } from 'apis/editUserInfo/editUserInfo';

import { getCustomerDetails } from 'apis/getCustomerDetails/getCustomerDetails';
export default function EditInfo({ data }) {
  const {
    country,
    ownerName,
    ownerEmail,
    phone,
    city,
    street,
    unitNo,
    lastName,
    state,
  } = data;

  const [fieldsForm, setFieldsForm] = useState({
    ownerName: ownerName,
    lastName: lastName,
    phone: phone,
    country: country,
    unitNo: unitNo,
    city: city,
    street: street,
    ownerEmail: ownerEmail,
    state: state,
  });

  const handleChange = (value) => {
    setFieldsForm({ ...fieldsForm, phone: removeDashes(value) });
  };
  const handleSubmit = (e) => {
    editUserInfo(toForm(fieldsForm));
    e.preventDefault();
  };

  return (
    <S.FormContainer>
      <S.Form onSubmit={handleSubmit}>
        <S.Field>
          <S.Label>First Name</S.Label>
          <S.Input
            type='text'
            value={fieldsForm.ownerName}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, ownerName: e.target.value })
            }
          />
        </S.Field>
        <S.Field>
          <S.Label>Last Name</S.Label>
          <S.Input
            type='text'
            value={fieldsForm.lastName}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, lastName: e.target.value })
            }
          />
        </S.Field>
        <S.Field>
          <S.Label>Phone</S.Label>
          <S.Input
            type='tel'
            maxLength={12}
            value={NormalizePhoneInput(fieldsForm.phone)}
            onChange={(e) => handleChange(e.target.value)}
          />
        </S.Field>
        <S.Field>
          <S.Label>Email</S.Label>
          <S.Input
            type='text'
            value={fieldsForm.ownerEmail}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, ownerEmail: e.target.value })
            }
          />
        </S.Field>
        <S.Field>
          <S.Label>Country</S.Label>
          <S.Input
            type='text'
            value={fieldsForm.country}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, country: e.target.value })
            }
          />
        </S.Field>
        <S.Field>
          <S.Label>Province</S.Label>
          <S.Input
            type='text'
            value={fieldsForm.state}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, state: e.target.value })
            }
          />
        </S.Field>
        <S.Field>
          <S.Label>City</S.Label>
          <S.Input
            type='text'
            value={fieldsForm.city}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, city: e.target.value })
            }
          />
        </S.Field>
        <S.Field>
          <S.Label>Street</S.Label>
          <S.Input
            type='text'
            value={fieldsForm.street}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, street: e.target.value })
            }
          />
        </S.Field>
        <S.Field>
          <S.Label>Unit</S.Label>
          <S.Input
            type='number'
            value={fieldsForm.unitNo}
            onChange={(e) =>
              setFieldsForm({ ...fieldsForm, unitNo: e.target.value })
            }
          />
        </S.Field>
        <S.Button className='mr-1' type='submit'>
          Update
        </S.Button>
      </S.Form>
    </S.FormContainer>
  );
}

EditInfo.propTypes = {
  data: PropTypes.shape({
    ownerName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    ownerEmail: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    unitNo: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};
