import React, { useState } from 'react';

const CredentialsInput = () => {
    const [token, setToken] = useState('');
    const [accountId, setAccountId] = useState('');

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const handleAccountIDChange = (event) => {
        setAccountId(event.target.value);
    };

    return (
        <div>
            <div>
                <label>Token:</label>
                <input
                    type="password"
                    value={token}
                    onChange={handleTokenChange}
                    placeholder="Enter your password"
                />
            </div>
            <div>
                <label>Account ID:</label>
                <input
                    type="text"
                    value={accountId}
                    onChange={handleAccountIDChange}
                    placeholder="Enter your account id"
                />
            </div>
            <div>
                <p>Current token: {token}</p>
                <p>Current account id: {accountId}</p>
            </div>
        </div>
    );
};

export default CredentialsInput;