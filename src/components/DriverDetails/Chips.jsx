import React from 'react';

// Utils
import PropTypes from 'prop-types';

//Styled components
import * as S from './DriverInfoStyled';

export default function Chips({ children, color }) {
  return <S.Chips color={color}>{children}</S.Chips>;
}

Chips.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};
