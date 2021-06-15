import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, HeaderComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
