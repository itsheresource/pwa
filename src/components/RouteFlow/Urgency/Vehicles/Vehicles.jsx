import React, { useEffect, useState } from 'react';

// Utils
import PropTypes from 'prop-types';
import './swiper.scss';
// Components
import * as S from './VehiclesStyledComponents';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateVehicleId } from 'components/RouteFlow/_ducks/currentRoute/actions';
export default function Vehicles({
  selectedVehicleCategory,
  setSelectedVehicle,
}) {
  const dispatch = useDispatch();
  const currentRoute = useSelector((state) => state.currentRoute);
  const [activeVehicle, setActiveVehicle] = useState(
    currentRoute?.vehicleType?._id
  );

  const handleSetSelectedVehicle = (vehicle) => {
    setActiveVehicle(vehicle.vehicleId);
    dispatch(
      updateVehicleId({ ...currentRoute?.vehicleType, _id: vehicle.vehicleId })
    );
    setSelectedVehicle(vehicle.vehicleId);
  };

  useEffect(() => {
    setSelectedVehicle(currentRoute?.vehicleType?._id);
  }, [currentRoute?.vehicleType?._id]);

  return (
    <>
      <S.VehiclesParentContainer>
        <S.VehiclesBox>
          {selectedVehicleCategory?.vehicleInfo?.length > 0 &&
            Object.keys(selectedVehicleCategory?.vehicleInfo[0]).length > 0 &&
            selectedVehicleCategory?.vehicleInfo?.map((vehicle) => (
              <S.VehicleContainer
                key={vehicle.vehicleId}
                onClick={() => handleSetSelectedVehicle(vehicle)}
                isActive={activeVehicle === vehicle.vehicleId}
              >
                <S.VehicleName isActive={activeVehicle === vehicle.vehicleId}>
                  <div className='flex flex-col'>
                    <h4>{vehicle.name}</h4>
                    <h3>${vehicle?.subTotal}</h3>
                  </div>
                </S.VehicleName>
                <S.VehicleImage
                  src={`${process.env.REACT_APP_IMAGE_URL}${
                    activeVehicle === vehicle.vehicleId
                      ? vehicle.activeImagePath
                      : vehicle.imagePath
                  }`}
                  isCurrentSlide={activeVehicle === vehicle.vehicleId}
                />
              </S.VehicleContainer>
            ))}
        </S.VehiclesBox>
      </S.VehiclesParentContainer>
    </>
  );
}

Vehicles.defaultProps = {
  selectedVehicleCategory: {
    vehicleInfo: [{}],
  },
};

Vehicles.propTypes = {
  selectedVehicleCategory: PropTypes.shape({
    vehicleInfo: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  }).isRequired,
  setSelectedVehicle: PropTypes.func.isRequired,
};
