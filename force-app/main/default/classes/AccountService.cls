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
}