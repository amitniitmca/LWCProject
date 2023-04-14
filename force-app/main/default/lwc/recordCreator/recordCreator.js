import { LightningElement, api } from 'lwc';

export default class RecordCreator extends LightningElement {

    @api objectValue;
    @api selectedFields;

    fieldOptions;
    connectedCallback(){
        this.fieldOptions = this.selectedFields.split(",");
    }
}