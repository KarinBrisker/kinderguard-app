from dataclasses import dataclass


@dataclass
class Consts:
    ApiVersion: str
    ApiEndpoint: str
    AzureResourceManager: str
    AccountName: str
    ResourceGroup: str
    SubscriptionId: str
    TenantId: str

    def __post_init__(self):
        print('Checking if all required fields are filled in...')
        print(self.ApiVersion)
        print(self.ApiEndpoint)
        print(self.AzureResourceManager)
        print(self.AccountName)
        print(self.ResourceGroup)
        print(self.SubscriptionId)
        print(self.TenantId)
        
        if self.AccountName is None or self.AccountName == '' \
            or self.ResourceGroup is None or self.ResourceGroup == '' \
            or self.SubscriptionId is None or self.SubscriptionId == '':
            raise ValueError('Please Fill In SubscriptionId, Account Name and Resource Group on the Constant Class!')