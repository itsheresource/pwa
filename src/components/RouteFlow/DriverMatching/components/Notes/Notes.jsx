import React, { useEffect, useRef, useState } from 'react';

// Utils
import * as S from './NotesStyledComponents';
import * as C from 'scss/colors';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import imageCompression from 'browser-image-compression';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

// Apis
import { getNote, sendNote } from 'apis/notes';
//icons
import CameraSvg from 'assets/icons/CameraSvg';

export default function Notes() {
  const [loading, setLoading] = useState(false);
  const currentRoute = useSelector((state) => state.currentRoute);
  const router = useSelector((state) => state.router);
  const userInfo = useSelector((state) => state.userInfo);

  const [notes, setNotes] = useState(null);
  const [message, setMessage] = useState('');
  const [ImageCompressionProgress, setImageCompressionProgress] =
    useState(null);
  const [uploadedImages, setUploadedImages] = useState(null);

  const imageInputRef = useRef(null);
  const textInputRef = useRef(null);
  const lastMessageRef = useRef(null);

  const handleGetNotes = async () => {
    try {
      let searchId = router.location.search.slice(1);
      const res = await getNote({
        currentRouteId: currentRoute._id,
        orderId: searchId,
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

  const handleImageCompression = async () => {
    // you should provide one of maxSizeMB, maxWidthOrHeight in the options
    const options = {
      maxSizeMB: 2, // (default: Number.POSITIVE_INFINITY)
      onProgress: setImageCompressionProgress, // optional, a function takes one progress argument (percentage from 0 to 100)
      maxWidthOrHeight: 1920,
      maxIteration: 1, // optional, max number of iteration to compress the image (default: 10)
      useWebWorker: true,
    };
    const compressedImages = Object.keys(uploadedImages).map((key) =>
      imageCompression(uploadedImages[key], options)
    );
    return await Promise.all(compressedImages);
  };

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      let searchId = router.location.search.slice(1);
      let orderType;
      if (currentRoute.suborder.pickup[0]._id === searchId)
        orderType = 'pickup';
      else if (currentRoute.suborder.drop_location[0]._id === searchId)
        orderType = 'dropOff';
      let compressedImages;
      if (uploadedImages) compressedImages = await handleImageCompression();
      const body = {
        routeId: currentRoute._id,
        orderId: searchId,
        userId: userInfo._id,
        orderType,
        message,
        uploadedImages: compressedImages,
      };

      await sendNote(body);
      await handleGetNotes();
      setUploadedImages(null);
      setMessage('');
      imageInputRef.current.value = null;
      textInputRef.current.value = null;
      textInputRef.current.style.height = '15rem';
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

  return (
    <S.NotesContainer>
      {loading && <SpinnerLoading />}
      <S.MessagesContainer>
        {notes?.length > 0 &&
          notes?.map((note, index) => {
            return (
              <S.MessageBoxContainer
                key={note._id}
                ref={(el) =>
                  index === notes?.length - 1
                    ? (lastMessageRef.current = el)
                    : null
                }
              >
                <S.MessageBox>
                  <S.Message>
                    {note?.image && note?.image?.length > 0 && (
                      <S.ImageContainer>
                        {note?.image?.map((image, index) => (
                          <S.Image
                            key={index}
                            src={`${process.env.REACT_APP_CUSTOMER_API_BACKEND_URL_BASE}${image}`}
                            alt='Image'
                          />
                        ))}
                      </S.ImageContainer>
                    )}
                    {note.message}
                  </S.Message>
                  <S.Time>
                    {dayjs(note?.createdAt).format('DD/MMM/YYYY, hh:mm')}
                  </S.Time>
                </S.MessageBox>
              </S.MessageBoxContainer>
            );
          })}
      </S.MessagesContainer>
      <S.NoteContainer>
        <S.NoteBox>
          <S.Note
            ref={textInputRef}
            placeholder='Add note here...'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            style={{ height: `${textInputRef.current?.scrollHeight}px` }}
          />
          {uploadedImages && (
            <S.ImageContainer>
              {Object.keys(uploadedImages).map((key, index) => (
                <S.Image
                  key={index}
                  src={window.URL.createObjectURL(uploadedImages[key])}
                  alt=''
                />
              ))}
            </S.ImageContainer>
          )}
        </S.NoteBox>
      </S.NoteContainer>
      <S.ButtonsContainer>
        <S.ButtonsSubContainer>
          <input
            id='image-input'
            ref={imageInputRef}
            type='file'
            name='myImage'
            accept='image/*'
            multiple='multiple'
            onChange={(e) => setUploadedImages(e.target.files)}
            className='hidden'
          />
          <label htmlFor='image-input'>
            <S.IconsContainer>
              <CameraSvg fill={C.colorGrey3} className='mx-6' width={20} />
            </S.IconsContainer>
          </label>
        </S.ButtonsSubContainer>
        <S.ButtonsSubContainer>
          <S.SendButton onClick={handleSendMessage}>Send</S.SendButton>
        </S.ButtonsSubContainer>
      </S.ButtonsContainer>
    </S.NotesContainer>
  );
}
