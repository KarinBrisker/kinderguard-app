import React from 'react';
import { HowToModal } from "../HowToModal/howToModal";
import { MDBInput } from 'mdb-react-ui-kit';

/**
 * Component for inputting credentials (Account ID, Token, API Location)
 * with an additional modal for instructions.
 */
const styles = {
    container: {
        width: '600px',
        margin: 'auto',
        textAlign: 'center',
        padding: '60px',
        marginTop: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '1.8em',
        marginBottom: '40px',
        marginTop: '30px',
        color: '#333333',
    },
    inputField: {
        width: '100%',
        height: '45px',          // Consistent height for input fields
        padding: '12px',          // Inner padding for text
        fontSize: '1em',          // Uniform font size
        borderRadius: '8px',      // Rounded corners
        border: '1px solid #ccc', // Light border
        marginBottom: '15px',     // Space between input fields
        boxSizing: 'border-box',  // Ensure the field takes up full space
    },
};

const CredentialsInput = (props) => {
    const {
        token,
        accountId,
        onChangeAccountId,
        onChangeToken,
        location,
        onChangeLocation
    } = props;

    const handleTokenChange = (event) => onChangeToken(event.target.value);
    const handleAccountIDChange = (event) => onChangeAccountId(event.target.value);
    const handleLocationChange = (event) => onChangeLocation(event.target.value);

    return (
        <div style={styles.container}>
            
            {/* Login title */}
            <h2 style={styles.title}>Login</h2>

            {/* Account ID input */}
            <MDBInput
                style={styles.inputField}
                autoComplete="on"
                name='user[account]'
                label="Account ID"
                id="account_id"
                type="text"
                onChange={handleAccountIDChange}
                value={accountId}
            />
            <br />

            {/* Token input */}
            <MDBInput
                style={styles.inputField}
                autoComplete="on"
                name='user[token]'
                label="Token"
                id="token"
                type="text"
                onChange={handleTokenChange}
                value={token}
            />
            <br />

            {/* API location input */}
            <MDBInput
                style={styles.inputField}
                autoComplete="on"
                name='user[location]'
                label="API location"
                id="api_location"
                type="text"
                onChange={handleLocationChange}
                value={location}
            />
            <br />

            {/* Modal for additional instructions */}
            <HowToModal />
        </div>
    );
};

export { CredentialsInput };