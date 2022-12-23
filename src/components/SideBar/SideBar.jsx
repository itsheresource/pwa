import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

//icons
import { CSSTransition } from 'react-transition-group';

//Components
import ContactInfo from './ContactInfo';
import MenuItems from './MenuItems';
import EditInfo from './components/EditInfo/EditInfo';

//styled Components
import * as S from './SideBarStyledComponents';
import './sidebar.scss';

// Utils
import PropTypes from 'prop-types';

//api
import { routesCount } from 'apis/routesList/routeList';
import { getCustomerDetails } from 'apis/getCustomerDetails/getCustomerDetails';

function SideBar({ isOpen, setClose }) {
  const nodeRef = useRef(null);
  const [isOpenEditMode, setIsOpenEditMode] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const [touchXStart, setTouchXStart] = useState();
  const [startSwipeY, setStartSwipeY] = useState();
  const [routesCountData, setRoutesCountData] = useState([]);

  useEffect(() => {
    if (isOpen) {
      routesCount()
        .then((res) => setRoutesCountData(res))
        .catch((err) => console.warn(err));
      getCustomerDetails();
    }
  }, [isOpen]);

  const _onTouchEnd = (e) => {
    const endSwipeY = e.changedTouches[0].clientY;
    const touchXEnd = e.changedTouches[0].clientX;

    const isYMoved =
      endSwipeY - startSwipeY < 15 && endSwipeY - startSwipeY > -15;

    if (touchXStart < 300 && touchXEnd < touchXStart && isYMoved) {
      setClose();
    }
  };

  return (
    <>
      <CSSTransition
        in={isOpen}
        classNames='opacity'
        appear
        unmountOnExit
        timeout={500}
      >
        <S.BlackAnimation />
      </CSSTransition>
      <CSSTransition
        in={isOpen}
        classNames='slide'
        appear
        unmountOnExit
        timeout={1000}
        nodeRef={nodeRef}
      >
        <S.BackDrop
          ref={nodeRef}
          onClick={() => {
            setClose();
          }}
        >
          <S.Container
            onClick={(e) => {
              e.stopPropagation();
            }}
            isOpenEditMode={isOpenEditMode}
            onTouchStart={(e) => {
              !isOpenEditMode && setTouchXStart(e.touches[0].clientX);
              setStartSwipeY(e.touches[0].clientY);
            }}
            onTouchEnd={!isOpenEditMode ? _onTouchEnd : null}
          >
            <ContactInfo
              data={userInfo}
              openEditMode={() => setIsOpenEditMode(true)}
              closeEditMode={() => setIsOpenEditMode(false)}
              isOpenEditMode={isOpenEditMode}
            />
            {isOpenEditMode ? (
              <EditInfo
                closeEditMode={() => setIsOpenEditMode(false)}
                data={userInfo}
              />
            ) : (
              <MenuItems
                setClose={setClose}
                menuCounterItems={routesCountData}
                unreadCount={userInfo?.unreadNotificationCount}
              />
            )}
          </S.Container>
        </S.BackDrop>
      </CSSTransition>
    </>
  );
}

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setClose: PropTypes.func.isRequired,
};

export default SideBar;
