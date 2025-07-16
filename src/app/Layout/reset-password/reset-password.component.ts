import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  successMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetForm.invalid) return;

    this.successMessage = '✅ Password reset successfully! Redirecting...';
    setTimeout(() => {
      this.router.navigate(['/login']); // change this route as needed
    }, 2000);
  }
}
