public with sharing class EmployeeService {
    @AuraEnabled(cacheable=true)
    public static List<Employee__c> getEmployees(){
        return [SELECT Id, First_Name__c, Last_Name__c, Country__c FROM Employee__c];
    }
}