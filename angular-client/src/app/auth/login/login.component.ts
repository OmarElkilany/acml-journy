import { Component, OnInit } from '@angular/core';
import { TokenPayload } from '../TokenPayload';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userCredentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.userCredentials).subscribe( () => {
        this.router.navigateByUrl('/');
    }, (err) =>{
      console.log(err);
    });
  }

}
