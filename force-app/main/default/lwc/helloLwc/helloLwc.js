import { LightningElement } from 'lwc';

export default class HelloLwc extends LightningElement {

    textValue;
    userName;

    handleTextChange(event){
        this.textValue = event.detail.value;
    }

    handleSubmitClick(event){
        this.userName = this.textValue;
    }
}


// event.detail
// event.target