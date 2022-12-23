import React, { useEffect, useRef, useState } from 'react';

// Utils
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { ROUTE_PHASE } from 'fixtures/routePhases';
import redirect from '../utils/redirect';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.min.css';
import './itemsSlider.scss';

// Components
import RouteFlowButton from 'components/RouteFlow/Common/RouteFlowButton/RouteFlowButton';
import * as S from './AddItemsStyledComponents';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { updateCurrentRoute } from '../_ducks/currentRoute/actions';
import { setSelectedItems } from '../_ducks/selectedItems/actions';

// Apis
import { getFurniture, setFurniture } from 'apis/routeFlow/furniture';
import { setCurrentRoutePhase } from 'apis/routeFlow/currentRoute';

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

export default function AddItems() {
  const [loading, setLoading] = useState(false);
  const currentRoute = useSelector((state) => state.currentRoute);
  const selectedItems = useSelector((state) => state.selectedItems);
  const pathname = useSelector((state) => state.router.location.pathname);

  const [items, setItems] = useState([]);

  const setItemsTimeOut = useRef(null);

  const dispatch = useDispatch();

  const sumOfSelectedItems =
    selectedItems.length > 0 &&
    selectedItems.reduce((accumulator, item) => accumulator + item.quantity, 0);

  const handleGetItems = async () => {
    setLoading(true);
    try {
      const res = await getFurniture();
      if (res?.status) {
        setLoading(false);
        setItems(res?.data);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSetItems = async ({ add, id }) => {
    let newSelectedItems = JSON.parse(JSON.stringify(selectedItems));

    if (
      newSelectedItems?.length > 0 &&
      newSelectedItems.filter((item) => item._id === id)[0]
    ) {
      // INFO: If selected items quantity with adding becomes less than 1, then filter it out of selected items,
      //  if is not, then add to its quantity
      newSelectedItems = newSelectedItems
        .filter((item) => (item._id === id ? item.quantity + add >= 1 : true))
        .map((item) => {
          if (item._id === id) {
            return {
              quantity: item.quantity + add,
              _id: id,
            };
          } else return { ...item };
        });
    } else if (add > 0) {
      newSelectedItems.push({
        quantity: 1,
        _id: id,
      });
    }

    const selectedItemsObj = {
      _id: currentRoute._id,
      addresses: [
        {
          addressId: currentRoute.suborder.drop_location[0].addressId,
          items: newSelectedItems,
        },
      ],
    };

    dispatch(setSelectedItems(newSelectedItems));
    // INFO: This timeout is implemented in case the user clicks multiple times on adding or subtracting the item in less than one second.
    // The api would not get called every time as it would cause a buffer. The api gets called after 1 second is passed of the last function call.
    clearTimeout(setItemsTimeOut.current);
    setItemsTimeOut.current = setTimeout(async () => {
      try {
        const res = await setFurniture(selectedItemsObj);
        if (res?.status) {
          dispatch(updateCurrentRoute(res.data));
        } else {
          popUpUtil('error', res?.error_code);
        }
      } catch (err) {
        console.error(err);
      }
    }, 200);
  };

  const handleContinue = async () => {
    setLoading(true);
    const savedInBackendSelectedItems =
      currentRoute.suborder.drop_location[0].furniture;
    const sumOfSavedInBackendSelectedItems =
      savedInBackendSelectedItems.length > 0 &&
      savedInBackendSelectedItems.reduce(
        (accumulator, item) => accumulator + item.quantity,
        0
      );
    if (sumOfSelectedItems && sumOfSavedInBackendSelectedItems) {
      try {
        const selectedItemsObj = {
          _id: currentRoute._id,
          addresses: [
            {
              addressId: currentRoute.suborder.drop_location[0].addressId,
              items: selectedItems,
            },
          ],
        };
        const res = await setFurniture(selectedItemsObj);
        if (res?.status) {
          dispatch(updateCurrentRoute(res.data));

          const body = {
            id: currentRoute._id,
            routePhase: ROUTE_PHASE.DROP_DETAILS,
          };
          const routePhaseRes = await setCurrentRoutePhase(body);
          if (routePhaseRes?.status) {
            dispatch(updateCurrentRoute(routePhaseRes.data));
            dispatch(push(AVAILABLE_ROUTES.DROP_DETAILS));
          } else {
            popUpUtil('error', routePhaseRes?.error_code);
            setLoading(false);
          }
        } else {
          popUpUtil('error', res?.error_code);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.error(err);
        popUpUtil('error', err);
      }
    } else {
      popUpUtil('warning', 'Please select items.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentRoute._id && currentRoute.routePhase === ROUTE_PHASE.ADD_ITEMS)
      handleGetItems();
  }, [currentRoute._id]);

  useEffect(() => {
    if (
      currentRoute._id &&
      currentRoute.routePhase !== ROUTE_PHASE.ADD_ITEMS &&
      pathname === AVAILABLE_ROUTES.ADD_ITEMS
    )
      redirect(currentRoute.routePhase, dispatch);
  }, [pathname]);

  return (
    <S.AddItemsContainer>
      {loading && <SpinnerLoading />}
      {items?.map(({ category, furniture }) => (
        <S.AddItemsCategoryBox key={category._id}>
          <S.HeaderContainer>
            <div className='flex items-center'>
              <S.Circle />
              <S.HeaderTitle>
                {category.name ? `${category.name}` : ''}
              </S.HeaderTitle>
            </div>
          </S.HeaderContainer>

          <Swiper
            slidesPerView={2}
            slidesPerGroup={1}
            spaceBetween={8}
            navigation
            direction='horizontal'
            centeredSlides='true'
            initialSlide={1}
            pagination={{
              dynamicBullets: true,
            }}
            className='items-container'
          >
            <S.CollapseContainer>
              {furniture.map((item, i) => (
                <SwiperSlide key={i}>
                  <S.ItemsBox>
                    <S.ItemsImageContainer>
                      <S.ItemsImage
                        src={`${process.env.REACT_APP_IMAGE_URL}${item.imagePath}`}
                        alt=''
                      />
                    </S.ItemsImageContainer>
                    <S.ItemsTitleContainer>
                      <S.ItemTitle>{item.name}</S.ItemTitle>
                    </S.ItemsTitleContainer>
                    <S.ItemsNumberContainer>
                      <S.PlusMinusBox
                        onClick={() =>
                          handleSetItems({
                            add: -1,
                            id: item._id,
                          })
                        }
                      >
                        <S.MinusIcon />
                      </S.PlusMinusBox>
                      <S.ItemsNumber>
                        {(selectedItems?.length > 0 &&
                          selectedItems.filter(
                            (theItem) => theItem._id === item._id
                          )[0]?.quantity) ||
                          0}
                      </S.ItemsNumber>
                      <S.PlusMinusBox
                        onClick={() =>
                          handleSetItems({
                            add: 1,
                            id: item._id,
                          })
                        }
                      >
                        <S.PlusIcon />
                      </S.PlusMinusBox>
                    </S.ItemsNumberContainer>
                  </S.ItemsBox>
                </SwiperSlide>
              ))}
            </S.CollapseContainer>
          </Swiper>
        </S.AddItemsCategoryBox>
      ))}
      <RouteFlowButton onClick={handleContinue}>
        Confirm {sumOfSelectedItems}
      </RouteFlowButton>
    </S.AddItemsContainer>
  );
}
