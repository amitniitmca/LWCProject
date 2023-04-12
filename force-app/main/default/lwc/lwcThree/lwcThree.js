import { LightningElement, wire } from 'lwc';
import { APPLICATION_SCOPE, MessageContext,  subscribe, unsubscribe} from 'lightning/messageService';
import myMessage from '@salesforce/messageChannel/myMessage__c';

export default class LwcThree extends LightningElement {

    message;
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeToMessageChannel();
    }

    disconnectedCallback(){
        this.unsubscribeToMessageChannel();
    }

    subscribeToMessageChannel(){
        if(!this.subscription){
            this.subscription = subscribe(
                                    this.messageContext, 
                                    myMessage, 
                                    (data) => this.handleDataReceived(data), 
                                    {scope:APPLICATION_SCOPE}
                                );
        }
    }

    unsubscribeToMessageChannel(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleDataReceived(data){
        let compName = data.componentName;
        if(compName == 'THREE'){
            this.message = data.message;
        }
    }
}