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
    }
};

const WikiAzurePortal = () => {
    return (
        <div>
            <h2 style={styles.title}>Azure Portal (Microsoft FTEs)</h2>
            <p style={styles.content}>
                <ol>
                    <li>
                        <a target='_blank' rel="noreferrer" href='https://www.osgwiki.com/wiki/Azure_Credit'>Make sure</a> you have a
                        personal Microsoft account, associated with your FTE Microsoft account
                        in order to get free monthly Azure credits
                    </li>
                    <li>
                        Download <a target='_blank' rel="noreferrer"
                                                             href='https://github.com/KarinBrisker/kinderguard-app/blob/main/setup.ps1'>this
                        script</a> and <a target='_blank' rel="noreferrer"
                                          href='https://github.com/KarinBrisker/kinderguard-app/blob/main/template.json'>this
                        template</a> from
                        GitHub.
                    </li>
                    <li>
                        Install Powershell for your operating system
                    </li>
                    <li>
                        Start a new powershell script and cd into the directory where the
                        script <strong>setup.ps1</strong> was
                        downloaded
                    </li>
                    <li>
                        Run <strong>./setup.ps1</strong><br/>
                        The script will open a browser window where you will have to login into your personal Microsoft
                        account into Azure
                    </li>
                    <li>
                        Wait for the script to create the relevant resources in Azure
                    </li>
                    <li>
                        In the directory where setup.ps1, there should now be a new file with all your account
                        information called <strong>VIAccountInformation</strong>
                    </li>
                    <li>
                        In the <strong>VIAccountInformation</strong> file, take the link
                        called <strong>GenerateTokenUrl</strong> and navigate to it in a browser.
                    </li>
                    If the link does not work, you can access the same resource through <strong>portal.azure.com ->
                    resource groups -> youralias-rg -> viaccountyouralias -> Management -> Management API</strong>
                    <li>
                        Set the permission type to <strong>Contributor</strong> and the scope
                        to <strong>Account</strong>, then select <strong>Generate</strong> to get
                        the
                        access token.
                    </li>
                </ol>
                <h5>Congrats! You can now use the kinderguard app with your credentials!</h5><br/>

                <h6>Where to find each credential:</h6>
                <ul>
                    <li>
                        <strong>Account ID</strong>: can be found in your <strong>VIAccountInformation</strong> file
                    </li>
                    <li>
                        <strong>Token</strong>: generated in Azure Portal - expires after one hour
                    </li>
                    <li>
                        <strong>API Location</strong>: by default <strong>eastus</strong> but you can always check the
                        region in Azure Portal
                    </li>
                </ul>

            </p>
        </div>

    );
}

export {
    WikiAzurePortal
};