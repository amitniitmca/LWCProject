import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertStudent from '@salesforce/apex/StudentService.insertStudent';
import { loadStyle } from 'lightning/platformResourceLoader';
import mystyle from '@salesforce/resourceUrl/MyStyle';

export default class StudentsForm extends LightningElement {
    @api classroomRecords;
    firstName;
    lastName;
    dateOfJoining;
    classroomValue;
    classroomOptions;
    age;
    genderOptions = [
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'}
    ];
    genderValue;
    address;

    connectedCallback(){
        loadStyle(this, mystyle+'/MultiLineToast.css');
        loadStyle(this, mystyle+'/NoHeader.css');
        loadStyle(this, mystyle+'/style.css');
        this.classroomOptions = [];
        for(let record of this.classroomRecords){
            this.classroomOptions.push({label: record.Standard__c, value: record.Id});
        }
        this.classroomOptions.unshift({label: '--SELECT STANDARD--', value : '--SELECT--'});
        this.classroomValue = '--SELECT--';
    }

    handleFirstNameChange(event){
        this.firstName = event.detail.value;
    }

    handleLastNameChange(event){
        this.lastName = event.detail.value;
    }

    handleDateOfJoiningChange(event){
        this.dateOfJoining = event.detail.value;
    }

    handleClassroomChange(event){
        this.classroomValue = event.detail.value;
    }

    handleAgeChange(event){
        this.age = event.detail.value;
    }

    handleGenderChange(event){
        this.genderValue = event.detail.value;
    }

    handleAddressChange(event){
        this.address = event.detail.value;
    }

    handleAddClick(){
        const errorResult = this.validateRecords();
        if(errorResult.errorCount != 0){
            this.showToast('Error', errorResult.errorMessage, 'error');
        }
        else{
            const myValues = {
                firstName : this.firstName,
                lastName : this.lastName,
                dateOfJoining : this.dateOfJoining,
                classroom : this.classroomValue,
                age: this.age,
                gender : this.genderValue,
                address : this.address
            };
            insertStudent({values : myValues})
            .then(data => {
                if(data == true){
                    this.showToast('Success', 'Student Inserted Successfully!','success');
                    this.resetValues();
                    const myevent = new CustomEvent("inserted");
                    this.dispatchEvent(myevent);
                }
                else{
                    this.showToast('Error', 'Student cannot be inserted!', 'error');
                }
            })
            .catch(error => {
                this.showToast('Error', 'Student cannot be inserted! :\n '+JSON.stringify(error), 'error');
            });
        }
    }

    handleResetClick(){
        this.resetValues();
    }

    resetValues(){
        this.firstName = '';
        this.lastName = '';
        this.dateOfJoining = undefined;
        this.classroomValue = '--SELECT--';
        this.age = undefined;
        this.genderValue = '';
        this.address = '';
    }

    validateRecords(){
        let message = 'Please remove the following error(s):\n';
        let count = 0;
        if(this.firstName == null || this.firstName == ''){
            count++;
            message += count+'. Please provide first name.\n';
        }
        if(this.lastName == null || this.lastName == ''){
            count++;
            message += count+'. Please provide last name.\n';
        }
        if(this.dateOfJoining == null || this.dateOfJoining == ''){
            count++;
            message += count+'. Please provide Date of Joining.\n';
        }
        if(this.classroomValue == '--SELECT--'){
            count++;
            message += count+'. Please choose a classroom.\n';
        }
        return {errorCount: count, errorMessage: message};
    }

    showToast(title, message, type){
        const toastEvent = new ShowToastEvent({
                                title : title,
                                message : message,
                                variant : type
                            });
        this.dispatchEvent(toastEvent);
    }
}