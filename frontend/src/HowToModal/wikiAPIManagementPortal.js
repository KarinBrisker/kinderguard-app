const styles = {
    title: {
        margin: '0 0 10px 0',
        fontSize: '1.5em',
    },
    content: {
        margin: '0',
        fontSize: '1em',
        color: '#333333',
        textAlign: 'left'
    },
    sublist: {
        listStyleType: 'lower-alpha'
    }
};

const WikiAPIManagementPortal = () => {
    return (
        <div>
            <h2 style={styles.title}>Video Indexer API Portal (Trial or Paid account)</h2>
            <p style={styles.content}>
                <ol>
                    <li>
                        Create a trial or a paid <a target='_blank' href='https://vi.microsoft.com/' rel="noreferrer">Video
                        Indexer account</a>
                    </li>
                    <li>
                        From the Video Indexer website, extract your <strong>Account ID</strong> by clicking on your
                        username in the topbar and copying the ID that appears in the sidebar. Keep your account ID for
                        later.
                    </li>
                    <li>
                        Go to <a target='_blank' href='https://aka.ms/vi-dev-portal' rel="noreferrer">Video Indexer
                        developer portal</a>.
                    </li>
                    <li>Press the <strong>Sign-in</strong> button on the top-right
                        corner of the <strong>Get Started</strong> button, to authenticate.
                    </li>
                    <li>
                        Click on the <strong>APIs</strong> tab.
                    </li>
                    <li>
                        Scroll to <strong>Get Account Access Token</strong> or look it up in the search bar on the left
                    </li>
                    <li>
                        Click on the green button <strong>Try it</strong>
                    </li>
                    <li>
                        Generate the access token with edit permissions by setting the appropriate parameters and
                        hitting <strong>Send</strong>:
                        <ul styles={styles.sublist}>
                            <li><strong>location</strong>: ‘trial’ (or for non-trial account enter the region for your
                                account).
                            </li>
                            <li><strong>accountId</strong>:the id of your account (will appear in Video Indexer UI)</li>
                            <li><strong>allowEdit</strong>: true</li>
                        </ul>
                    </li>
                </ol>

                <h5>Congrats! You can now use the kinderguard app with your credentials!</h5><br/>

                <h6>Where to find each credential:</h6>
                <ul>
                    <li>
                        <strong>Account ID</strong>: can be found by signing into your account in <strong>Video Indexer Website</strong> and clicking on your account name in the top bar. The account ID can be found on the sidebar that opens on the right.
                    </li>
                    <li>
                        <strong>Token</strong>: generated in the <a target='_blank' href='https://aka.ms/vi-dev-portal'
                                                                rel="noreferrer">Video Indexer developer portal</a> - expires after one hour
                    </li>
                    <li>
                        <strong>API Location</strong>: for trial accounts, the API Location is <strong>trial</strong>,
                        for paid accounts, enter the region of your account (for example, <strong>eastus</strong>)
                    </li>
                </ul>

            </p>
        </div>

    );
}

export { WikiAPIManagementPortal };