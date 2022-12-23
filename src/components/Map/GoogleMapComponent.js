// import React from 'react'
import { useLoadScript } from '@react-google-maps/api';

// Components
// import ToastNotification from 'components/Common/ToastNotification/ToastNotification'

// Utils
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import PropTypes from 'prop-types'

const libraries = ['places'];

export default function GoogleMapComponent({ children }) {
  const { isLoaded, loadError } = useLoadScript({
    id: 'script-loader',
    googleMapsApiKey: 'AIzaSyDEksCzAbC0kAihR6yBLfllyQSzboiadR0', // process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });

  if (loadError) {
    // toast(<ToastNotification type="error" message="Map did not load!" />, {
    //   className: 'toast__container--error',
    //   hideProgressBar: true,
    // })
    console.error('error');
  }
  return isLoaded ? children : 'Map';
}

// GoogleMapComponent.propTypes = {
//   children: PropTypes.node.isRequired,
// }
