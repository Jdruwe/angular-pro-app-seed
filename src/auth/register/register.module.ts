import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './containers/register/register.component';

// feature modules

// containers

// components

// routes
export const ROUTES: Routes = [
  {
    path: '', component: RegisterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule {
}
