import { Building } from "./building"

// 电力感觉塔
export class TeslaCoil extends Building {    
    constructor(
        area_index:number,
        local:[number, number] = null
    ) {
        super(area_index, [local[0], local[1], 0], undefined, 2201, 44)
    }
}