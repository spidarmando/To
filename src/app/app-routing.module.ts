import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DragComponent } from './pages/drag/drag'

const routes: Routes = [
  { path: 'drag', component: DragComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
