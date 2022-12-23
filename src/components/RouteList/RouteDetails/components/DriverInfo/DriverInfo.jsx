import React from 'react';

import * as S from './DriverInfoStyled';

//utils
import PropTypes from 'prop-types';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { goBack } from 'connected-react-router/immutable';

//icons
import account from 'assets/icons/account.svg';
import Star from 'assets/icons/Star.svg';
import phone from 'assets/icons/phone.svg';
import CloseSvg from 'assets/icons/CloseSvg';
import dayjs from 'dayjs';

export default function DriverInfo({ status, data, avgRating }) {
  const dispatch = useDispatch(null);
  const routeDetailsData = useSelector((state) => state.selectedRouteDetails);

  return (
    <S.DriverInfoContainer>
      <S.TopActions className='flex w-full justify-between'>
        <h4>{dayjs(routeDetailsData.date).format('MMM/DD/YYYY')}</h4>
        <button onClick={() => dispatch(goBack())}>
          <CloseSvg width={30} height={30} fill='#fff' />
        </button>
      </S.TopActions>
      <div className='flex justify-between w-full'>
        <S.Driver>
          {data?.profile ? (
            <S.DriverImage
              src={`${process.env.REACT_APP_DRIVER_API_BACKEND_URL_BASE}/${data?.profile}`}
              alt='driver'
            />
          ) : (
            <img src={account} alt='' width={40} />
          )}
          <div className='ml-4'>
            <h4>{data?.name}</h4>
            <S.Rate>
              <img src={Star} alt='' width={15} />
              <h4>{avgRating}</h4>
            </S.Rate>
            <S.ViewDriver
              onClick={() =>
                dispatch(push(`${AVAILABLE_ROUTES.DRIVER_DETAILS}/${data.id}`))
              }
            >
              view profile
            </S.ViewDriver>
          </div>
        </S.Driver>
        <S.CarContainer>
          <S.Vehicle>
            <img
              src={`${process.env.REACT_APP_DRIVER_API_BACKEND_URL_BASE}/${data?.vehicleCategory?.imagePath}`}
              alt='car'
              width={80}
            />
            <h3>{data?.vehicleCategory?.name}</h3>
          </S.Vehicle>
          {status === 'Ongoing' && (
            <S.PhoneIcon href={`tel:${data?.phone}`}>
              <img src={phone} alt='' />
            </S.PhoneIcon>
          )}
        </S.CarContainer>
      </div>
    </S.DriverInfoContainer>
  );
}
DriverInfo.propTypes = {
  data: PropTypes.object,
  status: PropTypes.string.isRequired,
  avgRating: PropTypes.number,
};
