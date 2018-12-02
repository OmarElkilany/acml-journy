import { Component, OnInit } from '@angular/core';
import { TokenPayload } from '../TokenPayload';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit() {
  }

  login() {

    if (this.userCredentials.email == '' || this.userCredentials.password == '') {
      this.toastrService.error('Please fill in all fields.');
      return;
    }

    this.auth.login(this.userCredentials).subscribe(() => {
      this.router.navigateByUrl('/');
    }, (err) => {
      this.toastrService.error(err.error.err);
    });
  }

}
