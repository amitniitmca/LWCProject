import { LightningElement } from 'lwc';
import MyModal from 'c/myCustomModal';

export default class NormalComponent extends LightningElement {

    async handleOpenClick(){
        const result = await MyModal.open({
            size: 'small',
            description: 'Confirmation',
            content : 'Are you sure, you want to delete?'
        });
        console.log(result);
    }
}