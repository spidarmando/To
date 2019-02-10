import { Directive, AfterViewInit, NgZone, ElementRef, Inject, HostListener, Output, EventEmitter, HostBinding } from '@angular/core'
import { DOCUMENT } from '@angular/common'

export interface DraggedVariable {
    event: DragEvent,
    dom: HTMLElement
}

@Directive({
    selector: '[draggableMark]'
})

export class DraggableMarkDirective implements AfterViewInit {

    @Output() dragEmit = new EventEmitter<DraggedVariable>();

    drag: boolean = false
    realEvent: any;

    constructor(
        private ngZone: NgZone,
        private element: ElementRef,
        @Inject(DOCUMENT) private document: Document
    ){

    }

    ngAfterViewInit(){
        this.ngZone.runOutsideAngular(() => {           

            this.document.addEventListener('dragover' , (event: DragEvent) => {
                if(this.drag){
                    this.dragEmit.emit({
                        event: this.realEvent,
                        dom: this.element.nativeElement
                    })
                }
            })



            

        });  
    }

    @HostBinding('class.draggable') get draggable(){
        return this.drag;
    }

    @HostListener('dragstart',['$event'])
    onMouseDown(event: any){
        this.drag = true
        this.realEvent = event
    }

    @HostListener('dragend',['$event'])
    onDragEnd(event: any){
        this.drag = false
    }


}