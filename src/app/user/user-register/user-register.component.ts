import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm!: FormGroup;
  user: any = {};
  constructor(private fb: FormBuilder) { }

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
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, this.passwordMatchingValidator)
  }

  passwordMatchingValidator(fg: FormGroup) : Validators {
    // @ts-ignore
    return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null : { notmatched: true };
  }
  
  // Getter method for form controls
  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }
  get email() {
    return this.registerationForm.get('email') as FormControl;
  }

  get password() {
    return this.registerationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registerationForm.get('mobile') as FormControl;
  }

  onSubmit() {
    console.log(this.registerationForm.value);
    this.user = Object.assign(this.user, this.registerationForm.value);
    this.addUser(this.user);
    this.registerationForm.reset()
  }

  // if user already exists, do not overwrite it but add other users just created
 // @ts-ignore
  addUser(user) {
    let users: any[] = [];
    if (localStorage.getItem("Users")) {
      // @ts-ignore
      users = JSON.parse(localStorage.getItem("Users"));
      users = [ user, ...users ];
      console.log("USERS1: ", users)
    } else {
      users = [ user ];
    }
    localStorage.setItem("Users", JSON.stringify(users));
    console.log("USERS2: ", users)
  }

}