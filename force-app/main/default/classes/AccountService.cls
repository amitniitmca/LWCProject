public with sharing class AccountService {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT Id, Name, BillingState FROM Account ORDER BY CreatedDate DESC];
    }

    @AuraEnabled
    public static Id addAccount(String acName, String bState){
        Account acc = new Account();
        acc.Name = acName;
        acc.BillingState = bState;
        INSERT acc;
        return acc.Id;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, String> getAccountTypeOptions(){
        Schema.DescribeFieldResult dfr = Account.Type.getDescribe();
        List<Schema.PicklistEntry> entries = dfr.getPicklistValues();
        Map<String, String> values = new Map<String, String>();
        for(Schema.PicklistEntry entry : entries){
            if(entry.active == true){
                values.put(entry.getLabel(), entry.getValue());
            }
        }
        return values;
    }
}