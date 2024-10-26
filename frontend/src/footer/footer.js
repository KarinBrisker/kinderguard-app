import React from 'react';
import { MDBFooter, MDBContainer, MDBBtn } from 'mdb-react-ui-kit';

export function Footer() {
    return (
        <MDBFooter className='text-center text-white' style={{ backgroundColor: 'rgba(10, 66, 117, 0.8)', position: 'fixed', bottom: 0, width: '100%', padding: '10px 0', zIndex: 10 }}>
            <MDBContainer className='p-4 pb-0'>
                <section className=''>
                    <p className='d-flex justify-content-center align-items-center'>
                        <span className='me-3'>
                            We'd love to connect with you. To ask for more features, add new toxic words, or just connect with us
                        </span>
                        <MDBBtn
                            size='lg'
                            type='button'
                            outline
                            color="light"
                            rounded
                            href='https://forms.gle/L4uaMaUCuopHdNEx9'
                            target='_blank'
                        >
                            Click here!
                        </MDBBtn>
                    </p>
                    <div className='text-center p-3'>
                © 2024 Kinderguard's Team. All rights reserved.
            </div>
                </section>
            </MDBContainer>
        </MDBFooter>
    );
}