## How to use free Azure credits with this app (microsoft employees only) 
- Follow this guide: [How to get Free Azure Credits - Microsoft Employees Only ](https://www.osgwiki.com/wiki/Azure_Credit)
- Keep your new personal alias written somewhere, let's say `israelisraeli`
- Install powershell for your operating system
- clone the code from github into `kinderguard` folder
- open a powershell terminal 
- cd into `kinderguard`
- run ./setup.ps1
- The script will ask for your alias and domain. 
Make sure to properly enter your alias and your domain. For instance if your personal account is `israelisraeli@outlook.com`, the alias is `israelisraeli` and the domain is `outlook`
- The script will run everything automatically and should open a window where you will login with your personal account
- After the script finishes running, it will provide you with an URL where you can generate an access token for Video Indexer. 
- You can also find the URL in the .env file as so:
```angular2html
GenerateTokenUrl='https://portal.azure.com/#@israelisraelioutlook.onmicrosoft.com/resource/subscriptions/<subscriptionid>/resourceGroups/<resourcegroupname>/providers/Microsoft.VideoIndexer/accounts/<accountname>/management_api_item'
```
- You can also access this via portal.azure.com -> resource groups -> youralias-rg -> viaccountyouralias -> Management -> Management API -> Access Token Generate 

#### Congrats! you can now use your generated access token + account id (saved in the .env file) as credentials in the Kinderguard app!
