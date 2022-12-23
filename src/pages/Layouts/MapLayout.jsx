import React from 'react';

// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import GoogleMapComponent from 'components/Map/GoogleMapComponent';

const OverlayContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export default function MapOverlay({ children }) {
  return (
    <OverlayContainer>
      <GoogleMapComponent>{children}</GoogleMapComponent>
    </OverlayContainer>
  );
}

MapOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  routeBounds: PropTypes.object,
};
