import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TokenPayload } from '../TokenPayload'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userCredentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.userCredentials).subscribe(() => {
      this.router.navigateByUrl('/auth/test');
    }, (err) => {
      console.error(err);
    });
  }

  ngOnInit() {
  }

}
