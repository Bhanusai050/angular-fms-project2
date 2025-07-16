import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService} from '../../api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  formData = {
    name: '',
    phoneNumber: '',
    email: '',
    message: ''
  };
  constructor( private api: ApiService,private router:Router){}

  allowOnlyLetters(event: KeyboardEvent) {
    if (!/^[A-Za-z ]+$/.test(event.key)) {
      event.preventDefault();
    }
  }

  // Allow only digits for phone field
  onPhoneKeypress(event: KeyboardEvent) {
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  // Submit form data
  onSubmit() {
  this.api.submitContact(this.formData).subscribe({
    next: () => {
      alert('Message submitted successfully!');
      this.router.navigate(['/']);
    },
    error: err => {
      alert(err.message); // shows clear error (network, validation, or server issues)
    }
  });
}
}