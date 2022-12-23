import React, { useState } from 'react';
import * as S from './InvoiceMenuStyled';
//utils
import downloadPDFHelper from 'utils/downloadPDFHelper';
import PropTypes from 'prop-types';
//icons
import invoiceIcon from 'assets/icons/invoiceIcon.svg';

function InvoiceMenu({ routeId, status }) {
  const [openDownload, setOpenDownload] = useState(false);

  return (
    <S.DownloadMenu onClick={() => setOpenDownload(!openDownload)}>
      <S.DownloadIcon src={invoiceIcon} alt='' openDownload={openDownload} />
      {openDownload && (
        <S.MenuContainer>
          <S.MenuItem
            target='_blank'
            rel='noopener noreferrer'
            href={`${process.env.REACT_APP_IMAGE_URL}/invoices/${routeId}.pdf`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Invoice
          </S.MenuItem>
          <hr />
          <S.MenuItem
            target='_blank'
            rel='noopener noreferrer'
            onClick={() =>
              downloadPDFHelper(
                `${process.env.REACT_APP_BACKEND_URL_2}/pdf/business/bol/${routeId}`
              )
            }
          >
            BOL
          </S.MenuItem>
          <hr />
          <S.MenuItem
            target='_blank'
            rel='noopener noreferrer'
            onClick={() =>
              downloadPDFHelper(
                `${process.env.REACT_APP_BACKEND_URL_2}/pdf/business/label/${routeId}`
              )
            }
          >
            Label
          </S.MenuItem>
        </S.MenuContainer>
      )}
    </S.DownloadMenu>
  );
}

InvoiceMenu.propTypes = {
  status: PropTypes.string,
  routeId: PropTypes.string,
};

export default InvoiceMenu;
