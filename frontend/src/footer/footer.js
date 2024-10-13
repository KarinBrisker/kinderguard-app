import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBBtn
} from 'mdb-react-ui-kit';

export function Footer() {
    return (
        <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
            <MDBContainer className='p-4 pb-0'>
                <section className=''>
                    <p className='d-flex justify-content-center align-items-center'>
                        <span className='me-3'>We'd love to connect with you. To ask for more features, add new toxic words, or just connect with us</span>
                        <MDBBtn size='lg' type='button' outline color="light" rounded href='https://forms.gle/L4uaMaUCuopHdNEx9' target='_blank'>
                            Click here!
                        </MDBBtn>
                    </p>
                </section>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2024 Copyright:
                <a className='text-white' href='https://forms.gle/L4uaMaUCuopHdNEx9' target='_blank'>
                    Kinderguard's team
                </a>
            </div>
        </MDBFooter>
    );
}