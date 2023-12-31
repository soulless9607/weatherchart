import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { WeatherComponent } from '../components/weather/weather.component'

export const routes: Routes = [
  { path: 'weather/:identifier', component: WeatherComponent },
  { path: '', redirectTo: 'weather/LWX', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgChartsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }