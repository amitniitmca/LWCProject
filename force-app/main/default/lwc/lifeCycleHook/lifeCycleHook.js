import { LightningElement } from 'lwc';

export default class LifeCycleHook extends LightningElement {
    
    handleClick(){
        let comp = this.template.querySelector("c-lc-hook-child");
        comp.childmethod();
    }
}