import React, { useEffect, useState } from 'react';

// Components
import * as S from './DropDetailsStyledComponents';
import CheckBox from 'components/Common/CheckBox/CheckBox';
import RouteFlowButton from 'components/RouteFlow/Common/RouteFlowButton/RouteFlowButton';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { ROUTE_PHASE } from 'fixtures/routePhases';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

//icons
import frontDoor from 'assets/icons/frontDoor.svg';
import bedroom from 'assets/icons/bedroom.svg';
import glove from 'assets/icons/glove.svg';
import CloseSvg from 'assets/icons/CloseSvg';
import extraHelper from 'assets/icons/extraHelper.svg';
import NoticeSvg from 'assets/icons/NoticeSvg';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

// Apis
import { setDropDetails } from 'apis/routeFlow/dropDetails';
import { setCurrentRoutePhase } from 'apis/routeFlow/currentRoute';
import { updateCurrentRoute } from '../_ducks/currentRoute/actions';

// Utils
import redirect from '../utils/redirect';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import {
  EXTRA_HELPER_INFO,
  FRONT_DOOR_INFO,
  ROOM_OF_CHOICE_INFO,
  WHITE_GLOVE_INFO,
} from 'fixtures/constants';

const detailOptions = [
  'Front',
  'RoomOfService',
  'WhiteGloveService',
  'ExtraHelper',
];
const FRONT = 'Front';
const DELIVER_INSIDE = 'RoomOfService';
const WHITE_GLOVE = 'WhiteGloveService';

export default function DropDetails() {
  const [loading, setLoading] = useState(false);
  const currentRoute = useSelector((state) => state.currentRoute);
  const pathname = useSelector((state) => state.router.location.pathname);
  const [isOpenInfoBox, setIsOpenInfoBox] = useState(false);
  const [checked, setChecked] = useState(false);
  const [chosenDetail, setChosenDetail] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const dispatch = useDispatch();

  const handleInitialize = () => {
    const dropLocationType =
      currentRoute.suborder.drop_location[0]?.dropDetails?.dropLocationType;
    setChecked(Boolean(currentRoute.extraHelp));
    setSelectedDetails(dropLocationType);
  };

  const handleContinue = async (e) => {
    setLoading(true);
    if (selectedDetails) {
      try {
        const body = {
          addressId: currentRoute.suborder.drop_location[0]?.addressId,
          dropLocationType: selectedDetails,
          extraHelp: checked,
          id: currentRoute._id,
        };
        const res = await setDropDetails(body);
        if (res?.status) {
          dispatch(updateCurrentRoute(res.data));
          const body = {
            id: currentRoute._id,
            routePhase: ROUTE_PHASE.URGENCY,
          };
          const routePhaseRes = await setCurrentRoutePhase(body);
          if (routePhaseRes?.status) {
            dispatch(updateCurrentRoute(routePhaseRes.data));
            dispatch(push(AVAILABLE_ROUTES.URGENCY));
          } else {
            popUpUtil('error', res?.error_code);
            setLoading(false);
          }
        } else {
          popUpUtil('error', res?.error_code);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        popUpUtil('error', err);
        setLoading(false);
      }
    } else {
      popUpUtil('warning', 'Please select a drop type.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      currentRoute._id &&
      currentRoute.routePhase === ROUTE_PHASE.DROP_DETAILS
    )
      handleInitialize();
  }, [currentRoute._id]);

  useEffect(() => {
    if (
      currentRoute._id &&
      currentRoute.routePhase !== ROUTE_PHASE.DROP_DETAILS &&
      pathname === AVAILABLE_ROUTES.DROP_DETAILS
    )
      redirect(currentRoute.routePhase, dispatch);
  }, [pathname]);

  return (
    <S.DropDetailsContainer>
      {loading && <SpinnerLoading />}
      {isOpenInfoBox && chosenDetail && (
        <S.InformationBox>
          <button className='self-end' onClick={() => setIsOpenInfoBox(false)}>
            <CloseSvg width={35} height={35} fill='#fff' />
          </button>
          <div className='flex items-center'>
            <NoticeSvg width={25} className='ml-2' />
            {chosenDetail === detailOptions[0] && (
              <S.InformationText>{FRONT_DOOR_INFO}</S.InformationText>
            )}
            {chosenDetail === detailOptions[1] && (
              <S.InformationText>{ROOM_OF_CHOICE_INFO}</S.InformationText>
            )}
            {chosenDetail === detailOptions[2] && (
              <S.InformationText>{WHITE_GLOVE_INFO}</S.InformationText>
            )}
            {chosenDetail === detailOptions[3] && (
              <S.InformationText>{EXTRA_HELPER_INFO}</S.InformationText>
            )}
          </div>
          <S.GotIt onClick={() => setIsOpenInfoBox(false)}>Got it!</S.GotIt>
        </S.InformationBox>
      )}
      <S.CheckBoxContainer
        onClick={() => {
          setChosenDetail(detailOptions[3]);
          setChecked(!checked);
        }}
        chosen={checked}
        style={{ marginTop: isOpenInfoBox && chosenDetail ? 166 : 0 }}
      >
        <S.InfoIcon
          onClick={(e) => {
            e.stopPropagation();
            setChosenDetail(detailOptions[3]);
            setIsOpenInfoBox(true);
          }}
        >
          <NoticeSvg width={20} className='ml-2' />
        </S.InfoIcon>
        <S.ExtraHelperContent>
          <S.IconContainer>
            <S.Icon src={extraHelper} alt='technician' />
          </S.IconContainer>
          <S.TextContainer className='flex flex-col'>
            <S.Text>Extra helper</S.Text>
          </S.TextContainer>
          <CheckBox
            checked={checked}
            onChange={(e) => setChecked(!e.target.checked)}
          />
        </S.ExtraHelperContent>
      </S.CheckBoxContainer>
      <S.DropDetailsBox
        onClick={() => {
          setChosenDetail(detailOptions[0]), setSelectedDetails(FRONT);
        }}
        chosen={selectedDetails === FRONT}
      >
        <S.InfoIcon onClick={() => setIsOpenInfoBox(true)}>
          <NoticeSvg
            width={20}
            className='ml-2'
            stroke={
              selectedDetails === FRONT || selectedDetails === FRONT
                ? 'white'
                : '#ff6700'
            }
          />
        </S.InfoIcon>
        <S.IconContainer>
          <S.Icon
            chosen={selectedDetails === FRONT}
            src={frontDoor}
            alt='Front Door'
          />
        </S.IconContainer>
        <S.TextContainer>
          <S.Text chosen={selectedDetails === FRONT}>Front Door</S.Text>
        </S.TextContainer>
      </S.DropDetailsBox>
      <S.DropDetailsBox
        onClick={() => {
          setChosenDetail(detailOptions[1]);
          setSelectedDetails(DELIVER_INSIDE);
        }}
        chosen={selectedDetails === DELIVER_INSIDE}
      >
        <S.InfoIcon onClick={() => setIsOpenInfoBox(true)}>
          <NoticeSvg
            width={20}
            className='ml-2'
            stroke={
              selectedDetails === DELIVER_INSIDE ||
              selectedDetails === DELIVER_INSIDE
                ? 'white'
                : '#ff6700'
            }
          />
        </S.InfoIcon>
        <S.IconContainer>
          <S.Icon
            chosen={selectedDetails === DELIVER_INSIDE}
            src={bedroom}
            alt='Bedroom'
          />
        </S.IconContainer>
        <S.TextContainer>
          <S.Text chosen={selectedDetails === DELIVER_INSIDE}>
            Deliver Inside
          </S.Text>
        </S.TextContainer>
      </S.DropDetailsBox>
      <S.DropDetailsBox
        onClick={() => {
          setChosenDetail(detailOptions[2]);
          setSelectedDetails(WHITE_GLOVE);
        }}
        chosen={selectedDetails === WHITE_GLOVE}
      >
        <S.InfoIcon onClick={() => setIsOpenInfoBox(true)}>
          <NoticeSvg
            width={20}
            className='ml-2'
            stroke={
              chosenDetail === detailOptions[2] ||
              selectedDetails === WHITE_GLOVE
                ? 'white'
                : '#ff6700'
            }
          />
        </S.InfoIcon>
        <S.IconContainer>
          <S.Icon
            chosen={selectedDetails === WHITE_GLOVE}
            src={glove}
            alt='Glove'
          />
        </S.IconContainer>
        <S.TextContainer>
          <S.Text chosen={selectedDetails === WHITE_GLOVE}>
            White glove service
          </S.Text>
        </S.TextContainer>
      </S.DropDetailsBox>
      <RouteFlowButton onClick={handleContinue}>Choose</RouteFlowButton>
    </S.DropDetailsContainer>
  );
}
