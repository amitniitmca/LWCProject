import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    message = "No Button Clicked";

    handleOnClicked(event){
        this.message =  event.detail;
    }
}