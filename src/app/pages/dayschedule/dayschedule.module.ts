import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { DayScheduleComponent } from './dayschedule'

import { DropMarkDirective } from './dragdrop.directive'
import { DaySchedulePipe } from './dayschedule.pipe'
import { MovableDirective } from './movable.directive'
import { ResizerDirective } from './resizer.directive'

@NgModule({
    declarations:[
        DayScheduleComponent,
        DropMarkDirective,
        DaySchedulePipe,
        MovableDirective,
        ResizerDirective
    ],
    imports:[
        CommonModule,
        FormsModule,
        DragDropModule
    ],
    exports:[
        DayScheduleComponent,
        DropMarkDirective,
        DaySchedulePipe,
        MovableDirective
    ]
})

export class DayScheduleModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DayScheduleModule
        }
    }
}