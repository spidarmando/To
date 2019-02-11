import { Directive, AfterViewInit, NgZone, ElementRef, Inject, HostListener, Output, EventEmitter, Renderer2, OnInit  } from '@angular/core'
import { DOCUMENT } from '@angular/common'

import { Subject } from 'rxjs'
import { switchMap, takeUntil, take, repeat } from 'rxjs/operators';

interface Position{
    x: number,
    y: number
}

@Directive({
    selector: '[resizer]',
})

export class ResizerDirective implements OnInit, AfterViewInit {

    @Output() dropEmit = new EventEmitter<any>();

    @Output() dragStart = new EventEmitter<any>();
    @Output() dragMove = new EventEmitter<any>();
    @Output() dragEnd = new EventEmitter<any>();

    drag: boolean = false

    private pointerDown = new Subject<PointerEvent>();
    private pointerMove = new Subject<PointerEvent>();
    private pointerUp = new Subject<PointerEvent>();

    position: Position = { x:0, y:0 }
    private startPosition: Position

    elementNow: any;
    starting: any;
    coordinates: Array<any> = []

    constructor(
        private renderer: Renderer2
    ){

    }
    unique;
    hoy;
    dyus;
    ngOnInit(){
        this.pointerDown.asObservable()
            .subscribe((event:any) =>{
                this.startPosition = {
                    x: event.clientX - this.position.x,
                    y: event.clientY - this.position.y
                }   
                this.hoy =  Math.abs(event.target.closest('.timedata').style.bottom.split('px')[0])
                for(var i in this.coordinates){
                    if(event.clientX >= this.coordinates[i].left && event.clientX <= this.coordinates[i].right){
                        if(event.clientY > this.coordinates[i].top && event.clientY < this.coordinates[i].bottom){                
                            this.dyus = Math.floor(this.coordinates[i].top - 8);
                        }
                    }
                }
                this.elementNow  = event.target.closest('.timedata')
            })

    
        this.pointerDown.pipe(
            switchMap(() => this.pointerMove),
            takeUntil(this.pointerUp),
            repeat()
        ).subscribe((event: any) => {       

            
            this.position.y = event.clientY - this.startPosition.y               
          
    
           for(var i in this.coordinates){
                if(event.clientX >= this.coordinates[i].left && event.clientX <= this.coordinates[i].right){
                    if(event.clientY > this.coordinates[i].top && event.clientY < this.coordinates[i].bottom){                   
                        
                        if(this.unique !== Math.floor(this.coordinates[i].top - 7)){

                            var perHeight = (this.unique-this.dyus)/30;
                            if(!isNaN(perHeight)){
                             
                                var total = this.hoy + perHeight * 30;
                              
                                this.elementNow.style.bottom = '-' + total + 'px' 
                            }
                           this.unique = Math.floor(this.coordinates[i].top - 8)
                        }
                    
                    }
                }
           }
           
           
        })

        this.pointerDown.pipe(
            switchMap(() => this.pointerUp),
            take(1),
            repeat()
        ).subscribe(event => {
            this.position =  { x:0, y:0 }
            //this.dragEnd.emit(event)
        })
    }

    ngAfterViewInit(){
        const timeRows: any = document.getElementsByClassName('time');
        
        for(let row of timeRows){
            var bounding = row.getBoundingClientRect();
            this.coordinates.push({
                dom: row,
                left: bounding.left,
                top: bounding.top,
                right: bounding.right,
                bottom: bounding.bottom
            })
        }
    }

    

    // @HostBinding('class.droppable') get droppable(){
    //     return this.drag;
    // }

    @HostListener('pointerdown',['$event'])
    onPointerDown(event: any){
        this.pointerDown.next(event);
  
    }

    @HostListener('document:pointermove',['$event'])
    onPointerMove(event: any){
        this.pointerMove.next(event);
    }

    @HostListener('document:pointerup',['$event'])
    onPointerUp(event: any){
        this.pointerUp.next(event);
    }



}