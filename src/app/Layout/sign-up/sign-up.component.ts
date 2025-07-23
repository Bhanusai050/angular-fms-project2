import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl} from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { ApiService } from '../../api.service';
import { UserService } from '../../user.service';


// Custom validator factory to ensure password fields match
export const passwordMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const pw = form.get('password')?.value;
  const cpw = form.get('confirmPassword')?.value;
  return pw === cpw ? null : { mismatch: true };
};


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
   signupForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;



  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private userService: UserService // ✅ keep UserService 
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(12),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{12,20}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // 🔐 Password Match Validator
  passwordMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
    const pw = form.get('password')?.value;
    const cpw = form.get('confirmPassword')?.value;
    return pw === cpw ? null : { mismatch: true };
  };

  get f() {
    return this.signupForm.controls;
  }

  allowOnlyLetters(event: KeyboardEvent): void {
    const pattern = /^[A-Za-z ]+$/;
    const inputChar = String.fromCharCode(event.keyCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signupForm.value;
const formData = { Username: name, Email: email, PasswordHash: password }; // <-- update here

this.api.register(formData).subscribe({
  next: (resp: any) => {
    localStorage.setItem('fullname', name);
    this.userService.setUser({
      id: resp.username,
      name,
      email
    });

    this.successMessage = '✅ Registration successful!';
    setTimeout(() => {
      this.router.navigate(['/dashboard']).then(() => window.location.reload());
    }, 2000); // <-- Place here
  },
  error: (err: Error) => {
    this.errorMessage = err.message;
  }
});
    }
  }