import { LightningElement, wire } from 'lwc';
import getEmployees from '@salesforce/apex/EmployeeService.getEmployees';

export default class ShowEmployees extends LightningElement {

    @wire(getEmployees)
    wiredGetEmployees({error, data}){
        if(data){
            console.log(data);
        }
        if(error){
            console.log(error);
        }
    }
}