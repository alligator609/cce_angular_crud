import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-StudentTable',
  templateUrl: './StudentTable.component.html',
  styleUrls: ['./StudentTable.component.css']
})
export class StudentTableComponent implements OnInit {
  error = '';
  user : User = {
    name: '',
    email: '',
    phone: null
  };

  users: User[] = [];
  constructor(private http: HttpClient) { } 
  ngOnInit(): void {
    // get all students \
    this.fetchData();
    console.log('test');
  }

  fetchData(){
    this.http.get(environment.api+'/students').subscribe((res:any)=>{
      console.log(res);
      this.users = res.data;
    });
  }


  
  addUser() {
    console.log(this.user);
    if(this.user.name == ''){
      this.error = 'Name is required';
      return;
    }
    if(this.user.email == ''){
      this.error = 'Email is required';
      return;
    }
    // validate email
    if(this.user.email != ''){
      let lastAtPos = this.user.email.lastIndexOf('@');
      let lastDotPos = this.user.email.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.user.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.user.email.length - lastDotPos) > 2)) {
        this.error = 'Email is not valid';
        return;
      }
    }
    // check if phone is not a number
    if(this.user.phone == null || isNaN(Number(this.user.phone))){
      this.error = 'Phone is required, and Phone must be a number';
      return;
    }


    if(this.user.id == null) {
      this.http.post(environment.api+'/students',this.user).subscribe((res:any)=>{
        console.log(res);
        if(res){
          this.fetchData();
        }
      });
    }
    else{
      let editeduser = this.users.findIndex(x=>x.id==this.user.id);
       this.http.put(environment.api+'/students/'+this.user.id,this.user).subscribe((res:any)=>{
        console.log(res);
        if(res){
          this.users[editeduser] = res.data;
        }
      });
    }
    this.user = {
      name: '',
      email: '',
      phone: null
    };
  }

  edit(user:User){
    console.log(user);
    this.user= {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }
  }
delete(user:User){
  debugger
  let editeduser = this.users.find(x=>x.id==user.id);
  this.http.delete(environment.api+'/students/'+editeduser?.id).subscribe((res:any)=>{
    if(res){
      this.fetchData();
    }
  });
}
}

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: number| null;
}

