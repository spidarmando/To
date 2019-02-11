import { Directive, HostListener, HostBinding, ElementRef, NgZone, AfterViewInit, Renderer2 } from '@angular/core'
import { DropMarkDirective } from './dragdrop.directive'

import { DomSanitizer, SafeStyle } from '@angular/platform-browser'

interface Position{
    x: number,
    y: number
}

@Directive({
    selector: '[movable]'
})

export class MovableDirective extends DropMarkDirective {

    constructor(
        public el: ElementRef,
        public ngZone: NgZone,
        private sanitizer: DomSanitizer, 
        private renderer: Renderer2,
        public element: ElementRef){
         super();
    }

    
    position: Position = { x:0, y:0 }
    private startPosition: Position

    ngAfterViewInit(){
        this.ngZone.runOutsideAngular(() => {

            // const dateTime = document.querySelector('.date-data')
            // const currEl = this.el.nativeElement
          
            // dateTime.addEventListener('dragStart', (e: PointerEvent) => {
            //     this.startPosition = {
            //         x: e.clientX - this.position.x,
            //         y: e.clientY - this.position.y
            //     }  
            //     console.log('asd')
            // })

            // dateTime.addEventListener('dragMove', (e: PointerEvent) => {
            //     this.position.x = e.clientX - this.startPosition.x
            //     this.position.y = e.clientY - this.startPosition.y
            //     console.log('asdasd')
            // })

        })
    }

    @HostBinding('style.transform') get hostElementTransform(): SafeStyle {
        var haha = Math.floor(this.position.y/30) * 30;

        if(this.position.y !== 0 && this.position.y % 30 >= -1 && this.position.y % 30  <= 20){          
            return this.sanitizer.bypassSecurityTrustStyle(`translateX(${this.position.x}px) translateY(${haha}px)`)    
        }
        return this.sanitizer.bypassSecurityTrustStyle(`translateX(${this.position.x}px) translateY(${haha}px)`)         
    
    }


     @HostListener('dragStart',['$event']) onDragStart(event: PointerEvent){
        this.startPosition = {
            x: event.clientX - this.position.x,
            y: event.clientY - this.position.y
        }       
    }

    @HostListener('dragMove',['$event']) onDragMove(event: PointerEvent){   
        // this.position.x = event.clientX - this.startPosition.x
        this.position.y = event.clientY - this.startPosition.y       
    }

    @HostListener('dragEnd',['$event']) onDragEnd(){
        //this.position = { x:0, y:0 }
    }



}