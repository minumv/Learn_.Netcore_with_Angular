import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../Models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient:HttpClient) { }
  baseUrl = "http://localhost:5103/api/Student";

  GetStudent():Observable<Student[]>
  {
    return this.httpClient.get<Student[]>(this.baseUrl);
  }

  CreateStudent(stud:Student):Observable<Student>
  {
    stud.id = '00000000-0000-0000-0000-000000000000';
    return this.httpClient.post<Student>(this.baseUrl,stud);
  }

  UpdateStudent(stud:Student):Observable<Student>
  {
    return this.httpClient.put<Student>(this.baseUrl+'/'+stud.id,stud)
  }

  DeleteStudent(id:string):Observable<Student>
  {
    return this.httpClient.delete<Student>(this.baseUrl+'/'+id);
  }

  //Get student details with their emailiD
  GetStudentMail(emailID:string,password:string):Observable<Student>
  {
    return this.httpClient.get<Student>(this.baseUrl+'/'+emailID+'/'+password);
  }
}
