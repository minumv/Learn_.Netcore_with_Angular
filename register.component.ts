import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from '../Models/student';
import { StudentService } from '../Services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 

  StudentArray : Student [] = [];
  StudentFormGroup : FormGroup;

  title = 'Student';

  ngOnInit(): void {
    this.getStudent();
  }

  constructor(private studService : StudentService, private fb:FormBuilder,private router: Router){
    this.StudentFormGroup = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      emailID: [''],
      password: [''],
      phoneNumber: ['']

    })
  }

  getStudent(){
    this.studService.GetStudent().subscribe(response=>{
      console.log(response);
      this.StudentArray = response;
    })
  }

  OnSubmit(){
    console.log("Loaded students details:");
    console.log(this.StudentFormGroup.value);

    if(this.StudentFormGroup.value.id != null &&
      this.StudentFormGroup.value.id != ""){
        this.studService.UpdateStudent(this.StudentFormGroup.value).subscribe(response=>{
          console.log("student already exist, for updation!!")
          console.log(response);
          this.getStudent();
          this.StudentFormGroup.setValue({
            id: "",
            firstName: "",
            lastName: "",
            emailID: "",
            password: "",
            phoneNumber: ""
          })
        })
    }
    else {
      this.studService.CreateStudent(this.StudentFormGroup.value).subscribe(response=>{
        console.log("form data:")
        console.log(this.StudentFormGroup.value)
        console.log("New student..")
        console.log(response);
        this.getStudent();
        this.StudentFormGroup.setValue({
          id: "",
          firstName: "",
          lastName: "",
          emailID: "",
          password: "",
          phoneNumber: ""
        })
      })
      this.router.navigate(['/login']);

    }    
  }

  FillForm(stud:Student){
    this.StudentFormGroup.setValue({
          id: stud.id,
          firstName: stud.firstName,
          lastName: stud.lastName,
          emailID: stud.emailID,
          password: stud.password,
          phoneNumber: stud.phoneNumber
    })
  }

  DeleteStud(id:string){
    if(confirm("Are you sure to delet?")){
      console.log("Deleted Student details successfully!!");
      this.studService.DeleteStudent(id).subscribe(response=>{
        console.log(response);
        this.getStudent();
      })
    }
  }
}

