import { LightningElement, wire, track } from 'lwc';
import getStandards from '@salesforce/apex/StudentService.getStandards';

export default class StudentDetails extends LightningElement {

    @track crRecord;

    @wire(getStandards)
    wiredGetStandards({data, error}){
        if(data){
            this.crRecord = data;
        }
        if(error){
            console.log(error);
        }
    }

    handleOnInserted(){
        const obj = this.template.querySelector("c-students-records");
        obj.refreshData();
    }
}