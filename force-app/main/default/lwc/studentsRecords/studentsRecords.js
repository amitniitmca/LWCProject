import { LightningElement, track, wire, api } from 'lwc';
import getStudents from '@salesforce/apex/StudentService.getStudents';
import { refreshApex } from '@salesforce/apex';
export default class StudentsRecords extends LightningElement {
    @track dataList;
    @track columnsList = [
        {label: 'Student Name', fieldName: 'StudentName'},
        {label: 'Date of Joining', fieldName: 'JoiningDate'},
        {label: 'Classroom', fieldName: 'Classroom'},
        {label: 'Gender', fieldName: 'Gender'},
        {label: 'Age', fieldName: 'Age'}
    ];

    wiredStudentRecords;

    @wire(getStudents)
    wiredGetStudents(result){
        this.wiredStudentRecords = result;
        const {data, error} = result;
        if(data){
            this.dataList = [];
            for(let item of data){
                const record = {
                    StudentName : item.First_Name__c + ' '+ item.Last_Name__c,
                    JoiningDate : item.Joining_Date__c,
                    Classroom : item.Classroom__r.Standard__c,
                    Gender : item.Gender__c,
                    Age : item.Age__c
                };
                this.dataList.push(record);
            }
        }
        else{
            console.log(error);
        }
    }

    @api refreshData(){
        refreshApex(this.wiredStudentRecords);
    }

}