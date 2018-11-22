import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, TestComponent],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule { }
