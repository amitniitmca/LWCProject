import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountService.getAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MyRecord extends LightningElement {
    objectName = 'Account';
    fields = ['Name', 'Type', 'Phone', 'BillingState', 'ShippingState', 'Total_Number_of_Contact__c'];
    recId;
    accountValue;
    accountOptions = [];

    @wire(getAccounts)
    wiredGetAccounts({data, error}){
        this.accountOptions = [];
        if(data){
            for(let temp of data){
                this.accountOptions.push({label:temp.Name, value:temp.Id});
            }
        }
        if(error){
            console.log(error);
        }
    }

    handleAccountChange(event){
        this.accountValue = event.detail.value;
        this.recId = this.accountValue;
    }

    // handleUpdateClick(){
    //     const comp = this.template.querySelector('lightning-record-edit-form');
    //     comp.submit();
    //     let toast = new ShowToastEvent({title:'Success', message:'Record updated!', variant:'success'});
    //     this.dispatchEvent(toast);

    // }

    handleSuccess(){
        let toast = new ShowToastEvent({title:'Success', message:'Record updated!', variant:'success'});
        this.dispatchEvent(toast);
    }
}