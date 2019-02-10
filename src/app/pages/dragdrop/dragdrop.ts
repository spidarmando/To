import { Component, NgZone, OnInit, AfterViewInit, Inject, Renderer2 } from '@angular/core'
import { DOCUMENT } from '@angular/common'



@Component({
    selector: 'dragdrop',
    templateUrl: './dragdrop.html',
    styles:[`
        .drag-container{           
            width:520px;
            margin:0 auto;
        }
        .drag-container > div {
            display:flex;
            min-height:5rem;
            border: 1px solid #efefef;
            border-bottom: none;
        }
        .drag-container > div:last-child{
            border-bottom: 1px solid #efefef;
        }
        .drag-container > div > div{
            border-right:1px solid #efefef;
            flex:1;
            padding: 10px;
        }
        .drag-container > div > div:last-child{
            border-right: none;
        }
        .infos{
            display: flex;
            width: 100%;
            height: 1.5rem;
            border: 1px solid black;
            justify-content: center;
            margin-bottom: 5px;
        }
        .droppable{
            background: red;
        }
    `]    
})

export class DragDropComponent implements OnInit, AfterViewInit {
    rows: Array<number> = [ 1 ,2 ,3]
    draggedInfo: any;

    constructor(
        private ngZone: NgZone,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document 
    ){ }


    ngOnInit(){
    
    }

    ngAfterViewInit(){

    }


    dragEmit(event: any){
        this.draggedInfo = event.dom;
        //event.event.dataTransfer.setData('')
    }

    dragover(event: any){
        event.preventDefault()
        //console.log(event)
    }

    drop(event: any){
        console.log(event)
        this.renderer.appendChild(event, this.draggedInfo)

       // console.log(this.draggedInfo)
    }
    
    
}