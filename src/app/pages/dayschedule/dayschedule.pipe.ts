import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'rosterFormat'
})

export class DaySchedulePipe implements PipeTransform{

    transform(value: any, rosters: Array<any>){
        var datas = []    
        if(rosters && rosters.length > 0){
            datas = rosters.filter(x => x['startTime'] === value)
        }
        return datas;
    }
}