import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {AuthService} from '../../auth.service';

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

  login() {
    // Object.keys(this.myForm.errors).length

    if (this.myForm.controls['login'].hasError('login') || this.myForm.controls['password'].hasError('password')) {
      return;
    }
    this.auth.login(this.myForm.controls['login'].value, this.myForm.controls['password'].value).subscribe(r => {
      if (r) {
        this.router.navigate(['/dashboard']);
      } else {
        this.myForm.setErrors({'custom-error': true});
      }
    })

    // console.log(this.myForm.value.email);
    // console.log(this.myForm.value.password);
    // this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
  }

}
