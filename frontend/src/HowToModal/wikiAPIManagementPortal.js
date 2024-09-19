const styles = {
    title: {
        margin: '0 0 10px 0',
        fontSize: '1.5em',
    },
    content: {
        margin: '0',
        fontSize: '1em',
        color: '#333333',
    },
    sublist: {
        listStyleType: 'lower-alpha'
    }
};

const WikiAPIManagementPortal = () => {
    return (
        <div>
            <h2 style={styles.title}>API Management portal (Trial / Paid account)</h2>
            <p style={styles.content}>
                <ol>
                    <li>
                        Go to <a href='https://aka.ms/vi-dev-portal'>developer portal</a>. You will be welcomed with the Video Indexer developer portal landing page, just press the ‘Sign-in’ button on the top-right corner of the ‘Get Started’ button, to authenticate.
                    </li>
                    <li>
                        Go to the ‘Get Accounts Authorization’ under the ‘APIs’ tab.
                    </li>
                    <li>
                        Generate the access token with edit permissions by setting the appropriate parameters and hitting ‘Send’:
                        <ul styles={styles.sublist}>
                            <li>Location – ‘trial’ (or for non-trial account enter the region for your account).</li>
                            <li>AccountId - the id of your account (will appear in Video Indexer UI)</li>
                            <li>allow edit - true</li>
                        </ul>
                    </li>
                </ol>
            </p>
        </div>

    );
}

export { WikiAPIManagementPortal };