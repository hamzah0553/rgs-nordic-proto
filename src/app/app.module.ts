import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';


import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from "./app.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { SitesComponent } from './sites/sites.component';
import { SiteGridComponent } from './site-grid/site-grid.component';
import { CellInfoComponent } from './cell-info/cell-info.component';
import { CellComponent } from './cell/cell.component';


@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, 
    HeaderComponent, SitesComponent, SiteGridComponent, CellInfoComponent, CellComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
