import React, { useState } from 'react';
import { HowToModal } from "../HowToModal/howToModal";
import { MDBInput } from 'mdb-react-ui-kit';

const CredentialsInput = (props) => {
    const [accountId, setAccountId] = useState('43844c97-2240-400a-98a0-6674a9587014');
    const [token, setToken] = useState('');
    const [location, setLocation] = useState('eastus');

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const handleAccountIDChange = (event) => {
        setAccountId(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const tokenInput = (
        <MDBInput
            autoComplete="on"
            name='user[token]'
            label="Token"
            id="token"
            type="text"
            onChange={handleTokenChange}
            value={token}
        />
    );

    const accountInput = (
        <MDBInput
            autoComplete="on"
            name='user[account]'
            label="Account ID"
            id="account_id"
            type="text"
            onChange={handleAccountIDChange}
            value={accountId}
        />
    );

    const locationInput = (
        <MDBInput
            autoComplete="on"
            name='user[location]'
            label="API Location"
            id="api_location"
            type="text"
            onChange={handleLocationChange}
            value={location}
        />
    );

    return (
        <div>
            {accountInput}
            <br />
            {tokenInput}
            <br />
            {locationInput}
            <br />
            <HowToModal />
        </div>
    );
};

export { CredentialsInput };