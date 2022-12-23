import React, { useEffect, useRef, useState } from 'react';

// Utils
import PropTypes from 'prop-types';
import * as S from './NotesStyledComponents';
import * as C from 'scss/colors';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';
import { useLocation } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
// Apis
import { getNote, sendNote } from 'apis/notes';

//icons
import AttachSvg from 'assets/icons/AttachSvg';
import closeImage from 'assets/icons/closeImage.svg';
import SendSvg from 'assets/icons/SendSvg';

export default function Notes({
  data,
  type,
  setImageSliderData,
  setIsOpenImageSlider,
}) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const [notes, setNotes] = useState(null);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);

  const [ImageCompressionProgress, setImageCompressionProgress] =
    useState(null);

  const imageInputRef = useRef(null);
  const textInputRef = useRef(null);
  const lastMessageRef = useRef(null);

  const handleImageCompression = async () => {
    // you should provide one of maxSizeMB, maxWidthOrHeight in the options
    const options = {
      maxSizeMB: 2, // (default: Number.POSITIVE_INFINITY)
      onProgress: setImageCompressionProgress, // optional, a function takes one progress argument (percentage from 0 to 100)
      maxWidthOrHeight: 1920,
      maxIteration: 1, // optional, max number of iteration to compress the image (default: 10)
      useWebWorker: true,
    };
    const compressedImages = Object.keys(images).map((key) =>
      imageCompression(images[key], options)
    );
    return await Promise.all(compressedImages);
  };

  const handleGetNotes = async () => {
    try {
      let searchId = location?.query?.id;
      const res = await getNote({
        currentRouteId: searchId,
        orderId: data?._id,
      });
      if (res?.status) {
        setNotes(res.data);
        setTimeout(() => {
          lastMessageRef.current?.scrollIntoView();
        }, 500);
      } else {
        popUpUtil('error', res?.error_code);
      }
    } catch (err) {
      console.error(err);
      popUpUtil('error', err);
    }
  };

  const handleSendMessage = async () => {
    setLoading(true);

    try {
      let searchId = location?.query?.id;
      let compressedImages;
      if (images) compressedImages = await handleImageCompression();
      const body = {
        routeId: searchId,
        orderId: data?._id,
        userId: userInfo._id,
        orderType: type === 'drop' ? 'dropOff' : 'pickup',
        message,
        uploadedImages: compressedImages,
      };

      await sendNote(body);
      await handleGetNotes();
      setImages([]);
      setMessage('');
      imageInputRef.current.value = null;
      textInputRef.current.value = null;
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetNotes();
  }, []);

  const handleMultipleImages = (e) => {
    const targetFiles = e.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.length > 0 &&
      setImages([...images, ...targetFilesObject]);
  };
  const removeImage = (e) => {
    const newImages = images.filter((i, index) => index !== e);
    setImages(newImages);
  };

  return (
    <>
      <S.NotesContainer isNotes={notes?.length > 0 || images.length > 0}>
        {loading && <SpinnerLoading />}
        <S.MessagesContainer>
          {notes?.length > 0 &&
            notes?.map((note, index) => {
              return note?.user_type === 'driver' ? (
                <div key={note._id}>
                  {note.message && (
                    <S.DriverMessageBox>
                      <S.Message>{note.message}</S.Message>
                      <S.Time>{dayjs(note?.createdAt).format('hh:mm')}</S.Time>
                    </S.DriverMessageBox>
                  )}
                  {note?.image && (
                    <S.ImageContainer>
                      {note?.image?.map((image, index) => (
                        <S.Image
                          key={index}
                          src={`${process.env.REACT_APP_CUSTOMER_API_BACKEND_URL_BASE}${image}`}
                          alt='Image'
                          onClick={() => {
                            setIsOpenImageSlider(true);
                            setImageSliderData(note?.image);
                          }}
                        />
                      ))}
                    </S.ImageContainer>
                  )}
                </div>
              ) : (
                <S.MessageBoxContainer
                  key={note._id}
                  ref={(el) =>
                    index === notes?.length - 1
                      ? (lastMessageRef.current = el)
                      : null
                  }
                >
                  {note?.message && (
                    <S.MessageBox>
                      <S.Message>{note.message}</S.Message>
                      <S.Time>{dayjs(note?.createdAt).format('hh:mm')}</S.Time>
                    </S.MessageBox>
                  )}
                  {note?.image && (
                    <S.ImageContainer>
                      {note?.image?.map((image, index) => (
                        <S.Image
                          key={index}
                          src={`${process.env.REACT_APP_CUSTOMER_API_BACKEND_URL_BASE}${image}`}
                          alt='Image'
                          onClick={() => {
                            setIsOpenImageSlider(true);
                            setImageSliderData(note?.image);
                          }}
                        />
                      ))}
                    </S.ImageContainer>
                  )}
                </S.MessageBoxContainer>
              );
            })}
        </S.MessagesContainer>
        <S.NoteContainer>
          {images.length > 0 && (
            <S.ImageContainerBeforeUpload>
              {images.map((item, index) => (
                <S.ImageBox key={index}>
                  <S.RemoveImage
                    width={18}
                    src={closeImage}
                    onClick={() => removeImage(index)}
                  />
                  <S.ImageBeforeUpload
                    src={window.URL.createObjectURL(item)}
                    alt=''
                  />
                </S.ImageBox>
              ))}
            </S.ImageContainerBeforeUpload>
          )}

          <div className='flex items-end'>
            <S.ButtonsSubContainer>
              <input
                id={data?._id}
                ref={imageInputRef}
                type='file'
                name='myImage'
                accept='image/*'
                multiple='multiple'
                onChange={handleMultipleImages}
                className='hidden'
              />
              <label htmlFor={data?._id}>
                <S.IconsContainer>
                  <AttachSvg fill={C.colorGrey1} className='mx-6' width={20} />
                </S.IconsContainer>
              </label>
            </S.ButtonsSubContainer>
            <S.Note
              ref={textInputRef}
              placeholder='Note to driver'
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              rows={message.length > 0 ? '2' : '1'}
            />
            <S.ButtonsSubContainer onClick={handleSendMessage}>
              <SendSvg
                fill={message.length > 0 ? C.DarkGreenN : C.colorWhite}
              />
            </S.ButtonsSubContainer>
          </div>
        </S.NoteContainer>
      </S.NotesContainer>
    </>
  );
}
Notes.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
  setImageSliderData: PropTypes.func,
  setIsOpenImageSlider: PropTypes.func,
};
