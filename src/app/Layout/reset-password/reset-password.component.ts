import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import{ HttpClient } from '@angular/common/http';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  successMessage = '';

  // 👉 New: visibility toggles (no other logic changed)
  showNew = false;
  showConfirm = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private http: HttpClient,
  ) 
  {
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

  const payload = {
    identifier: this.resetForm.get('identifier')?.value,
    otp: this.resetForm.get('otp')?.value,
    newPassword: this.resetForm.get('password')?.value
  };

  this.http.post('/api/verify-otp', payload).subscribe(() => {
    this.successMessage = '✅ Password reset successfully! Redirecting...';
    setTimeout(() => this.router.navigate(['/login']), 2000);
  });
}

  // 👉 New: functions to toggle visibility
  toggleNew() {
    this.showNew = !this.showNew;
  }

  toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }
}