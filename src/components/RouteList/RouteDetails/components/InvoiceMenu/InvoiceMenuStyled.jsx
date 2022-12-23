import styled from 'styled-components';
import * as C from 'scss/colors';

export const DownloadMenu = styled.div`
  display: inline-block;
  position: relative;
`;
export const MenuItem = styled.a`
  font-size: 1.6rem;
  padding: 0.4rem 0.7rem 0.4rem 0.7rem;
`;
export const MenuContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: -105px;
  left: 0px;
  border-radius: 4px;
  background: ${C.colorGrey4};
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.35);
  transition: height 0.5s ease-out;
  height: 10rem;
  hr {
    border-bottom: 1px solid ${C.colorWarmGrey};
    width: 100%;
  }
`;
export const DownloadIcon = styled.img`
  width: 3rem;
  color: ${C.colorGrey3};
  box-shadow: ${(props) =>
    props.openDownload ? '0px 2px 6px 0px rgba(0, 0, 0, 0.1)' : 'none'};
  background-color: ${(props) =>
    props.openDownload ? C.colorGrey4 : '#8a8989'};
  padding: 0.5rem;
  border-radius: 4px;
`;
