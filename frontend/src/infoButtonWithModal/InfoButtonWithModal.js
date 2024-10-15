import React, { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';

const InfoButtonWithModal = (props) => {
    const [basicModal, setBasicModal] = useState(false);

    const { buttonTitle, modalTitle, modalContent, closeButtonTitle } = props;

    const toggleOpen = () => setBasicModal(!basicModal);

    const closeButtonText =  closeButtonTitle ?? 'Close'
    return (
        <>
        <MDBBtn onClick={toggleOpen}>{buttonTitle}</MDBBtn>
        <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{modalTitle}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}>{closeButtonText}</MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{modalContent}</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
       
        </>
    );
};


export { InfoButtonWithModal };