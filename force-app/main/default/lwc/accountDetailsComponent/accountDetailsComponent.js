import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountService.getAccounts';
import addAccount from '@salesforce/apex/AccountService.addAccount';
import {refreshApex} from '@salesforce/apex';

export default class AccountDetailsComponent extends LightningElement {

    accountName;
    billingState;

    @track dataList;
    @track columnsList = [
        { label: 'Record Id', fieldName: 'Id' },
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Billing State', fieldName: 'BillingState' }
    ];

    wiredAccountResult;

    @wire(getAccounts)
    wiredGetAccounts(result){
        this.wiredAccountResult = result;
        const {data, error} = result;
        if(data){
            console.log(data);
            this.dataList = data;
        }
        if(error){
            console.log('ERROR: '+error);
        }
    }

    handleAccountNameChange(event){
        this.accountName = event.detail.value;
    }

    handleBillingStateChange(event){
        this.billingState = event.detail.value;
    }

    handleAddAccountClick(){
        if((this.accountName == null || this.accountName == '') || (this.billingState == null || this.billingState == '')){
            alert("ERROR: Account Name and Billing State are compulsory values to add an account!");
        }
        else{
            addAccount({acName: this.accountName, bState : this.billingState})
            .then((data)=>{
                alert('SUCCESS: Account Created Successfully with Id: '+data);
                refreshApex(this.wiredAccountResult);
                this.accountName = "";
                this.billingState = "";
            }).catch((error)=>{
                console.log('ERROR : '+error);
            });
        }
    }
}