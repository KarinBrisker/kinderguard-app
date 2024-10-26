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

    // Toggle modal open/close state
    const toggleOpen = () => setBasicModal(!basicModal);

    return (
        <>
            {/* Main button to open the modal */}


            <MDBBtn         size='lg'
                            type='button'
                            outline
                            color="light"
                            rounded
                            target='_blank'
                            onClick={toggleOpen}>{buttonTitle}</MDBBtn>

            {/* Modal component */}
            <MDBModal open={basicModal} onClose={toggleOpen} tabIndex='-1'>
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{modalTitle}</MDBModalTitle>
                            {/* Close button as an 'X' icon only */}
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        
                        {/* Modal body content */}
                        <MDBModalBody>{modalContent}</MDBModalBody>

                        {/* Modal footer with white text on the close button */}
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpen} style={{ color: '#ffffff' }}>
                                {closeButtonTitle || 'Close'}
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export { InfoButtonWithModal };