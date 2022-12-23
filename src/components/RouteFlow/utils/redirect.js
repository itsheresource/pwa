// Utils
import { ROUTE_PHASE } from 'fixtures/routePhases';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';

// Redux
import { push } from 'connected-react-router';

export default function redirect(phase, dispatch) {
  const handleRedirect = (route) => {
    setTimeout(() => {
      dispatch(push(route));
      popUpUtil('warning', 'Unable to access that page.');
    }, 1000);
  };

  switch (phase) {
    case ROUTE_PHASE.ADD_ADDRESSES:
        handleRedirect(AVAILABLE_ROUTES.DASHBOARD);
      break;
    case ROUTE_PHASE.ADD_ITEMS:
        handleRedirect(AVAILABLE_ROUTES.ADD_ITEMS);
      break;
    case ROUTE_PHASE.DROP_DETAILS:
        handleRedirect(AVAILABLE_ROUTES.DROP_DETAILS);
      break;
    case ROUTE_PHASE.URGENCY:
        handleRedirect(AVAILABLE_ROUTES.URGENCY);
      break;
    case ROUTE_PHASE.INVOICE:
        handleRedirect(AVAILABLE_ROUTES.INVOICE);
      break;
    case ROUTE_PHASE.SELECT_DRIVER:
    case ROUTE_PHASE.ORDER_ACCEPTED:
        handleRedirect(AVAILABLE_ROUTES.DRIVER_MATCHING);
      break;
    default:
      break;
  }
}