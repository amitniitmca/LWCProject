import { LightningElement, wire } from 'lwc';
import { APPLICATION_SCOPE, MessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import YOLL from '@salesforce/messageChannel/yollCommunication__c';

export default class Cohort1Component extends LightningElement {
    messageFromAmit = '';
    subscription = null;

    @wire(MessageContext)
    messContext;

    connectedCallback() {
        this.subscribeMC();
    }

    disconnectedCallback() {
        this.unsubscribeMC();
    }

    subscribeMC(){
        if(this.subscription == null){
            this.subscription = subscribe(this.messContext, YOLL, (content) => this.handler(content) , {scope: APPLICATION_SCOPE});
        }
    }

    unsubscribeMC(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handler(content){
        this.messageFromAmit = 'AMIT: '+content.message + '\n' +this.messageFromAmit;
    }
}