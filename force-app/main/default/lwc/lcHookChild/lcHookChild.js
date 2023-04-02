import { LightningElement, api } from 'lwc';

export default class LcHookChild extends LightningElement {
    
    @api message;

    @api childmethod(){
        this.message = "Value is Changed";
    }
}