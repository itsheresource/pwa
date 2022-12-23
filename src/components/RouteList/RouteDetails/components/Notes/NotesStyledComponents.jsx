import styled from 'styled-components';
import * as C from 'scss/colors';

export const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${C.colorGrey3};
  padding: 0.5rem;
  border-radius: 13px;
  width: 100%;
  height: ${(props) => (props.isNotes ? '55%' : '27%')};
  margin-top: 10px;
  margin-bottom: 5rem;
  transition: height 0.5s ease-out;
`;

export const MessagesContainer = styled.div`
  height: 100%;
  overflow: auto;
`;

export const MessageBoxContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  padding: 1rem;
`;

export const MessageBox = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  width: 90%;
  padding: 1rem;
  background-color: white;
  border-radius: 17px 17px 10px 17px;
  color: rgba(116, 116, 116, 0.75);
  word-wrap: break-word;
  position: relative;
  font-size: 1.4rem;
  &:before {
    content: '';
    position: absolute;
    bottom: -2.3rem;
    right: 0.7px;
    height: 2.4rem;
    width: 4.4rem;
    background: rgb(0 0 0 / 0%);
  }
  &:before {
    box-shadow: 0.1rem -1.4rem 0 0 white;
    border-top-right-radius: 35%;
  }
`;
export const DriverMessageBox = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 13px;
  color: rgba(116, 116, 116, 0.75);
  width: 90%;
  word-wrap: break-word;
  position: relative;
  font-size: 1.4rem;
  margin-bottom: 5px;
`;

export const Message = styled.h4``;

export const Time = styled.h4`
  align-self: flex-end;
  text-align: right;
  font-size: 1.2rem;
`;

export const NoteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  background-color: rgba(190, 194, 204, 0.2);
  border-radius: 13px;
  padding: 5px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ButtonsSubContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Note = styled.textarea`
  width: 100%;
  color: ${C.colorWhite};
  background-color: transparent;
  border-bottom: 1px solid ${C.colorGrey1};
  margin: 0px 5px 0px 5px;
  resize: none;
  &:focus {
    outline: 0;
  }
  ::placeholder {
    font-size: 14px;
    color: white;
    opacity: 0.5;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: auto;
  margin-top: 12px;
`;
export const ImageContainerBeforeUpload = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2px;
  overflow: auto;
  padding-bottom: 0.5rem;
`;
export const ImageBox = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin: 2px;
  position: relative;
  margin-bottom: 5px;
`;

export const ImageBeforeUpload = styled.img`
  max-width: 4rem;
  height: 4rem;
  border: 3px solid ${C.selectedGray};
`;

export const RemoveImage = styled.img`
  background-color: ${C.colorWarmGrey};
  border-radius: 50%;
  position: relative;
  z-index: 1;
  bottom: -15px;
`;

export const Image = styled.img`
  width: 4rem;
  height: 4rem;
  margin: 2px;
  border: 3px solid ${C.selectedGray};
`;

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);
`;
