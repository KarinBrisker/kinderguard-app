# Login to Azure
az login

# Get the subscription ID
$account = az account show --output json | ConvertFrom-Json
$subscriptionId = $account.id
$username = $account.user.name
# Split the email address into name and domain
$parts = $username -split "@"
$name = $parts[0].ToLower()
$domain = $parts[1] -replace "\.com$", ""

# Define the resource group and template file
$resourceGroupName = $name +"-rg"
$templateFile = "template.json"


#create resource group 
az group create --name $resourceGroupName --location "East US"
Write-Output "Created Resource group $resourceGroupName"

# Run the ARM deployment
Write-Output "deploying ARM template"
az deployment group create  --resource-group  $resourceGroupName --template-file $templateFile --parameters name=$name
if ($LASTEXITCODE -eq 0) {
    Write-Output "Deployment succeeded."
}
else {
    Write-Output "failed"
    exit 1
}

Write-Output "Getting account details"

# Define the .env file path
$envFilePath = "VIAccountInformation"
$accountName = "viaccount$name"
# Write the subscription ID to the .env file


$resourceId = "/subscriptions/$subscriptionId/resourceGroups/$resourceGroupName/providers/Microsoft.VideoIndexer/accounts/$accountName"
$resource = az resource show --ids $resourceId  --output json | ConvertFrom-Json
# Extract account ID and location
$accountId = $resource.properties.accountId
$location = $resource.location

@"
Video Indexer Account Name= $accountName
Video Indexer Account ID = $accountId
Location = $location
"@ | Out-File -FilePath $envFilePath -Encoding utf8


# Output a message to the console
Write-Output "Account info has been written to $envFilePath"
$generateTokenUrl = "https://portal.azure.com/#$name$domain.onmicrosoft.com/resource/subscriptions/$subscriptionId/resourceGroups/$resourceGroupName/providers/Microsoft.VideoIndexer/accounts/$accountName/management_api_item"
Write-Output "Please go to $generateTokenUrl to generate a Video Indexer token"

Add-Content -Path $envFilePath -Value "GenerateTokenUrl='$generateTokenUrl'"
