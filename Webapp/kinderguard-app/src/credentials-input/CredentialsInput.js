import React, { useState } from 'react';

const styles = {
    container: {
        backgroundColor: '#1e1e1e',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    authBox: {
        backgroundColor: '#1e1e1e',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    inputField: {
        width: '300px',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #333',
        backgroundColor: '#2c2c2c',
        color: '#ffffff',
        fontSize: '1em',
    }
}

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
        <div style={styles.authBox}>
            <label>Token:</label>
            <input style={styles.inputField}
                type="password"
                value={token}
                onChange={handleTokenChange}
                placeholder="Token"
            />
        </div>
    )

    const accountInput = (
        <div style={styles.authBox}>
            <label>Account ID:</label>
            <input style={styles.inputField}
                type="text"
                value={accountId}
                onChange={handleAccountIDChange}
                placeholder="Account ID"
            />
        </div>
    )


    const locationInput = (
        <div style={styles.authBox}>
            <label>API location</label>
            <input style={styles.inputField}
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Type the location for your API"
            />
        </div>
    )

    return (
        <div style={styles.container}>
            {accountInput}
            {tokenInput}
            {locationInput}
        </div>
    );
};

export { CredentialsInput };