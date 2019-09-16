import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ConfigService, JWTAccess, JWTError, JWTRefresh} from '../../_services';
import {Prefix} from '../../_services/prefix';
import {AppComponent} from '../../app.component';
export class SignUpResult {
  data?: string;
  status: number;
  error?: string;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  title = AppComponent.title;
  myForm: FormGroup;

  passwordValidator(group: FormGroup): { [s: string]: boolean } {
    console.log(group);
    if (group.value.password != group.value.password_repeat) {
      return {'custom-error': true};
    }
    return null;
  }

  constructor(private http: HttpClient, private config: ConfigService, private router: Router) {
    this.myForm = new FormGroup({
      login: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      password_repeat: new FormControl('', [
        Validators.required,
      ]),
    }, [this.passwordValidator]);
  }

  ngOnInit() {
  }

  signup() {
    console.log(this.myForm)
    if (!this.myForm.valid) {
      return;
    }

    this.http.post<SignUpResult>(this.config.config.domain + this.config.config.urlSignUp, {
      login: this.myForm.value.login,
      email: this.myForm.value.email,
      password: this.myForm.value.password,
      PasswordRepeat: this.myForm.value.password_repeat,
    }).toPromise()
      .then(r => {
        if(r.status == 201) {
          this.myForm.setErrors({'server-error': null})
          this.router.navigate(['/signin'])
        }
      }, err => {
        if (err.status != 201) {
          console.log(err.error)
          this.myForm.setErrors({'server-error': err.error.error})
        }
      })



    // let result = false;
    //
    // if (result) {
    //   this.router.navigate(['/dashboard']);
    // }
  }
}
