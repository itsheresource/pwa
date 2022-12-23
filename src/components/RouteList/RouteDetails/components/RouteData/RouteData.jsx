import React, { useState } from 'react';

//components
import * as C from 'scss/colors';
import * as S from './RouteStyled';
import Notes from '../Notes/Notes';

//utils
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import { setAdditionalInfos } from 'apis/routeFlow/driverMatching';
import { NormalizePhoneInput, removeDashes } from 'utils/NormalizePhoneInput';
import { setRouteDetailsData } from 'components/SelectedRoute/_ducks/RouteDetailsData/actions';
import {
  dropDetailsText,
  handleStatusText,
  renderDropOffType,
} from 'utils/handleRouteDetailsText';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { timeWindow } from 'utils/timeWindow';

//icons
import pickupIcon from 'assets/icons/pickupIcon.svg';
import dropOffIcon from 'assets/icons/dropOffIcon.svg';
import ArrowUp from 'assets/icons/ArrowUp';
import ArrowDown from 'assets/icons/ArrowDown';
import EditSvg from 'assets/icons/EditSvg';
import CheckMarkSvg from 'assets/icons/CheckMarkSvg';
import CloseSvg from 'assets/icons/CloseSvg';

const DELIVERY_NAME_FURNITURE = 'Furniture & Appliances';
const DELIVERY_NAME_FLAT = 'Flat Rate';
const DELIVERY_NAME_RADIUS = 'Radius Delivery';

const timeStamp = (time) => {
  return dayjs(time).format('HH:mm');
};

export default function RouteData({
  setImageSliderData,
  setIsOpenImageSlider,
  setIsViewAdditionalServicesOpen,
  setIsViewMoreOpen,
  setViewModalData,
  deliveryName,
  setClose,
  setOpen,
  isOpen,
  data,
  type,
  routeId,
}) {
  dayjs.extend(customParseFormat);
  const routeDetailsData = useSelector((state) => state.selectedRouteDetails);
  const [loading, setLoading] = useState(false);
  const [editAdditionalInfo, setEditAdditionalInfo] = useState(false);
  const { customer, additionalInfo, timespan } = data;
  const selectedRouteDetails = useSelector(
    (state) => state.selectedRouteDetails
  );

  const dispatch = useDispatch();

  const itemsNames = data?.furniture?.map((item) => item?.name);
  const furnitureItems = itemsNames?.join(',');

  const itemsData = data?.furniture?.filter((item) => item);

  const [additionalForm, setAdditionalForm] = useState({
    phone: customer?.customer?.phone,
    unitNo: additionalInfo?.unitNo,
    buzzer: additionalInfo?.buzzNo,
    email: customer?.customer?.email,
    poNo: additionalInfo?.poNo,
    orderNo: additionalInfo?.orderNo,
  });

  //For phone number format
  const [key, setKey] = useState('');
  const formatPhone = (e) => {
    const element = e.target;
    let caret = element.selectionStart;
    let value = element.value.split('');
    if (
      (caret === 4 || caret === 8) &&
      key !== 'Delete' &&
      key !== 'Backspace'
    ) {
      caret++;
    } else if ((caret === 3 || caret === 7) && key === 'Backspace') {
      value.splice(caret - 1, 1);
      caret--;
    } else if ((caret === 3 || caret === 7) && key === 'Delete') {
      value.splice(caret, 1);
    }
    // update caret for non-digits
    if (key.length === 1 && /[^0-9]/.test(key)) caret--;
    value = value
      .join('')
      // remove everything except digits
      .replace(/[^0-9]+/g, '')
      // limit input to 10 digits
      .replace(/(.{10}).*$/, '$1')
      // insert "-" between groups of digits
      .replace(/^(.?.?.?)(.?.?.?)(.?.?.?.?)$/, '$1-$2-$3')
      // remove  "-" at the end
      .replace(/-*$/, '');

    setAdditionalForm({ ...additionalForm, phone: value });
    // "setTimeout" to update caret after setValue
    window.requestAnimationFrame(() => {
      element.setSelectionRange(caret, caret);
    });
  };

  const handleSetAdditionalInfo = async (data) => {
    setLoading(true);
    const addresses = [
      {
        addressId: data?.additionalInfo?.addressId,
        phone: removeDashes(additionalForm.phone),
        unitNo: additionalForm.unitNo,
        buzzNo: additionalForm.buzzer,
        email: additionalForm?.email,
        poNo: additionalForm?.poNo,
        orderNo: additionalForm?.orderNo,
      },
    ];
    const body = {
      routeId,
      addresses,
    };
    try {
      const res = await setAdditionalInfos(body);
      if (res?.status) {
        setEditAdditionalInfo(false);
        dispatch(setRouteDetailsData(res?.data));
        setLoading(false);
      } else {
        popUpUtil('error', res?.error_code);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      popUpUtil('error', err);
    }
  };

  //Validation phone for submit form
  const isPhoneValidation = removeDashes(additionalForm.phone)?.length < 10;

  return (
    <>
      {loading && <SpinnerLoading />}
      <S.HeaderContainer onClick={!isOpen ? setOpen : setClose}>
        <S.RouteType>
          <img src={type === 'pickup' ? pickupIcon : dropOffIcon} alt='' />
          <S.CustomerName>
            {data.customer?.customer?.firstName
              ? data.customer?.customer?.firstName
              : type === 'pickup'
              ? 'Pickup Customer'
              : 'DropOff Customer'}
          </S.CustomerName>
        </S.RouteType>
        <S.RouteStatus status={handleStatusText(data)}>
          {handleStatusText(data)}
        </S.RouteStatus>
        <S.TimeStatusContainer>
          {routeDetailsData?.nextLocationInfo?.eta ? (
            <S.Eta>
              ETA:&nbsp;
              {dayjs(routeDetailsData?.nextLocationInfo?.eta).format('hh:mm')}
            </S.Eta>
          ) : (
            handleStatusText(data) === 'completed' && (
              <S.TimeStatus status={handleStatusText(data)}>
                {dayjs(data?.pickup_time || data?.dropoff_time).format(
                  'hh:mm a'
                )}
              </S.TimeStatus>
            )
          )}
          {isOpen ? (
            <ArrowUp stroke={C.colorWhite} opacity='1' />
          ) : (
            <ArrowDown stroke={C.colorWhite} opacity='1' />
          )}
        </S.TimeStatusContainer>
      </S.HeaderContainer>
      <S.DetailsContainer isOpen={isOpen}>
        <S.VerticalLine height={type === 'pickup' ? '135%' : '160%'} />
        <S.Content>
          <S.Address>{data?.address}</S.Address>
          <S.RowDetails>
            <S.Col>
              <S.Title>Time window</S.Title>
              {timespan ? (
                <S.SubTitle>
                  {timeStamp(timespan?.startTime)} -
                  {timeStamp(timespan?.endTime)}
                </S.SubTitle>
              ) : (
                <S.SubTitle>
                  {timeWindow(
                    selectedRouteDetails.time,
                    selectedRouteDetails?.urgencyName
                  )}
                </S.SubTitle>
              )}
            </S.Col>
            <S.Col>
              <S.Title>Delivery Type</S.Title>
              <S.SubTitle>
                {renderDropOffType(data?.dropDetails?.dropLocationType)}
              </S.SubTitle>
            </S.Col>
          </S.RowDetails>
          {deliveryName === DELIVERY_NAME_FURNITURE && furnitureItems ? (
            <>
              <S.Title>Items</S.Title>
              <S.RowDetails>
                <S.ItemsContainer>
                  {itemsData?.slice(0, 3)?.map((item, idx) => (
                    <S.ItemBox key={idx}>
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${item.imagePath}`}
                        alt=''
                        width={40}
                      />
                    </S.ItemBox>
                  ))}
                </S.ItemsContainer>
                <S.ViewMoreButton
                  onClick={() => {
                    setIsViewMoreOpen(true);
                    setViewModalData(itemsData);
                  }}
                >
                  <S.ViewTextLink>View</S.ViewTextLink>
                </S.ViewMoreButton>
              </S.RowDetails>
              <S.RouteCardHr className='mb-4' />
            </>
          ) : deliveryName === DELIVERY_NAME_FLAT || DELIVERY_NAME_RADIUS ? (
            <>
              <S.RowDetails>
                <S.TextContainer>
                  <div className='flex-2'>
                    {data?.items?.quantity && (
                      <>
                        <S.Title>quantity</S.Title>
                        <S.Items>
                          <S.SubTitle>{data?.items?.quantity}</S.SubTitle>
                        </S.Items>
                      </>
                    )}
                  </div>
                </S.TextContainer>
              </S.RowDetails>
            </>
          ) : null}
          {deliveryName === DELIVERY_NAME_FLAT && data?.items && (
            <>
              <S.Title>Addition Services</S.Title>
              <S.AdditionalServicesContainer>
                <S.AdditionalServices>
                  {data?.items?.additionalServices?.map(
                    (item, idx, row) =>
                      item?.required && (
                        <h4 key={idx}>
                          {item?.buttonText}
                          {idx < row.length - 2 ? ',' : ''}
                        </h4>
                      )
                  )}
                </S.AdditionalServices>
                <S.ViewMoreButton
                  onClick={() => {
                    setIsViewAdditionalServicesOpen(true);
                    setViewModalData({
                      deliveryName,
                      data: data?.items?.additionalServices,
                    });
                  }}
                >
                  <S.ViewTextLink>View</S.ViewTextLink>
                </S.ViewMoreButton>
              </S.AdditionalServicesContainer>
              <S.RouteCardHr />
            </>
          )}
          {deliveryName === DELIVERY_NAME_FURNITURE &&
            dropDetailsText(data?.dropDetails).length > 0 &&
            type === 'drop' && (
              <>
                <S.Title>Addition Services</S.Title>
                <S.AdditionalServicesContainer>
                  <S.AdditionalServices>
                    <h4> {dropDetailsText(data?.dropDetails).join(',')}</h4>
                  </S.AdditionalServices>
                  <S.ViewMoreButton
                    onClick={() => {
                      setIsViewAdditionalServicesOpen(true);
                      setViewModalData({
                        deliveryName,
                        data: dropDetailsText(data?.dropDetails),
                      });
                    }}
                  >
                    <S.ViewTextLink>View</S.ViewTextLink>
                  </S.ViewMoreButton>
                </S.AdditionalServicesContainer>
                <S.RouteCardHr />
              </>
            )}
          <S.AdditionalInfoContainer>
            <S.RowDetails>
              <S.Col>
                <S.Title>Phone number</S.Title>
                {editAdditionalInfo ? (
                  <S.Input
                    type='tel'
                    value={NormalizePhoneInput(additionalForm.phone)}
                    isValidation={isPhoneValidation}
                    onKeyDown={(e) => setKey(e.key)}
                    onChange={(e) => formatPhone(e)}
                  />
                ) : (
                  <S.SubTitle>
                    {NormalizePhoneInput(customer?.customer?.phone)}
                  </S.SubTitle>
                )}
              </S.Col>
              <S.Col>
                <S.Title>Email</S.Title>
                {editAdditionalInfo ? (
                  <S.Input
                    type='text'
                    value={additionalForm.email}
                    onChange={(e) =>
                      setAdditionalForm({
                        ...additionalForm,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  <S.SubTitle>{customer?.customer?.email}</S.SubTitle>
                )}
              </S.Col>
            </S.RowDetails>
            <S.RowDetails>
              <S.Col>
                <S.UnitTitle>Unit number</S.UnitTitle>
                {editAdditionalInfo ? (
                  <S.Input
                    type='number'
                    value={additionalForm.unitNo}
                    onChange={(e) =>
                      setAdditionalForm({
                        ...additionalForm,
                        unitNo: e.target.value,
                      })
                    }
                  />
                ) : (
                  <S.SubTitle>{additionalInfo?.unitNo}</S.SubTitle>
                )}
              </S.Col>
              <S.Col>
                <S.Title>Buzzer number</S.Title>
                {editAdditionalInfo ? (
                  <S.Input
                    type='number'
                    value={additionalForm.buzzer}
                    onChange={(e) =>
                      setAdditionalForm({
                        ...additionalForm,
                        buzzer: e.target.value,
                      })
                    }
                  />
                ) : (
                  <S.SubTitle>{additionalInfo?.buzzNo}</S.SubTitle>
                )}
              </S.Col>
            </S.RowDetails>
            <S.RowDetails>
              <S.Col>
                <S.Title>PO Num</S.Title>
                {editAdditionalInfo ? (
                  <S.Input
                    type='number'
                    value={additionalForm.poNo}
                    onChange={(e) =>
                      setAdditionalForm({
                        ...additionalForm,
                        poNo: e.target.value,
                      })
                    }
                  />
                ) : (
                  <S.SubTitle>{additionalInfo?.poNo}</S.SubTitle>
                )}
              </S.Col>
              <S.Col>
                <S.Title>Order Num</S.Title>
                {editAdditionalInfo ? (
                  <S.Input
                    type='text'
                    value={additionalForm.orderNo}
                    onChange={(e) =>
                      setAdditionalForm({
                        ...additionalForm,
                        orderNo: e.target.value,
                      })
                    }
                  />
                ) : (
                  <S.SubTitle>{additionalInfo?.orderNo}</S.SubTitle>
                )}
              </S.Col>
            </S.RowDetails>
          </S.AdditionalInfoContainer>
          {editAdditionalInfo ? (
            <div className='flex'>
              <S.Button
                BackgroundColor={C.colorLightGreen}
                color={C.colorWhite}
                onClick={() => {
                  isPhoneValidation
                    ? popUpUtil('error', 'Please fill in the required fields.')
                    : handleSetAdditionalInfo(data);
                }}
                style={{ marginRight: 10 }}
              >
                <CheckMarkSvg fill={C.colorWhite} width={14} strokeWidth={4} />
                Submit
              </S.Button>
              <S.Button
                BackgroundColor={C.RedN}
                color={C.colorWhite}
                onClick={() => setEditAdditionalInfo(false)}
              >
                <CloseSvg fill={C.colorWhite} width={80} />
                Cancel
              </S.Button>
            </div>
          ) : (
            <S.Button
              BackgroundColor={C.colorWhite}
              color={C.colorWarmGrey}
              onClick={() => setEditAdditionalInfo(true)}
            >
              <EditSvg fill={C.colorWarmGrey} width={16} />
              Edit
            </S.Button>
          )}
          <Notes
            data={data}
            type={type}
            setImageSliderData={setImageSliderData}
            setIsOpenImageSlider={setIsOpenImageSlider}
          />
        </S.Content>
      </S.DetailsContainer>
    </>
  );
}
RouteData.propTypes = {
  deliveryName: PropTypes.string,
  setClose: PropTypes.func,
  setOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  data: PropTypes.object,
  type: PropTypes.string,
  setIsViewMoreOpen: PropTypes.func,
  setViewModalData: PropTypes.func,
  routeId: PropTypes.string,
  setIsViewAdditionalServicesOpen: PropTypes.func,
  setImageSliderData: PropTypes.func,
  setIsOpenImageSlider: PropTypes.func,
};
