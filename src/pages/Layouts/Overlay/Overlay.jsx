import React, { useState } from 'react';
import * as S from './OverlayStyledComponents';
import { useSelector } from 'react-redux';
// Utils
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';

// Icons
import Menu from 'assets/icons/Menu.png';
import boxIcon from 'assets/icons/boxIcon.svg';

// Components
import SideBar from 'components/SideBar/SideBar';
import RemoveRouteModal from 'components/RouteFlow/Common/RemoveRouteModal/RemoveRouteModal';

//Headers
import RouteFlowHeader from '../Headers/RouteFlowHeader';
import RoutListHeader from '../Headers/RoutListHeader';
import RoutesOnMapHeader from '../Headers/RoutesOnMapHeader';
import DriverMatchingHeader from '../Headers/DriverMatchingHeader';
import ItemsHeader from '../Headers/ItemsHeader';
import NotesHeader from '../Headers/NotesHeader';
import AddAddressHeader from '../Headers/AddAddressHeader';

export default function Overlay({ children }) {
  const selectedItems = useSelector((state) => state.selectedItems);
  const { pathname } = useSelector((state) => state.router?.location);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [openRefreshModal, setOpenRefreshModal] = useState(false);

  // For routes that are like this: path/routePath
  let basePath = pathname.split('/');
  basePath?.pop();
  basePath = basePath?.join('/');
  //conditions for show header
  const showMap = pathname === AVAILABLE_ROUTES.DASHBOARD;
  const isItemsPage = pathname === AVAILABLE_ROUTES.ITEMS;
  const showItemBox =
    pathname === AVAILABLE_ROUTES.ADD_ITEMS ||
    pathname === AVAILABLE_ROUTES.DROP_DETAILS ||
    pathname === AVAILABLE_ROUTES.URGENCY;
  const isRouteListView = pathname.includes(AVAILABLE_ROUTES.ROUTE_LIST);
  const isDriverMatchingView = pathname === AVAILABLE_ROUTES.DRIVER_MATCHING;
  const isNotesExitButton = pathname === `${basePath}${AVAILABLE_ROUTES.NOTES}`;
  const isRouteDetailsOnMapView = pathname.includes(
    AVAILABLE_ROUTES.ROUTE_DETAILS
  );
  const isRouteFlowView =
    pathname === AVAILABLE_ROUTES.ADD_ITEMS ||
    pathname === AVAILABLE_ROUTES.DROP_DETAILS ||
    pathname === AVAILABLE_ROUTES.URGENCY ||
    pathname === AVAILABLE_ROUTES.INVOICE;
  const showDriverDetails = pathname.includes(AVAILABLE_ROUTES.DRIVER_DETAILS);
  //render item box in footer
  const renderItemBox = () => {
    return (
      <S.BottomContainer>
        <S.ItemsIconContainer>
          <S.ItemsButton>
            <Link to={{ pathname: AVAILABLE_ROUTES.ITEMS, state: pathname }}>
              {selectedItems?.length > 0 && (
                <S.NumberOfItemsContainer>
                  {selectedItems?.reduce(
                    (accumulator, item) => accumulator + item.quantity,
                    0
                  )}
                </S.NumberOfItemsContainer>
              )}
              <S.Icon src={boxIcon} alt='' />
            </Link>
          </S.ItemsButton>
        </S.ItemsIconContainer>
      </S.BottomContainer>
    );
  };

  return (
    <S.OverlayContainer>
      <SideBar
        isOpen={isSideBarOpen}
        setClose={() => {
          setIsSideBarOpen(false);
        }}
      />

      {!showDriverDetails && (
        <S.SideBarButton
          onClick={() => {
            setIsSideBarOpen(!isSideBarOpen);
          }}
        >
          <img src={Menu} alt='' />
        </S.SideBarButton>
      )}
      {/* <------- HEADERS --------> */}
      {showMap && <AddAddressHeader />}
      {isRouteFlowView && <RouteFlowHeader />}
      {isRouteListView && !isRouteDetailsOnMapView && <RoutListHeader />}
      {isRouteDetailsOnMapView && <RoutesOnMapHeader />}
      {isDriverMatchingView && <DriverMatchingHeader />}
      {isItemsPage && <ItemsHeader />}
      {isNotesExitButton && <NotesHeader />}
      {/* <------- BODY --------> */}
      <S.BodyContainer>
        <S.Body showMap={showMap}>{children}</S.Body>
      </S.BodyContainer>
      {/* <--- ROUTE FLOW FOOTER ---> */}
      {showItemBox && renderItemBox()}
      <RemoveRouteModal
        isOpen={openRefreshModal}
        setIsCloseModal={() => setOpenRefreshModal(false)}
      />
    </S.OverlayContainer>
  );
}

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
};
