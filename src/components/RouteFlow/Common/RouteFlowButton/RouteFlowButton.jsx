import React from 'react';

// Utils
import PropTypes from 'prop-types';

// Components
import * as S from './ButtonStyledComponents';

const Button = ({
  children,
  className,
  disabled,
  onClick,
  shouldPreventDefaultOnClick,
  id,
}) => {
  const buttonClassNames = `${
    disabled ? 'disabled' : ''
  } ${className}`;

  const handleClick = (e) => {
    if (shouldPreventDefaultOnClick) e.preventDefault();
    onClick(e);
  };

  return (
    <S.ButtonComponent
      id={id}
      type='button'
      className={buttonClassNames}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </S.ButtonComponent>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  shouldPreventDefaultOnClick: PropTypes.bool,
  id: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  disabled: false,
  shouldPreventDefaultOnClick: true,
  id: '',
};

export default Button;
