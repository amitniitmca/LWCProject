import { LightningElement, wire } from 'lwc';
// import getAccountTypeOptions from '@salesforce/apex/AccountService.getAccountTypeOptions';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class ComboBoxExample extends LightningElement {

    subjectValue = 'C';
    subjectOptions = [
        {label: 'C Language', value: 'C'},
        {label: 'C++ Language', value: 'C++'},
        {label: 'C# Language', value: 'C#'},
        {label: 'Java Language', value: 'Java'},
        {label: 'Apex Language', value: 'Apex'},
        {label: 'HTML Language', value: 'HTML'},
        {label: 'CSS Language', value: 'CSS'},
        {label: 'JS Language', value: 'JS'}
    ];

    typeValue;
    typeOptions;
    recordTypeId;
    // @wire(getAccountTypeOptions)
    // wiredGetAccountTypeOptions({data, error}){
    //     if(data){
    //         this.typeOptions = [];
    //         for(let item in data){
    //             this.typeOptions.push({label : item, value : data[item]});
    //         }
    //     }
    //     if(error){
    //         console.log(error);
    //     }
    // }

    @wire(getObjectInfo, {objectApiName : ACCOUNT_OBJECT})
    wiredGetObjectInfo({data, error}){
        if(data){
            this.recordTypeId = data.defaultRecordTypeId;
        }
        if(error){
            console.log(error);
        }
    }

    @wire(getPicklistValues, {recordTypeId : '$recordTypeId', fieldApiName : ACCOUNT_TYPE})
    wiredGetPicklistValues({data, error}){
        if(data){
            this.typeOptions = data.values;
        }
        if(error){
            console.log(error);
        }
    }

    handleSubjectChange(event){
        this.subjectValue = event.detail.value;
    }

    handleTypeChange(){

    }
}