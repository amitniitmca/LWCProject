import { LightningElement } from 'lwc';

export default class ComponentUsingFlow extends LightningElement {

    inputVariables = [
        {name: "userName", type:"String", value:"Amit Kumar"},
        {name: "dateOfBirth", type:"Date", value: "2023-04-14"}
    ];

    handleStatusChange(event){
        if(event.detail.status == "FINISHED"){
            alert(this.inputVariables[0].value);
            alert(this.inputVariables[1].value);
        }
    }
}