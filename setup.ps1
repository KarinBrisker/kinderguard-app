# Prompt the user for a name
$name = Read-Host -Prompt 'Enter  your alias'
$domain = Read-Host -Prompt 'Enter  your domain (hotmail or outlook)'

# Define the resource group and template file
$resourceGroupName = $name +"-rg"
$templateFile = "template.json"

# Login to Azure
az login

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
# Get the subscription ID
$subscription = (Get-AzContext).Subscription
$subscriptionId = $subscription.Id
$tenetId = $subscription.TenantId

# Define the .env file path
$envFilePath = ".env"
$accountName = "viaccount$name"
# Write the subscription ID to the .env file


$resourceId = "/subscriptions/$subscriptionId/resourceGroups/$resourceGroupName/providers/Microsoft.VideoIndexer/accounts/$accountName"
$resource = Get-AzResource -ResourceId $resourceId
# Extract account ID and location
$accountId = $resource.Properties.accountId
$location = $resource.Location

@"
AccountName= `'$accountName`'
ResourceGroup= `'$resourceGroupName' 
SubscriptionId = `'$subscriptionId`' 
TenantId = `'$tenetId`' 
VUE_APP_API_URL = 'https://api.videoindexer.ai'
VUE_APP_ACCOUNT_ID = '$accountId'
VUE_APP_LOCATION = '$location'
"@ | Out-File -FilePath $envFilePath -Encoding utf8


# Output a message to the console
Write-Output "Account info has been written to $envFilePath"
$generateTokenUrl = "https://portal.azure.com/#@$name$domain.onmicrosoft.com/resource/subscriptions/$subscriptionId/resourceGroups/$resourceGroupName/providers/Microsoft.VideoIndexer/accounts/$accountName/management_api_item"
Write-Output "Please go to $generateTokenUrl to generate a Video Indexer token"

Add-Content -Path $envFilePath -Value "GenerateTokenUrl='$generateTokenUrl'"
