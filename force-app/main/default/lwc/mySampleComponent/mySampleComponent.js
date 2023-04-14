import { LightningElement, api } from 'lwc';

export default class MySampleComponent extends LightningElement {
    @api currentDate;
    @api userName;
    @api password;
    @api statusValue;
    statusOptions = [
        {label: 'New', value: 'New'},
        {label: 'Existing', value: 'Existing'}
    ];

    handleStatusChange(event){
        this.statusValue = event.detail.value;
    }

    handleUsernameChange(event){
        this.userName = event.detail.value;
    }

    handlePasswordChange(event){
        this.password = event.detail.value;
    }

    @api
    validate(){
        if(this.userName === 'amitkumar' && this.password === 'amitkumar') { 
            return { isValid: true }; 
        } 
        else { 
            return { 
                isValid: false, 
                errorMessage: 'Username and Password are not correct!' 
             }; 
         }
    }
}