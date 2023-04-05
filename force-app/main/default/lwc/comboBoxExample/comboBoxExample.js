import { LightningElement, wire } from 'lwc';
import getAccountTypeOptions from '@salesforce/apex/AccountService.getAccountTypeOptions';

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

    @wire(getAccountTypeOptions)
    wiredGetAccountTypeOptions({data, error}){
        if(data){
            this.typeOptions = [];
            for(let item in data){
                this.typeOptions.push({label : item, value : data[item]});
            }
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