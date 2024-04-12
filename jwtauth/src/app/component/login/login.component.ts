import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal
 from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {this.form = this.FormBuilder.group({
    // name: '',
     email: '',
     password: '',
   }); }

  ngOnInit(): void {
    this.form = this.FormBuilder.group({
     // name: '',
      email: '',
      password: '',
    }); 
  }

  ValidateEmail = (email: any) => {
    var validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  submit(){
    let user = this.form.getRawValue();
    //console.log(user);

    if (user.email == '' || user.password == '') {
      Swal.fire('Error', 'Please Enter all the field', 'error');
     } else if (!this.ValidateEmail(user.email)) {
      Swal.fire('Error', 'Please enter a valid email', 'error');
    } else {
      this.http.post('https://mean-auth-server.vercel.app/api/login',user,{
        withCredentials:true
      })
      .subscribe(
        (res)=> this.router.navigate(['/']),
        (err) =>{
          Swal.fire("Error", err.error.message,'error')
        }
      )

  }

  }
}
