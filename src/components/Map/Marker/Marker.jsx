import React, { useEffect, useRef, useState } from 'react';

// Utils
import { OverlayView, Marker as GoogleMapMarker } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import useOutsideAlerter from 'customHooks/useOutSideAlerter';

// Components
import * as S from './MarkerStyledComponents';

//icons
import redMarker from 'assets/icons/redMarker.svg';
import greyMarker from 'assets/icons/greyMarker.svg';
import checkMarkCompleted from 'assets/icons/checkMarkCompleted.svg';

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height + 25),
});

const Marker = ({
  logoIcon,
  coords,
  address,
  type,
  customerName,
  isOngoingRoute,
  status,
  data,
}) => {
  const [isOverlayViewOpen, setIsOverlayViewOpen] = useState(false);

  const overlayViewRef = useRef(null);

  useOutsideAlerter(overlayViewRef, () => setIsOverlayViewOpen(false));

  const switchMarker = (order) => {
    if (order.pickup_status === 1 || order.drop_status === 1) {
      return checkMarkCompleted;
    } else if (order.cancel_status === 1) {
      return redMarker;
    } else if (order.fail_status === 1) {
      return greyMarker;
    } else {
      return logoIcon;
    }
  };

  return (
    <>
      <GoogleMapMarker
        options={{
          icon: {
            url: switchMarker(data),
            scaledSize: new window.google.maps.Size(33, 33),
            anchor: new window.google.maps.Point(16.5, 16.5),
          },
        }}
        position={coords}
        onClick={() => setIsOverlayViewOpen((prevState) => !prevState)}
      >
        {isOngoingRoute && (
          <OverlayView
            position={coords}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={getPixelPositionOffset}
          >
            <S.OverlayViewContentContainer ref={overlayViewRef}>
              <S.ContentOngoing>
                <S.Span>{customerName}</S.Span>
              </S.ContentOngoing>
              <S.ColoredSectionOngoing isCompleted={status} type={type} />
            </S.OverlayViewContentContainer>
          </OverlayView>
        )}
        {isOverlayViewOpen && !isOngoingRoute && (
          <OverlayView
            position={coords}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={getPixelPositionOffset}
          >
            <S.OverlayViewContentContainer
              onClick={() => setIsOverlayViewOpen(false)}
              ref={overlayViewRef}
            >
              <S.Content>
                <S.Span>{address}</S.Span>
              </S.Content>
              <S.ColoredSection type={type} />
            </S.OverlayViewContentContainer>
          </OverlayView>
        )}
      </GoogleMapMarker>
    </>
  );
};

Marker.defaultProps = {
  address: 0,
};

Marker.propTypes = {
  logoIcon: PropTypes.string.isRequired,
  address: PropTypes.string,
  type: PropTypes.string.isRequired,
  coords: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  customerName: PropTypes.string,
  isOngoingRoute: PropTypes.bool,
  status: PropTypes.number,
  data: PropTypes.object,
};

export default Marker;
