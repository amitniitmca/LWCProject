import { LightningElement } from 'lwc';

export default class MyParentLwc extends LightningElement {
    message;
    messageFromChild;

    handleMessageChange(event){
        this.message = event.detail.value;
    }

    handleSendClick(event){
        console.log('D => '+event.detail.value);
        console.log('T => '+event.target.value);
        let comp = this.template.querySelector('c-my-child-lwc');
        comp.receiveMessage(this.message);
    }

    handleChildSend(event){
        this.messageFromChild = event.detail.value;
    }
}