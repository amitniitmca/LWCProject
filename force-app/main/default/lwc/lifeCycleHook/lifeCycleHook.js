import { LightningElement } from 'lwc';

export default class LifeCycleHook extends LightningElement {
    constructor(){
        super();
        console.log('PARENT: Constructor Called : ');    
    }

    connectedCallback(){
        console.log('PARENT: Connected Callback Called : ');
    }
    
}