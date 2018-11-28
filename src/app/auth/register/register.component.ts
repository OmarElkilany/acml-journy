import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TokenPayload } from '../TokenPayload';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastrService: ToastrService) { }

  register() {
   
    if (this.userCredentials.email == '' || this.userCredentials.name == ''
      || this.userCredentials.password == '') {
      this.toastrService.error('Please fill in all fields.');
      return;
    }

    if(this.userCredentials.password.length < 8) {
      this.toastrService.error('The password must be at least 8 characters.');
      return;
    }

    const filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!filter.test(this.userCredentials.email)) {
      this.toastrService.error('Please enter a valid email.');
      return;
    }


    this.auth.register(this.userCredentials).subscribe(() => {
      this.router.navigateByUrl('/');
    }, (err) => {
      this.toastrService.error(err.error.err);
    });
  }

  ngOnInit() {
  }

}
