import { LightningElement, api } from 'lwc';

export default class MyChildLwc extends LightningElement {
    messageFromParent;
    message;

    @api receiveMessage(message){
        this.messageFromParent = message;
    }

    handleMessageChange(event){
        this.message = event.detail.value;
    }

    handleSendClick(){
        const obj = new CustomEvent("send", {detail: {value : this.message}});
        this.dispatchEvent(obj);
    }
}