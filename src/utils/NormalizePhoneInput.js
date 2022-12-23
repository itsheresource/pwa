import PropTypes from 'prop-types';

export const NormalizePhoneInput = (value) => {
  if (value?.length < 13) {
    let cleaned = ('' + value).replace(/\D/g, '');
    let normValue = `${cleaned.substring(0, 3)}${
      cleaned.length > 3 ? '-' : ''
    }${cleaned.substring(3, 6)}${
      cleaned.length > 6 ? '-' : ''
    }${cleaned.substring(6, 11)}`;
    return normValue;
  }
};

NormalizePhoneInput.propTypes = {
  value: PropTypes.number.isRequired,
};

export const removeDashes = (string) => {
  if (!string) {
    return '';
  }
  const normString = string?.split('-')?.join('');
  return normString;
};

removeDashes.propTypes = {
  string: PropTypes.string.isRequired,
};

NormalizePhoneInput.propTypes = {
  value: PropTypes.number.isRequired,
};
