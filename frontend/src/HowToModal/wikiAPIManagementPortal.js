import React from 'react';

// Define styles for the component
const styles = {
    title: {
        margin: '0 0 10px 0',
        fontSize: '1.5em',
        color: '#333333',
    },
    content: {
        margin: '0',
        fontSize: '1em',
        color: '#333333',
        textAlign: 'left'
    },
    sublist: {
        listStyleType: 'lower-alpha',
        paddingLeft: '20px'
    }
};

// Main component for the WikiAPI Management Portal instructions
const WikiAPIManagementPortal = () => {
    return (
        <div>
            {/* Title */}
            <h2 style={styles.title}>Video Indexer API (Trial or Paid account)</h2>
            
            {/* Content */}
            <div style={styles.content}>
                <ol>
                    <li>
                        Create a trial or a paid <a target='_blank' href='https://vi.microsoft.com/' rel="noreferrer">Video Indexer account</a>.
                    </li>
                    <li>
                        From the Video Indexer website, find your <strong>Account ID</strong> by clicking on your username in the top bar and copying the ID shown in the sidebar. Keep your account ID for later.
                    </li>
                    <li>
                        Go to the <a target='_blank' href='https://aka.ms/vi-dev-portal' rel="noreferrer">Video Indexer developer portal</a>.
                    </li>
                    <li>
                        Click <strong>Sign-in</strong> at the top-right corner to authenticate.
                    </li>
                    <li>
                        Select the <strong>APIs</strong> tab.
                    </li>
                    <li>
                        Scroll to <strong>Get Account Access Token</strong> or use the search bar to locate it.
                    </li>
                    <li>
                        Click on the green <strong>Try it</strong> button.
                    </li>
                    <li>
                        Generate the access token with edit permissions by setting the following parameters and clicking <strong>Send</strong>:
                        <ul style={styles.sublist}>
                            <li><strong>location</strong>: Enter <code>trial</code> (or your region for a non-trial account).</li>
                            <li><strong>accountId</strong>: The ID of your account (visible in the Video Indexer UI).</li>
                            <li><strong>allowEdit</strong>: Set to <code>true</code> to allow editing.</li>
                        </ul>
                    </li>
                </ol>

                {/* Success message */}
                <h5>Congrats! You can now use the Kinderguard app with your credentials!</h5>

                {/* Additional information */}
                <h6>Where to find each credential:</h6>
                <ul>
                    <li>
                        <strong>Account ID</strong>: Available by signing into your account on the <strong>Video Indexer Website</strong> and clicking on your account name in the top bar. The account ID will appear in the sidebar.
                    </li>
                    <li>
                        <strong>Token</strong>: Generated in the <a target='_blank' href='https://aka.ms/vi-dev-portal' rel="noreferrer">Video Indexer developer portal</a> (expires after one hour).
                    </li>
                    <li>
                        <strong>API Location</strong>: For trial accounts, the location is <code>trial</code>. For paid accounts, enter the region of your account (e.g., <code>eastus</code>).
                    </li>
                </ul>
            </div>
        </div>
    );
}

export { WikiAPIManagementPortal };