import React, { useState } from 'react';
import dayjs from 'dayjs';

//components
import * as S from './OrderAcceptedStyledComponents';
import * as SC from '../../DriverMatchingStyledComponents';

//icons
import order from 'assets/icons/order.svg';
import Star from 'assets/icons/Star.svg';
import Clock from 'assets/icons/Clock.svg';

//utils
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import times from 'components/RouteFlow/Common/TimeWindow/Components/timeConstant';
import RefundFullModal from '../RefundFullModal/RefundFullModal';

export default function OrderAccepted({
  driverInfo,
  isEditingInfo,
  setIsEditingInfo,
}) {
  const [refundFullModalOpen, setRefundFullModalOpen] = useState(false);
  const currentRoute = useSelector((state) => state.currentRoute);
  const urgencyName = currentRoute?.urgencyName;

  let timeIndexAddition;
  const startTimeIndex = times.findIndex((time) => time === currentRoute?.time);
  if (urgencyName === 'Economy') timeIndexAddition = 12;
  else if (urgencyName === 'Regular') timeIndexAddition = 8;
  else if (urgencyName === 'Rush') timeIndexAddition = 4;
  else if (urgencyName === 'Direct') timeIndexAddition = 0;

  return (
    <S.OrderContainer>
      <S.OrderAcceptedTitle>
        <img src={order} alt='order' />
        <h4>Your Order is accepted By</h4>
      </S.OrderAcceptedTitle>
      <S.DriverContainer>
        <S.DriverInfo>
          <S.DriverImage
            src={`${process.env.REACT_APP_DRIVER_API_BACKEND_URL_BASE}/${driverInfo?.profile}`}
            alt='driver'
          />
          <S.Driver>
            <S.Name>
              {driverInfo?.firstName} {driverInfo?.lastName}
            </S.Name>
            {driverInfo?.avgRating && (
              <S.Rate>
                <img src={Star} alt='' width={12} />
                <h4>{driverInfo?.avgRating}</h4>
              </S.Rate>
            )}
          </S.Driver>
        </S.DriverInfo>
        <S.Vehicle>
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}${currentRoute?.vehicleType?.imagePath}`}
            alt='car'
            width={93}
          />
        </S.Vehicle>
      </S.DriverContainer>
      <S.TimeSheetContainer isEditingInfo={isEditingInfo}>
        <S.DateContainer>
          <h3>
            {dayjs(currentRoute?.date).format('DD MMM') ===
            dayjs().format('DD MMM')
              ? 'Today'
              : dayjs(currentRoute?.date).format('DD MMM')}
          </h3>
          <img src={Clock} alt='' width={12} className='ml-4 mr-1 opacity-40' />
          <h3>
            {currentRoute?.time} -{' '}
            {[...times, ...times][startTimeIndex + timeIndexAddition]}
          </h3>
        </S.DateContainer>
        <S.VLine />
        <S.CancelLink onClick={() => setRefundFullModalOpen(true)}>
          Cancel
        </S.CancelLink>
      </S.TimeSheetContainer>
      {!isEditingInfo && (
        <SC.EditAdditionalInfoButtonContainer className='mt-5'>
          <SC.EditAdditionalInfoButton onClick={() => setIsEditingInfo(true)}>
            <SC.EditAdditionalInfoButtonText>
              Edit the additional information
            </SC.EditAdditionalInfoButtonText>
          </SC.EditAdditionalInfoButton>
        </SC.EditAdditionalInfoButtonContainer>
      )}
      {refundFullModalOpen && (
        <RefundFullModal
          setIsCloseModal={() => setRefundFullModalOpen(false)}
          // routeId={}
        />
      )}
    </S.OrderContainer>
  );
}

OrderAccepted.propTypes = {
  driverInfo: {},
};

OrderAccepted.propTypes = {
  driverInfo: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avgRating: PropTypes.number,
    profile: PropTypes.string.isRequired,
  }),
  isEditingInfo: PropTypes.bool.isRequired,
  setIsEditingInfo: PropTypes.func.isRequired,
};
