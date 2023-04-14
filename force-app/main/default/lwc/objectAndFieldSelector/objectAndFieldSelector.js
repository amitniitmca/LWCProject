import { LightningElement, wire, api } from 'lwc';
import getObjects from '@salesforce/apex/ObjectAndFieldSelectorController.getObjects';
import getRequiredFields from '@salesforce/apex/ObjectAndFieldSelectorController.getRequiredFields';
import getNormalFields from '@salesforce/apex/ObjectAndFieldSelectorController.getNormalFields';

export default class ObjectAndFieldSelector extends LightningElement {
    @api objectValue;
    objectOptions;
    fieldOptions;
    requiredOptions;
    @api selectedFields;

    @wire(getObjects)
    wiredGetObjects({data, error}){
        if(data){
            this.objectOptions = [];
            for(let temp in data){
                this.objectOptions.push({label:data[temp], value: temp});
            }
        }
        if(error){
            console.log(error);
        }
    }

    handleObjectChange(event){
        this.objectValue = event.detail.value;
        this.getFields();
    }

    getFields(){
        getRequiredFields({objectName : this.objectValue})
        .then(data => {
            let options = [];
            let reqOptions = [];
            for(let temp in data){
                options.push({label: data[temp], value : temp});
                reqOptions.push(temp);
            }
            getNormalFields({objectName : this.objectValue})
            .then(data2 => {
                for(let temp2 in data2){
                    options.push({label: data2[temp2], value : temp2});
                }
                this.fieldOptions = options;
                this.requiredOptions = reqOptions;
            })
            .catch(err2 => {
                console.log(err2);
            });
        })
        .catch(err1 => {
            console.log(err1);
        });
    }

    handleFieldsChange(event){
        this.selectedFields = event.detail.value.join(",");
        console.log(this.selectedFields);
    }
}