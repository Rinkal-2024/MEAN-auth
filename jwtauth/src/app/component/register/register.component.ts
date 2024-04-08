import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {this.form = this.FormBuilder.group({
    name: '',
    email: '',
    password: '',
  });
}

  ngOnInit(): void {
    this.form = this.FormBuilder.group({
      name: '',
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

  submit(): void {
    let user = this.form.getRawValue();
    //console.log(user);

    if (user.name == '' || user.email == '' || user.password == '') {
      Swal.fire('Error', 'Please Enter all the field', 'error');
     } else if (!this.ValidateEmail(user.email)) {
      Swal.fire('Error', 'Please enter a valid email', 'error');
    } else {
      this.http
        .post('http://localhost:5000/api/register', user, {
          withCredentials: true,
        })
        .subscribe(
          () => {
            // Successful response
            this.router.navigate(['/']);
          },
          (err) => {
            // Error response
            Swal.fire('Error', err.error.message, 'error');
          }
        );
    }
  }
}
