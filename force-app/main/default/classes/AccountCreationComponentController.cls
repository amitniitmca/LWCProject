public with sharing class AccountCreationComponentController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        try {
            return [SELECT Id, Name FROM Account];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Account> getAccountsOfType(String accountType){
        try {
            return [SELECT Id, Name FROM Account WHERE Type = :accountType];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Id createAccount(String name){
        try {
            Account acc = new Account(Name=name);
            INSERT acc;
            return acc.Id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}