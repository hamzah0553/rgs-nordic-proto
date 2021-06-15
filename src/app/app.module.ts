import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http'

import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from "./app.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { SitesComponent } from './sites/sites.component';


@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, 
    HeaderComponent, SitesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    MatGridListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
