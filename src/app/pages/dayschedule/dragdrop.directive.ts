import { Directive, AfterViewInit, NgZone, ElementRef, Inject, HostListener, Output, EventEmitter, HostBinding,OnInit  } from '@angular/core'
import { DOCUMENT } from '@angular/common'

import { Subject } from 'rxjs'
import { switchMap, takeUntil, take, repeat } from 'rxjs/operators';

@Directive({
    selector: '[dropMark]',
})

export class DropMarkDirective implements OnInit {

    @Output() dropEmit = new EventEmitter<any>();

    @Output() dragStart = new EventEmitter<any>();
    @Output() dragMove = new EventEmitter<any>();
    @Output() dragEnd = new EventEmitter<any>();

    drag: boolean = false

    private pointerDown = new Subject<PointerEvent>();
    private pointerMove = new Subject<PointerEvent>();
    private pointerUp = new Subject<PointerEvent>();


    ngOnInit(){
        this.pointerDown.asObservable()
            .subscribe(event => this.dragStart.emit(event))

    
        this.pointerDown.pipe(
            switchMap(() => this.pointerMove),
            takeUntil(this.pointerUp),
            repeat()
        ).subscribe(event => {            
            this.dragMove.emit(event)
        })

        this.pointerDown.pipe(
            switchMap(() => this.pointerUp),
            take(1),
            repeat()
        ).subscribe(event => {
            this.dragEnd.emit(event)
        })
    }

    @HostBinding('class.droppable') get droppable(){
        return this.drag;
    }

    @HostListener('pointerdown',['$event'])
    onPointerDown(event: any){
        if(event.target.querySelector('.resizer') !== null){
            this.pointerDown.next(event);
        }
    }

    @HostListener('document:pointermove',['$event'])
    onPointerMove(event: PointerEvent){
        this.pointerMove.next(event);
    }

    @HostListener('document:pointerup',['$event'])
    onPointerUp(event: PointerEvent){
        this.pointerUp.next(event);
    }


    // @HostListener('drop',['$event'])
    // onDrop(event: any){
    //     this.drag = false;
    //     this.dropEmit.emit(this.element.nativeElement)
    // }

    // @HostListener('dragleave',['$event'])
    // onDragLeave(event: any){
    //     event.preventDefault();
        
    //     this.drag = false
    // }

    // @HostListener('dragover',['$event'])
    // onDragOver(event: any){
    //     event.preventDefault()
    //     this.drag = true
    // }

}