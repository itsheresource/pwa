import React, { useEffect, useState } from 'react';

//components
import Chips from './Chips';
import VehiclesSlider from './VehiclesSlider/VehiclesSlider';
import { goBack } from 'connected-react-router/immutable';

//icon
import backButtonSignup from 'assets/icons/backButtonSignup.svg';
import Star from 'assets/icons/Star.svg';

//Styled components
import * as S from './DriverInfoStyled';
import * as C from 'scss/colors';

import { useParams } from 'react-router';

import { useDispatch } from 'react-redux';
import { getDriverInfo, getDriverReviews } from 'apis/driver';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

export default function DriverDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [driverInfo, setDriverInfo] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetDriverInfo = async (id) => {
    setLoading(true);
    try {
      const res = await getDriverInfo(id);
      if (res?.status) {
        setDriverInfo(res?.driverInfo);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      popUpUtil('error', err);
    }
  };

  const handleGetDriverReviews = async (id) => {
    setLoading(true);
    try {
      const res = await getDriverReviews(id);
      if (res?.status) {
        setReviews(res?.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      popUpUtil('error', err);
    }
  };

  useEffect(() => {
    handleGetDriverInfo(id);
    handleGetDriverReviews(id);
  }, []);

  return loading ? (
    <SpinnerLoading />
  ) : (
    <S.ModalContainer>
      <S.TopInformation>
        <S.BackIcon
          src={backButtonSignup}
          alt='back'
          onClick={() => dispatch(goBack())}
        />
        <S.DriverContainer>
          <S.DriverImage
            src={`${process.env.REACT_APP_DRIVER_API_BACKEND_URL_BASE}/${driverInfo?.profile}`}
            alt='driver'
          />
          <S.Driver>
            <S.Name>
              {driverInfo?.firstName}&nbsp;{driverInfo?.lastName}
            </S.Name>
            <S.Rate>
              <img src={Star} alt='' width={15} />
              <h4>{driverInfo?.avgRating}</h4>
            </S.Rate>
          </S.Driver>
          <S.Vehicle>
            <img
              src={`${process.env.REACT_APP_DRIVER_API_BACKEND_URL_BASE}/${driverInfo?.vehicleCateg?.imagePath}`}
              alt='car'
              width={70}
            />
            <h3>{driverInfo?.vehicleCateg?.name}</h3>
          </S.Vehicle>
        </S.DriverContainer>
      </S.TopInformation>
      <S.Content>
        <div>
          <S.Title>About me:</S.Title>
          {driverInfo?.about && (
            <S.AboutMe>
              <h4>{driverInfo?.about}</h4>
            </S.AboutMe>
          )}
        </div>
        <S.SkillsContainer>
          <S.Title>Experience and skills</S.Title>
          <S.ChipsContainer>
            {driverInfo?.experiences.map((item, idx) => (
              <Chips key={idx} color={C.colorBlueMedium1}>
                <h4>{item?.type?.name}</h4>
              </Chips>
            ))}
          </S.ChipsContainer>
        </S.SkillsContainer>
        <div>
          <S.Title>Pics</S.Title>
          <VehiclesSlider galleryImages={driverInfo?.galleryImages} />
        </div>
        <S.Divider />
        <div>
          <S.Title>Equipments:</S.Title>
          <S.ChipsContainer>
            {driverInfo?.equipment.map((item, idx) => (
              <Chips key={idx} color={C.chipsGray}>
                <h4>{item?.name}</h4>
              </Chips>
            ))}
          </S.ChipsContainer>
        </div>
        <S.Divider />
        <div className='mb-16'>
          <S.Title>Reviews:</S.Title>
          {reviews?.list?.map((item, idx) => (
            <S.Comment key={idx}>
              {item?.review ? (
                <>
                  <S.StarBox>
                    <h3>{item?.userName}</h3>
                    {Array(item?.rating).fill(
                      <img src={Star} alt='' width={15} />
                    )}
                  </S.StarBox>
                  <S.ReviewBox>
                    <h4>{item?.review}</h4>
                  </S.ReviewBox>
                </>
              ) : null}
            </S.Comment>
          ))}
        </div>
      </S.Content>
    </S.ModalContainer>
  );
}
