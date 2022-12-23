import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import { Marker as GoogleMapMarker } from '@react-google-maps/api';
import jimp from 'jimp';

const VehicleMarker = ({ heading, lat, lng, _id, vehicleTopImage }) => {
  const [vehicleImageUrl, setVehicleImageUrl] = useState('');
  const [vehicleImage, setVehicleImage] = useState(null);

  useEffect(() => {
    if (vehicleTopImage) {
      const vehicleMainImage = `${process.env.REACT_APP_DRIVER_API_BACKEND_URL_BASE}/${vehicleTopImage}`;
      setVehicleImageUrl(vehicleMainImage);
    } else {
      setVehicleImageUrl('');
    }
  }, [vehicleTopImage]);

  useEffect(() => {
    if (vehicleImageUrl) {
      const deg = 360 - heading;
      jimp
        .read(vehicleImageUrl)
        .then((image) => {
          return image
            .resize(jimp.AUTO, 80)
            .contain(80, 80)
            .rotate(deg, false)
            .getBase64Async('image/png');
        })
        .then((image) => {
          setVehicleImage(image);
        })
        .catch((err) => {
          console.error(err);
          setVehicleImage(null);
        });
    } else {
      setVehicleImage(null);
    }
  }, [heading, vehicleImageUrl]);

  return (
    <>
      {vehicleImageUrl && (
        <GoogleMapMarker
          tabIndex={0}
          position={{ lat, lng }}
          options={{
            icon: {
              url: vehicleImage || '',
              anchor: new window.google.maps.Point(40, 40),
              scaledSize: new window.google.maps.Size(80, 80),
            },
          }}
        />
      )}
    </>
  );
};

VehicleMarker.propTypes = {
  _id: PropTypes.string.isRequired,
  heading: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  vehicleTopImage: PropTypes.string.isRequired,
};

export default VehicleMarker;
