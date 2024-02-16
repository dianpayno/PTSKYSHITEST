import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './views/home/home.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailListComponent } from './views/detail-list/detail-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AddlistModalComponent } from './components/addlist-modal/addlist-modal.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CardListComponent,
    AlertModalComponent,
    DetailListComponent,
    AddlistModalComponent,
   
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
