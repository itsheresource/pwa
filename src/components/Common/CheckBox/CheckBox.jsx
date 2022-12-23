import React from 'react';

// Components
import * as S from './CheckBoxStyledComponents';

// Utils
import PropTypes from 'prop-types';

export default function CheckBox({ className, checked, ...props }) {
  return (
    <label>
      <S.CheckBoxContainer className={className}>
        <S.HiddenCheckbox checked={checked} {...props} />
        <S.StyledCheckbox checked={checked}>
          <S.CheckMarkIcon viewBox='0 0 24 24'>
            <polyline points='20 6 9 17 4 12' />
          </S.CheckMarkIcon>
        </S.StyledCheckbox>
      </S.CheckBoxContainer>
    </label>
  );
}

CheckBox.propTypes = {
  className: null,
};

CheckBox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
};
