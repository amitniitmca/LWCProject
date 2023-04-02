import { LightningElement } from 'lwc';

export default class LcHookChild extends LightningElement {
    constructor(){
        super();
        console.log('CHILD: Constructor Called');    
    }

    connectedCallback(){
        console.log('CHILD: Connected Callback Called');
    }
    
}