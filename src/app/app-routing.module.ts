import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SitesComponent } from "./sites/sites.component";

const routes: Routes = [
    { path: '', component: SitesComponent },
    { path: ':id/dashboard', component: DashboardComponent }
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }