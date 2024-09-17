const styles = {
    title: {
        margin: '0 0 10px 0',
        fontSize: '1.5em',
    },
    content: {
        margin: '0',
        fontSize: '1em',
        color: '#333333',
    }
};

const WikiAzurePortal = () => {
    return (
        <div>
            <h2 style={styles.title}>Azure Portal (Paid accounts only)</h2>
            <p style={styles.content}>
                <ol>
                    <li>
                        Navigate to your Azure AI Video Indexer account, select Management, then Management API.
                    </li>
                    <li>
                        Set the permission type to Contributor and the scope to Account, then select Generate to get the access token2.
                    </li>
                </ol>
            </p>
        </div>

    );
}

export { WikiAzurePortal };