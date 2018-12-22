import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'login'
      },
      {
        path: 'login', loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'register', loadChildren: './register/register.module#RegisterModule'
      }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAJlLF_cEAAocLNaskQ8DtzNbg62FyAPBo",
  authDomain: "fitness-app-98e3a.firebaseapp.com",
  databaseURL: "https://fitness-app-98e3a.firebaseio.com",
  projectId: "fitness-app-98e3a",
  storageBucket: "fitness-app-98e3a.appspot.com",
  messagingSenderId: "1024134126971"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {
}
