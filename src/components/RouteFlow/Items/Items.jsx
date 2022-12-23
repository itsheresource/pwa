import React, { useEffect, useRef, useState } from 'react';

// Utils
import * as S from './ItemsStyledComponents';
import { useDispatch, useSelector } from 'react-redux';
import { getFurniture, setFurniture } from 'apis/routeFlow/furniture';
import { setSelectedItems } from '../_ducks/selectedItems/actions';
import { updateCurrentRoute } from '../_ducks/currentRoute/actions';
import { get } from 'idb-keyval';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import { useLocation } from 'react-router-dom';

//icons
import plus from 'assets/icons/plus.svg';
import minus from 'assets/icons/minus.svg';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';

export default function Items() {
  const currentRoute = useSelector((state) => state.currentRoute);
  const selectedItems = useSelector((state) => state.selectedItems);
  const [items, setItems] = useState(null);

  const location = useLocation();
  const pathname = location.state;

  const setItemsTimeOut = useRef(null);

  const dispatch = useDispatch();

  const handleGetItems = async () => {
    let res;
    let furniture = await get('FURNITURE');
    if (!furniture) res = await getFurniture();
    if (res?.status) furniture = res?.data;
    setItems(furniture);
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

    if (
      newSelectedItems.length < 1 &&
      pathname !== AVAILABLE_ROUTES.ADD_ITEMS
    ) {
      popUpUtil('warning', 'You must have at least one item.');
    } else {
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
          popUpUtil('error', err);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (currentRoute._id) handleGetItems();
  }, [currentRoute._id]);

  return (
    <>
      {selectedItems?.length > 0 ? (
        <S.ItemsContainer>
          <S.ItemsMainBox>
            {selectedItems.map((item) => {
              const theItem =
                items?.length > 0 &&
                items
                  ?.find((category) =>
                    category?.furniture?.find(
                      (theItem) => theItem?._id === item._id
                    )
                  )
                  ?.furniture?.find((theItem) => theItem?._id === item._id);
              return (
                <S.ItemContainer key={item._id}>
                  <S.ItemBoxContainer>
                    <div className='w-8/12'>
                      <S.Title>{theItem?.name}</S.Title>
                      <S.Detail>{theItem?.description}</S.Detail>
                    </div>
                    <S.ItemBox>
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${theItem.imagePath}`}
                        alt=''
                      />
                      <S.NumberAndButtonContainer>
                        <S.PlusMinusBox
                          onClick={() =>
                            handleSetItems({ add: -1, id: item._id })
                          }
                        >
                          <img src={minus} alt='' width={12} />
                        </S.PlusMinusBox>
                        <S.Number>{item?.quantity}</S.Number>
                        <S.PlusMinusBox
                          onClick={() =>
                            handleSetItems({ add: 1, id: item._id })
                          }
                        >
                          <img src={plus} alt='' width={12} />
                        </S.PlusMinusBox>
                      </S.NumberAndButtonContainer>
                    </S.ItemBox>
                  </S.ItemBoxContainer>
                  <hr className='mt-4' />
                </S.ItemContainer>
              );
            })}
          </S.ItemsMainBox>
        </S.ItemsContainer>
      ) : null}
    </>
  );
}
