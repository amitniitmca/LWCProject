import { LightningElement } from 'lwc';

export default class MathematicalTable extends LightningElement {

    num;
    message = ;

    handleNumberChange(event){
        this.num = event.detail.value;
    }

    handleSubmitClick(){
        this.message = '';
        for(let i=1; i<=10; i++){
            let res = this.num * i;
            this.message += res+ ", ";
        }
    }
}