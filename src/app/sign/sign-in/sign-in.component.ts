import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService, JWTAccess, JWTError} from '../../_services/auth.service';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})


export class SignInComponent implements OnInit {

  title = AppComponent.title;
  myForm: FormGroup;

  passwordValidator(group: FormGroup): { [s: string]: boolean } {
    if (group.value.password == '111') {
      return {'custom-error': true};
    }
    return null;
  }

  constructor(private router: Router, private auth: AuthService) {
    this.myForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
      ]),
      login: new FormControl('', [
        Validators.required
      ]),
    });
  }

  async login() {
    // Object.keys(this.myForm.errors).length

    if (this.myForm.controls['login'].hasError('login') || this.myForm.controls['password'].hasError('password')) {
      return;
    }
    const result = await this.auth.login(this.myForm.controls['login'].value, this.myForm.controls['password'].value).then(data => {

      if (data['status'] && data['status'] != 200) {
        //data as JWTError
        this.myForm.setErrors({'custom-error': true});
        return false;
      } else {
        // let r = (data as JWTRefresh);
        return true;
      }
    });
    if (result) {
      await this.router.navigate(['/dashboard']);
    }


    // console.log(this.myForm.value.email);
    // console.log(this.myForm.value.password);
    // this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    if (this.auth.IsLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

}
