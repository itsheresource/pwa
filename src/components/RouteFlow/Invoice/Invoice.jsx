/* global RealexHpp */
import React, { useEffect, useRef, useState } from 'react';

//Icons
import amexCard from 'assets/logos/amexCard.svg';
import masterCard from 'assets/logos/masterCard.svg';
import visaCard from 'assets/logos/visaCard.svg';
import pickupIcon from 'assets/icons/pickupIcon.svg';
import dropOffIcon from 'assets/icons/dropOffIcon.svg';
import parallel from 'assets/icons/parallel.svg';
import ArrowDown from 'assets/icons/ArrowDown';
import ArrowUp from 'assets/icons/ArrowUp';

//styled Components
import * as S from './InvoiceStyledComponents';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentRoute } from '../_ducks/currentRoute/actions';
import { push } from 'connected-react-router';

// Utils
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { ROUTE_PHASE } from 'fixtures/routePhases';
import useTimeWindow from 'customHooks/useTimeWindow';
import redirect from '../utils/redirect';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';

// Apis
import {
  applyDiscount,
  getCurrentRouteInvoice,
  initiatePayment,
  removeDiscount,
  paymentFinalResult,
  paymentDoneZero,
} from 'apis/routeFlow/invoice';
import {
  getCurrentRoute,
  setCurrentRoutePhase,
} from 'apis/routeFlow/currentRoute';
import { placeCurrentRouteInPool } from 'apis/routeFlow/driverMatching';

export default function Invoice() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(customParseFormat);
  const [loading, setLoading] = useState(false);
  const currentRoute = useSelector((state) => state.currentRoute);
  const userInfo = useSelector((state) => state.userInfo);
  const pathname = useSelector((state) => state.router.location.pathname);

  const [promoCode, setPromoCode] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [applyPromo, setApplyPromo] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const dispatch = useDispatch(null);

  const timeWindow = useTimeWindow(currentRoute?.urgencyName);

  const visibleOptions = (data) => {
    return showAll ? data.length : 2;
  };

  const handleCallInvoiceApi = async () => {
    try {
      const res = await getCurrentRouteInvoice(currentRoute._id);
      if (res?.status) {
        setReceipt(res.data);
      } else {
        popUpUtil('error', res?.error_code);
      }
    } catch (error) {
      console.error(error);
      popUpUtil('error', error);
    }
  };

  const paymentSuccessHelper = async () => {
    setLoading(true);
    const body = {
      id: currentRoute._id,
      routePhase: ROUTE_PHASE.SELECT_DRIVER,
    };
    try {
      await setCurrentRoutePhase(body);
      const theRes = await getCurrentRoute();
      if (theRes?.status) {
        dispatch(updateCurrentRoute(theRes.data));
      }
      await placeCurrentRouteInPool(currentRoute._id);
      dispatch(push(AVAILABLE_ROUTES.DRIVER_MATCHING));
      popUpUtil('success', 'Paid Successfully!');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      popUpUtil('error', err);
    }
  };

  async function handleAfterPayment(response, close) {
    setLoading(true);
    close();
    try {
      const res = await paymentFinalResult(response?.ORDER_ID);
      if (res?.data?.isSuccessful) {
        setLoading(false);
        // INFO: payment successful
        await paymentSuccessHelper();
      } else if (res?.data?.isSuccessful === false) {
        // INFO: issue on our side -> should I print this to users
        popUpUtil(
          'warning',
          res?.data?.errorMessage || 'Some error occurred when making payment'
        );
        setLoading(false);
      } else {
        // INFO: means isSuccessful is null -> issue on realexHpp side
        popUpUtil('error', 'Payment failed, please try again!');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      popUpUtil('error', error);
    }
  }

  const handleInitiatePayment = async () => {
    RealexHpp.setHppUrl(process.env.REACT_APP_REALEX_PAYMENTS_URL);

    const body = {
      customerId: userInfo._id,
      routeId: currentRoute._id,
      amount: receipt.totalCharge,
    };
    const res = await initiatePayment(body);
    RealexHpp.init('payNowButtonId', 'target-frame', handleAfterPayment, res);
    document.getElementById('payNowButtonId').click();
  };

  const handlePayment = async () => {
    if (dayjs(currentRoute.dates.orderDateTime).isBefore()) {
      dispatch(push(AVAILABLE_ROUTES.URGENCY));
    }
    if (receipt.totalCharge === 0) {
      const res = await paymentDoneZero(currentRoute._id);
      res?.status
        ? await paymentSuccessHelper()
        : popUpUtil('warning', 'Some error occurred processing payment.');
    } else {
      await handleInitiatePayment();
    }
  };

  const handleAddPromoCode = async () => {
    setLoading(true);
    try {
      const body = {
        routeId: currentRoute._id,
        discountCode: promoCode,
      };
      const res = await applyDiscount(body);
      if (res?.data?.status) {
        handleCallInvoiceApi();
        setApplyPromo(true);
        setLoading(false);
      } else {
        popUpUtil('error', res?.response?.data?.message);
        setLoading(false);
      }
    } catch (err) {
      popUpUtil('error', err);
      setLoading(false);
    }
  };

  const handleRemovePromoCode = async () => {
    setLoading(true);
    try {
      const res = await removeDiscount({ routeId: currentRoute._id });
      if (res?.data?.status) {
        handleCallInvoiceApi();
        setPromoCode('');
        setApplyPromo(false);
        setLoading(false);
      } else {
        popUpUtil('error', res?.response?.data?.message);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleGoToUrgency = async () => {
    const body = {
      id: currentRoute._id,
      routePhase: ROUTE_PHASE.URGENCY,
    };
    const response = await setCurrentRoutePhase(body);
    if (response?.status) {
      dispatch(updateCurrentRoute(response.data));
      dispatch(push(AVAILABLE_ROUTES.URGENCY));
    }
  };

  useEffect(() => {
    if (currentRoute._id && currentRoute.routePhase === ROUTE_PHASE.INVOICE) {
      if (dayjs(currentRoute.dates.orderDateTime).isBefore()) {
        handleGoToUrgency();
      } else handleCallInvoiceApi();
    }
  }, [currentRoute._id]);

  useEffect(() => {
    if (
      currentRoute._id &&
      currentRoute.routePhase !== ROUTE_PHASE.INVOICE &&
      pathname === AVAILABLE_ROUTES.INVOICE
    )
      redirect(currentRoute.routePhase, dispatch);
  }, [pathname]);

  const itemsData = currentRoute?.suborder.drop_location[0]?.furniture?.filter(
    (item) => item
  );
  const heightItems = `${6 * itemsData.length + 20}rem`;

  const renderPromoView = () => {
    if (receipt?.discountCode && receipt?.subTotalBeforeDiscount)
      return (
        <S.DiscountContainer>
          <S.Promo applyMode={applyPromo}>Promo Code</S.Promo>
          <S.PromoCodeContainer>
            <S.Applied>Applied</S.Applied>
            <S.PromoActionButton
              action='remove'
              onClick={handleRemovePromoCode}
            >
              remove
            </S.PromoActionButton>
          </S.PromoCodeContainer>
        </S.DiscountContainer>
      );
    else {
      return (
        <>
          <S.DiscountContainer>
            <S.Promo>Promo Code</S.Promo>
            <div className='flex justify-between'>
              <S.Input
                value={promoCode}
                type='text'
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <S.PromoActionButton
                action='apply'
                onClick={() => handleAddPromoCode()}
              >
                Apply
              </S.PromoActionButton>
            </div>
          </S.DiscountContainer>
        </>
      );
    }
  };

  return (
    <>
      <S.InvoiceContainer>
        {loading && <SpinnerLoading />}
        <S.CardContent>
          <S.TextContainer>
            <div>
              <S.AddressContainer>
                <S.AddressSubContainer>
                  <S.IconContainer className='-ml-6'>
                    <img src={pickupIcon} alt='pickup' />
                  </S.IconContainer>
                  <S.DescriptionContainer>
                    <S.Description>
                      {currentRoute?.suborder?.pickup[0]?.address}
                    </S.Description>
                  </S.DescriptionContainer>
                  <S.MoreIcon onClick={() => {}}>...</S.MoreIcon>
                </S.AddressSubContainer>
              </S.AddressContainer>
              <S.AddressContainer>
                <S.ReverseIconContainer>
                  <img src={parallel} alt='dropOff' className='w-8' />
                </S.ReverseIconContainer>
              </S.AddressContainer>
              <S.AddressContainer>
                <S.AddressSubContainer>
                  <S.IconContainer className='-ml-6'>
                    <img src={dropOffIcon} alt='dropOff' />
                  </S.IconContainer>
                  <S.DescriptionContainer>
                    <S.Description>
                      {currentRoute?.suborder?.drop_location[0]?.address}
                    </S.Description>
                  </S.DescriptionContainer>
                  <S.MoreIcon onClick={() => {}}>...</S.MoreIcon>
                </S.AddressSubContainer>
              </S.AddressContainer>
            </div>
          </S.TextContainer>
          <S.DetailsContainer
            isOpenViewMore={showAll}
            heightItems={heightItems}
          >
            <S.TextContainer border>
              <S.Container>
                <div>
                  <S.Title>Vehicle Type</S.Title>
                  <S.Description>
                    {currentRoute?.vehicleType?.name}
                  </S.Description>
                </div>
                <div>
                  <S.VehicleImg
                    src={`${process.env.REACT_APP_IMAGE_URL}${currentRoute?.vehicleType?.imagePath}`}
                    alt='car'
                    width={93}
                  />
                </div>
              </S.Container>
            </S.TextContainer>
            <S.TextContainer border>
              <S.TimeContainer>
                <S.TimeTitle>
                  <S.Title>Time Window</S.Title>
                  <S.Title>Delivery Date</S.Title>
                </S.TimeTitle>
                <S.TimeTitle>
                  <S.Description>{`${dayjs(currentRoute.date)
                    .utc()
                    .format('ddd')}, ${currentRoute.time} - ${dayjs(
                    currentRoute.time,
                    'hh:mm'
                  )
                    .add(timeWindow, 'hours')
                    .format('HH:mm')}`}</S.Description>
                  <S.Description>
                    {dayjs(currentRoute.date).utc().format('MMM D, YYYY')}
                  </S.Description>
                </S.TimeTitle>
              </S.TimeContainer>
            </S.TextContainer>
            <S.ItemsContainer
              isOpenViewMore={showAll}
              heightItems={heightItems}
            >
              {itemsData
                .slice(0, visibleOptions(itemsData))
                .map((item, idx) => (
                  <div key={idx}>
                    <S.ItemBox>
                      <div className='flex items-center'>
                        <S.ItemText>{item.name}</S.ItemText>
                        <img
                          src={`${process.env.REACT_APP_IMAGE_URL}${item.imagePath}`}
                          alt=''
                          width={80}
                        />
                      </div>
                      <S.QuantityText>{item.quantity}</S.QuantityText>
                    </S.ItemBox>
                    <hr />
                  </div>
                ))}
              {itemsData.length > 2 && (
                <div
                  className='flex items-center  p-2'
                  onClick={() => setShowAll(!showAll)}
                >
                  <S.ArrowIconContainer>
                    {showAll ? (
                      <ArrowUp opacity='0.9' />
                    ) : (
                      <ArrowDown opacity='0.9' />
                    )}
                  </S.ArrowIconContainer>
                  <S.ViewButton>
                    {showAll ? 'View less' : 'View more'}
                  </S.ViewButton>
                </div>
              )}
            </S.ItemsContainer>
          </S.DetailsContainer>
        </S.CardContent>
        <S.PayCardsContainer>
          <img src={masterCard} alt='masterCard' width={47} />
          <img src={visaCard} alt='visaCard' width={68} />
          <img src={amexCard} alt='amexCard' width={56} />
        </S.PayCardsContainer>
        <S.PaymentContainer>
          <S.PriceContainer>
            <S.TotalCard>
              <S.TotalContent>
                <div className='flex'>
                  <h4 className='mr-2'>Total:</h4>
                  {receipt?.discountCode ? (
                    <h4>
                      {receipt?.totalBeforeDiscount && (
                        <S.Total>
                          ${Number(receipt?.totalBeforeDiscount).toFixed(2)}
                        </S.Total>
                      )}
                    </h4>
                  ) : null}
                </div>
                {receipt?.discountCode ? (
                  <S.DiscountPrice>
                    ${Number(receipt?.totalCharge).toFixed(2)}
                  </S.DiscountPrice>
                ) : (
                  <h3>${Number(receipt?.totalCharge).toFixed(2)}</h3>
                )}
              </S.TotalContent>
            </S.TotalCard>

            {renderPromoView()}
          </S.PriceContainer>
          <S.Button onClick={handlePayment}>Pay Now</S.Button>
          <button type='button' hidden='hidden' id='payNowButtonId' />
        </S.PaymentContainer>
      </S.InvoiceContainer>
      <S.Iframe id='target-frame' style={{ display: 'none' }} />
    </>
  );
}
