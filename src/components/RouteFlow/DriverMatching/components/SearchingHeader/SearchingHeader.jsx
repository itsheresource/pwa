import React from 'react';
//components
import * as S from './SearchingHeaderStyledComponents';
import * as C from 'scss/colors';

//utils
import PropTypes from 'prop-types';

//icons
import CarSvg from 'assets/icons/CarSvg';
import FlagSvg from 'assets/icons/FlagSvg';
import itshere from 'assets/icons/itshere.svg';
import LocationSvg from 'assets/icons/LocationSvg';
import plusGrey from 'assets/icons/plusGrey.svg';

// Redux
import { useSelector } from 'react-redux';

export default function SearchingHeader() {
  const status = useSelector((state) => state.currentRoute.orderStatus);

  return (
    <S.SearchingHeaderContainer>
      <S.HeaderContainer>
        {status === 'Available' || status === 'Pending' ? (
          <S.SearchingTitle>Finding Driver</S.SearchingTitle>
        ) : (
          status === 'َSchedule' && <img src={plusGrey} alt='' width={35} />
        )}
        <S.ItsHereIcon src={itshere} alt='' />
      </S.HeaderContainer>
      <S.RoutContainer>
        <LocationSvg
          fill={
            status === 'Schedule' ||
            status === 'Available' ||
            status === 'Pending'
              ? `${C.colorBlack} `
              : `${C.colorGrey3}`
          }
          width={12}
        />
        {Array.from(Array(12), (_, i) => (
          <S.dot key={i} opacity={status === 'Schedule' ? 1 : 0.2} />
        ))}

        <CarSvg
          fill={status === 'Schedule' ? `${C.colorBlack} ` : `${C.colorGrey3}`}
        />

        {Array.from(Array(12), (_, i) => (
          <S.dot key={i} opacity={status >= 3 ? 1 : 0.2} />
        ))}
        <FlagSvg
          fill={status === 'Ongoing' ? `${C.colorBlack} ` : `${C.colorGrey3}`}
        />
      </S.RoutContainer>
    </S.SearchingHeaderContainer>
  );
}

SearchingHeader.defaultProps = {
  status: 'Pending',
};

SearchingHeader.propTypes = {
  status: PropTypes.string,
};
