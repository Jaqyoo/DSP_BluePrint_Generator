import { Building } from "./builiding"

// 电力感觉塔
export class TeslaCoil extends Building {    
    constructor(
        area_index:number,
        local_offset_x:number,
        local_offset_y:number,
    ) {
        super(area_index, local_offset_x, local_offset_y, 0, 0, 0, 0, 2201, 44)
    }
}