import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-crud';
  error = '';
  user : User = {
    name: '',
    email: '',
    phone: null
  };

  users: User[] = [
    { id: 1, name: 'Leanne Graham', email: 'lear@gmail.com',
    phone: 177073680315644 }
  ];

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
      //debugger;
      return;
    }


    if(this.user.id == null) {
      this.user.id = this.users.length + 1;
    }
    this.users.push(this.user);
    this.user = {
      name: '',
      email: '',
      phone: null
    };
  }
}


export interface User {
  id?: number;
  name: string;
  email: string;
  phone: number| null;
}

