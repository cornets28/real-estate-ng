import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserForRegister } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm!: FormGroup;
  user!: UserForRegister;
  userSubmitted: boolean = false;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    // this.registerationForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    //   // @ts-ignore
    // }, this.passwordMatchingValidator)
    this.createRegisterationForm();
  }

  createRegisterationForm() {
    this.registerationForm = this.fb.group({
      userName: [null, Validators.required],
      userEmail: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      userMobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, this.passwordMatchingValidator)
  }

  passwordMatchingValidator(fg: FormGroup) : Validators {
    // @ts-ignore
    return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null : { notmatched: true };
  }

  userData() : UserForRegister {
    return this.user = {
      userName: this.userName.value,
      userEmail: this.userEmail.value,
      password: this.password.value,
      userMobile: this.userMobile.value
    }
  }
  // Getter method for form controls
  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }
  get userEmail() {
    return this.registerationForm.get('userEmail') as FormControl;
  }

  get password() {
    return this.registerationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }

  get userMobile() {
    return this.registerationForm.get('userMobile') as FormControl;
  }

  onSubmit() {
    console.log(this.registerationForm.value);
    this.userSubmitted = true;
    if (this.registerationForm.valid) {
      // this.user = Object.assign(this.user, this.registerationForm.value);
      this.authService.registerUser(this.userData()).subscribe(() => {
        this.registerationForm.reset()
        this.userSubmitted = false
        this.alertify.success('Congratulations, you have successfully registered');
      });
    }

  }
}
