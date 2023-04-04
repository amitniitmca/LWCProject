import { LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {

    handleButton1Click(){
        const ce = new CustomEvent("clicked", {detail : "Button 1 Clicked"});
        this.dispatchEvent(ce);
    }

    handleButton2Click(){
        const ce = new CustomEvent("clicked", {detail : "Button 2 Clicked"});
        this.dispatchEvent(ce);
    }

    handleButton3Click(){
        const ce = new CustomEvent("clicked", {detail : "Button 3 Clicked"});
        this.dispatchEvent(ce);
    }
}