import React, { useState } from 'react';

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
        <div>
            <label>Token:</label>
            <input
                type="password"
                value={token}
                onChange={handleTokenChange}
                placeholder="Enter your password"
            />
        </div>
    )

    const accountInput = (
        <div>
            <label>Account ID:</label>
            <input
                type="text"
                value={accountId}
                onChange={handleAccountIDChange}
                placeholder="Enter your account id"
            />
        </div>
    )


    const locationInput = (
        <div>
            <label>API location</label>
            <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Type the location for your API"
            />
        </div>
    )

    return (
        <div>
            {tokenInput}
            {accountInput}
            {locationInput}
        </div>
    );
};

export { CredentialsInput };