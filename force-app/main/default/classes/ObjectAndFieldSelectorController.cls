public with sharing class ObjectAndFieldSelectorController {
    
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getObjects(){
        try {
            Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
            Map<String, String> objectMap = new Map<String, String>();
            for(String key : schemaMap.keySet()){
                Schema.DescribeSObjectResult tempObjectResult = schemaMap.get(key).getDescribe();
                if(tempObjectResult.isCreateable() == true 
                    && tempObjectResult.isUpdateable() == true 
                    && tempObjectResult.isQueryable() == true 
                    && tempObjectResult.isAccessible() == true
                    && tempObjectResult.isCustomSetting() == false){
                        objectMap.put(tempObjectResult.getName(), tempObjectResult.getLabel());
                    }
            }
            System.debug(objectMap);
            return objectMap;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, String> getRequiredFields(String objectName){
        try {
            Schema.DescribeSObjectResult objectResult = Schema.getGlobalDescribe().get(objectName).getDescribe();
            Map<String, String> myFieldMap = new Map<String, String>();
            Map<String, Schema.SObjectField> fieldMap = objectResult.fields.getMap();
            for(String key : fieldMap.keySet()){
                Schema.DescribeFieldResult fieldResult = fieldMap.get(key).getDescribe();
                if(fieldResult.isCreateable() == true 
                    && fieldResult.isUpdateable() == true 
                    && fieldResult.isAccessible() == true
                    && fieldResult.isNillable() == false){
                        myFieldMap.put(fieldResult.getName(), fieldResult.getLabel());
                    }
            }
            return myFieldMap;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getNormalFields(String objectName){
        try {
            Schema.DescribeSObjectResult objectResult = Schema.getGlobalDescribe().get(objectName).getDescribe();
            Map<String, String> myFieldMap = new Map<String, String>();
            Map<String, Schema.SObjectField> fieldMap = objectResult.fields.getMap();
            for(String key : fieldMap.keySet()){
                Schema.DescribeFieldResult fieldResult = fieldMap.get(key).getDescribe();
                if(fieldResult.isCreateable() == true 
                    && fieldResult.isUpdateable() == true 
                    && fieldResult.isAccessible() == true 
                    && fieldResult.isNillable() == true){
                        myFieldMap.put(fieldResult.getName(), fieldResult.getLabel());
                    }
            }
            return myFieldMap;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}