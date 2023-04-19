import { LightningElement, wire } from 'lwc';
import { MessageContext, publish } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import YOLL from '@salesforce/messageChannel/yollCommunication__c';

export default class AmitComponent extends LightningElement {

    message;

    @wire(MessageContext)
    messContext;
    
    handleMessageChange(event){
        this.message = event.detail.value;
    }

    handleSendClick(){
        if(this.message == '' || this.message == null){
            const obj = new ShowToastEvent({title:'Error', message: 'Please type a message to send!', variant: 'error'});
            this.dispatchEvent(obj);
        }
        else{
            publish(this.messContext, YOLL, {message : this.message});
        }
    }
    
}