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

    const toggleOpen = () => setTopRightModal(!topRightModal);
  
    return (
      <>
        <MDBBtn onClick={toggleOpen}>Disclaimer</MDBBtn>
        <MDBModal
            animationDirection='right'
            open={topRightModal}
            tabIndex='-1'
            onClose={() => setTopRightModal(false)}
        >
          <MDBModalDialog position='top-right' side size='lg'>
            <MDBModalContent>
            <MDBModalHeader className='bg-info text-white'>
              <MDBModalTitle>Please read and understand the information provided before using our tool</MDBModalTitle>
              <MDBBtn
                color='none'
                className='btn-close btn-close-white'
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className='row'>
                <div className='col-3 text-center'>
                  <i className='fas fa-bell fa-4x text-info'></i>
                </div>

                <div className='col-9' style={{textAlign:"left"}}>
                <strong>The recordings uploaded using this tool can be accessed by anyone that has your account id and video id. Please take it into account.</strong><p></p>
                  <p>This tool is experimental and is designed to assist in the analysis of
                    audio files from child care environments to help detect potential abuse. It is not a substitute for
                    professional judgment and should not be relied upon as the sole basis for any decision-making. The tool
                    may produce false positives or false negatives, and its results should be interpreted with caution.
                    Always consult with qualified professionals when dealing with sensitive and potentially harmful
                    situations.</p>
                </div>
              </div>
            </MDBModalBody>
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
  }


export { Disclaimer };