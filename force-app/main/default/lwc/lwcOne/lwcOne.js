import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { MessageContext, publish } from 'lightning/messageService';
import myMessage from '@salesforce/messageChannel/myMessage__c';
export default class LwcOne extends LightningElement {

    @wire(MessageContext)
    messageContext;

    componentValue = '---SELECT---';
    componentOptions = [
        {label:'---SELECT COMPONENT---', value:'---SELECT---'},
        {label:'Component 2', value:'TWO'},
        {label:'Component 3', value:'THREE'}
    ];
    message;

    handleComponentChange(event){
        this.componentValue = event.detail.value;
    }

    handleMessageChange(event){
        this.message = event.detail.value;
    }

    handleSendClick(){
        if(this.componentValue == '---SELECT---' || this.message == undefined){
            const toast = new ShowToastEvent({title:'Error',message:'Please choose component and type message before sending!',variant:'error'});
            this.dispatchEvent(toast);
        }
        else{
            const messageLoad = {componentName : this.componentValue, message: this.message};
            publish(this.messageContext, myMessage, messageLoad);
        }
    }
}