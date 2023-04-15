import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class MyCustomModal extends LightningModal {

    @api content;

    handleYes(){
        this.close('YES');
    }

    handleNo(){
        this.close('NO');
    }
}