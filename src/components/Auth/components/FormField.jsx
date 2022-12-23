import React from 'react';

//components
import * as S from './FormFieldStyle';

//utils
import PropTypes from 'prop-types';

export default function FormField({
  label,
  name,
  value,
  type,
  onChange,
  required,
  validateText,
  ...rest
}) {
  return (
    <S.Field>
      <S.Label>{label}</S.Label>
      <S.Input
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        {...rest}
      />
      {validateText ? <S.ValidationErr>{validateText}</S.ValidationErr> : ''}
    </S.Field>
  );
}
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  validateText: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};
