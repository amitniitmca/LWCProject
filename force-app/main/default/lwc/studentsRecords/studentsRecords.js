import { LightningElement, track, wire, api } from 'lwc';
import getStudents from '@salesforce/apex/StudentService.getStudents';
import { refreshApex } from '@salesforce/apex';
export default class StudentsRecords extends LightningElement {
    @track dataList;

    @track totalRecords;        // Total number of records
    @track pageSize = 1;        // Number of records on each page
    @track recordsToShow = [];  // List of records to show currently
    @track pageNumber = 1;      // Current Page Number
    @track totalPages;          // total number of pages
    @track pageSizeOptions = [];
    @track columnsList = [
        {label: 'Student Name', fieldName: 'StudentName'},
        {label: 'Date of Joining', fieldName: 'JoiningDate'},
        {label: 'Classroom', fieldName: 'Classroom'},
        {label: 'Gender', fieldName: 'Gender'},
        {label: 'Age', fieldName: 'Age'}
    ];

    pageSizeSet = false;
    wiredStudentRecords;

    @wire(getStudents)
    wiredGetStudents(result){
        this.wiredStudentRecords = result;
        const {data, error} = result;
        if(data){
            this.dataList = [];
            for(let item of data){
                const record = {
                    StudentName : item.First_Name__c + ' '+ item.Last_Name__c,
                    JoiningDate : item.Joining_Date__c,
                    Classroom : item.Classroom__r.Standard__c,
                    Gender : item.Gender__c,
                    Age : item.Age__c
                };
                this.dataList.push(record);
            }
            this.totalRecords = this.dataList.length;
            this.paginationHelper();
            this.setPageSizeOptions();
        }
        else{
            console.log(error);
        }
    }

    setPageSizeOptions(){
        if(this.pageSizeSet == false){
            this.pageSizeOptions = [];
            for(let i=1; i<=this.totalRecords; i*=5){
                this.pageSizeOptions.push({label:i, value:i});
            }
            this.pageSize = 1;
            this.pageSizeSet = true;
        }
    }

    @api refreshData(){
        refreshApex(this.wiredStudentRecords);
    }

    handleFirstClick(){
        this.pageNumber = 1;
        this.paginationHelper();
    }

    handleLastClick(){
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }

    handleNextClick(){
        this.pageNumber += 1;
        this.paginationHelper();
    }

    handlePreviousClick(){
        this.pageNumber -= 1;
        this.paginationHelper();
    }

    paginationHelper(){
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.recordsToShow = [];

        for(let i=(this.pageNumber-1)*this.pageSize; i < this.pageNumber * this.pageSize; i++){
            if(i == this.totalRecords){
                break;
            }
            this.recordsToShow.push(this.dataList[i]);
        }
    }

    get prevDisabled(){
        return this.pageNumber == 1;
    }

    get nextDisabled(){
        return this.pageNumber == this.totalPages;
    }

    get rowOffset(){
        return (this.pageNumber-1)*this.pageSize;
    }

    handlePageSizeChange(event){
        this.pageSize = event.detail.value;
        this.paginationHelper();
    }
}