import React from 'react';

// Define component styles
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
    list: {
        paddingLeft: '20px',
    }
};

// Main component for Azure Portal instructions
const WikiAzurePortal = () => {
    return (
        <div>
            {/* Title */}
            <h2 style={styles.title}>Azure Portal (Microsoft FTEs)</h2>
            
            {/* Instructions Content */}
            <div style={styles.content}>
                <ol style={styles.list}>
                    <li>
                        Ensure you have a <a target='_blank' href='https://www.osgwiki.com/wiki/Azure_Credit' rel="noreferrer">
                        personal Microsoft account</a> associated with your FTE Microsoft account to receive free monthly Azure credits.
                    </li>
                    <li>
                        Download <a target='_blank' href='https://github.com/KarinBrisker/kinderguard-app/blob/main/setup.ps1' rel="noreferrer">this script</a> and <a target='_blank' href='https://github.com/KarinBrisker/kinderguard-app/blob/main/template.json' rel="noreferrer">this template</a> from GitHub.
                    </li>
                    <li>Install PowerShell for your operating system.</li>
                    <li>
                        Open a new PowerShell session and navigate (`cd`) to the directory where the <strong>setup.ps1</strong> script was downloaded.
                    </li>
                    <li>
                        Run <strong>./setup.ps1</strong><br />
                        The script will open a browser window where you’ll need to log into your personal Microsoft account in Azure.
                    </li>
                    <li>Wait for the script to create the necessary resources in Azure.</li>
                    <li>
                        In the same directory as <strong>setup.ps1</strong>, you should now see a file named <strong>VIAccountInformation</strong> with all your account details.
                    </li>
                    <li>
                        In the <strong>VIAccountInformation</strong> file, find the link labeled <strong>GenerateTokenUrl</strong> and open it in a browser.
                    </li>
                    <li>
                        If the link does not work, navigate to <strong>portal.azure.com → Resource groups → youralias-rg → viaccountyouralias → Management → Management API</strong>.
                    </li>
                    <li>
                        Set the permission type to <strong>Contributor</strong> and scope to <strong>Account</strong>, then click <strong>Generate</strong> to obtain the access token.
                    </li>
                </ol>

                {/* Success message */}
                <h5>Congrats! You can now use the Kinderguard app with your credentials!</h5>

                {/* Additional guidance */}
                <h6>Where to find each credential:</h6>
                <ul style={styles.list}>
                    <li><strong>Account ID</strong>: Located in the <strong>VIAccountInformation</strong> file.</li>
                    <li><strong>Token</strong>: Generated in Azure Portal; expires after one hour.</li>
                    <li><strong>API Location</strong>: Typically <strong>eastus</strong>; confirm the region in Azure Portal.</li>
                </ul>
            </div>
        </div>
    );
}

export { WikiAzurePortal };