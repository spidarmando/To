import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragComponent } from './pages/drag/drag'
import { ScheduleComponent } from './pages/schedule/schedule'
//importing DragDrop Module
import { DragNDropModule } from './pages/dragdrop/drag.module'

//importing DragDrop Module
import { DayScheduleModule } from './pages/dayschedule/dayschedule.module'

@NgModule({
  declarations: [
    AppComponent,
    DragComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // putting the module in imports
    DragNDropModule.forRoot(),
    DayScheduleModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
