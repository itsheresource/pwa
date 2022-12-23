import React from 'react';

// Utils
import StyledPopUp from 'components/Common/PopUpComponent/popUp/StyledPopUp';

// additional components
import Main from 'pages/Main';

function App() {
  return (
    <div className='App'>
      <StyledPopUp icon={false} />
      <Main />
    </div>
  );
}

export default App;
