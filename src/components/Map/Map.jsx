import React, { useEffect, useRef, useState } from 'react';

// Utils
import { DirectionsRenderer, GoogleMap } from '@react-google-maps/api';
import PropTypes from 'prop-types';

//icons
import pickupMarker from 'assets/icons/pickupMarker.svg';
import dropOffMarker from 'assets/icons/dropoffMarker.svg';

//map style
import mapStyle from './mapStyle';

// Components
import Marker from 'components/Map/Marker/Marker';
import VehicleMarker from './Marker/VehicleMarker';

//test
const polylineOptions = {
  strokeColor: 'rgb(255, 103, 0)',
  strokeWeight: 5,
  strokeOpacity: 0.7,
};
const center = { lat: 49.2578263, lng: -123.1939434 };

const Map = ({
  routeBounds,
  pickupData,
  dropOffData,
  isOngoingRoute,
  socketIsConnected,
  inRealTime,
  driverData,
}) => {
  const [thePickupLng, thePickupLat] =
    pickupData[0]?.pickup_geometry?.coordinates;
  const [theDropOffLng, theDropOffLat] =
    dropOffData[0]?.drop_geometry?.coordinates;

  const [directions, setDirections] = useState(null);

  const mapRef = useRef();

  const allRoutesCoordinates = () => {
    let allWaysPoints = [];
    [...pickupData, ...dropOffData]?.map((item) => {
      if (item?.pickup_geometry?.coordinates) {
        allWaysPoints.push({
          lat: item?.pickup_geometry?.coordinates[1],
          lng: item?.pickup_geometry?.coordinates[0],
        });
      } else
        allWaysPoints.push({
          lat: item?.drop_geometry?.coordinates[1],
          lng: item?.drop_geometry?.coordinates[0],
        });
    });
    return allWaysPoints;
  };

  const handleSetDirection = (allCoords) => {
    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = allCoords.map((coord) => ({
      location: { lat: coord.lat, lng: coord.lng },
      stopover: true,
    }));

    let origin = waypoints.shift().location;
    let destination = waypoints.pop().location;

    directionsService.route(
      {
        origin: origin,
        waypoints: waypoints,
        destination: destination,
        travelMode: 'DRIVING',
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.error(
            'Error occurred when trying to get route details from Google Maps'
          );
        }
      }
    );
  };

  const handleMapModifications = () => {
    let bounds = new window.google.maps.LatLngBounds();
    const { map } = mapRef.current?.state;
    if (map) {
      if (pickupData.length > 1 || dropOffData.length > 1) {
        for (let i = 0; i < allRoutesCoordinates().length; i++) {
          bounds.extend(allRoutesCoordinates()[i]);
        }
        map.setCenter(bounds.getCenter());
        map.fitBounds(bounds, routeBounds);
      } else if (
        theDropOffLat &&
        theDropOffLng &&
        thePickupLat &&
        thePickupLng
      ) {
        bounds.extend({ lat: thePickupLat, lng: thePickupLng });
        bounds.extend({ lat: theDropOffLat, lng: theDropOffLng });
        map.fitBounds(bounds, { bottom: 120 });
      } else if (thePickupLat && thePickupLng) {
        bounds.extend({ lat: thePickupLat, lng: thePickupLng });
        setDirections(null);
        map.fitBounds(bounds);
        map.setZoom(15);
      } else if (theDropOffLat && theDropOffLng) {
        bounds.extend({ lat: theDropOffLat, lng: theDropOffLng });
        setDirections(null);
        map.fitBounds(bounds);
        map.setZoom(15);
      } else map.setZoom(12);
    }
    setDirections(null);
  };

  const renderMarkers = (data) => {
    return data.map((item, idx) => {
      if (item?.type === 'pickup') {
        return item?.pickup_geometry?.coordinates[0] &&
          item?.pickup_geometry?.coordinates[1] ? (
          <Marker
            key={idx}
            data={item}
            type='pickup'
            status={item?.pickup_status}
            isOngoingRoute={isOngoingRoute}
            logoIcon={pickupMarker}
            address={item?.address}
            customerName={item?.customer?.customer?.firstName}
            coords={{
              lat: item?.pickup_geometry?.coordinates[1],
              lng: item?.pickup_geometry?.coordinates[0],
            }}
            map={mapRef.current?.state}
          />
        ) : null;
      } else
        return item?.drop_geometry?.coordinates[0] &&
          item?.drop_geometry?.coordinates[1] ? (
          <Marker
            key={idx}
            data={item}
            type='drop'
            status={item?.drop_status}
            isOngoingRoute={isOngoingRoute}
            logoIcon={dropOffMarker}
            address={item?.address}
            customerName={item?.customer?.customer?.firstName}
            coords={{
              lat: item?.drop_geometry?.coordinates[1],
              lng: item?.drop_geometry?.coordinates[0],
            }}
            map={mapRef.current?.state}
          />
        ) : null;
    });
  };

  const renderVehicleMarker = () => {
    return (
      socketIsConnected &&
      inRealTime &&
      driverData && (
        <VehicleMarker
          _id={driverData?._id}
          lat={driverData?.coordinates[1]}
          lng={driverData?.coordinates[0]}
          heading={driverData?.heading}
          vehicleTopImage={driverData?.vehicleTopImage}
        />
      )
    );
  };

  useEffect(() => {
    handleMapModifications();
    const waypoints = allRoutesCoordinates().filter(
      ({ lat, lng }) => lat && lng
    );
    if (waypoints.length >= 2) handleSetDirection(waypoints);
  }, [
    thePickupLat,
    thePickupLng,
    theDropOffLat,
    theDropOffLng,
    mapRef.current?.state,
  ]);

  return (
    <GoogleMap
      ref={(map) => {
        mapRef.current = map;
      }}
      mapContainerStyle={{
        height: '100%',
        width: '100%',
      }}
      zoom={13}
      center={center}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        disableDefaultUI: true,
        styles: mapStyle,
      }}
      id='map'
    >
      {renderVehicleMarker()}
      {renderMarkers(pickupData)}
      {renderMarkers(dropOffData)}
      {directions && (
        <DirectionsRenderer
          options={{
            directions,
            polylineOptions,
            suppressMarkers: true,
            preserveViewport: true,
          }}
        />
      )}
    </GoogleMap>
  );
};

Map.defaultProps = {
  pickupData: [],
  dropOffData: [],
};

Map.propTypes = {
  routeBounds: PropTypes.object,
  isOngoingRoute: PropTypes.bool,
  socketIsConnected: PropTypes.bool,
  inRealTime: PropTypes.bool,
  driverData: PropTypes.shape({
    _id: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number),
    heading: PropTypes.number,
    vehicleTopImage: PropTypes.string,
  }),
  pickupData: PropTypes.arrayOf(
    PropTypes.shape({
      pickup_geometry: PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number),
      }),
    })
  ),
  dropOffData: PropTypes.arrayOf(
    PropTypes.shape({
      drop_geometry: PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number),
      }),
    })
  ),
};

export default Map;
