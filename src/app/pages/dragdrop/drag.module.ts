import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { DragDropComponent } from './dragdrop'
import { DraggableMarkDirective } from './drag.directive'
import { DropMarkDirective } from './drop.directive'

@NgModule({
    declarations:[
        DragDropComponent,
        DraggableMarkDirective,
        DropMarkDirective
    ],
    imports:[
        CommonModule,
        FormsModule,
        DragDropModule
    ],
    exports:[
        DragDropComponent,
        DraggableMarkDirective,
        DropMarkDirective
    ]
})

export class DragNDropModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DragNDropModule
        }
    }
}