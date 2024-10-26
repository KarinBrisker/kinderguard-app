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

const Disclaimer = () => {
    const [topRightModal, setTopRightModal] = useState(false);

    // Toggles the modal's open/close state
    const toggleOpen = () => setTopRightModal(!topRightModal);

    return (
        <>
            {/* Button to open the Disclaimer modal */}
            <MDBBtn onClick={toggleOpen} color="info" className="mb-4">
                Disclaimer
            </MDBBtn>
            
            {/* Disclaimer Modal */}
            <MDBModal
                animationDirection='right'
                open={topRightModal}
                tabIndex='-1'
                onClose={() => setTopRightModal(false)}
            >
                <MDBModalDialog position='top-right' side size='lg'>
                    <MDBModalContent>
                        {/* Header with title and close button */}
                        <MDBModalHeader className='bg-info text-white'>
                            <MDBModalTitle>
                                Please read and understand the information provided before using our tool
                            </MDBModalTitle>
                            <MDBBtn
                                color='none'
                                className='btn-close btn-close-white'
                                onClick={toggleOpen}
                            />
                        </MDBModalHeader>

                        {/* Modal Body containing disclaimer information */}
                        <MDBModalBody>
                            <div className='row'>
                                {/* Icon to emphasize the importance of the disclaimer */}
                                <div className='col-3 text-center'>
                                    <i className='fas fa-exclamation-triangle fa-4x text-warning'></i>
                                </div>
                                {/* Main disclaimer text */}
                                <div className='col-9' style={{ textAlign: "left" }}>
                                    <strong>
                                        The recordings uploaded using this tool can be accessed by anyone with your account ID and video ID. Please consider this carefully.
                                    </strong>
                                    <p></p>
                                    <p>
                                        This tool is experimental and aims to assist in analyzing audio files from child care environments to detect potential abuse. It is not a substitute for professional judgment and should not be solely relied upon for decision-making. The tool may produce false positives or negatives, so results should be interpreted with caution. Always consult qualified professionals in sensitive or potentially harmful situations.
                                    </p>
                                </div>
                            </div>
                        </MDBModalBody>

                        {/* Modal Footer with confirmation button */}
                        <MDBModalFooter>
                            <MDBBtn outline color='info' onClick={toggleOpen}>
                                I Understand
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export { Disclaimer };  