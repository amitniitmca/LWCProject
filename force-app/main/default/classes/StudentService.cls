public with sharing class StudentService {
    @AuraEnabled(cacheable=true)
    public static List<Classroom__c> getStandards(){
        try {
            return [SELECT Id, Standard__c FROM Classroom__c WITH SECURITY_ENFORCED ORDER BY Standard__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean insertStudent(Map<String, Object> values){
        try {
            Student__c student = new Student__c();
            student.First_Name__c = (String) values.get('firstName');
            student.Last_Name__c = (String) values.get('lastName');
            student.Classroom__c = (String) values.get('classroom');
            student.Joining_Date__c = parseDateString((String) values.get('dateOfJoining'));
            if(values.get('age') != null){
                student.Age__c = Integer.valueOf((String) values.get('age'));
            }
            if(values.get('gender') != null){
                student.Gender__c = (String) values.get('gender');
            }
            if(values.get('address') != null){
                student.Address__c = (String) values.get('address');
            }
            System.debug(student);
            INSERT student;
            System.debug(student);
            return true;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    private static Date parseDateString(String doj){
        Integer yy = Integer.valueOf(doj.split('-')[0]);
        Integer mm = Integer.valueOf(doj.split('-')[1]);
        Integer dd = Integer.valueOf(doj.split('-')[2]);
        return Date.newInstance(yy, mm, dd);
    }
}