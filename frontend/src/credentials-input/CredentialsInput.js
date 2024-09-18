import React from 'react';
import { HowToModal } from "../HowToModal/howToModal";
import { MDBInput } from 'mdb-react-ui-kit';

const CredentialsInput = (props) => {
    const {
        token,
        accountId,
        onChangeAccountId,
        onChangeToken,
        location,
        onChangeLocation
    } = props;

    const handleTokenChange = (event) => {
        onChangeToken(event.target.value);
    };

    const handleAccountIDChange = (event) => {
        onChangeAccountId(event.target.value);
    };

    const handleLocationChange = (event) => {
        onChangeLocation(event.target.value);
    };

    const tokenInput = (
        <MDBInput label="Token" id="token" type="text" onChange={handleTokenChange} value={token} />
    )

    const accountInput = (
        <MDBInput label="Account ID" id="account_id" type="text" onChange={handleAccountIDChange} value={accountId} />
    )


    const locationInput = (
        <MDBInput label="API location" id="api_location" type="text" onChange={handleLocationChange} value={location} />
    )


    return (
        <div>
            {accountInput}
            <br></br>
            {tokenInput}
            <br></br>
            {locationInput}
            <br></br>
            <HowToModal/>
        </div>
    );
};

export { CredentialsInput };