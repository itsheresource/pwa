import { ROUTE_PHASE } from 'fixtures/routePhases';

// Redux
import { push } from 'connected-react-router/immutable';
import store from 'redux/store';

// Router
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';

export const routePhaseRedirect = (currentRoute) => {
  switch (currentRoute) {
    case ROUTE_PHASE.ADD_ADDRESSES:
      store.dispatch(push(AVAILABLE_ROUTES.DASHBOARD));

      break;
    case ROUTE_PHASE.ADD_ITEMS:
      store.dispatch(push(AVAILABLE_ROUTES.ADD_ITEMS));

      break;
    case ROUTE_PHASE.DROP_DETAILS:
      store.dispatch(push(AVAILABLE_ROUTES.DROP_DETAILS));

      break;
    case ROUTE_PHASE.URGENCY:
      store.dispatch(push(AVAILABLE_ROUTES.URGENCY));

      break;
    case ROUTE_PHASE.INVOICE:
      store.dispatch(push(AVAILABLE_ROUTES.INVOICE));

      break;
    case ROUTE_PHASE.SELECT_DRIVER:
      store.dispatch(push(AVAILABLE_ROUTES.DRIVER_MATCHING));
      break;
    case ROUTE_PHASE.ORDER_ACCEPTED:
      store.dispatch(push(AVAILABLE_ROUTES.ORDER_ACCEPTED));
      break;
    default:
      break;
  }
};
