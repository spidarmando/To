import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DragComponent } from './pages/drag/drag'
import { ScheduleComponent } from './pages/schedule/schedule'

const routes: Routes = [
  { path: 'drag', component: DragComponent },
  { path: 'schedule', component: ScheduleComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
