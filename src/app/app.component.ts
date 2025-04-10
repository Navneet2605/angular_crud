import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  employeeForm: FormGroup = new FormGroup({});

  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[]=[];

  constructor(){
    this.createForm();
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData!= null){ 
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;

    }
  }

  createForm(){
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      pinCode: new FormControl(this.employeeObj.pinCode),
      state: new FormControl(this.employeeObj.state),
      emailId: new FormControl(this.employeeObj.emailId),
    })
  }
  onSave() {
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData!= null){
      const  parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length +1);
      this.employeeList.unshift(this.employeeForm.value);
    }else{
      this.employeeList.unshift(this.employeeForm.value); 
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.employeeObj = new EmployeeModel();
    this.createForm();
    }
    onEdit(item: EmployeeModel) {
      this.employeeObj = item;
      this.createForm();
      }
      onUpdate(){
        const record = this.employeeList.find(m => m.empId ==  this.employeeForm.controls['empId'].value);
        if(record != undefined){
          record.address = this.employeeForm.controls['address'].value;
          record.name = this.employeeForm.controls['name'].value;
          record.contactNo = this.employeeForm.controls['contactNo'].value;
          record.city = this.employeeForm.controls['city'].value;
          record.pinCode = this.employeeForm.controls['pinCode'].value;
          record.state = this.employeeForm.controls['state'].value;
        }
        localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
        this.employeeObj = new EmployeeModel();
        this.createForm();
      }
      onDelete(id:number){
        const isDelete = confirm("are you sure want to delete ?");
        if(isDelete){
          const index = this.employeeList.findIndex(m => m.empId == id);
          this.employeeList.splice(index, 1);
          localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
        }
      }
}
