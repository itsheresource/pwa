import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as S from './PasswordStyle';

import './strengthMeter.css';
import FormField from './FormField';
//icons
import eyeHidden from 'assets/icons/eyeHidden.svg';
import eyeVisible from 'assets/icons/eyeVisible.svg';

export default function Password({
  placeholder,
  withoutMeter = false,
  label,
  validateText,
  value,
  passwordScore,
  ...rest
}) {
  const [showPass, setShowPass] = useState(false);

  const validatePasswordStrong = (value) => {
    switch (value) {
      case 0:
        return 'too weak';
      case 1:
        return 'weak';
      case 2:
        return 'weak';
      case 3:
        return 'very good';
      case 4:
        return 'strong';
      default:
        break;
    }
  };

  return (
    <div className='w-full '>
      <FormField
        type={showPass ? 'text' : 'password'}
        label={label}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
      <span className='field-icon' onClick={() => setShowPass(!showPass)}>
        {showPass ? (
          <img src={eyeVisible} alt='' width={20} />
        ) : (
          <img src={eyeHidden} alt='' width={20} />
        )}
      </span>
      {validateText ? <S.ValidationErr>{validateText}</S.ValidationErr> : ''}
      {!withoutMeter && (
        <div className='flex items-center justify-between mb-4'>
          <div className='strength-meter'>
            <div
              className='strength-meter-fill'
              data-strength={value && passwordScore}
            />
          </div>
          <S.Status status={value && passwordScore}>
            {value && validatePasswordStrong(passwordScore)}
          </S.Status>
        </div>
      )}
    </div>
  );
}

Password.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  validateText: PropTypes.string,
  withoutMeter: PropTypes.bool,
  value: PropTypes.string,
  passwordScore: PropTypes.number,
};
