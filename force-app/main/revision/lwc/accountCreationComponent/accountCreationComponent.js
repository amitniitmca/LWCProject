import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createAccount from '@salesforce/apex/AccountCreationComponentController.createAccount';
import getAccounts from '@salesforce/apex/AccountCreationComponentController.getAccounts';
import getAccountsOfType from '@salesforce/apex/AccountCreationComponentController.getAccountsOfType';

export default class AccountCreationComponent extends LightningElement {
    accountName;
    accountType;

    @wire(getAccounts)
    wiredGetAccounts({data, error}){
        if(data){
            console.log('INSIDE DATA');
            console.log(data);
        }
        if(error){
            console.log('INSIDE ERROR');
            console.log(error);
        }
    }

    handleAccountNameChange(event){
        this.accountName = event.detail.value;
    }

    handleAccountTypeChange(event){
        this.accountType = event.detail.value;
    }

    handleCreateClick(){
        createAccount({name : this.accountName})
        .then(value => {
            this.showSuccessToast('Account Created Successfully! Account ID : '+value);
        })
        .catch(error => {
            this.showErrorToast(error.body.message);
        });
    }

    handleGetClick(){
        getAccountsOfType({accountType : this.accountType})
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            this.showErrorToast(error.body.message);
        });
    }

    showSuccessToast(message){
        const toast = new ShowToastEvent({title:'Success', message: message, variant:'success'});
        this.dispatchEvent(toast);
    }

    showErrorToast(message){
        const toast = new ShowToastEvent({title:'Error', message: message, variant:'error'});
        this.dispatchEvent(toast);
    }
}