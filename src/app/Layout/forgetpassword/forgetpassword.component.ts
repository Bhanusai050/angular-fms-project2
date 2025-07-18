import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
// import { HttpClient, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { timer,Subscription } from 'rxjs';
import{map,takeWhile}from'rxjs/operators';
import { Location } from '@angular/common'; // ✅ Import Location for back navigation

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})

export class ForgetpasswordComponent {
   forgotForm: FormGroup;
  otpForm: FormGroup;
  loading = false;
  otpGenerated = false;
  successMessage = '';
  otpMessage = '';
  timerRunning = false;
  timerDisplay = '';
  private timerSub?: Subscription;
  readonly OTP_VALID_SECONDS = 120;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location // ✅ Injected Location
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.otpForm = this.fb.group({
      otp: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
        Validators.pattern(/^\d+$/)
      ]]
    });
  }

  ngOnInit(): void {}

  get email() { return this.forgotForm.get('email')!; }
  get otp() { return this.otpForm.get('otp')!; }

  onSubmit() {
    this.otpMessage = '';
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.otpGenerated = true;
      this.successMessage = `OTP sent to ${this.email.value}`;
      this.startTimer(this.OTP_VALID_SECONDS);
    }, 2000);
  }

  verifyOtp() {
    this.otpMessage = '';
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }
    this.timerSub?.unsubscribe();
    this.timerRunning = false;
    this.otpMessage = 'OTP verified successfully!';
    alert('✅ OTP verified successfully!');

    // 🔁 Redirect to Reset Password page (instead of login)
    this.router.navigate(['/reset-password']); // correct use of Router.navigate :contentReference[oaicite:1]{index=1}
  }

  resendOtp() {
    this.otpMessage = '';
    if (!this.timerRunning) {
      this.successMessage = `OTP resent to ${this.email.value}`;
      this.otpForm.reset();
      this.startTimer(this.OTP_VALID_SECONDS);
    }
  }

  // ✅ Back button logic remains intact
  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/login']);
    }
  }

  private startTimer(seconds: number) {
    this.timerSub?.unsubscribe();
    this.timerRunning = true;
    this.timerDisplay = '';
    this.timerSub = timer(0, 1000).pipe(
      map(el => seconds - el),
      takeWhile(rem => rem >= 0)
    ).subscribe(rem => {
      const mins = String(Math.floor(rem / 60)).padStart(2, '0');
      const secs = String(rem % 60).padStart(2, '0');
      this.timerDisplay = `${mins}:${secs}`;
      if (rem === 0) this.timerRunning = false;
    });
  }

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }
}