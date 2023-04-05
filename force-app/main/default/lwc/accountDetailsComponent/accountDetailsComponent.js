import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountService.getAccounts';
import addAccount from '@salesforce/apex/AccountService.addAccount';
import {refreshApex} from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadStyle } from 'lightning/platformResourceLoader';
import mystyle from '@salesforce/resourceUrl/MyStyle';
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

    connectedCallback(){
        loadStyle(this, mystyle+'/MultiLineToast.css');
        loadStyle(this, mystyle+'/NoHeader.css');
        loadStyle(this, mystyle+'/style.css');

    }


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
            const errorToast = new ShowToastEvent({
                title : 'Error',
                message : "ERROR: Account Name and Billing State are compulsory values to add an account!",
                variant : 'error'
            });
            this.dispatchEvent(errorToast);
        }
        else{
            addAccount({acName: this.accountName, bState : this.billingState})
            .then(data =>{
                const successToast = new ShowToastEvent({
                                        title : 'Success',
                                        message : 'SUCCESS: Account Created Successfully!\nAccount Id: '+data,
                                        variant : 'success'
                                    });
                this.dispatchEvent(successToast);
                refreshApex(this.wiredAccountResult);
                this.accountName = "";
                this.billingState = "";
            }).catch(error =>{
                console.log('ERROR : '+JSON.stringify(error));
            });
        }
    }
}