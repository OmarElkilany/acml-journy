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
    console.log('Entered component register()');
    this.auth.register(this.userCredentials).subscribe(() => {
      console.log('returned'); this.router.navigateByUrl('/');
    }, (err) => {
      console.error(err);
    });
  }

  ngOnInit() {
  }

}
