import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { AuthenticationService } from './authentication.service';

@NgModule({
  providers: [AuthenticationService],
  declarations: [RegisterComponent, LoginComponent, TestComponent],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule { }
