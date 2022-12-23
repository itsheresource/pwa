import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Utils
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import * as C from 'scss/colors';
//Apis
import { getRoutes } from 'apis/routesList/routeList';

//components
import * as S from './RouteListStyledComponents';
import RouteCard from './RouteCard/RouteCard';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

const RouteList = () => {
  const { status } = useParams();
  const [routeList, setRouteList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countData, setCountData] = useState();
  const [page, setPage] = useState(1);

  const getRoutesData = async () => {
    setLoading(true);
    try {
      const res = await getRoutes(status, page);
      if (res.status) {
        setRouteList((prev) => [...prev, ...res?.data?.data]);
        setCountData(res?.data?.count);
        setLoading(false);
      } else {
        popUpUtil('error', res?.data?.error_code);
      }
    } catch (err) {
      popUpUtil('error', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoutesData();
  }, [page]);

  return (
    <S.RouteListContainer>
      {loading && <SpinnerLoading />}
      {routeList.length > 0 ? (
        <>
          {routeList?.map((route, i) => (
            <RouteCard route={route} key={i} status={status} keyIdx={i} />
          ))}
          {routeList.length < countData && (
            <S.Button
              background={loading ? C.colorGrey1 : C.colorWarmGrey2}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Load More ...
            </S.Button>
          )}
        </>
      ) : (
        !loading && (
          <S.RouteListEmptyView>No routes to show</S.RouteListEmptyView>
        )
      )}
    </S.RouteListContainer>
  );
};

export default RouteList;
