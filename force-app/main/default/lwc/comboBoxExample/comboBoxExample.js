import { LightningElement } from 'lwc';

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

    handleSubjectChange(event){
        this.subjectValue = event.detail.value;
    }
}