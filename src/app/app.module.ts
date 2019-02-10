import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragComponent } from './pages/drag/drag'

//importing DragDrop Module
import { DragNDropModule } from './pages/dragdrop/drag.module'

@NgModule({
  declarations: [
    AppComponent,
    DragComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // putting the module in imports
    DragNDropModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
