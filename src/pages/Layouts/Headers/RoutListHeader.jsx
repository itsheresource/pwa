import React from 'react';
import * as S from './HeadersStyled';
import { useDispatch, useSelector } from 'react-redux';
import { routePhaseRedirect } from 'utils/routePhaseRedirect';
import CloseSvg from 'assets/icons/CloseSvg';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { goBack } from 'connected-react-router/immutable';
import { push } from 'connected-react-router';

export default function RoutListHeader() {
  const dispatch = useDispatch();
  const currentRoute = useSelector((state) => state.currentRoute);
  const { pathname } = useSelector((state) => state.router?.location);
  const selectedRouteDetails = useSelector(
    (state) => state.selectedRouteDetails
  );
  const isRouteDetailsView = pathname.includes(AVAILABLE_ROUTES.ROUTE_DETAILS);
  const status = selectedRouteDetails?.orderStatus;
 
  return (
    <S.HeaderContainer>
      <button
        onClick={() =>
          isRouteDetailsView
            ? dispatch(push(`${AVAILABLE_ROUTES.ROUTE_LIST}/${status}`))
            : routePhaseRedirect(currentRoute?.routePhase)
        }
      >
        <CloseSvg width={40} height={40} />
      </button>
    </S.HeaderContainer>
  );
}
