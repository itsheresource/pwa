import React, { useRef, useState } from 'react';

//icons
import itshere from 'assets/icons/itshere.svg';
import backButton from 'assets/icons/backButton.svg';
import CameraSvg from 'assets/icons/CameraSvg';
import account from 'assets/icons/account.svg';
import edit from 'assets/icons/edit.svg';

//styled Components
import * as S from './SideBarStyledComponents';
import * as C from 'scss/colors';

// Utils
import PropTypes from 'prop-types';
import { NormalizePhoneInput } from 'utils/NormalizePhoneInput';

//api
import { editUserInfo } from 'apis/editUserInfo/editUserInfo';
import { toForm } from 'utils/toForm';

export default function ContactInfo({
  data,
  openEditMode,
  isOpenEditMode,
  closeEditMode,
}) {
  const { profilePic, ownerName, phone, email } = data;
  const [selectedImage, setSelectedImage] = useState();
  const fileInput = useRef(null);

  const handleChangeProfileImage = (imgFile) => {
    const imgShow = URL.createObjectURL(imgFile);
    setSelectedImage(imgShow);
    editUserInfo(toForm({ profilePic: imgFile }));
  };
  const profileImageSrc = `${process.env.REACT_APP_DRIVER_API_BACKEND_URL_BASE}/${profilePic?.path}`;
  return (
    <S.HeaderContainer>
      {isOpenEditMode ? (
        <S.EditAvatarContent>
          <S.LogoContainer>
            <S.BackIcon src={backButton} alt='back' onClick={closeEditMode} />
            <S.ItsHereLogo src={itshere} alt='' />
          </S.LogoContainer>
          <S.CustomerContainer>
            <S.AvatarContainer
              onClick={() => fileInput.current && fileInput.current.click()}
            >
              {!profilePic && (
                <S.EditIconContainer>
                  <CameraSvg fill={C.colorWhite} width={28} />
                </S.EditIconContainer>
              )}
              <S.AvatarEditInfo>
                <input
                  type='file'
                  accept='image/*'
                  hidden
                  ref={fileInput}
                  onChange={(e) => handleChangeProfileImage(e.target.files[0])}
                />
                {selectedImage ? (
                  <S.ImageSelected src={selectedImage} alt='profile' />
                ) : profilePic ? (
                  <S.ImageSelected src={profileImageSrc} alt='profile' />
                ) : (
                  <img
                    src={account}
                    alt=''
                    width={70}
                    style={{ filter: 'blur(2px)' }}
                  />
                )}
              </S.AvatarEditInfo>
            </S.AvatarContainer>
          </S.CustomerContainer>
        </S.EditAvatarContent>
      ) : (
        <S.Profile>
          <S.EditProfileButton
            onClick={() => {
              openEditMode();
            }}
          >
            <img src={edit} alt='' width={14} />
            <h5 className='ml-2'> Edit profile</h5>
          </S.EditProfileButton>
          <S.CustomerName>
            <S.Avatar>
              {profilePic ? (
                <S.SideBarProfileImage src={profileImageSrc} alt='profile' />
              ) : (
                <img src={account} alt='' width={50} />
              )}
            </S.Avatar>
            <h5> {ownerName ? ownerName : 'Customer Name'}</h5>
          </S.CustomerName>
          <S.UserInfo>
            <S.InfoDetails>
              <h5>Phone</h5>
              <h3>{NormalizePhoneInput(phone)}</h3>
            </S.InfoDetails>
            <S.InfoDetails>
              <h5>Email</h5>
              <h3>{email}</h3>
            </S.InfoDetails>
          </S.UserInfo>
        </S.Profile>
      )}
    </S.HeaderContainer>
  );
}

ContactInfo.propTypes = {
  data: PropTypes.shape({
    profilePic: PropTypes.object,
    ownerName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  openEditMode: PropTypes.func.isRequired,
  isOpenEditMode: PropTypes.bool.isRequired,
  closeEditMode: PropTypes.func.isRequired,
};
