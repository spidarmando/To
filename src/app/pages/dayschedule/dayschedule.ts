import { Component, NgZone, OnInit, AfterViewInit, Inject, Renderer2, ElementRef } from '@angular/core'
import { DOCUMENT } from '@angular/common'

import { format, addMinutes, differenceInMinutes } from 'date-fns'

const noOfHours = 24
const noOfMinutes = 60
const timeInterval = 5

@Component({
    selector: 'dayschedule',
    templateUrl: './dayschedule.html',
    styles:[`
    .dayschedule-container{
        width: 520px;
        margin: 0 auto;
        background: #fbfbfb;
        overflow-y: auto;
        max-height: 85vh;
    }
    .dayschedule-time{       
        border-bottom: 1px solid #e7e7e7;
        height: 29px;
        display: flex;
    }
    .dayschedule-time > div:first-child{
        flex:1;
        padding: 5px;
    }
    .dayschedule-time > div:last-child{
        flex:6;
        padding: 5px;
    }
    .time{
        position:relative;
    }
    .timedata{
        position: absolute;
        top: 0;
        margin-right: 5%;
        background: #2e608a;
        border-radius: 3px;
        padding: 10px;
        right: 0;
        left: 0;
        bottom: 0;
        cursor: pointer;
        z-index: 5;
        color: #fff;
        border: 1px solid #569ad3;
    }
    .timedata:hover .resizer{
        display:block;
    }
    .resizer{
        position: absolute;
        bottom: 0;
        text-align: center;
        right: 0;
        left: 0;
        //display:none;
    }
    .resizer i{
        font-size:1rem;
    }
    .resizer:hover{
        background-color:#4d82aec9;
    }
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome and Opera */
    }
    .hovered{
        background:red;
    }
    `]    
})

export class DayScheduleComponent implements OnInit, AfterViewInit {
    globalTime: any = new Date(0,0,0,5,0)
    arrTime: Array<any> = []

    timeData: Array<any> = [
        {
            record: 1,
            job: 'clean',
            startTime: '05:00',
            endTime: '05:15'
        },
        {
            record: 2,
            job: 'sweep',
            startTime: '05:30',
            endTime: '05:40'
        },
        // {
        //     record: 3,
        //     job: 'haha',
        //     startTime: '05:55',
        //     endTime: '06:25'
        // },
        // {
        //     record: 4,
        //     job: 'clean',
        //     startTime: '05:00',
        //     endTime: '05:15'
        // },
        // {
        //     record: 5,
        //     job: 'sweep',
        //     startTime: '05:30',
        //     endTime: '05:40'
        // },
        // {
        //     record: 6,
        //     job: 'haha',
        //     startTime: '05:55',
        //     endTime: '06:25'
        // }, {
        //     record: 7,
        //     job: 'clean',
        //     startTime: '05:00',
        //     endTime: '05:15'
        // },
        // {
        //     record: 8,
        //     job: 'sweep',
        //     startTime: '05:30',
        //     endTime: '05:40'
        // },
        // {
        //     record: 9,
        //     job: 'haha',
        //     startTime: '05:55',
        //     endTime: '06:25'
        // }
    ]

    constructor(
        private ngZone: NgZone,
        private renderer: Renderer2,
        private el: ElementRef,
        @Inject(DOCUMENT) private document: Document 
    ){ }


    ngOnInit(){
        var count = 0
        while(count < ( noOfHours * noOfMinutes / timeInterval)){
            this.addMinute()
            count++
        }
    }

    addMinute(){
        this.arrTime.push(format(this.globalTime, 'HH:mm'))
        this.globalTime = addMinutes(this.globalTime, timeInterval)
    }

    ngAfterViewInit(){
        const timeRows = this.el.nativeElement.getElementsByClassName('timedata')

        for(let time of timeRows){
            var diff = (this.getHeight(time) - 1) * 30;
            time.style.bottom = '-' + diff + 'px'
        }
    }

    getHeight(data: any): number{
        const indexRecord = data.getAttribute('index')
        var result = this.timeData.filter(x => {
            if(x.record === parseInt(indexRecord)){
                return x;
            }
        })
        
        var startTime = new Date('1900-01-01T' + result[0].startTime + 'Z')
        var endTime = new Date('1900-01-01T' + result[0].endTime + 'Z')
        var diffMinutes = differenceInMinutes(endTime, startTime);

        return diffMinutes / 5;
    }
    
}