import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { TokenPayload } from '../TokenPayload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = { email: '', name: '', password: ''};

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }


}

