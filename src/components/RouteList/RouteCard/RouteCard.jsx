import React, { useState } from 'react';
import * as S from './RouteCardStyledComponents';
import * as C from 'scss/colors';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { handleStatusText } from 'utils/handleRouteDetailsText';

//icons
import CheckMarkSvg from 'assets/icons/CheckMarkSvg';
import pickupIcon from 'assets/icons/pickupIcon.svg';
import dropOffIcon from 'assets/icons/dropOffIcon.svg';
import mapIcon from 'assets/icons/mapIcon.svg';
import block from 'assets/icons/block.svg';
import CloseSvg from 'assets/icons/CloseSvg';
import RefundModal from '../RouteDetails/components/RefundModal/RefundModal';
import ArrowUp from 'assets/icons/ArrowUp';
import ArrowDown from 'assets/icons/ArrowDown';

const handleTextButton = (status) => {
  switch (status) {
    case 'Schedule':
      return 'Cancel';
    case 'Ongoing':
      return 'Cancel';
    default:
      return null;
  }
};

const RouteCard = ({ route, status }) => {
  const dispatch = useDispatch();
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleOptions = (data) => {
    return showAll ? data.length : 2;
  };

  const handleSelectedDetails = (routeSelected) => {
    const routeId = routeSelected?._id;
    dispatch(
      push({
        pathname: `${AVAILABLE_ROUTES.ROUTE_LIST}/${status}${AVAILABLE_ROUTES.ROUTE_DETAILS}`,
        search: `id=${routeId}`,
      })
    );
  };

  return (
    <>
      <S.RouteCardContainer>
        <S.RouteCardHeader status={status}>
          <S.RouteCardFlexRowContainer>
            <p className='pr-3'>{dayjs(route.date).format('MMM/DD/YY')} </p>
          </S.RouteCardFlexRowContainer>
          <div className='flex'>
            <S.StatusText>{status}</S.StatusText>
            {status === 'Delivered' && (
              <CheckMarkSvg width={13} strokeWidth='0' />
            )}
            {status === 'Canceled' && <img alt='' src={block} width={16} />}
            {status === 'Failed' && <CloseSvg fill='#fff' />}
          </div>
        </S.RouteCardHeader>
        <S.RouteCardAddressesContainer>
          <S.RouteCardAddresses>
            {route.suborder.pickup
              .slice(0, visibleOptions(route.suborder.pickup))
              .map((p, i) => (
                <S.RouteCardAddressContainer key={i}>
                  <S.RouteCardAddress>
                    <img src={pickupIcon} alt='' />
                    <div className='flex flex-col'>
                      <S.CustomerName>
                        {p.customer?.customer?.firstName || 'Pickup Customer'}
                      </S.CustomerName>
                      <S.RouteCardAddressText>
                        {p.address}
                      </S.RouteCardAddressText>
                    </div>
                  </S.RouteCardAddress>
                  <S.RouteCardAddressStatus status={handleStatusText(p)}>
                    {handleStatusText(p)}
                  </S.RouteCardAddressStatus>
                </S.RouteCardAddressContainer>
              ))}
            {route.suborder.pickup.length > 2 && (
              <div
                className='flex items-center ml-2 p-2'
                onClick={() => setShowAll(!showAll)}
              >
                <S.ArrowIconContainer>
                  {showAll ? (
                    <ArrowUp stroke={C.colorGrey2} opacity='1' />
                  ) : (
                    <ArrowDown stroke={C.colorGrey2} opacity='1' />
                  )}
                </S.ArrowIconContainer>
                <S.ViewButton>
                  {showAll ? 'View less' : 'View more'}
                </S.ViewButton>
              </div>
            )}
          </S.RouteCardAddresses>
          <S.RouteCardHr />
          <S.RouteCardAddresses>
            {route.suborder.drop_location
              .slice(0, visibleOptions(route.suborder.drop_location))
              .map((d, i) => (
                <S.RouteCardAddressContainer key={i}>
                  <S.RouteCardAddress>
                    <img src={dropOffIcon} alt='' />
                    <div className='flex flex-col'>
                      <S.CustomerName>
                        {d.customer?.customer?.firstName || 'DropOff Customer'}
                      </S.CustomerName>
                      <S.RouteCardAddressText>
                        {d.address}
                      </S.RouteCardAddressText>
                    </div>
                  </S.RouteCardAddress>
                  <S.RouteCardAddressStatus status={handleStatusText(d)}>
                    {handleStatusText(d)}
                  </S.RouteCardAddressStatus>
                </S.RouteCardAddressContainer>
              ))}
            {route.suborder.drop_location.length > 2 && (
              <div
                className='flex items-center ml-2 p-2'
                onClick={() => setShowAll(!showAll)}
              >
                <S.ArrowIconContainer>
                  {showAll ? (
                    <ArrowUp stroke={C.colorGrey2} opacity='1' />
                  ) : (
                    <ArrowDown stroke={C.colorGrey2} opacity='1' />
                  )}
                </S.ArrowIconContainer>
                <S.ViewButton>
                  {showAll ? 'View less' : 'View more'}
                </S.ViewButton>
              </div>
            )}
          </S.RouteCardAddresses>
          <S.RouteCardHr />
        </S.RouteCardAddressesContainer>
        <S.BottomActionContainer>
          <S.RouteCardDetailsButton
            onClick={() => handleSelectedDetails(route)}
          >
            Details
          </S.RouteCardDetailsButton>
        </S.BottomActionContainer>
      </S.RouteCardContainer>
      {refundModalOpen && (
        <RefundModal
          status={status}
          setIsCloseModal={() => setRefundModalOpen(false)}
          routeId={route?._id}
          getRouteDataCallback={route}
        />
      )}
    </>
  );
};

RouteCard.propTypes = {
  route: PropTypes.shape({
    _id: PropTypes.string,
    date: PropTypes.string,
    suborder: PropTypes.shape({
      pickup: PropTypes.arrayOf(
        PropTypes.shape({
          address: PropTypes.string,
          pickup_status: PropTypes.number,
          cancel_status: PropTypes.number,
          fail_status: PropTypes.number,
        })
      ),
      drop_location: PropTypes.arrayOf(
        PropTypes.shape({
          address: PropTypes.string,
          drop_status: PropTypes.number,
          cancel_status: PropTypes.number,
          fail_status: PropTypes.number,
        })
      ),
    }),
  }).isRequired,
  status: PropTypes.string.isRequired,
};

export default RouteCard;
