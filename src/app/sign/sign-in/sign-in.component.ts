import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
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

  constructor(private router: Router) {

    this.myForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,

      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
    });
  }

  login() {
    if (this.myForm.controls['email'].hasError('email')) {
      return;
    }
    this.myForm.setErrors({'custom-error': true});
    console.log(this.myForm.value.email);
    console.log(this.myForm.value.password);
    // this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
  }

}
