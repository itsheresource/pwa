import React, { useRef } from 'react';
import { createPortal } from 'react-dom';

// Components
import * as S from './AddressInputStyledComponents';

// Utils
import PlacesAutocomplete from 'react-places-autocomplete';
import arrowIcon from 'assets/icons/findLocationArrow.svg';
import PropTypes from 'prop-types';
import arrowRight from 'assets/icons/arrowRight.svg';
import Geocode from 'react-geocode';
import rings from 'assets/icons/rings.svg';

Geocode.setApiKey('AIzaSyDEksCzAbC0kAihR6yBLfllyQSzboiadR0');

export default function AddressInput({
  address,
  handleChange,
  handleSelect,
  icon,
  borderBottom,
  type,
  suggestionsEl,
  isShowNextButton,
  setOnFocus,
  onFocus,
}) {
  const inputRef = useRef();

  const positionError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        console.error('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        console.error('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        console.error('An unknown error occurred.');
        break;
      default:
        console.error('Error');
    }
  };

  const setCurrentPosition = async (position) => {
    try {
      const response = await Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      const address = response.results[0].formatted_address;
      handleSelect({
        fullAddress: address,
        userCurrentLat: position.coords.latitude,
        userCurrentLng: position.coords.longitude,
        type,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetPickupGeoLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        setCurrentPosition,
        positionError,
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    } else {
      console.warn('GeoLocation access not allowed');
    }
  };

  return (
    <S.LocationContainer>
      <S.IconContainer>
        <S.Icon src={icon} alt='' />
      </S.IconContainer>
      <S.InputContainer className={borderBottom ? 'border-b' : ''}>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={(address) => {
            handleSelect({ fullAddress: address });
            inputRef.current.blur();
          }}
          shouldFetchSuggestions={address?.length >= 3}
          searchOptions={{
            location: new window.google.maps.LatLng(49.2827, -123.1207),
            radius: 200000,
            componentRestrictions: { country: ['ca'] },
          }}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <S.InputSection>
              <S.Input
                ref={inputRef}
                {...getInputProps({
                  placeholder: `Add ${type} location`,
                  className: 'location-search-input',
                })}
                aria-expanded={true}
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(!onFocus)}
                type='search'
              />
              <div className='autocomplete-dropdown-container'>
                {loading && <img src={rings} alt='' width={15} />}
                {suggestions.length > 0 &&
                  onFocus &&
                  createPortal(
                    <S.SuggestionsContainer isShowNextButton={isShowNextButton}>
                      <S.Suggestions>
                        {suggestions.map((suggestion) => (
                          <S.SuggestionContainer
                            key={suggestion.description}
                            {...getSuggestionItemProps(suggestion, {})}
                          >
                            <div>
                              <S.SecondaryText>
                                {suggestion.formattedSuggestion?.mainText}
                              </S.SecondaryText>
                              <S.MainText>
                                {suggestion.formattedSuggestion?.secondaryText}
                              </S.MainText>
                            </div>
                            <div>
                              <S.ArrowRight src={arrowRight} alt='' />
                            </div>
                          </S.SuggestionContainer>
                        ))}
                      </S.Suggestions>
                    </S.SuggestionsContainer>,
                    suggestionsEl.current
                  )}
              </div>
            </S.InputSection>
          )}
        </PlacesAutocomplete>
        <S.FindLocationButtonContainer>
          <S.FindLocationButton onClick={handleGetPickupGeoLocation}>
            <S.Arrow src={arrowIcon} alt='' />
          </S.FindLocationButton>
        </S.FindLocationButtonContainer>
      </S.InputContainer>
    </S.LocationContainer>
  );
}

AddressInput.propTypes = {
  address: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  borderBottom: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  isShowNextButton: PropTypes.bool.isRequired,
  suggestionsEl: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  setOnFocus: PropTypes.func,
  onFocus: PropTypes.bool,
};

AddressInput.defaultProps = {
  address: '',
  borderBottom: false,
};
