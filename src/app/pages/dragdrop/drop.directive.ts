import { Directive, AfterViewInit, NgZone, ElementRef, Inject, HostListener, Output, EventEmitter, HostBinding } from '@angular/core'
import { DOCUMENT } from '@angular/common'


@Directive({
    selector: '[dropMark]',
})

export class DropMarkDirective implements AfterViewInit {

    @Output() dropEmit = new EventEmitter<any>();

    drag: boolean = false

    constructor(
        private ngZone: NgZone,
        private element: ElementRef,
        @Inject(DOCUMENT) private document: Document
    ){

    }

    ngAfterViewInit(){
       
    }

    @HostBinding('class.droppable') get droppable(){
        return this.drag;
    }

    @HostListener('drop',['$event'])
    onDrop(event: any){
        this.drag = false;
        this.dropEmit.emit(this.element.nativeElement)
    }

    @HostListener('dragleave',['$event'])
    onDragLeave(event: any){
        event.preventDefault();
        
        this.drag = false
    }

    @HostListener('dragover',['$event'])
    onDragOver(event: any){
        event.preventDefault()
        this.drag = true
    }

}