import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules
import { AuthModule } from '../auth/auth.module';

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

/*
  var config = {
    apiKey: "AIzaSyAJlLF_cEAAocLNaskQ8DtzNbg62FyAPBo",
    authDomain: "fitness-app-98e3a.firebaseapp.com",
    databaseURL: "https://fitness-app-98e3a.firebaseio.com",
    projectId: "fitness-app-98e3a",
    storageBucket: "fitness-app-98e3a.appspot.com",
    messagingSenderId: "1024134126971"
  };
 */
