import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService, LoginResponse}  from '../../api.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private userService: UserService // ✅ keep UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(12),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{12,20}$/)
      ]],
      remember: [false]
    });

    const savedEmail = localStorage.getItem('remember_email');
    if (savedEmail) {
      this.loginForm.patchValue({ email: savedEmail, remember: true });
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password, remember } = this.loginForm.value;

    this.api.login(email, password, remember).subscribe({
      next: (resp: LoginResponse) => {
        if (resp && resp.username) {
          // 🟢 Use UserService to set and broadcast the current user
          this.userService.setUser({ 
            id: resp.username ?? '', 
            name: resp.username, 
            email 
          });
        }

        this.successMessage = 'Login successful!';
        this.router.navigate(['/Dashboard']);
      },
      error: err => {
        this.errorMessage = err.message;
      }
    });
  }
}