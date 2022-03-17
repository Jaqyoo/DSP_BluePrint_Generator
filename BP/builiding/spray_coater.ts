import { Building } from "./builiding";

export class SprayCoater extends Building {
    constructor(
        area_index:number,
        local_offset_x:number,
        local_offset_y:number,
        local_offset_z:number,
        yaw: number
    ) {
        super(area_index, local_offset_x, local_offset_y, local_offset_z, local_offset_x, local_offset_y, local_offset_z, 2313, 120, true)
        this.header.output_to_slot = 14
        this.header.input_from_slot = 15
        this.header.output_from_slot = 15
        this.header.input_to_slot = 14
        this.header.yaw = yaw
        this.header.yaw2 = yaw
    }
}