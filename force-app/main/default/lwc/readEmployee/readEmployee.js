import { LightningElement, api, wire} from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import FN from '@salesforce/schema/Employee__c.First_Name__c';
import LN from '@salesforce/schema/Employee__c.Last_Name__c';
import CNT from '@salesforce/schema/Employee__c.Country__c';

export default class ReadEmployee extends LightningElement {

    @api recId;

    @wire(getRecord, {recordId : '$recId', fields: [FN, LN, CNT]})
    record;

    @api show(){
        console.log('SHOW');
        console.log(this.record);
    }
}