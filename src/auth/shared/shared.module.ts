import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './containers/auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthFormComponent
  ],
  exports: [
    AuthFormComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService
      ]
    };
  }
}
