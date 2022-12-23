import React, { cloneElement, useEffect, useMemo, useRef, lazy } from 'react';
import './RouteFlowAnimationClasses.scss';

// Utils
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import { routePhaseRedirect } from 'utils/routePhaseRedirect';
import bellSound from '../assets/sounds/bell.mp3';
import UIfx from 'uifx';
import NotificationPopup from 'components/Common/NotificationPopup/NotificationPopup';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createCurrentRoute } from 'components/RouteFlow/_ducks/currentRoute/actions';
import { setSelectedItems } from 'components/RouteFlow/_ducks/selectedItems/actions';

// Apis
import { getCurrentRoute } from 'apis/routeFlow/currentRoute';
import { initializeFirebase } from '../push';
import { setSelectedCoordinates } from 'components/RouteFlow/_ducks/selectedCoordinates/actions';

// Component Imports lazy
const Overlay = lazy(() => import('pages/Layouts/Overlay/Overlay'));
const MapLayout = lazy(() => import('pages/Layouts/MapLayout'));
const AddAddress = lazy(() =>
  import('components/RouteFlow/AddAddress/AddAddress')
);
const AddItems = lazy(() => import('components/RouteFlow/AddItems/AddItems'));
const DropDetails = lazy(() =>
  import('components/RouteFlow/DropDetails/DropDetails')
);
const Urgency = lazy(() => import('components/RouteFlow/Urgency/Urgency'));
const Invoice = lazy(() => import('components/RouteFlow/Invoice/Invoice'));
const DriverMatching = lazy(() =>
  import('components/RouteFlow/DriverMatching/DriverMatching')
);
const Notifications = lazy(() =>
  import('components/SideBar/components/Notifications/Notifications')
);
const Support = lazy(() =>
  import('components/SideBar/components/Support/Support')
);

const DriverDetails = lazy(() =>
  import('components/DriverDetails/DriverDetails')
);
const Items = lazy(() => import('components/RouteFlow/Items/Items'));
const Notes = lazy(() =>
  import('components/RouteFlow/DriverMatching/components/Notes/Notes')
);

const RouteDetails = lazy(() =>
  import('components/RouteList/RouteDetails/RouteDetails')
);
const RouteList = lazy(() => import('components/RouteList/RouteList'));

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: cadetblue;
`;

export const LayoutDriver = styled.div`
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
`;

const bell = new UIfx(bellSound);

const Main = () => {
  const state = useSelector((state) => state);
  const location = state.router?.location || {};
  const { pathname } = location;
  const currentPath = pathname?.split('/')[pathname?.split('/').length - 1];

  // For routes that are like this: path/routePath
  let basePath = pathname.split('/');
  basePath?.pop();
  basePath = basePath?.join('/');

  const prevPath = useRef(null);
  const slideDir = useRef(null);

  const dispatch = useDispatch(null);

  const {
    DASHBOARD,
    ADD_ITEMS,
    DROP_DETAILS,
    ITEMS,
    URGENCY,
    INVOICE,
    NOTES,
    ROUTES_DETAILS_ON_MAP,
    ROUTE_DETAILS,
    DRIVER_MATCHING,
    NOTIFICATIONS,
    SUPPORT,
    DRIVER_DETAILS,
  } = AVAILABLE_ROUTES;
  const DASH = DASHBOARD.slice(1);
  const ADD = ADD_ITEMS.slice(1);
  const DROP = DROP_DETAILS.slice(1);
  const ITEM = ITEMS.slice(1);
  const URG1 = URGENCY.slice(1);
  const INV = INVOICE.slice(1);
  const NOTE = NOTES.slice(1);
  const RT_DIT = ROUTE_DETAILS.slice(1);
  const ON_MAP = ROUTES_DETAILS_ON_MAP.slice(1);
  const MATCH = DRIVER_MATCHING.slice(1);
  const NTF = NOTIFICATIONS.slice(1);
  const SUP = SUPPORT.slice(1);
  const DRV = DRIVER_DETAILS.slice(1);

  function getSlide() {
    const prev = prevPath.current;
    const cur = currentPath;

    const right = 'slideRight';
    const left = 'slideLeft';

    if (cur === DASH) slideDir.current = right;
    else if (prev === DASH) slideDir.current = left;
    else if (cur === ITEM) slideDir.current = left;
    else if (prev === ITEM) slideDir.current = right;
    else if (cur === ADD && prev === DROP) slideDir.current = right;
    else if (cur === ADD && prev === URG1) slideDir.current = right;
    else if (cur === ADD && prev === INV) slideDir.current = right;
    else if (cur === ADD && prev === MATCH) slideDir.current = right;
    else if (cur === DROP && prev === ADD) slideDir.current = left;
    else if (cur === DROP && prev === URG1) slideDir.current = right;
    else if (cur === DROP && prev === INV) slideDir.current = right;
    else if (cur === DROP && prev === MATCH) slideDir.current = right;
    else if (cur === URG1 && prev === ADD) slideDir.current = left;
    else if (cur === URG1 && prev === DROP) slideDir.current = left;
    else if (cur === URG1 && prev === INV) slideDir.current = right;
    else if (cur === URG1 && prev === MATCH) slideDir.current = right;
    else if (cur === INV && prev === ADD) slideDir.current = left;
    else if (cur === INV && prev === DROP) slideDir.current = left;
    else if (cur === INV && prev === URG1) slideDir.current = left;
    else if (cur === ON_MAP && prev === RT_DIT) slideDir.current = right;
    else if (cur === RT_DIT && prev === ON_MAP) slideDir.current = left;
    else if (cur === INV && prev === MATCH) slideDir.current = right;
    else if (cur === MATCH && prev === ADD) slideDir.current = left;
    else if (cur === MATCH && prev === DROP) slideDir.current = left;
    else if (cur === MATCH && prev === URG1) slideDir.current = left;
    else if (cur === MATCH && prev === INV) slideDir.current = left;
    else if (cur === MATCH && prev === NOTE) slideDir.current = right;
    else if (cur === NOTE && prev === MATCH) slideDir.current = left;
    else if (cur === NTF) slideDir.current = right;
    else if (prev === NTF) slideDir.current = left;
    else if (cur === SUP) slideDir.current = right;
    else if (prev === SUP) slideDir.current = left;
    else if (cur === DRV) slideDir.current = right;

    prevPath.current = currentPath;
    return slideDir.current;
  }

  const AppSwitch = useMemo(() => {
    return (
      <Overlay>
        <TransitionGroup
          className='relative h-full flex'
          childFactory={(child) =>
            cloneElement(child, {
              classNames:
                getSlide() === 'slideRight' ? 'slideRight' : 'slideLeft',
            })
          }
        >
          <CSSTransition
            key={location.key}
            mountOnEnter
            unmountOnExit
            timeout={1000}
          >
            <Switch location={location}>
              <Route exact path={AVAILABLE_ROUTES.DASHBOARD}>
                <MapLayout>
                  <AddAddress />
                </MapLayout>
              </Route>
              <Route exact path={AVAILABLE_ROUTES.ADD_ITEMS}>
                <AddItems />
              </Route>
              <Route exact path={AVAILABLE_ROUTES.DROP_DETAILS}>
                <DropDetails />
              </Route>
              <Route exact path={AVAILABLE_ROUTES.ITEMS}>
                <Items />
              </Route>
              <Route exact path={AVAILABLE_ROUTES.URGENCY}>
                <Urgency />
              </Route>
              <Route exact path={AVAILABLE_ROUTES.INVOICE}>
                <Invoice />
              </Route>
              <Route exact path={AVAILABLE_ROUTES.DRIVER_MATCHING}>
                <DriverMatching />
              </Route>
              <Route path={`${basePath}${AVAILABLE_ROUTES.NOTES}`}>
                <Notes />
              </Route>
              <Route exact path={`${AVAILABLE_ROUTES.ROUTE_LIST}/:status`}>
                <RouteList />
              </Route>
              <Route
                exact
                path={`${AVAILABLE_ROUTES.ROUTE_LIST}/:status${AVAILABLE_ROUTES.ROUTE_DETAILS}`}
              >
                <MapLayout>
                  <RouteDetails />
                </MapLayout>
              </Route>
              <Route exact path={AVAILABLE_ROUTES.NOTIFICATIONS}>
                <Notifications />
              </Route>
              <Route exact path={AVAILABLE_ROUTES.SUPPORT}>
                <Support />
              </Route>
              <Route exact path={`${AVAILABLE_ROUTES.DRIVER_DETAILS}/:id`}>
                <DriverDetails />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Overlay>
    );
  }, [pathname]);

  // INFO: This function gets called initially to set the Route
  const handleGetCurrentRoute = async () => {
    try {
      const res = await getCurrentRoute();
      if (res?.status) {
        dispatch(createCurrentRoute(res.data));
        const dropOrder = res.data.suborder?.drop_location[0];
        const theSelectedItems = dropOrder.furniture?.map((item) => ({
          quantity: item.quantity,
          _id: item._id,
        }));
        dispatch(setSelectedItems(theSelectedItems));
        if (pathname === AVAILABLE_ROUTES.DASHBOARD) {
          routePhaseRedirect(res.data?.routePhase);
        }
        dispatch(
          setSelectedCoordinates({
            pickup_coordinates:
              res.data?.suborder?.pickup[0].pickup_geometry.coordinates,
            drop_coordinates:
              res.data?.suborder?.drop_location[0]?.drop_geometry?.coordinates,
          })
        );
      } else {
        popUpUtil('error', `Unable to load route ${res?.error_code}`);
      }
    } catch (err) {
      console.warn(err);
      popUpUtil('error', err);
    }
  };

  useEffect(() => {
    handleGetCurrentRoute();
    initializeFirebase();
    const handleReceiveMessage = (message) => {
      bell.play();
      let body = message.data.firebaseMessaging.payload.notification.body;
      let title = message.data.firebaseMessaging.payload.notification.title;
      NotificationPopup(title, body);
    };
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', handleReceiveMessage);
      console.log('Notification came in!');
    }
    return () => {
      if (navigator.serviceWorker)
        navigator.serviceWorker.removeEventListener(
          'message',
          handleReceiveMessage
        );
    };
  }, []);

  return <MainContainer>{AppSwitch}</MainContainer>;
};

export default Main;
