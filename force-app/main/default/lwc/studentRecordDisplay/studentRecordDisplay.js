import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ADM_NO from '@salesforce/schema/Student__c.Name';
import FN from '@salesforce/schema/Student__c.First_Name__c';
import LN from '@salesforce/schema/Student__c.Last_Name__c';
import AGE from '@salesforce/schema/Student__c.Age__c';

export default class StudentRecordDisplay extends LightningElement {
    @api recordId;

    studentRecord;
    error;
    @wire(getRecord, {recordId : '$recordId', fields : [ADM_NO, FN, LN, AGE]})
    wiredGetRecord({data, error}){
        if(data){
            this.studentRecord = data;
            console.log(this.studentRecord.fields.Name.value);
        }
        if(error){
            this.error = error;
            console.log(error);
        }
    }
}