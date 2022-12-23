import React from 'react';

//components
import * as S from './FormFieldStyledComponents';

//utils
import PropTypes from 'prop-types';

export default function FormField({
  label,
  name,
  value,
  type,
  onChange,
  required,
  isValidation,
  ...rest
}) {
  return (
    <S.Field>
      <S.Label>{label}</S.Label>
      <S.Input
        isValidation={isValidation}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        required={required}
        {...rest}
      />
      {required && <S.StarSpan>*</S.StarSpan>}
    </S.Field>
  );
}
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  isValidation: PropTypes.bool,
};
